<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'school_admin',
                'display_name' => 'School Administrator',
                'description' => 'Full access to all school management features',
            ],
            [
                'name' => 'teacher',
                'display_name' => 'Teacher',
                'description' => 'Access to grade management, attendance, and class-related features',
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Access to personal grades, attendance, and announcements',
            ],
            [
                'name' => 'parent',
                'display_name' => 'Parent',
                'description' => 'Access to child\'s academic information and school communication',
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name']],
                $role
            );
        }
    }
}