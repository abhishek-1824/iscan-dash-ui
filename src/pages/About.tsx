import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Cpu, Network, Users, Github, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Agentless Scanning",
      description: "Non-intrusive vulnerability detection without installing agents on target systems"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Raspberry Pi 5 Powered",
      description: "Efficient scanning powered by ARM64 architecture for optimal performance"
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Network Discovery",
      description: "Automatic detection and mapping of Windows systems on your network"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Built-in reporting and sharing capabilities for security teams"
    }
  ];

  const teamMembers = [
    { name: "Security Specialist", role: "Vulnerability Research" },
    { name: "Network Engineer", role: "Network Discovery" },
    { name: "Software Developer", role: "Dashboard Development" },
    { name: "Systems Analyst", role: "Integration & Testing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-xl">
        <div className="flex items-center px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PiShield Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Agentless Windows System Vulnerability and Network Scanner using Raspberry Pi 5
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="outline" className="bg-primary/10">
              <Cpu className="h-3 w-3 mr-1" />
              Raspberry Pi 5
            </Badge>
            <Badge variant="outline" className="bg-accent/10">
              <Shield className="h-3 w-3 mr-1" />
              Agentless
            </Badge>
            <Badge variant="outline" className="bg-secondary/10">
              <Network className="h-3 w-3 mr-1" />
              Network Scanner
            </Badge>
          </div>
        </div>

        {/* Project Description */}
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              PiShield Dashboard is a cutting-edge cybersecurity solution that leverages the power of Raspberry Pi 5 
              to perform comprehensive vulnerability assessments on Windows systems across your network. Our agentless 
              approach ensures minimal disruption to your infrastructure while providing maximum security insights.
            </p>
            <p className="mb-4">
              The system automatically discovers Windows machines on your network, performs thorough security scans, 
              and presents actionable intelligence through this modern web dashboard. With real-time risk scoring 
              and detailed vulnerability reports, security teams can prioritize remediation efforts effectively.
            </p>
            <p>
              Built with modern web technologies and cybersecurity best practices, PiShield Dashboard offers 
              an intuitive interface for managing network security at scale, from small offices to enterprise environments.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>
              Advanced capabilities powered by Raspberry Pi 5 technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Hardware Requirements</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Raspberry Pi 5 (8GB RAM recommended)</li>
                  <li>• MicroSD Card (32GB minimum, Class 10)</li>
                  <li>• Ethernet connection for reliable scanning</li>
                  <li>• Power supply (5V, 5A USB-C)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Software Stack</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Custom vulnerability scanning engine</li>
                  <li>• Network discovery protocols</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team 7</span>
            </CardTitle>
            <CardDescription>
              The cybersecurity experts behind PiShield Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Get In Touch</CardTitle>
            <CardDescription>
              Connect with Team 7 for support and collaboration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Github className="h-5 w-5" />
                <span className="text-sm">GitHub Repository</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Mail className="h-5 w-5" />
                <span className="text-sm">Email Support</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Globe className="h-5 w-5" />
                <span className="text-sm">Documentation</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Version Information */}
        <Card>
          <CardContent className="text-center py-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                PiShield Dashboard v1.0.0 • Built with ❤️ by Team 7
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 Team 7. Agentless Windows System Vulnerability and Network Scanner using Raspberry Pi 5.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;