<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ManagementMemberController extends Controller
{
    public function index()
    {
        return admin_view('management_member');
    }
}
