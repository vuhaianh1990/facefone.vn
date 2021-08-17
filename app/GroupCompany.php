<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupCompany extends Model
{

    protected $fillable = [
        'group_name',
        'group_limit',
        'admin_group_id',
    ];

    public function users()
    {
        return $this->hasMany('App\User');
    }
}
