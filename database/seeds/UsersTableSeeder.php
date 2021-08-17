<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::create(
            [
                'id'                => 1,
                'group_company_id'  => 1,
                'team_id'           => 1,
                'name'              => 'Mai Ngọc',
                'email'             => 'starxpin@gmail.com',
                'password'          => '$2y$10$7Mu9FrVGzo6yrl0ykpAXqOtsjm7D2vnFafHjSKHmlGVmTzEGeEB1O',
                'phone'             => '+84903051557',
                'uid'               => '532744650515972',
                'avatar'            => 'https://graph.facebook.com/v3.0/532744650515972/picture?type=normal',
                'location'          => NULL,
                'work'              => NULL,
                'gender'            => 1,
                'token'             => 'EAAH5D8gsi7QBAAAwtSxXIGPhziOtXv9jNWV1ZAStOzTdcynWhQcUlZB1GqOZCZAC9zoEi7uPhQwCXQlk4VD75VeOBpGZBmbNeT2qDnZCGsY2ZCrJcLlGFOOnZCCqK8Gvexrixs6vEnjZApFZBugD7GqsZBSHTxVB8dEzinBvbJr23FdQAZDZD',
                'loginip'           => NULL,
                'authcode'          => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHBzOi8vZmFjZWZvbmUuYXp2aWRpLmNvbS9hcGkvbG9naW5GYiIsImlhdCI6MTUzNDA5MTM3NSwiZXhwIjoxNTM0MDkxNDM1LCJuYmYiOjE1MzQwOTEzNzUsImp0aSI6ImpTOW1EbU5xZzBGRnRjaGsifQ.tlZZtIXjc-yKwCwXegV3hd-dWaet0f82wJHzUvp34zw',
                'lastlogindate'     => '2019-03-16 12:47:09',
                'credit'            => 20,
                'profit'            => 5,
                'packtype'          => NULL,
                'status'            => 0,
                'utm_source'        => NULL,
                'utm_medium'        => NULL,
                'utm_campaign'      => NULL,
                'utm_term'          => NULL,
                'seller'            => NULL,
                'parent_id'         => NULL,
                'remember_token'    => 'NdRHlqPgGdbipbsL5xgpGCaB9dduxKqt37232zVYul3PEJo2YmPKVIjtRJI1',
                'expired'           => '2018-07-30 23:35:28',
                'call'              => 0,
                'ghichu'            => NULL,
                'created_at'        => '2018-08-15 06:22:20',
                'updated_at'        => '2018-08-15 06:22:20'
            ]
        );
        $user->assignRole('superadmin');

        $user = \App\User::create([
                'id'                => 2,
                'group_company_id'  => 0,
                'team_id'           => 0,
                'name'              => 'Mai Ngọc 2',
                'email'             => 'starxpin1@gmail.com',
                'password'          => '$2y$10$7Mu9FrVGzo6yrl0ykpAXqOtsjm7D2vnFafHjSKHmlGVmTzEGeEB1O',
                'phone'             => '+84903051554',
                'uid'               => '532744650515973',
                'avatar'            => 'https://graph.facebook.com/v3.0/532744650515972/picture?type=normal',
                'location'          => NULL,
                'work'              => NULL,
                'gender'            => 1,
                'token'             => 'EAAH5D8gsi7QBAAAwtSxXIGPhziOtXv9jNWV1ZAStOzTdcynWhQcUlZB1GqOZCZAC9zoEi7uPhQwCXQlk4VD75VeOBpGZBmbNeT2qDnZCGsY2ZCrJcLlGFOOnZCCqK8Gvexrixs6vEnjZApFZBugD7GqsZBSHTxVB8dEzinBvbJr23FdQAZDZD',
                'loginip'           => NULL,
                'authcode'          => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHBzOi8vZmFjZWZvbmUuYXp2aWRpLmNvbS9hcGkvbG9naW5GYiIsImlhdCI6MTUzNDA5MTM3NSwiZXhwIjoxNTM0MDkxNDM1LCJuYmYiOjE1MzQwOTEzNzUsImp0aSI6ImpTOW1EbU5xZzBGRnRjaGsifQ.tlZZtIXjc-yKwCwXegV3hd-dWaet0f82wJHzUvp34zw',
                'lastlogindate'     => '2019-03-16 12:47:09',
                'credit'            => 20,
                'profit'            => 5,
                'packtype'          => NULL,
                'status'            => 0,
                'utm_source'        => NULL,
                'utm_medium'        => NULL,
                'utm_campaign'      => NULL,
                'utm_term'          => NULL,
                'seller'            => NULL,
                'parent_id'         => NULL,
                'remember_token'    => 'NdRHlqPgGdbipbsL5xgpGCaB9dduxKqt37232zVYul3PEJo2YmPKVIjtRJI1',
                'expired'           => '2018-07-30 23:35:28',
                'call'              => 0,
                'ghichu'            => NULL,
                'created_at'        => '2018-08-15 06:22:20',
                'updated_at'        => '2018-08-15 06:22:20'
            ]);

        $user->assignRole('guess');

        $user = \App\User::create([
            'id'                => 3,
            'group_company_id'  => 1,
            'team_id'           => 1,
            'name'              => 'Mai Ngọc 3',
            'email'             => 'starxpin3@gmail.com',
            'password'          => '$2y$10$7Mu9FrVGzo6yrl0ykpAXqOtsjm7D2vnFafHjSKHmlGVmTzEGeEB1O',
            'phone'             => '+84903053554',
            'uid'               => '532744650515973',
            'avatar'            => 'https://graph.facebook.com/v3.0/532744650515972/picture?type=normal',
            'location'          => NULL,
            'work'              => NULL,
            'gender'            => 1,
            'token'             => 'EAAH5D8gsi7QBAAAwtSxXIGPhziOtXv9jNWV1ZAStOzTdcynWhQcUlZB1GqOZCZAC9zoEi7uPhQwCXQlk4VD75VeOBpGZBmbNeT2qDnZCGsY2ZCrJcLlGFOOnZCCqK8Gvexrixs6vEnjZApFZBugD7GqsZBSHTxVB8dEzinBvbJr23FdQAZDZD',
            'loginip'           => NULL,
            'authcode'          => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHBzOi8vZmFjZWZvbmUuYXp2aWRpLmNvbS9hcGkvbG9naW5GYiIsImlhdCI6MTUzNDA5MTM3NSwiZXhwIjoxNTM0MDkxNDM1LCJuYmYiOjE1MzQwOTEzNzUsImp0aSI6ImpTOW1EbU5xZzBGRnRjaGsifQ.tlZZtIXjc-yKwCwXegV3hd-dWaet0f82wJHzUvp34zw',
            'lastlogindate'     => '2019-03-16 12:47:09',
            'credit'            => 20,
            'profit'            => 5,
            'packtype'          => NULL,
            'status'            => 0,
            'utm_source'        => NULL,
            'utm_medium'        => NULL,
            'utm_campaign'      => NULL,
            'utm_term'          => NULL,
            'seller'            => NULL,
            'parent_id'         => NULL,
            'remember_token'    => 'NdRHlqPgGdbipbsL5xgpGCaB9dduxKqt37232zVYul3PEJo2YmPKVIjtRJI1',
            'expired'           => '2018-07-30 23:35:28',
            'call'              => 0,
            'ghichu'            => NULL,
            'created_at'        => '2018-08-15 06:22:20',
            'updated_at'        => '2018-08-15 06:22:20'
        ]);
        $user->assignRole('company_admin');

        $user = \App\User::create([
            'id'                => 4,
            'group_company_id'  => 1,
            'team_id'           => 2,
            'name'              => 'Mai Ngọc 4',
            'email'             => 'starxpin4@gmail.com',
            'password'          => '$2y$10$7Mu9FrVGzo6yrl0ykpAXqOtsjm7D2vnFafHjSKHmlGVmTzEGeEB1O',
            'phone'             => '+84903053554',
            'uid'               => '532744650515973',
            'avatar'            => 'https://graph.facebook.com/v3.0/532744650515972/picture?type=normal',
            'location'          => NULL,
            'work'              => NULL,
            'gender'            => 1,
            'token'             => 'EAAH5D8gsi7QBAAAwtSxXIGPhziOtXv9jNWV1ZAStOzTdcynWhQcUlZB1GqOZCZAC9zoEi7uPhQwCXQlk4VD75VeOBpGZBmbNeT2qDnZCGsY2ZCrJcLlGFOOnZCCqK8Gvexrixs6vEnjZApFZBugD7GqsZBSHTxVB8dEzinBvbJr23FdQAZDZD',
            'loginip'           => NULL,
            'authcode'          => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHBzOi8vZmFjZWZvbmUuYXp2aWRpLmNvbS9hcGkvbG9naW5GYiIsImlhdCI6MTUzNDA5MTM3NSwiZXhwIjoxNTM0MDkxNDM1LCJuYmYiOjE1MzQwOTEzNzUsImp0aSI6ImpTOW1EbU5xZzBGRnRjaGsifQ.tlZZtIXjc-yKwCwXegV3hd-dWaet0f82wJHzUvp34zw',
            'lastlogindate'     => '2019-03-16 12:47:09',
            'credit'            => 20,
            'profit'            => 5,
            'packtype'          => NULL,
            'status'            => 0,
            'utm_source'        => NULL,
            'utm_medium'        => NULL,
            'utm_campaign'      => NULL,
            'utm_term'          => NULL,
            'seller'            => NULL,
            'parent_id'         => NULL,
            'remember_token'    => 'NdRHlqPgGdbipbsL5xgpGCaB9dduxKqt37232zVYul3PEJo2YmPKVIjtRJI1',
            'expired'           => '2018-07-30 23:35:28',
            'call'              => 0,
            'ghichu'            => NULL,
            'created_at'        => '2018-08-15 06:22:20',
            'updated_at'        => '2018-08-15 06:22:20'
        ]);
        $user->assignRole('group_admin');
    }
}
