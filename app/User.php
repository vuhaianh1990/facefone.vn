<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Auth;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'uid', 'avatar', 'location', 'work', 'gender',
        'token', 'loginip', 'authcode', 'lastlogindate', 'credit', 'profit',
        'packtype', 'status', 'utm_source', 'utm_medium', 'utm_campaign',
        'utm_term', 'seller', 'expired','parent_id', 'group_company_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function group_companys()
    {
        return $this->belongsTo('App\GroupCompany', 'group_company_id');
    }

    public function teams()
    {
        return $this->belongsTo('App\Team', 'team_id');
    }

    public function admin_team()
    {
        return $this->hasMany('App\Team');
    }
}
