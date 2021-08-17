<?php

use Illuminate\Database\Seeder;

class GroupTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $group_company = \App\GroupCompany::create([
        'group_name'    => 'Công ty TNHH 1 Thành viên Hồng Hà',
        'admin_group_id' => '1'
      ]);
    }
}
