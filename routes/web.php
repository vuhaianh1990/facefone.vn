<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// })->name('home');

Route::get('chinhsach', function() {
    return view('chinhsach');
});

Route::get('redirect/{social}', 'LoginController@redirect')->name('redirect');
Route::get('callback/{social}', 'LoginController@callback');
Route::get('verifyPhone','LoginController@verifyPhone');
Route::get('logout', 'Auth\LoginController@logout')->name('logout');
Route::get('test', function() {
});

// Thành viên đăng ký
Route::middleware(['acl'])->namespace('Admin')->prefix('admincp')->name('admin.')->group(function() {
    Route::get('/', 'HomeController@index')->name('home');
    Route::get('list-scan', 'ListScanController@index')->name('listScan');
    Route::get('management-member', 'ManagementMemberController@index')->name('management_member');
    Route::get('how-to-use', 'HowToUseController@index')->name('howtouse');

    // transaction
    Route::get('payment','PaymentController@index')->name('payment');
    Route::post('order','PaymentController@order')->name('order');
    Route::get('transaction','PaymentController@listTransaction')->name('transaction');
    Route::post('delete-transaction','PaymentController@deleteTransaction')->name('delete-transaction');

    // affilate
    Route::get('management-affilate','ManagementAffilateController@index')->name('management_affilate');
    Route::get('getAffilate','ManagementAffilateController@getAffilate');

    Route::get('getListScan', 'ListScanController@getListScan');
    Route::post('switchCall', 'ListScanController@switchCall');
    Route::post('changeData', 'ListScanController@changeData');


    // Doành cho admin Group và Company
    Route::middleware(['role:group_admin|company_admin|superadmin'])->group(function() {
        Route::get('group_member', 'GroupMemberController@index')->name('group_member');
        // Route::get('list-scan/{id}', 'ListScanController@scanUser');

        // API get data group member
        Route::post('group_member', 'GroupMemberController@getData');
    });

    Route::middleware(['role:company_admin|superadmin'])->group(function() {
        Route::get('team_member', 'TeamMemberController@index')->name('team_member');

        // API get data group member
        Route::post('team_member', 'TeamMemberController@getData');
    });
});



// super admin
Route::middleware(['role:superadmin'])->namespace('Superadmin')->prefix('admincp')->name('superadmin.')->group(function() {
    Route::get('list-transaction','TransactionController@index')->name('list-transaction');
    Route::get('get-list-transaction','TransactionController@getList');
    Route::post('acceptTransaction','TransactionController@acceptTransaction');


    // Active user
    Route::get('active', 'ActiveMemberController@index')->name('active');
    Route::post('get_expired_company', 'ActiveMemberController@get_expired_company');
    Route::post('get_group_limit_company', 'ActiveMemberController@get_group_limit_company');
    Route::post('list-active', 'ActiveMemberController@getListUsers');
    Route::post('save-active', 'ActiveMemberController@saveRoles');

    Route::get('getUser','ActiveMemberController@getUser')->name('getUser');
    Route::post('sendEmailAddUser','ActiveMemberController@SendEmailAddUser');

    // Change all users not role to guess
    Route::get('guess-role', 'ActiveMemberController@checkAndSetGuessRole');
});

