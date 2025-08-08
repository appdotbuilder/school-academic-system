import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { GraduationCap, ArrowLeft, Mail, Phone, Calendar, BookOpen, Award } from 'lucide-react';

interface Teacher {
    id: number;
    user: {
        name: string;
        email: string;
        phone?: string;
    };
    employee_id: string;
    qualification: string;
    department?: string;
    joining_date: string;
    experience_years: number;
    specialization?: string;
}

interface PaginatedTeachers {
    data: Teacher[];
    total: number;
    current_page: number;
    last_page: number;
}

interface Props {
    teachers: PaginatedTeachers;
    [key: string]: unknown;
}

export default function TeachersIndex({ teachers }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get(route('academic.index'))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-3">
                                <GraduationCap className="h-8 w-8 text-green-600" />
                                👨‍🏫 Teachers Management
                            </h1>
                            <p className="text-muted-foreground">
                                Manage faculty information, qualifications, and teaching assignments
                            </p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {teachers.total} Total Teachers
                    </Badge>
                </div>

                {/* Teachers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teachers.data.map((teacher) => (
                        <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{teacher.user.name}</CardTitle>
                                        <CardDescription className="text-sm">
                                            ID: {teacher.employee_id}
                                        </CardDescription>
                                    </div>
                                    {teacher.department && (
                                        <Badge variant="outline" className="text-xs">
                                            {teacher.department}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            
                            <CardContent className="space-y-3">
                                {/* Qualification */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Award className="h-4 w-4 text-blue-600" />
                                    <span className="font-medium">Qualification:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">
                                    {teacher.qualification}
                                </p>

                                {/* Specialization */}
                                {teacher.specialization && (
                                    <div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <BookOpen className="h-4 w-4 text-green-600" />
                                            <span className="font-medium">Specialization:</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground pl-6">
                                            {teacher.specialization}
                                        </p>
                                    </div>
                                )}

                                {/* Experience */}
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">Experience:</span>
                                    <Badge variant="secondary">
                                        {teacher.experience_years} years
                                    </Badge>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-2 text-sm pt-2 border-t">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span className="truncate">{teacher.user.email}</span>
                                    </div>
                                    
                                    {teacher.user.phone && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{teacher.user.phone}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Joining Date */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                                    <Calendar className="h-3 w-3" />
                                    <span>Joined: {formatDate(teacher.joining_date)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {teachers.data.length === 0 && (
                    <Card className="text-center py-16">
                        <CardContent>
                            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Teachers Found</h3>
                            <p className="text-muted-foreground mb-4">
                                No teachers are currently registered in the system.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination Info */}
                {teachers.last_page > 1 && (
                    <div className="text-center text-sm text-muted-foreground">
                        Showing page {teachers.current_page} of {teachers.last_page} 
                        ({teachers.total} total teachers)
                    </div>
                )}
            </div>
        </AppShell>
    );
}