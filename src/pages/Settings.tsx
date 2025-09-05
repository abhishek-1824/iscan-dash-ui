import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Monitor, Palette, User, Shield, Save, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';

interface ThemeColors {
  name: string;
  primary: string;
  accent: string;
  description: string;
}

const themeOptions: ThemeColors[] = [
  { name: 'cyber-blue', primary: 'hsl(217, 91%, 60%)', accent: 'hsl(142, 76%, 36%)', description: 'Classic Cyber Blue' },
  { name: 'cyber-green', primary: 'hsl(142, 76%, 50%)', accent: 'hsl(217, 91%, 60%)', description: 'Matrix Green' },
  { name: 'cyber-purple', primary: 'hsl(263, 70%, 50%)', accent: 'hsl(142, 76%, 36%)', description: 'Neon Purple' },
];

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedTheme, setSelectedTheme] = useState('cyber-blue');
  const [notifications, setNotifications] = useState({
    scanComplete: true,
    criticalVulnerabilities: true,
    weeklyReports: false,
    systemAlerts: true,
  });

  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    dateOfBirth: user?.dateOfBirth || '',
  });

  const [security, setSecurity] = useState({
    mfaEnabled: false,
    sessionTimeout: '30',
    autoLockScreen: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security preferences have been saved."
    });
  };

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    const themeData = themeOptions.find(t => t.name === themeName);
    if (themeData) {
      // In a real implementation, this would update the CSS custom properties
      toast({
        title: "Theme Updated",
        description: `Switched to ${themeData.description} theme`
      });
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
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
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dark/Light Mode */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Theme Mode</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={theme === value ? 'default' : 'outline'}
                    onClick={() => setTheme(value as any)}
                    className="h-16 flex-col space-y-2"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Theme Colors */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Color Theme</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {themeOptions.map((themeOption) => (
                  <Button
                    key={themeOption.name}
                    variant={selectedTheme === themeOption.name ? 'default' : 'outline'}
                    onClick={() => handleThemeChange(themeOption.name)}
                    className="h-16 justify-start space-x-3"
                  >
                    <div className="flex space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-border"
                        style={{ backgroundColor: themeOption.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-border"
                        style={{ backgroundColor: themeOption.accent }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{themeOption.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Management</span>
            </CardTitle>
            <CardDescription>
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              />
            </div>

            <Button onClick={handleSaveProfile} className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Options</span>
            </CardTitle>
            <CardDescription>
              Configure security preferences and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Multi-Factor Authentication (MFA)</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={security.mfaEnabled}
                onCheckedChange={(checked) => setSecurity({ ...security, mfaEnabled: checked })}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
              <Select 
                value={security.sessionTimeout} 
                onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Auto Lock Screen</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically lock screen when inactive
                </p>
              </div>
              <Switch
                checked={security.autoLockScreen}
                onCheckedChange={(checked) => setSecurity({ ...security, autoLockScreen: checked })}
              />
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full md:w-auto">
                Change Password
              </Button>
              <Button variant="outline" className="w-full md:w-auto ml-0 md:ml-2">
                Reset Kerberos Token
              </Button>
            </div>

            <Button onClick={handleSaveSecurity} className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Manage how you receive alerts and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {key === 'scanComplete' && 'Notify when vulnerability scans complete'}
                    {key === 'criticalVulnerabilities' && 'Alert for critical security issues'}
                    {key === 'weeklyReports' && 'Weekly security summary reports'}
                    {key === 'systemAlerts' && 'System status and health alerts'}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, [key]: checked })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;