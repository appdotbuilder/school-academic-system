<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            SubjectSeeder::class,
        ]);

        // Create admin user
        $adminRole = \App\Models\Role::where('name', 'school_admin')->first();
        if ($adminRole) {
            \App\Models\User::factory()->create([
                'name' => 'School Admin',
                'email' => 'admin@school.com',
                'role_id' => $adminRole->id,
                'status' => 'active',
            ]);
        }

        // Create sample teacher
        $teacherRole = \App\Models\Role::where('name', 'teacher')->first();
        if ($teacherRole) {
            $teacher = \App\Models\User::factory()->create([
                'name' => 'John Smith',
                'email' => 'teacher@school.com',
                'role_id' => $teacherRole->id,
                'status' => 'active',
            ]);

            \App\Models\Teacher::create([
                'user_id' => $teacher->id,
                'employee_id' => 'EMP-2024-001',
                'qualification' => 'Bachelor of Education',
                'department' => 'Primary',
                'joining_date' => '2024-01-01',
                'salary' => 50000.00,
                'specialization' => 'Mathematics and Science',
                'experience_years' => 5,
            ]);
        }

        // Create sample student
        $studentRole = \App\Models\Role::where('name', 'student')->first();
        if ($studentRole) {
            $student = \App\Models\User::factory()->create([
                'name' => 'Alice Johnson',
                'email' => 'student@school.com',
                'role_id' => $studentRole->id,
                'status' => 'active',
                'date_of_birth' => '2010-05-15',
            ]);

            // Create a sample class
            $class = \App\Models\SchoolClass::create([
                'name' => 'Grade 5A',
                'grade_level' => '5',
                'section' => 'A',
                'class_teacher_id' => $teacher->id ?? null,
                'capacity' => 30,
                'room_number' => '101',
                'description' => 'Primary grade 5 section A',
                'status' => 'active',
            ]);

            \App\Models\Student::create([
                'user_id' => $student->id,
                'student_id' => 'STU-2024-001',
                'class_id' => $class->id,
                'roll_number' => '001',
                'admission_date' => '2024-01-01',
                'guardian_name' => 'Robert Johnson',
                'guardian_phone' => '+1234567890',
                'guardian_email' => 'parent@email.com',
                'emergency_contact' => '+1234567891',
                'fee_amount' => 5000.00,
                'fee_status' => 'paid',
            ]);
        }

        // Create sample announcement
        if ($adminRole) {
            $admin = \App\Models\User::where('role_id', $adminRole->id)->first();
            if ($admin) {
                \App\Models\Announcement::create([
                    'title' => 'Welcome to New Academic Year',
                    'content' => 'We are excited to welcome all students and parents to the new academic year. Please check your schedules and be prepared for an amazing learning experience.',
                    'type' => 'general',
                    'target_audience' => 'all',
                    'created_by' => $admin->id,
                    'is_published' => true,
                    'publish_at' => now(),
                ]);
            }
        }
    }
}
