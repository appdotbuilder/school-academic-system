import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Users, ArrowLeft, Mail, Phone, Calendar, CreditCard } from 'lucide-react';

interface Student {
    id: number;
    user: {
        name: string;
        email: string;
        phone?: string;
        date_of_birth?: string;
    };
    student_id: string;
    class?: {
        name: string;
        grade_level: string;
    };
    roll_number?: string;
    admission_date: string;
    guardian_name?: string;
    guardian_phone?: string;
    fee_status: string;
    fee_amount: number;
}

interface PaginatedStudents {
    data: Student[];
    total: number;
    current_page: number;
    last_page: number;
}

interface Props {
    students: PaginatedStudents;
    [key: string]: unknown;
}

export default function StudentsIndex({ students }: Props) {
    const getFeeStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'default';
            case 'pending': return 'secondary';
            case 'overdue': return 'destructive';
            default: return 'outline';
        }
    };

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
                                <Users className="h-8 w-8 text-blue-600" />
                                👨‍🎓 Students Management
                            </h1>
                            <p className="text-muted-foreground">
                                Manage student information, enrollment, and academic records
                            </p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {students.total} Total Students
                    </Badge>
                </div>

                {/* Students Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.data.map((student) => (
                        <Card key={student.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{student.user.name}</CardTitle>
                                        <CardDescription className="text-sm">
                                            ID: {student.student_id}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={getFeeStatusColor(student.fee_status)} className="text-xs">
                                        {student.fee_status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="space-y-3">
                                {/* Class Information */}
                                {student.class && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-medium">Class:</span>
                                        <Badge variant="outline">
                                            {student.class.name} (Grade {student.class.grade_level})
                                        </Badge>
                                    </div>
                                )}

                                {/* Roll Number */}
                                {student.roll_number && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-medium">Roll:</span>
                                        <span>{student.roll_number}</span>
                                    </div>
                                )}

                                {/* Contact Information */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span className="truncate">{student.user.email}</span>
                                    </div>
                                    
                                    {student.user.phone && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{student.user.phone}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Guardian Information */}
                                {student.guardian_name && (
                                    <div className="pt-2 border-t">
                                        <div className="text-xs font-medium text-muted-foreground mb-1">Guardian</div>
                                        <div className="text-sm">{student.guardian_name}</div>
                                        {student.guardian_phone && (
                                            <div className="text-xs text-muted-foreground">{student.guardian_phone}</div>
                                        )}
                                    </div>
                                )}

                                {/* Fee Information */}
                                <div className="pt-2 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1">
                                            <CreditCard className="h-4 w-4" />
                                            Fee Amount:
                                        </span>
                                        <span className="font-semibold">${student.fee_amount}</span>
                                    </div>
                                </div>

                                {/* Admission Date */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>Admitted: {formatDate(student.admission_date)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {students.data.length === 0 && (
                    <Card className="text-center py-16">
                        <CardContent>
                            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Students Found</h3>
                            <p className="text-muted-foreground mb-4">
                                No students are currently enrolled in the system.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination Info */}
                {students.last_page > 1 && (
                    <div className="text-center text-sm text-muted-foreground">
                        Showing page {students.current_page} of {students.last_page} 
                        ({students.total} total students)
                    </div>
                )}
            </div>
        </AppShell>
    );
}