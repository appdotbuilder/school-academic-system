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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->enum('type', ['general', 'urgent', 'event', 'academic']);
            $table->enum('target_audience', ['all', 'students', 'teachers', 'parents', 'specific_class']);
            $table->foreignId('target_class_id')->nullable()->constrained('classes')->onDelete('cascade');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->boolean('is_published')->default(false);
            $table->datetime('publish_at')->nullable();
            $table->datetime('expires_at')->nullable();
            $table->timestamps();
            
            $table->index('type');
            $table->index('target_audience');
            $table->index('is_published');
            $table->index('publish_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};