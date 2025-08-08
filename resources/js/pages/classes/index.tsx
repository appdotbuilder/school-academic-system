import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { BookOpen, ArrowLeft, Users, User, MapPin } from 'lucide-react';

interface SchoolClass {
    id: number;
    name: string;
    grade_level: string;
    section?: string;
    capacity: number;
    room_number?: string;
    description?: string;
    status: string;
    class_teacher?: {
        name: string;
        email: string;
    };
    students_count: number;
}

interface PaginatedClasses {
    data: SchoolClass[];
    total: number;
    current_page: number;
    last_page: number;
}

interface Props {
    classes: PaginatedClasses;
    [key: string]: unknown;
}

export default function ClassesIndex({ classes }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'default';
            case 'inactive': return 'secondary';
            default: return 'outline';
        }
    };

    const getCapacityColor = (current: number, total: number) => {
        const percentage = (current / total) * 100;
        if (percentage >= 90) return 'destructive';
        if (percentage >= 75) return 'secondary';
        return 'default';
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
                                <BookOpen className="h-8 w-8 text-purple-600" />
                                🏫 Classes Management
                            </h1>
                            <p className="text-muted-foreground">
                                Manage class sections, room assignments, and capacity
                            </p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {classes.total} Total Classes
                    </Badge>
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.data.map((schoolClass) => (
                        <Card key={schoolClass.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{schoolClass.name}</CardTitle>
                                        <CardDescription className="text-sm">
                                            Grade {schoolClass.grade_level}
                                            {schoolClass.section && ` - Section ${schoolClass.section}`}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={getStatusColor(schoolClass.status)} className="text-xs">
                                        {schoolClass.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
                                {/* Room Information */}
                                {schoolClass.room_number && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">Room:</span>
                                        <span>{schoolClass.room_number}</span>
                                    </div>
                                )}

                                {/* Class Teacher */}
                                {schoolClass.class_teacher && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <User className="h-4 w-4 text-green-600 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Class Teacher:</div>
                                            <div className="text-muted-foreground">
                                                {schoolClass.class_teacher.name}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Student Capacity */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-purple-600" />
                                            <span className="font-medium">Students:</span>
                                        </div>
                                        <Badge variant={getCapacityColor(schoolClass.students_count, schoolClass.capacity)}>
                                            {schoolClass.students_count} / {schoolClass.capacity}
                                        </Badge>
                                    </div>
                                    
                                    {/* Capacity Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all ${
                                                (schoolClass.students_count / schoolClass.capacity) * 100 >= 90 
                                                    ? 'bg-red-500' 
                                                    : (schoolClass.students_count / schoolClass.capacity) * 100 >= 75 
                                                    ? 'bg-yellow-500' 
                                                    : 'bg-green-500'
                                            }`}
                                            style={{ 
                                                width: `${Math.min((schoolClass.students_count / schoolClass.capacity) * 100, 100)}%` 
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                {schoolClass.description && (
                                    <div className="pt-2 border-t">
                                        <p className="text-sm text-muted-foreground">
                                            {schoolClass.description}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="pt-2 border-t">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            View Details
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            Manage Students
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {classes.data.length === 0 && (
                    <Card className="text-center py-16">
                        <CardContent>
                            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Classes Found</h3>
                            <p className="text-muted-foreground mb-4">
                                No classes are currently configured in the system.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination Info */}
                {classes.last_page > 1 && (
                    <div className="text-center text-sm text-muted-foreground">
                        Showing page {classes.current_page} of {classes.last_page} 
                        ({classes.total} total classes)
                    </div>
                )}
            </div>
        </AppShell>
    );
}