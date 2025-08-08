import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    GraduationCap, 
    Users, 
    BookOpen, 
    TrendingUp, 
    Award, 
    Calendar,
    Bell,
    UserCheck,
    CreditCard,
    MessageSquare,
    Library,
    Play,
    CheckCircle
} from 'lucide-react';

export default function Welcome() {
    const features = [
        {
            icon: <Users className="h-6 w-6" />,
            title: "User Management",
            description: "Manage students, teachers, parents, and administrators with role-based access control"
        },
        {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Academic Management",
            description: "Handle classes, subjects, curriculum, and academic year planning efficiently"
        },
        {
            icon: <Award className="h-6 w-6" />,
            title: "Grade Management",
            description: "Record, track, and analyze student performance with comprehensive grading system"
        },
        {
            icon: <UserCheck className="h-6 w-6" />,
            title: "Attendance Tracking",
            description: "Real-time attendance management with detailed reporting and analytics"
        },
        {
            icon: <Calendar className="h-6 w-6" />,
            title: "Timetable Management",
            description: "Create and manage class schedules, teacher assignments, and room allocations"
        },
        {
            icon: <Bell className="h-6 w-6" />,
            title: "Announcements",
            description: "Broadcast important news and updates to specific audiences or entire school"
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "Report Cards",
            description: "Generate comprehensive report cards with grades, attendance, and remarks"
        },
        {
            icon: <CreditCard className="h-6 w-6" />,
            title: "Fee Management",
            description: "Handle school fees, payment tracking, and financial reporting"
        },
        {
            icon: <Library className="h-6 w-6" />,
            title: "Library System",
            description: "Manage books, track borrowing, and maintain digital catalog"
        },
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: "Discussion Forums",
            description: "Enable communication between teachers, students, and parents"
        },
        {
            icon: <Play className="h-6 w-6" />,
            title: "Online Learning",
            description: "Access educational materials, assignments, and digital resources"
        },
        {
            icon: <CheckCircle className="h-6 w-6" />,
            title: "Analytics & Reports",
            description: "Comprehensive insights with detailed analytics and custom reports"
        }
    ];

    const userRoles = [
        {
            role: "School Admin",
            color: "default",
            description: "Complete system access with management capabilities"
        },
        {
            role: "Teacher",
            color: "secondary", 
            description: "Grade management, attendance, and class administration"
        },
        {
            role: "Student",
            color: "outline",
            description: "Access to grades, schedules, and educational resources"
        },
        {
            role: "Parent",
            color: "outline",
            description: "Monitor child's progress and communicate with school"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            EduManage Pro
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={route('login')}>
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link href={route('register')}>
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <Badge variant="secondary" className="text-sm px-4 py-2">
                            🚀 Complete School Management Solution
                        </Badge>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        🎓 School Academic Management System
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Streamline your educational institution with our comprehensive academic management platform. 
                        Handle everything from student enrollment to grade reporting in one powerful system.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href={route('academic.index')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                🎯 Explore Dashboard
                            </Button>
                        </Link>
                        <Link href={route('register')}>
                            <Button size="lg" variant="outline" className="px-8 py-3">
                                📋 Start Free Trial
                            </Button>
                        </Link>
                    </div>

                    {/* User Roles */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="text-sm text-gray-500 mr-2">Perfect for:</span>
                        {userRoles.map((roleInfo, index) => (
                            <Badge key={index} variant={roleInfo.color as "default" | "secondary" | "outline"} className="text-sm">
                                {roleInfo.role}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">🌟 Comprehensive Features</h2>
                    <p className="text-gray-600 text-lg">
                        Everything you need to manage a modern educational institution
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* User Roles Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">👥 Built for Every Role</h2>
                    <p className="text-gray-600 text-lg">
                        Tailored experiences for different user types in your institution
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userRoles.map((roleInfo, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <Badge variant={roleInfo.color as "default" | "secondary" | "outline"}>
                                        {roleInfo.role}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{roleInfo.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-4">🚀 Ready to Transform Your School?</CardTitle>
                        <CardDescription className="text-blue-100 text-lg mb-6">
                            Join thousands of educational institutions already using our platform to streamline their academic operations.
                        </CardDescription>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary" className="px-8 py-3">
                                    🎯 Create Account
                                </Button>
                            </Link>
                            <Link href={route('academic.index')}>
                                <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                                    📊 View Demo
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <GraduationCap className="h-6 w-6 text-blue-600" />
                            <span className="font-semibold text-gray-700">EduManage Pro</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            © 2024 School Academic Management System. Built with ❤️ for education.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}