<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_user', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id');
            $table->integer('data_id');
            $table->string('name', '100')->nullable();
            $table->string('avatar')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('email')->nullable();
            $table->tinyInteger('gender')->nullable();
            $table->string('location')->nullable();
            $table->string('work')->nullable();
            $table->text('note')->nullable();
            $table->tinyInteger('called')->default(0);
            $table->tinyInteger('wrong_phone')->default(0);
            $table->string('source')->nullable();
            $table->string('link')->nullable();
            $table->tinyInteger('cotter')->default(0);
            $table->text('health_care')->nullable();
            $table->timestamp('date_health_care')->nullable();

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
        Schema::dropIfExists('data_user');
    }
}
