import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Plus, Shield, Activity, FileText, Wifi, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';

interface ScannedDevice {
  id: string;
  name: string;
  ip: string;
  riskScore: number;
  lastScan: string;
  vulnerabilities: number;
  status: 'secure' | 'warning' | 'critical';
}

const mockDevices: ScannedDevice[] = [
  { id: '1', name: 'DESKTOP-ALPHA', ip: '192.168.1.101', riskScore: 85, lastScan: '2024-01-15', vulnerabilities: 3, status: 'critical' },
  { id: '2', name: 'LAPTOP-BETA', ip: '192.168.1.102', riskScore: 45, lastScan: '2024-01-14', vulnerabilities: 1, status: 'warning' },
  { id: '3', name: 'SERVER-GAMMA', ip: '192.168.1.103', riskScore: 20, lastScan: '2024-01-13', vulnerabilities: 0, status: 'secure' },
  { id: '4', name: 'WORKSTATION-DELTA', ip: '192.168.1.104', riskScore: 65, lastScan: '2024-01-12', vulnerabilities: 2, status: 'warning' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const [selectedSystem, setSelectedSystem] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<ScannedDevice | null>(null);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({ title: "Logged out", description: "You have been successfully logged out" });
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-destructive';
    if (score >= 40) return 'text-warning';
    return 'text-success';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'critical': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const handleDeviceClick = (device: ScannedDevice) => {
    setSelectedDevice(device);
    setShowDeviceDetails(true);
  };

  const selectedDeviceData = selectedSystem ? mockDevices.find(d => d.id === selectedSystem) : null;
  const currentRiskScore = selectedDeviceData?.riskScore || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">PiShield Dashboard</h1>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem onClick={() => navigate('/about')}>About</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Welcome back, {user?.firstName}</h2>
          <div className="text-sm text-muted-foreground">
            Vulnerability Scanner - Raspberry Pi 5
          </div>
        </div>

        {/* System Selector & Risk Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5" />
                <span>System Selection</span>
              </CardTitle>
              <CardDescription>Select a system to scan for vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select system to scan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDevices.map((device) => (
                      <SelectItem key={device.id} value={device.id}>
                        {device.name} ({device.ip})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {selectedDeviceData && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{selectedDeviceData.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedDeviceData.ip}</p>
                    </div>
                    <Badge variant={selectedDeviceData.status === 'critical' ? 'destructive' : selectedDeviceData.status === 'warning' ? 'secondary' : 'outline'}>
                      {selectedDeviceData.status}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Risk Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getRiskColor(currentRiskScore)}`}>
                  {currentRiskScore}%
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentRiskScore >= 70 ? 'bg-destructive' : 
                      currentRiskScore >= 40 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${currentRiskScore}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentRiskScore >= 70 ? 'Critical Risk' : 
                   currentRiskScore >= 40 ? 'Medium Risk' : 'Low Risk'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="h-16 text-left justify-start"
            variant="outline"
            onClick={() => toast({ title: "Scan Started", description: "Vulnerability scan initiated..." })}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Start Scan</div>
                <div className="text-sm text-muted-foreground">Run vulnerability scan</div>
              </div>
            </div>
          </Button>

          <Button 
            className="h-16 text-left justify-start"
            variant="outline"
            onClick={() => navigate('/reports')}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Create detailed report</div>
              </div>
            </div>
          </Button>

          <Button 
            className="h-16 text-left justify-start"
            variant="outline"
            onClick={() => navigate('/reports')}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Activity className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-muted-foreground">Access scan history</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Recently Scanned Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Scanned Devices</CardTitle>
            <CardDescription>Click on a device to view detailed scan results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockDevices.map((device) => (
                <Card 
                  key={device.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleDeviceClick(device)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{device.name}</h4>
                      {getStatusIcon(device.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{device.ip}</p>
                    <p className="text-xs text-muted-foreground mb-2">Last scan: {device.lastScan}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${getRiskColor(device.riskScore)}`}>
                        Risk: {device.riskScore}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {device.vulnerabilities} issues
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Details Dialog */}
      <Dialog open={showDeviceDetails} onOpenChange={setShowDeviceDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedDevice && getStatusIcon(selectedDevice.status)}
              <span>{selectedDevice?.name} - Scan Details</span>
            </DialogTitle>
            <DialogDescription>
              Detailed vulnerability scan results for {selectedDevice?.ip}
            </DialogDescription>
          </DialogHeader>
          {selectedDevice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">System Information</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Name: {selectedDevice.name}</p>
                    <p>IP Address: {selectedDevice.ip}</p>
                    <p>Last Scan: {selectedDevice.lastScan}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Risk Assessment</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Risk Score: <span className={getRiskColor(selectedDevice.riskScore)}>{selectedDevice.riskScore}%</span></p>
                    <p>Vulnerabilities Found: {selectedDevice.vulnerabilities}</p>
                    <p>Status: <Badge variant={selectedDevice.status === 'critical' ? 'destructive' : 'outline'}>{selectedDevice.status}</Badge></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Vulnerability Summary</h4>
                <div className="space-y-2">
                  {selectedDevice.vulnerabilities > 0 ? (
                    Array.from({ length: selectedDevice.vulnerabilities }).map((_, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">CVE-2024-{1000 + i}</span>
                          <Badge variant="destructive">High</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sample vulnerability description for demonstration purposes.
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-success">No vulnerabilities detected. System appears secure.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDeviceDetails(false)}>
                  Close
                </Button>
                <Button onClick={() => navigate('/reports')}>
                  Generate Full Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;