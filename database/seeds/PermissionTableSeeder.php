<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::insert([
            [
                'guard_name' => 'web',
                'name' => 'scan'],
            [
                'guard_name' => 'web',
                'name' => 'read member'],
            [
                'guard_name' => 'web',
                'name' => 'add member'],
            [
                'guard_name' => 'web',
                'name' => 'edit member'],
            [
                'guard_name' => 'web',
                'name' => 'delete member']
        ]);
    }
}
