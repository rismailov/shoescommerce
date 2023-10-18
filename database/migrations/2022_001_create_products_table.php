<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nanoid')->unique();
            $table->string('name');
            $table->string('slug');
            $table->string('gender');
            $table->unsignedInteger('price');
            $table->boolean('is_discounted')->default(false);
            $table->tinyInteger('discount_percent')->nullable();
            $table->unsignedInteger('discount_price')->nullable();
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
        Schema::dropIfExists('products');
    }
};
