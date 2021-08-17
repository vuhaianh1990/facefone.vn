<?php

namespace App\Http\Controllers\Superadmin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\User;
use Validator;
use DB;
use App\GroupCompany;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class ActiveMemberController extends Controller
{
    public function index()
    {
        return superadmin_view('active-member');
    }

    public function getListUsers()
    {
        // Danh sách users
        $users = User::select('id', 'uid', 'avatar','name','email','phone', 'group_company_id', 'expired')
                    ->where('id', '!=', auth()->id())
                    ->with(['roles', 'group_companys'])
                    ->orderBy('id', 'desc')->get();

        // Danh sách roles
        $roles = DB::table('roles')
                    ->select('id', 'name')
                    ->where([
                        ['name', '!=', 'superadmin'],
                        ['name', '!=', 'admin']
                    ])->get();

        // Danh sách Group / Company
        $companies = GroupCompany::all();

        return response()->json([
            'list'      => $users,
            'roles'     => $roles,
            'companies' => $companies
        ]);
    }

    public function get_expired_company(Request $request)
    {
        if ($request->type == 'company_id') {
            $company = GroupCompany::find($request->id);
            $user = User::select('id', 'expired')->where('id', $company->admin_group_id)->first();
        } elseif ($request->type == 'admin_group_id') {
            $user = User::select('id', 'expired')->where('id', $request->id)->first();
        } else {
            return response()->json([
                'status' => '404'
            ]);
        }

        return response()->json([
            'expired' => $user->expired
        ]);
    }

    public function get_group_limit_company(Request $request)
    {
        $company = GroupCompany::find($request->id);
        if ($company) {
            return response()->json([
                'group_limit' => $company->group_limit
            ]);
        }

        return response()->json([
            'status' => '404'
        ]);
    }

    public function saveRoles(Request $request)
    {
        if ($request->has('data')) {
            $errors = [];
            foreach($request->data as $user_id => $data) {

                DB::beginTransaction();

                try {

                    // Set Role
                    if (array_key_exists('role', $data)) {
                        $role = Role::find($data['role']);
                        $user = User::find($user_id);

                        // If company name not exists
                        if (in_array($data['role'], ['3', '5']) == true && !array_key_exists('company_name', $data)) {
                            $company                 = new GroupCompany();
                            $company->name           = $user->name;
                            $company->admin_group_id = $user_id;
                            $result = $company->save();

                            // If not change
                            if (!$result) {
                                DB::rollBack();
                                $errors[$user_id] = 'company_name';
                            }
                        }

                        // If user is group admin, group member, company admin, company member chagne role to guess or member
                        if (in_array($data['role'], ['1', '2']) == true && in_array($user->getRoleNames()[0], ['group_admin', 'group_member', 'company_admin', 'company_member']) == true) {
                            $user->group_company_id = 0;
                            $user->team_id          = 0;
                            $result                 = $user->save();

                            // If not change
                            if (!$result) {
                                DB::rollBack();
                                $errors[$user_id] = 'change role group/company to guess or member';
                            }

                            $company = GroupCompany::where('admin_group_id', $user->id)->first();
                            if ($company) {
                                $company->admin_group_id = 0;
                                $result                  = $company->save();

                                // If not change
                                if (!$result) {
                                    DB::rollBack();
                                    $errors[$user_id] = 'change admin group id to be not admin group';
                                }
                            }
                        }

                        // Access role for user
                        $result = $user->syncRoles($role->name);

                        // If not change
                        if (!$result) {
                            DB::rollBack();
                            $errors[$user_id] = 'role';
                        }
                    }

                    // Set company_name
                    if (array_key_exists('company_name', $data)) {
                        $company                 = new GroupCompany();
                        $company->name           = $data['company_name'];

                        // If role == 3, 5
                        if (array_key_exists('role', $data) == true && in_array($data['role'], ['3', '5']) == true) {
                            $company->admin_group_id = $user_id;
                        }

                        $result = $company->save();

                        // If not change
                        if (!$result) {
                            DB::rollBack();
                            $errors[$user_id] = 'company_name';
                        }
                    }

                    // Set belongs_company
                    if (array_key_exists('belongs_company', $data)) {
                        if (!array_key_exists('role', $data)
                            || (array_key_exists('role', $data) == true && in_array($data['role'], ['4', '6']) == true)) {
                                $user                   = User::find($user_id);
                                $user->group_company_id = $data['belongs_company'];
                                $result                 = $user->save();

                                // If not change
                                if (!$result) {
                                    DB::rollBack();
                                    $errors[$user_id] = 'belongs_company';
                                }
                        }
                    }

                    // Set group_limit
                    if (array_key_exists('group_limit', $data)) {
                        $company = GroupCompany::where('admin_group_id', $user_id)->first();
                        $company->group_limit = $data['group_limit'];
                        $result = $company->save();

                        // If not change
                        if (!$result) {
                            DB::rollBack();
                            $errors[$user_id] = 'group_limit';
                        }
                    }
                    // Set expired
                    if (array_key_exists('expired', $data)) {
                        $expired = Carbon::createFromFormat('Y-m-d H:i:s', $data['expired']);
                        $user = User::find($user_id);
                        $user->expired = $expired;
                        $result = $user->save();

                        // If not change
                        if (!$result) {
                            DB::rollBack();
                            $errors[$user_id] = 'expired';
                        }
                    }

                    // Execute update to Database
                    DB::commit();

                } catch(\Exception $e) {
                    DB::rollBack();
                    throw $e;
                }
            }

            return response()->json([
                'status' => '200',
                'msg'    => 'success'
            ]);
        }

        return response()->json([
            'status' => '404'
        ]);
    }


    public function checkAndSetGuessRole()
    {
        User::leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->whereNull('model_has_roles.model_id')
            ->orderBy('users.id')
            ->chunk(100, function($users) {
                foreach ($users as $user) {
                    // echo '<pre>'; print_r($user);
                    $user->assignRole('guess');
                }
            });

        echo 'sucess';
    }


    // Active version 2
    public function getUser(){
        $data = User::with('roles')
                ->whereHas('roles', function ($query) {
                    $query->where('roles.name','=','guess');
                })
                ->orderBy('created_at','desc')->paginate(10);

        return superadmin_view('list-user', compact('data'));
    }

    public function listUser(){
        $id = Auth::user()->id;
        $data = User::where('parent_id',$id)->whereNotIn('id',[$id])->get();
        return superadmin_view('list-users',compact('data'));
    }

    public function SendEmailAddUser(Request $request){
        $email = $request->name;
        $data['link'] = route('redirect','facebook').'?parent_id='.Auth::user()->id;
        Mail::send('admin.email.addUser',$data, function($message) use ($email)
        {
            $message->from('noreply@facefone.vn','noreply@facefone.vn');
            $message->to($email)->subject('Facefone đăng ký thành viên');
        });
        return 'Success';
    }
}
