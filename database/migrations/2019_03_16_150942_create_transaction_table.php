<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->char('id', 11);
            $table->integer('user_id');
            $table->integer('payment_id');
            $table->char('price', '32');
            $table->string('affiliate', '32')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->useCurrent();

            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction');
    }
}
