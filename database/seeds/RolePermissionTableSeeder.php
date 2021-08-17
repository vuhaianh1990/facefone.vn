<?php

use Illuminate\Database\Seeder;

class RolePermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role_has_permissions')->insert([
            // Guess
            [
                'permission_id' => 1,
                'role_id'       => 1,
            ],

            // Member
            [
                'permission_id' => 1,
                'role_id'       => 2,
            ],

            // Group Admin
            [
                'permission_id' => 1,
                'role_id'       => 3,
            ],
            [
                'permission_id' => 2,
                'role_id'       => 3,
            ],
            [
                'permission_id' => 3,
                'role_id'       => 3,
            ],
            [
                'permission_id' => 4,
                'role_id'       => 3,
            ],
            [
                'permission_id' => 5,
                'role_id'       => 3,
            ],

            // Group member
            [
                'permission_id' => 1,
                'role_id'       => 4,
            ],

            // Company admin
            [
                'permission_id' => 1,
                'role_id'       => 5,
            ],
            [
                'permission_id' => 2,
                'role_id'       => 5,
            ],
            [
                'permission_id' => 3,
                'role_id'       => 5,
            ],
            [
                'permission_id' => 4,
                'role_id'       => 5,
            ],
            [
                'permission_id' => 5,
                'role_id'       => 5,
            ],

            // Company member
            [
                'permission_id' => 1,
                'role_id'       => 6,
            ],

            // Admin
            [
                'permission_id' => 1,
                'role_id'       => 7,
            ],
            [
                'permission_id' => 2,
                'role_id'       => 7,
            ],
            [
                'permission_id' => 3,
                'role_id'       => 7,
            ],
            [
                'permission_id' => 4,
                'role_id'       => 7,
            ],
            [
                'permission_id' => 5,
                'role_id'       => 7,
            ],

            // SuperAdmin
            [
                'permission_id' => 1,
                'role_id'       => 8,
            ],
            [
                'permission_id' => 2,
                'role_id'       => 8,
            ],
            [
                'permission_id' => 3,
                'role_id'       => 8,
            ],
            [
                'permission_id' => 4,
                'role_id'       => 8,
            ],
            [
                'permission_id' => 5,
                'role_id'       => 8,
            ]
        ]);
    }
}
