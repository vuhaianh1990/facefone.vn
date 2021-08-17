<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolesTableSeeder::class,
            PermissionTableSeeder::class,
            RolePermissionTableSeeder::class,
            UsersTableSeeder::class,
            // DataUserTableSeeder::class,
            // PaymentTableSeeder::class,
            // TransactionTableSeeder::class,
            GroupTableSeeder::class,
            TeamTableSeeder::class,
        ]);
    }
}
