<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_companies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('group_name')->nullable()->comment('Tên tổ chức');
            $table->integer('group_limit')->default(0)->comment('Giới hạn thành viên nhóm group (Chỉ dành cho role: group)');
            $table->string('admin_group_id')->default(0)->comment('ID nhóm group hoặc công ty (Phân nhóm trong tổ chức theo id)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_companies');
    }
}
