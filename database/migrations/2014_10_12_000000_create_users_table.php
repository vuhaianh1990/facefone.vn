<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('group_company_id')->default(0);
            $table->integer('team_id')->default(0);
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('phone', '15')->nullable();
            $table->string('uid', '32')->nullable();
            $table->text('avatar')->nullable();
            $table->string('location')->nullable();
            $table->string('work')->nullable();
            $table->boolean('gender')->default(1);
            $table->text('token')->nullable();
            $table->string('loginip')->nullable();
            $table->text('authcode')->nullable();
            $table->dateTime('lastlogindate')->nullable();
            $table->integer('credit')->default(50);
            $table->integer('profit')->default(0);
            $table->integer('packtype')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->string('utm_source', '32')->nullable();
            $table->string('utm_medium', '32')->nullable();
            $table->string('utm_campaign', '32')->nullable();
            $table->string('utm_term', '32')->nullable();
            $table->integer('seller')->nullable();
            $table->integer('parent_id')->nullable();
            $table->timestamp('expired')->nullable();
            $table->tinyInteger('call')->default(0);
            $table->text('ghichu')->nullable();

            $table->rememberToken()->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
