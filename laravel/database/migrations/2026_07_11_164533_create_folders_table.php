<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('folders', function (Blueprint $table) {
            $table->id();
            $table->string("name",255);
            $table->integer("owner_id")->nullable();
            $table->foreignId("folder_id")->nullable()->constrained('folders')->onDelete("cascade");
            $table->timestamps();

            $table->unique(["name","folder_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('folders');
        Schema::enableForeignKeyConstraints();
    }
};
