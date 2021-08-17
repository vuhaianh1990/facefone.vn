<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::insert([
            [
                'guard_name' => 'web',
                'name' => 'guess'],
            [
                'guard_name' => 'web',
                'name' => 'member'],
            [
                'guard_name' => 'web',
                'name' => 'group_admin'],
            [
                'guard_name' => 'web',
                'name' => 'group_member'],
            [
                'guard_name' => 'web',
                'name' => 'company_admin'],
            [
                'guard_name' => 'web',
                'name' => 'company_member'],
            [
                'guard_name' => 'web',
                'name' => 'admin'],
            [
                'guard_name' => 'web',
                'name' => 'superadmin']
        ]);
    }
}
