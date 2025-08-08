import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { 
    Users, 
    UserCheck, 
    BookOpen, 
    GraduationCap,
    ClipboardList,
    Megaphone,
    TrendingUp,
    Award,
    Clock
} from 'lucide-react';

interface Stats {
    total_students: number;
    total_teachers: number;
    total_classes: number;
    total_subjects: number;
}

interface Announcement {
    id: number;
    title: string;
    content: string;
    type: string;
    target_audience: string;
    created_by: {
        name: string;
    };
    created_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    };
}

interface RoleData {
    recent_grades?: Array<{
        id: number;
        subject: { name: string };
        teacher: { user: { name: string } };
        marks_obtained: number;
        total_marks: number;
        exam_type: string;
    }>;
    attendance_percentage?: number;
    class?: { name: string };
    classes?: Array<{ name: string; students: unknown[] }>;
}

interface Props {
    stats: Stats;
    announcements: Announcement[];
    attendanceToday?: Record<string, number>;
    roleData?: RoleData;
    user?: User;
    [key: string]: unknown;
}

export default function AcademicDashboard({ 
    stats, 
    announcements, 
    attendanceToday, 
    roleData, 
    user 
}: Props) {
    const getAnnouncementColor = (type: string) => {
        switch (type) {
            case 'urgent': return 'destructive';
            case 'academic': return 'default';
            case 'event': return 'secondary';
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
                    <div>
                        <h1 className="text-3xl font-bold">🎓 Academic Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back{user ? `, ${user.name}` : ''}! Here's what's happening in your school.
                        </p>
                    </div>
                    {user?.role.display_name && (
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                            {user.role.display_name}
                        </Badge>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_students}</div>
                            <p className="text-xs text-muted-foreground">Enrolled students</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_teachers}</div>
                            <p className="text-xs text-muted-foreground">Active faculty</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Classes</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_classes}</div>
                            <p className="text-xs text-muted-foreground">Active classes</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_subjects}</div>
                            <p className="text-xs text-muted-foreground">Available subjects</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Quick Actions
                            </CardTitle>
                            <CardDescription>
                                Frequently used features for school management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <Button 
                                    variant="outline" 
                                    className="h-20 flex flex-col gap-2"
                                    onClick={() => router.get(route('academic.students'))}
                                >
                                    <Users className="h-6 w-6" />
                                    <span className="text-sm">Students</span>
                                </Button>
                                
                                <Button 
                                    variant="outline" 
                                    className="h-20 flex flex-col gap-2"
                                    onClick={() => router.get(route('academic.teachers'))}
                                >
                                    <GraduationCap className="h-6 w-6" />
                                    <span className="text-sm">Teachers</span>
                                </Button>
                                
                                <Button 
                                    variant="outline" 
                                    className="h-20 flex flex-col gap-2"
                                    onClick={() => router.get(route('academic.grades'))}
                                >
                                    <Award className="h-6 w-6" />
                                    <span className="text-sm">Grades</span>
                                </Button>
                                
                                <Button 
                                    variant="outline" 
                                    className="h-20 flex flex-col gap-2"
                                    onClick={() => router.get(route('academic.attendance'))}
                                >
                                    <UserCheck className="h-6 w-6" />
                                    <span className="text-sm">Attendance</span>
                                </Button>
                                
                                <Button 
                                    variant="outline" 
                                    className="h-20 flex flex-col gap-2"
                                    onClick={() => router.get(route('academic.classes'))}
                                >
                                    <BookOpen className="h-6 w-6" />
                                    <span className="text-sm">Classes</span>
                                </Button>
                                
                                <Button 
                                    variant="outline" 
                                    className="h-20 flex flex-col gap-2"
                                    onClick={() => router.get(route('academic.announcements'))}
                                >
                                    <Megaphone className="h-6 w-6" />
                                    <span className="text-sm">Announcements</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Today's Attendance */}
                    {attendanceToday && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Today's Attendance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {Object.entries(attendanceToday).map(([status, count]) => (
                                    <div key={status} className="flex justify-between items-center">
                                        <span className="capitalize">{status}</span>
                                        <Badge variant={status === 'present' ? 'default' : 'secondary'}>
                                            {count}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Recent Announcements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Megaphone className="h-5 w-5" />
                            Recent Announcements
                        </CardTitle>
                        <CardDescription>
                            Latest news and updates from the school
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {announcements.length > 0 ? (
                            <div className="space-y-4">
                                {announcements.map((announcement) => (
                                    <div key={announcement.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold">{announcement.title}</h3>
                                            <Badge variant={getAnnouncementColor(announcement.type)}>
                                                {announcement.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                            {announcement.content}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>By {announcement.created_by.name}</span>
                                            <span>{formatDate(announcement.created_at)}</span>
                                        </div>
                                    </div>
                                ))}
                                
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={() => router.get(route('academic.announcements'))}
                                >
                                    View All Announcements
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No announcements yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Role-specific Quick Info */}
                {roleData && user?.role.name === 'student' && roleData.recent_grades && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Recent Grades
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {roleData.recent_grades.slice(0, 3).map((grade) => (
                                    <div key={grade.id} className="flex justify-between items-center p-2 border rounded">
                                        <span className="font-medium">{grade.subject.name}</span>
                                        <div className="text-right">
                                            <div className="font-semibold">{grade.marks_obtained}/{grade.total_marks}</div>
                                            <div className="text-xs text-muted-foreground">{grade.exam_type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}