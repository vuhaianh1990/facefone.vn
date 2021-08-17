<?php

namespace App\Http\Controllers\Superadmin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Payment;
use Auth;
use App\Transaction;
use Session;
use DB;
use Yajra\Datatables\Datatables;
use Carbon\Carbon;
use App\User;
use App\GroupCompany;

class TransactionController extends Controller
{
    public function index()
    {
        return superadmin_view('transaction');
    }

    public function getList(Request $request)
    {
        $user = Auth::user();
        $data = DB::table('transaction')
                    ->join('users', 'users.id', '=', 'transaction.user_id')
                    ->join('payment', 'payment.id', '=', 'transaction.payment_id')
                    ->select('transaction.*', 'users.phone', 'payment.name as name_payment')
                    ->orderBy('transaction.created_at','DESC')
                    ->get();

        return Datatables::of($data)
                ->filter(function($query) use ($request) {
                    $date_start = $request->date_start;
                    $date_end   = $request->date_end;

                    if ($date_end != '') {
                        if ($date_start != '') {
                            $query->whereDate('created_at', '<=', $date_end)
                                ->whereDate('created_at', '>=', $date_start);
                        } else {
                            $query->whereDate('created_at', '<=', $date_end);
                        }
                    } else {
                        if ($date_start != '') {
                            $query->whereDate('created_at', $date_start);
                        }
                    }
                })
                ->make(true);
    }

    public function acceptTransaction(Request $request)
    {
        $now = Carbon::now();
        $id  = $request->id;

        DB::beginTransaction();

        try {

            $error = 0;

            Transaction::where('id',$id)->update([
                'status' => 1
            ]);

            $transaction = Transaction::find($id);
            $payment     = Payment::find($transaction->payment_id);

            if ($payment->payment_type == 0) {
                $date = $now->addMonth();
            } else {
                $date = $now->addYear();
            }

            $user = User::find($transaction->user_id);

            // Get group_limit for group/company
            $group_limit = [];
            preg_match('!\d+!', $payment->name, $group_limit);

            if ($group_limit[0] > 1) {
                $group_company = GroupCompany::create([
                    'group_name'     => $user->name,
                    'group_limit'    => $group_limit[0],
                    'admin_group_id' => $user->id,
                ]);

                if (!$group_company) {
                    $error = 1;
                }

                $result = $user->update([
                    'expired'          => $date,
                    'group_company_id' => $group_company->id
                ]);

                if (!$result) {
                    $error = 1;
                }

                // Assign Role
                $user->syncRoles('group_admin');
            } else {
                $result = $user->update([
                    'expired' => $date,
                ]);

                if (!$result) {
                    $error = 1;
                }

                // Assign Role
                $user->syncRoles('member');
            }





            if ($error == 0) {
                DB::commit();

                return response()->json([
                    'status' => 200,
                    'msg'    => 'Success'
                ]);
            }

        } catch(\Exception $e) {
            DB::rollBack();
            throw $e;
        }

    }
}
