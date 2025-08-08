<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Academic system routes (publicly accessible for demo)
Route::prefix('academic')->name('academic.')->group(function () {
    Route::get('/', [App\Http\Controllers\AcademicController::class, 'index'])->name('index');
    Route::post('/', [App\Http\Controllers\AcademicController::class, 'store'])->name('store');
    Route::get('/create', [App\Http\Controllers\AcademicController::class, 'create'])->name('create');
    Route::get('/{id}', [App\Http\Controllers\AcademicController::class, 'show'])->name('show');
    Route::get('/{id}/edit', [App\Http\Controllers\AcademicController::class, 'edit'])->name('edit');
    Route::patch('/{id}', [App\Http\Controllers\AcademicController::class, 'update'])->name('update');
    Route::delete('/{id}', [App\Http\Controllers\AcademicController::class, 'destroy'])->name('destroy');
    
    // Named routes for different views (using store with type parameter)
    Route::get('/students', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'student'])); 
    })->name('students');
    Route::get('/teachers', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'teacher'])); 
    })->name('teachers');
    Route::get('/classes', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'class'])); 
    })->name('classes');
    Route::get('/subjects', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'subject'])); 
    })->name('subjects');
    Route::get('/grades', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'grade'])); 
    })->name('grades');
    Route::get('/attendance', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'attendance'])); 
    })->name('attendance');
    Route::get('/announcements', function() { 
        return app(App\Http\Controllers\AcademicController::class)->store(request()->merge(['type' => 'announcement'])); 
    })->name('announcements');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
