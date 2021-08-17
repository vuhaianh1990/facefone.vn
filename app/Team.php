<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function group_companys()
    {
        return $this->belongsTo('App\GroupCompany', 'group_company_id');
    }

    public function admin_team()
    {
        return $this->hasOne('App\User', 'id', 'admin_team_id')->select('id', 'name', 'email', 'phone');
    }

}
