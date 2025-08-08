<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'name' => 'Mathematics',
                'code' => 'MATH-001',
                'description' => 'Basic mathematics including arithmetic, algebra, and geometry',
                'total_marks' => 100,
                'pass_marks' => 40,
                'category' => 'Core',
            ],
            [
                'name' => 'English Language',
                'code' => 'ENG-001',
                'description' => 'English grammar, literature, and communication skills',
                'total_marks' => 100,
                'pass_marks' => 40,
                'category' => 'Core',
            ],
            [
                'name' => 'Science',
                'code' => 'SCI-001',
                'description' => 'General science covering physics, chemistry, and biology basics',
                'total_marks' => 100,
                'pass_marks' => 40,
                'category' => 'Core',
            ],
            [
                'name' => 'Social Studies',
                'code' => 'SS-001',
                'description' => 'History, geography, and civic education',
                'total_marks' => 100,
                'pass_marks' => 40,
                'category' => 'Core',
            ],
            [
                'name' => 'Physical Education',
                'code' => 'PE-001',
                'description' => 'Physical fitness, sports, and health education',
                'total_marks' => 50,
                'pass_marks' => 25,
                'category' => 'Extra',
            ],
            [
                'name' => 'Art & Craft',
                'code' => 'ART-001',
                'description' => 'Creative arts, drawing, and handicrafts',
                'total_marks' => 50,
                'pass_marks' => 25,
                'category' => 'Elective',
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::firstOrCreate(
                ['code' => $subject['code']],
                $subject
            );
        }
    }
}