import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Eye, Mail, Filter, Search, FileText, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  systemName: string;
  ipAddress: string;
  riskScore: number;
  lastScanDate: string;
  vulnerabilities: number;
  status: 'secure' | 'warning' | 'critical';
  reportGenerated: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    systemName: 'DESKTOP-ALPHA',
    ipAddress: '192.168.1.101',
    riskScore: 85,
    lastScanDate: '2024-01-15',
    vulnerabilities: 3,
    status: 'critical',
    reportGenerated: '2024-01-15 14:30'
  },
  {
    id: '2',
    systemName: 'LAPTOP-BETA',
    ipAddress: '192.168.1.102',
    riskScore: 45,
    lastScanDate: '2024-01-14',
    vulnerabilities: 1,
    status: 'warning',
    reportGenerated: '2024-01-14 10:15'
  },
  {
    id: '3',
    systemName: 'SERVER-GAMMA',
    ipAddress: '192.168.1.103',
    riskScore: 20,
    lastScanDate: '2024-01-13',
    vulnerabilities: 0,
    status: 'secure',
    reportGenerated: '2024-01-13 16:45'
  },
  {
    id: '4',
    systemName: 'WORKSTATION-DELTA',
    ipAddress: '192.168.1.104',
    riskScore: 65,
    lastScanDate: '2024-01-12',
    vulnerabilities: 2,
    status: 'warning',
    reportGenerated: '2024-01-12 09:20'
  },
];

const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.systemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.ipAddress.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-destructive';
    if (score >= 40) return 'text-warning';
    return 'text-success';
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'secure': return 'outline';
      default: return 'outline';
    }
  };

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Downloading Report",
      description: `Report for ${mockReports.find(r => r.id === reportId)?.systemName} is being downloaded...`
    });
  };

  const handleViewReport = (reportId: string) => {
    toast({
      title: "Opening Report",
      description: `Viewing detailed report for ${mockReports.find(r => r.id === reportId)?.systemName}...`
    });
  };

  const handleShareReport = (reportId: string) => {
    toast({
      title: "Share Report",
      description: `Email sharing prepared for ${mockReports.find(r => r.id === reportId)?.systemName} report`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Security Reports</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by system name or IP address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="secure">Secure</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Reports</p>
                  <p className="text-2xl font-bold">{mockReports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Critical Systems</p>
                  <p className="text-2xl font-bold text-destructive">
                    {mockReports.filter(r => r.status === 'critical').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Avg Risk Score</p>
                  <p className={`text-2xl font-bold ${getRiskColor(Math.round(mockReports.reduce((acc, r) => acc + r.riskScore, 0) / mockReports.length))}`}>
                    {Math.round(mockReports.reduce((acc, r) => acc + r.riskScore, 0) / mockReports.length)}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Vulnerabilities</p>
                  <p className="text-2xl font-bold">
                    {mockReports.reduce((acc, r) => acc + r.vulnerabilities, 0)}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Display */}
        {viewMode === 'table' ? (
          <Card>
            <CardHeader>
              <CardTitle>Security Reports</CardTitle>
              <CardDescription>
                Detailed vulnerability scan reports for all systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System Name</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Scan</TableHead>
                    <TableHead>Vulnerabilities</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.systemName}</TableCell>
                      <TableCell>{report.ipAddress}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getRiskColor(report.riskScore)}`}>
                          {report.riskScore}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.lastScanDate}</TableCell>
                      <TableCell>{report.vulnerabilities}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewReport(report.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareReport(report.id)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.systemName}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <CardDescription>{report.ipAddress}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Risk Score:</span>
                    <span className={`text-lg font-bold ${getRiskColor(report.riskScore)}`}>
                      {report.riskScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Vulnerabilities:</span>
                    <span className="text-sm">{report.vulnerabilities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Scan:</span>
                    <span className="text-sm">{report.lastScanDate}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewReport(report.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownloadReport(report.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShareReport(report.id)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters to see more results.' 
                  : 'Run a vulnerability scan to generate your first report.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;