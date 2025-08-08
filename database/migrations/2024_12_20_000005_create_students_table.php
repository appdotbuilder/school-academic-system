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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('student_id')->unique(); // STU-2024-001
            $table->foreignId('class_id')->nullable()->constrained('classes')->onDelete('set null');
            $table->string('roll_number')->nullable();
            $table->date('admission_date');
            $table->string('guardian_name')->nullable();
            $table->string('guardian_phone')->nullable();
            $table->string('guardian_email')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->text('medical_info')->nullable();
            $table->decimal('fee_amount', 10, 2)->default(0);
            $table->enum('fee_status', ['paid', 'pending', 'overdue'])->default('pending');
            $table->timestamps();
            
            $table->index('student_id');
            $table->index('class_id');
            $table->index('roll_number');
            $table->index('fee_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};