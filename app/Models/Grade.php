<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Grade
 *
 * @property int $id
 * @property int $student_id
 * @property int $subject_id
 * @property int $teacher_id
 * @property string $exam_type
 * @property float $marks_obtained
 * @property float $total_marks
 * @property string|null $grade_letter
 * @property float|null $gpa
 * @property string|null $remarks
 * @property \Illuminate\Support\Carbon $exam_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * @property-read \App\Models\Subject $subject
 * @property-read \App\Models\Teacher $teacher
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade query()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereExamDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereExamType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGpa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGradeLetter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereMarksObtained($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereTotalMarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class Grade extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'subject_id',
        'teacher_id',
        'exam_type',
        'marks_obtained',
        'total_marks',
        'grade_letter',
        'gpa',
        'remarks',
        'exam_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'marks_obtained' => 'decimal:2',
        'total_marks' => 'decimal:2',
        'gpa' => 'decimal:2',
        'exam_date' => 'date',
    ];

    /**
     * Get the student that owns the grade.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the subject that owns the grade.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the teacher that assigned the grade.
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * Calculate percentage for this grade.
     */
    public function getPercentageAttribute(): float
    {
        if ((float) $this->total_marks === 0.0) {
            return 0.0;
        }
        
        return round(($this->marks_obtained / $this->total_marks) * 100, 2);
    }
}