import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Architecture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <Card className="bg-card/80 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-3">
              <Shield className="h-10 w-10 text-primary" />
              System Architecture & Technical Design
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* High-Level Architecture */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">High-Level Architecture</h2>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-x-auto">
{`┌─────────────────────────────────────────────────────────────────┐
│                      User Interface Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Dashboard   │  │   Reports    │  │   Settings   │          │
│  │   (React)    │  │    View      │  │    Panel     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTPS/REST API
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   Backend API Server Layer                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  FastAPI / Flask REST API                                │  │
│  │  • Authentication & Authorization                         │  │
│  │  • Scan Management Endpoints                             │  │
│  │  • Report Generation API                                 │  │
│  │  • Real-time Status WebSocket                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    Internal API Calls
                             │
┌────────────────────────────▼────────────────────────────────────┐
│              Raspberry Pi Scanning Engine Layer                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │    Nmap     │  │   OpenVAS   │  │  WinRM/WMI  │            │
│  │   Scanner   │  │  Vuln Scan  │  │  Collector  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  Python Core Modules:                                  │    │
│  │  • scan_orchestrator.py                               │    │
│  │  • nmap_scanner.py                                    │    │
│  │  • openvas_integration.py                             │    │
│  │  • windows_collector.py                               │    │
│  │  • risk_calculator.py                                 │    │
│  │  • report_generator.py                                │    │
│  └───────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                   Network Protocols
                  (WinRM/WMI/SMB/SSH)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                     Target Systems Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  Windows 10 │  │  Windows 11 │  │ Windows Srv │            │
│  │   Targets   │  │   Targets   │  │   Targets   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└──────────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │   PostgreSQL DB  │
                    │  (Lovable Cloud) │
                    └──────────────────┘
`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            {/* Communication Flow */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Communication Flow Diagram</h2>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-x-auto">
{`Scan Workflow:

1. User Interface
   │
   ├─► [Start Scan Button] ──────────────────────────┐
   │                                                  │
   │                                                  ▼
2. Backend API                              ┌──────────────┐
   │                                        │ Authenticate │
   ├─► POST /api/scans/start ──────────────┤   Validate   │
   │                                        └──────┬───────┘
   │                                               │
   │                                               ▼
3. Raspberry Pi Scanner                  ┌─────────────────┐
   │                                     │  Task Queued    │
   ├─► Scan Orchestrator ────────────────┤  in Database    │
   │   │                                 └────────┬────────┘
   │   ├─► Network Discovery (Nmap)              │
   │   │   └─► Find Active Hosts                 │
   │   │       └─► Identify Services             │
   │   │           └─► OS Detection              │
   │   │                                         │
   │   ├─► Vulnerability Scan (OpenVAS)          │
   │   │   └─► CVE Matching                      ▼
   │   │       └─► CVSS Scoring          ┌────────────────┐
   │   │           └─► Exploit Check     │  Real-time DB  │
   │   │                                 │    Updates     │
   │   └─► Windows Data (WinRM/WMI)      └────────┬───────┘
   │       └─► Patch Status                       │
   │           └─► Installed Software             │
   │               └─► User Accounts              │
   │                   └─► Registry Keys          │
   │                                              │
4. Risk Assessment                               │
   │                                             ▼
   ├─► Calculate Risk Score         ┌──────────────────────┐
   │   └─► Prioritize Findings      │   Store Results in   │
   │       └─► Generate Report      │      Database        │
   │                                └──────────┬───────────┘
   │                                           │
5. Results Display                            │
   │                                          ▼
   └─► WebSocket Push ─────────────────► Dashboard Update
       └─► Real-time Updates
           └─► Charts & Graphs
               └─► Report Available
`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            {/* Network Topology */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Network Topology</h2>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-x-auto">
{`
                    Internet
                       │
                       ▼
              ┌────────────────┐
              │    Firewall    │
              └────────┬───────┘
                       │
              ┌────────▼───────┐
              │  Core Switch   │
              └────────┬───────┘
                       │
        ┌──────────────┼──────────────┐
        │              │               │
        ▼              ▼               ▼
┌───────────────┐ ┌─────────┐  ┌──────────────┐
│ Raspberry Pi  │ │ Web     │  │   Target     │
│   Scanner     │ │ Server  │  │   Windows    │
│  (10.0.1.10)  │ │(Hosted) │  │   Machines   │
│               │ │         │  │              │
│ • Nmap        │ └─────────┘  │ 10.0.1.100   │
│ • OpenVAS     │              │ 10.0.1.101   │
│ • Python      │              │ 10.0.1.102   │
│ • Scanner     │              │    ...       │
└───────────────┘              └──────────────┘
        │                              │
        └──────────────┬───────────────┘
                       │
              WinRM (5985/5986)
              WMI (135, 445)
              SMB (445)
              SSH (22)
`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            {/* Database Schema */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Database Schema (ER Diagram)</h2>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-x-auto">
{`
┌─────────────────────────┐
│       profiles          │
├─────────────────────────┤
│ id (UUID) PK            │
│ first_name (TEXT)       │
│ last_name (TEXT)        │
│ email (TEXT)            │
│ date_of_birth (DATE)    │
│ created_at (TIMESTAMP)  │
│ updated_at (TIMESTAMP)  │
└────────┬────────────────┘
         │ 1
         │
         │ N
┌────────▼────────────────┐       N ┌─────────────────────────┐
│   scanned_devices       │◄────────┤    scan_reports         │
├─────────────────────────┤    1    ├─────────────────────────┤
│ id (UUID) PK            │         │ id (UUID) PK            │
│ user_id (UUID) FK       │         │ device_id (UUID) FK     │
│ name (TEXT)             │         │ user_id (UUID) FK       │
│ ip_address (INET)       │         │ vulnerabilities (JSONB) │
│ os_version (TEXT)       │         │ risk_score (INT)        │
│ last_scan_date (TS)     │         │ scan_date (TIMESTAMP)   │
│ risk_score (INT)        │         │ report_data (JSONB)     │
│ status (TEXT)           │         │ created_at (TIMESTAMP)  │
│ created_at (TIMESTAMP)  │         └─────────────────────────┘
│ updated_at (TIMESTAMP)  │
└─────────────────────────┘
         │ 1
         │
         │ N
┌────────▼────────────────┐
│     user_roles          │
├─────────────────────────┤
│ id (UUID) PK            │
│ user_id (UUID) FK       │
│ role (ENUM)             │
│ created_at (TIMESTAMP)  │
└─────────────────────────┘

Additional Tables (To Be Implemented):

┌─────────────────────────┐
│   scan_schedules        │
├─────────────────────────┤
│ id (UUID) PK            │
│ user_id (UUID) FK       │
│ device_id (UUID) FK     │
│ schedule_type (TEXT)    │
│ cron_expression (TEXT)  │
│ enabled (BOOLEAN)       │
│ next_run (TIMESTAMP)    │
└─────────────────────────┘

┌─────────────────────────┐
│   vulnerability_db      │
├─────────────────────────┤
│ id (UUID) PK            │
│ cve_id (TEXT)           │
│ cvss_score (FLOAT)      │
│ description (TEXT)      │
│ remediation (TEXT)      │
│ published_date (DATE)   │
└─────────────────────────┘

┌─────────────────────────┐
│    scan_logs            │
├─────────────────────────┤
│ id (UUID) PK            │
│ scan_id (UUID) FK       │
│ timestamp (TIMESTAMP)   │
│ log_level (TEXT)        │
│ message (TEXT)          │
│ details (JSONB)         │
└─────────────────────────┘
`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            {/* Sequence Diagram */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Sequence Diagram: Scan Process</h2>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-x-auto">
{`
User        Dashboard      API Server     Scanner        OpenVAS       Windows Target
 │              │               │            │              │                 │
 │  Click Scan  │               │            │              │                 │
 ├─────────────►│               │            │              │                 │
 │              │ POST /scan    │            │              │                 │
 │              ├──────────────►│            │              │                 │
 │              │               │ Validate   │              │                 │
 │              │               ├────────┐   │              │                 │
 │              │               │        │   │              │                 │
 │              │               │◄───────┘   │              │                 │
 │              │               │ Queue Scan │              │                 │
 │              │               ├───────────►│              │                 │
 │              │   200 OK      │            │ Nmap Scan    │                 │
 │              │◄──────────────┤            ├──────────────┼────────────────►│
 │              │               │            │              │     Port Scan    │
 │              │               │            │◄─────────────┼─────────────────┤
 │              │               │            │   Results    │                 │
 │              │               │            │              │                 │
 │              │               │            │ OpenVAS Scan │                 │
 │              │               │            ├─────────────►│                 │
 │              │               │            │              │ Vuln Check      │
 │              │               │            │              ├────────────────►│
 │              │               │            │              │   CVE Results   │
 │              │               │            │              │◄────────────────┤
 │              │               │            │◄─────────────┤                 │
 │              │               │            │ WinRM Query  │                 │
 │              │               │            ├──────────────┼────────────────►│
 │              │               │            │              │  System Info    │
 │              │               │            │◄─────────────┼─────────────────┤
 │              │               │ Risk Score │              │                 │
 │              │               │◄───────────┤              │                 │
 │              │               │ Store DB   │              │                 │
 │              │               ├────────┐   │              │                 │
 │              │               │        │   │              │                 │
 │              │               │◄───────┘   │              │                 │
 │              │  WebSocket    │            │              │                 │
 │◄─────────────┼───────────────┤            │              │                 │
 │  Results     │               │            │              │                 │
 │              │               │            │              │                 │
 │ View Report  │               │            │              │                 │
 ├─────────────►│ GET /report   │            │              │                 │
 │              ├──────────────►│            │              │                 │
 │              │   PDF/HTML    │            │              │                 │
 │              │◄──────────────┤            │              │                 │
 │◄─────────────┤               │            │              │                 │
`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            {/* Activity Diagram */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Activity Diagram: Vulnerability Assessment</h2>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-x-auto">
{`
                        [START]
                           │
                           ▼
                  ┌─────────────────┐
                  │ Receive Scan    │
                  │    Request      │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Validate Target │
                  │   & Credentials │
                  └────────┬────────┘
                           │
                    ┌──────▼──────┐
                    │   Valid?    │
                    └──────┬──────┘
                     No    │     Yes
                    ┌──────▼──────┐
                    │             │
                    ▼             ▼
            ┌──────────────┐  ┌──────────────┐
            │ Return Error │  │ Network Scan │
            └──────────────┘  │   (Nmap)     │
                              └──────┬───────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │   Host Active?  │
                            └────────┬────────┘
                              No     │     Yes
                            ┌────────▼────────┐
                            │                 │
                            ▼                 ▼
                    ┌──────────────┐  ┌──────────────┐
                    │ Mark Offline │  │ Port Scan    │
                    └──────────────┘  │ & Service    │
                                      │ Detection    │
                                      └──────┬───────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │ Windows Target? │
                                    └────────┬────────┘
                                       No    │    Yes
                                      ┌──────▼──────┐
                                      │             │
                                      ▼             ▼
                            ┌──────────────┐  ┌──────────────┐
                            │  Standard    │  │   WinRM/WMI  │
                            │  Vuln Scan   │  │  Data Collection│
                            └──────┬───────┘  └──────┬───────┘
                                   │                 │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │   OpenVAS Scan  │
                                   │  & CVE Matching │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │  Calculate Risk │
                                   │   Score (0-100) │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │  Store Results  │
                                   │   in Database   │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │ Generate Report │
                                   │   (PDF/HTML)    │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │  Notify User    │
                                   │   (WebSocket)   │
                                   └────────┬────────┘
                                            │
                                            ▼
                                         [END]
`}
                  </pre>
                </CardContent>
              </Card>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Architecture;
