<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Team;

class TeamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return admin_view('team.list');
    }

    /**
     *
     */
    public function getData(Request $request)
    {
        if (!auth()->check()) {
            abort(404);
        }
        $auth     = auth()->user();
        $group_id = $auth->group_company_id;
        // $users    = User::with(['teams', 'group_companys'])->where('group_company_id', $group_id)->get();

        $teams = Team::with(['users', 'group_companys', 'admin_team'])->where('group_company_id', $group_id)->get();

        return response()->json([
            'list'       => $teams,
        ]);
    }
}
