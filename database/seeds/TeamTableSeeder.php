<?php

use Illuminate\Database\Seeder;

class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Team::insert([
            [
                'group_company_id' => 1,
                'admin_team_id'    => 3
            ],
            [
                'group_company_id' => 1,
                'admin_team_id'    => 4
            ]
        ]);
    }
}
