<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property int $user_id
 * @property string $student_id
 * @property int|null $class_id
 * @property string|null $roll_number
 * @property \Illuminate\Support\Carbon $admission_date
 * @property string|null $guardian_name
 * @property string|null $guardian_phone
 * @property string|null $guardian_email
 * @property string|null $emergency_contact
 * @property string|null $medical_info
 * @property float $fee_amount
 * @property string $fee_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\SchoolClass|null $class
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Grade> $grades
 * @property-read int|null $grades_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Attendance> $attendances
 * @property-read int|null $attendances_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereAdmissionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereEmergencyContact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereFeeAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereFeeStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGuardianEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGuardianName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGuardianPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereMedicalInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereRollNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUserId($value)

 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'student_id',
        'class_id',
        'roll_number',
        'admission_date',
        'guardian_name',
        'guardian_phone',
        'guardian_email',
        'emergency_contact',
        'medical_info',
        'fee_amount',
        'fee_status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'admission_date' => 'date',
        'fee_amount' => 'decimal:2',
    ];

    /**
     * Get the user that owns the student.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the class that owns the student.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the grades for this student.
     */
    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    /**
     * Get the attendances for this student.
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}