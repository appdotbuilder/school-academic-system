<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Attendance;
use App\Models\Grade;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    /**
     * Display the main academic dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get basic statistics
        $stats = [
            'total_students' => Student::count(),
            'total_teachers' => Teacher::count(),
            'total_classes' => SchoolClass::count(),
            'total_subjects' => Subject::count(),
        ];
        
        // Get recent announcements
        $announcements = Announcement::where('is_published', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->latest()
            ->take(5)
            ->with('createdBy')
            ->get();
        
        // Get today's attendance summary if user is teacher or admin
        $attendanceToday = null;
        if ($user && ($user->isTeacher() || $user->isAdmin())) {
            $attendanceToday = Attendance::whereDate('date', today())
                ->selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status');
        }
        
        // Role-specific data
        $roleData = [];
        if ($user) {
            if ($user->isStudent()) {
                $student = $user->student;
                if ($student) {
                    $roleData = [
                        'recent_grades' => $student->grades()
                            ->with(['subject', 'teacher.user'])
                            ->latest()
                            ->take(5)
                            ->get(),
                        'attendance_percentage' => $this->calculateAttendancePercentage($student),
                        'class' => $student->class,
                    ];
                }
            } elseif ($user->isTeacher()) {
                $teacher = $user->teacher;
                if ($teacher) {
                    $roleData = [
                        'classes' => $teacher->classes()->with('students')->get(),
                        'recent_grades' => $teacher->grades()
                            ->with(['student.user', 'subject'])
                            ->latest()
                            ->take(5)
                            ->get(),
                    ];
                }
            }
        }
        
        return Inertia::render('academic-dashboard', [
            'stats' => $stats,
            'announcements' => $announcements,
            'attendanceToday' => $attendanceToday,
            'roleData' => $roleData,
            'user' => $user ? $user->load('role') : null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('academic/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Handle different types of academic data creation
        $type = $request->input('type', 'student');
        
        switch ($type) {
            case 'student':
                return $this->handleStudentsList();
            case 'teacher':
                return $this->handleTeachersList();
            case 'class':
                return $this->handleClassesList();
            case 'subject':
                return $this->handleSubjectsList();
            case 'grade':
                return $this->handleGradesList();
            case 'attendance':
                return $this->handleAttendanceList();
            case 'announcement':
                return $this->handleAnnouncementsList();
            default:
                return $this->index();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Handle showing specific academic resource
        return $this->index();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Inertia::render('academic/edit', ['id' => $id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return redirect()->route('academic.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return redirect()->route('academic.index');
    }

    /**
     * Handle students list display.
     */
    protected function handleStudentsList()
    {
        $students = Student::with(['user', 'class'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('students/index', [
            'students' => $students
        ]);
    }

    /**
     * Handle teachers list display.
     */
    protected function handleTeachersList()
    {
        $teachers = Teacher::with(['user'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('teachers/index', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Handle classes list display.
     */
    protected function handleClassesList()
    {
        $classes = SchoolClass::with(['classTeacher', 'students'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('classes/index', [
            'classes' => $classes
        ]);
    }

    /**
     * Handle subjects list display.
     */
    protected function handleSubjectsList()
    {
        $subjects = Subject::latest()->paginate(20);
        
        return Inertia::render('subjects/index', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Handle grades management display.
     */
    protected function handleGradesList()
    {
        $grades = Grade::with(['student.user', 'subject', 'teacher.user'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('grades/index', [
            'grades' => $grades
        ]);
    }

    /**
     * Handle attendance management display.
     */
    protected function handleAttendanceList()
    {
        $attendances = Attendance::with(['student.user', 'class', 'markedBy'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('attendance/index', [
            'attendances' => $attendances
        ]);
    }

    /**
     * Handle announcements list display.
     */
    protected function handleAnnouncementsList()
    {
        $announcements = Announcement::with(['createdBy', 'targetClass'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('announcements/index', [
            'announcements' => $announcements
        ]);
    }

    /**
     * Calculate attendance percentage for a student.
     */
    protected function calculateAttendancePercentage(Student $student): float
    {
        $totalDays = $student->attendances()
            ->whereDate('date', '>=', now()->subDays(30))
            ->count();
        
        if ($totalDays === 0) {
            return 0;
        }
        
        $presentDays = $student->attendances()
            ->whereDate('date', '>=', now()->subDays(30))
            ->where('status', 'present')
            ->count();
        
        return round(($presentDays / $totalDays) * 100, 2);
    }
}