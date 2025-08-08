import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Megaphone, ArrowLeft, User, Calendar, Eye, AlertTriangle, Info, Calendar as CalendarIcon } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    content: string;
    type: string;
    target_audience: string;
    is_published: boolean;
    publish_at?: string;
    expires_at?: string;
    created_at: string;
    created_by: {
        name: string;
        email: string;
    };
    target_class?: {
        name: string;
    };
}

interface PaginatedAnnouncements {
    data: Announcement[];
    total: number;
    current_page: number;
    last_page: number;
}

interface Props {
    announcements: PaginatedAnnouncements;
    [key: string]: unknown;
}

export default function AnnouncementsIndex({ announcements }: Props) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'urgent': return 'destructive';
            case 'academic': return 'default';
            case 'event': return 'secondary';
            case 'general': return 'outline';
            default: return 'outline';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'urgent': return <AlertTriangle className="h-4 w-4" />;
            case 'academic': return <Info className="h-4 w-4" />;
            case 'event': return <CalendarIcon className="h-4 w-4" />;
            default: return <Megaphone className="h-4 w-4" />;
        }
    };

    const getAudienceColor = (audience: string) => {
        switch (audience) {
            case 'all': return 'default';
            case 'students': return 'secondary';
            case 'teachers': return 'outline';
            case 'parents': return 'outline';
            case 'specific_class': return 'secondary';
            default: return 'outline';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isExpired = (expiresAt?: string) => {
        return expiresAt && new Date(expiresAt) < new Date();
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
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
                                <Megaphone className="h-8 w-8 text-orange-600" />
                                📢 Announcements
                            </h1>
                            <p className="text-muted-foreground">
                                School-wide communications and important updates
                            </p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {announcements.total} Total Announcements
                    </Badge>
                </div>

                {/* Announcements List */}
                <div className="space-y-4">
                    {announcements.data.map((announcement) => (
                        <Card key={announcement.id} className={`hover:shadow-lg transition-shadow ${
                            isExpired(announcement.expires_at) ? 'opacity-60' : ''
                        }`}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant={getTypeColor(announcement.type)} className="text-xs">
                                                {getTypeIcon(announcement.type)}
                                                <span className="ml-1 capitalize">{announcement.type}</span>
                                            </Badge>
                                            <Badge variant={getAudienceColor(announcement.target_audience)} className="text-xs">
                                                {announcement.target_audience === 'specific_class' && announcement.target_class
                                                    ? announcement.target_class.name
                                                    : announcement.target_audience.replace('_', ' ')
                                                }
                                            </Badge>
                                            {!announcement.is_published && (
                                                <Badge variant="outline" className="text-xs">
                                                    Draft
                                                </Badge>
                                            )}
                                            {isExpired(announcement.expires_at) && (
                                                <Badge variant="destructive" className="text-xs">
                                                    Expired
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-xl mb-1">{announcement.title}</CardTitle>
                                        <CardDescription className="text-sm mb-3">
                                            {truncateContent(announcement.content)}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    {/* Content Preview */}
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        {announcement.content.length > 150 && (
                                            <Button variant="link" className="p-0 h-auto text-xs">
                                                Read more...
                                            </Button>
                                        )}
                                    </div>

                                    {/* Meta Information */}
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            <span>By {announcement.created_by.name}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>Created {formatDate(announcement.created_at)}</span>
                                        </div>

                                        {announcement.publish_at && (
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                <span>Published {formatDate(announcement.publish_at)}</span>
                                            </div>
                                        )}

                                        {announcement.expires_at && (
                                            <div className="flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                <span>Expires {formatDate(announcement.expires_at)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                        {announcement.type === 'urgent' && (
                                            <Button variant="destructive" size="sm">
                                                Mark as Read
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {announcements.data.length === 0 && (
                    <Card className="text-center py-16">
                        <CardContent>
                            <Megaphone className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Announcements Found</h3>
                            <p className="text-muted-foreground mb-4">
                                No announcements have been published yet.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination Info */}
                {announcements.last_page > 1 && (
                    <div className="text-center text-sm text-muted-foreground">
                        Showing page {announcements.current_page} of {announcements.last_page} 
                        ({announcements.total} total announcements)
                    </div>
                )}
            </div>
        </AppShell>
    );
}