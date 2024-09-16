'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts'
import { QrCode, Wrench, AlertTriangle, Bell, Search, Calendar as CalendarIcon, Download, Printer, Map, Activity, BarChart2, Filter, Settings, ChevronDown, Clock, Users, Zap, Gauge } from 'lucide-react'

// Sample data (expanded)
const usageData = [
  { date: '2023-01', cycles: 10000 },
  { date: '2023-02', cycles: 25000 },
  { date: '2023-03', cycles: 45000 },
  { date: '2023-04', cycles: 70000 },
  { date: '2023-05', cycles: 100000 },
]

const healthData = [
  { date: '2023-01', health: 100 },
  { date: '2023-02', health: 95 },
  { date: '2023-03', health: 85 },
  { date: '2023-04', health: 70 },
  { date: '2023-05', health: 50 },
]

const maintenanceData = [
  { month: 'Jan', count: 2 },
  { month: 'Feb', count: 1 },
  { month: 'Mar', count: 3 },
  { month: 'Apr', count: 2 },
  { month: 'May', count: 4 },
]

const toolStatusData = [
  { name: 'Available', value: 60, color: '#4CAF50' },
  { name: 'In Use', value: 30, color: '#2196F3' },
  { name: 'In Maintenance', value: 10, color: '#FFC107' },
]

const toolsData = [
  { id: 'DR001', status: 'Available', lastMaintenance: '2023-05-15', nextMaintenance: '2023-06-15' },
  { id: 'DR002', status: 'In Use', lastMaintenance: '2023-05-10', nextMaintenance: '2023-06-10' },
  { id: 'DR003', status: 'In Maintenance', lastMaintenance: '2023-05-20', nextMaintenance: '2023-05-22' },
  { id: 'DR004', status: 'Available', lastMaintenance: '2023-05-05', nextMaintenance: '2023-06-05' },
  { id: 'DR005', status: 'In Use', lastMaintenance: '2023-05-01', nextMaintenance: '2023-06-01' },
]

const toolData = {
  id: 'DR001',
  name: 'High-Speed Drill',
  type: 'Cutting',
  status: 'In Use',
  station: 'Assembly Line A',
  totalUsage: 150000,
  lastMaintenance: '2023-05-15',
  nextScheduledMaintenance: '2023-06-15',
  healthScore: 85,
  specifications: {
    size: '10mm',
    material: 'Carbide',
    maxRPM: 30000,
  },
  maintenanceHistory: [
    { date: '2023-05-15', type: 'Sharpening', technician: 'John Doe', cost: 150 },
    { date: '2023-04-01', type: 'Polishing', technician: 'Jane Smith', cost: 100 },
    { date: '2023-02-15', type: 'Full Service', technician: 'Mike Johnson', cost: 300 },
  ],
  usageData: [
    { date: '2023-01', cycles: 20000 },
    { date: '2023-02', cycles: 45000 },
    { date: '2023-03', cycles: 75000 },
    { date: '2023-04', cycles: 110000 },
    { date: '2023-05', cycles: 150000 },
  ],
  userActivity: [
    { date: '2023-05-20', user: 'Alice', action: 'Took to maintenance' },
    { date: '2023-05-19', user: 'Bob', action: 'Assembled on Station One' },
    { date: '2023-05-18', user: 'Charlie', action: 'Performed quality check' },
  ],
  lifecycle: [
    { date: '2023-02-15', event: 'First Use' },
    { date: '2023-04-01', event: 'First Maintenance' },
    { date: '2023-05-15', event: 'Usage Milestone: 100,000 cycles' },
    { date: '2023-06-15', event: 'Scheduled Maintenance' },
  ],
}

const notifications = [
  { id: 1, type: 'warning', message: 'DR002 is reaching end-of-life', timestamp: '2023-05-20 09:30' },
  { id: 2, type: 'info', message: 'DR003 has been serviced', timestamp: '2023-05-20 10:15' },
  { id: 3, type: 'error', message: 'DR004 is overdue for maintenance', timestamp: '2023-05-20 11:00' },
  { id: 4, type: 'warning', message: 'DR005 maintenance delayed', timestamp: '2023-05-20 13:45' },
  { id: 5, type: 'info', message: 'New tool DR006 added to inventory', timestamp: '2023-05-20 14:30' },
]

const performanceMetrics = [
  { metric: 'Average Uptime', value: '95%' },
  { metric: 'Maintenance Downtime', value: '3%' },
  { metric: 'Total Maintenance Cost', value: '$15,000' },
  { metric: 'Tools Reaching End-of-Life', value: '5' },
]

// New data for the heatmap
const heatmapData = [
  { hour: '00:00', Mon: 3, Tue: 4, Wed: 5, Thu: 6, Fri: 5, Sat: 4, Sun: 3 },
  { hour: '04:00', Mon: 5, Tue: 6, Wed: 7, Thu: 8, Fri: 7, Sat: 6, Sun: 5 },
  { hour: '08:00', Mon: 7, Tue: 8, Wed: 9, Thu: 10, Fri: 9, Sat: 8, Sun: 7 },
  { hour: '12:00', Mon: 9, Tue: 10, Wed: 11, Thu: 12, Fri: 11, Sat: 10, Sun: 9 },
  { hour: '16:00', Mon: 11, Tue: 12, Wed: 13, Thu: 14, Fri: 13, Sat: 12, Sun: 11 },
  { hour: '20:00', Mon: 8, Tue: 9, Wed: 10, Thu: 11, Fri: 10, Sat: 9, Sun: 8 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-900 text-white p-4`}>
        <h1 className="text-2xl font-bold mb-8">Tool Tracker</h1>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('overview')}>
            <BarChart2 className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('scan')}>
            <QrCode className="mr-2 h-4 w-4" />
            QR Scan
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('database')}>
            <Wrench className="mr-2 h-4 w-4" />
            Tool Database
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('analytics')}>
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" className="md:hidden mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">Tool Tracking System</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search tools..." className="pl-8 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-use">In Use</SelectItem>
                  <SelectItem value="maintenance">In Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scan">QR Scan</TabsTrigger>
              <TabsTrigger value="database">Tool Database</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">250</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tools In Use</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">75</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tools Needing Maintenance</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tool Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={toolStatusData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {toolStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={maintenanceData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity Feed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      {toolData.userActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-4">
                          <Avatar>
                            <AvatarFallback>{activity.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{activity.user}</p>
                            <p className="text-sm text-gray-500">{activity.action} - {activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scan">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>QR Code Scanner</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-200 h-64 flex items-center justify-center mb-4">
                        <span className="text-gray-500">Camera View</span>
                      </div>
                      <Button>Simulate Scan</Button>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Tool Details: {toolData.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">Name</h3>
                          <p>{toolData.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Type</h3>
                          <p>{toolData.type}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Status</h3>
                          <Badge className={toolData.status === 'In Use' ? 'bg-green-500' : ''}>{toolData.status}</Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold">Station</h3>
                          <p>{toolData.station}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Total Usage</h3>
                          <p>{toolData.totalUsage} cycles</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Last Maintenance</h3>
                          <p>{toolData.lastMaintenance}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Next Scheduled Maintenance</h3>
                          <p>{toolData.nextScheduledMaintenance}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Health Score</h3>
                          <div className="flex items-center">
                            <Progress value={toolData.healthScore} className="flex-grow mr-2" />
                            <span>{toolData.healthScore}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Tool Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(toolData.specifications).map(([key, value]) => (
                          <div key={key}>
                            <h3 className="font-semibold">{key}</h3>
                            <p>{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Maintenance History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Technician</TableHead>
                            <TableHead>Cost</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {toolData.maintenanceHistory.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>{item.type}</TableCell>
                              <TableCell>{item.technician}</TableCell>
                              <TableCell>${item.cost}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Tool Lifecycle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        {toolData.lifecycle.map((event, index) => (
                          <div key={index} className="mb-4 flex items-center">
                            <div className="absolute left-4 top-0 w-0.5 h-full bg-blue-500" />
                            <div className="relative flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white z-10">
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <p className="font-semibold">{event.date}</p>
                              <p>{event.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Real-time Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        {notifications.map((notification) => (
                          <Alert key={notification.id} className="mb-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>
                              {notification.type === 'warning' && 'Warning'}
                              {notification.type === 'info' && 'Information'}
                              {notification.type === 'error' && 'Error'}
                            </AlertTitle>
                            <AlertDescription>
                              {notification.message}
                              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Usage Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={toolData.usageData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="cycles" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Health Deterioration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={healthData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="health" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>User Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {toolData.userActivity.map((activity, index) => (
                            <TableRow key={index}>
                              <TableCell>{activity.date}</TableCell>
                              <TableCell>{activity.user}</TableCell>
                              <TableCell>{activity.action}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Usage Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
                <Button variant="outline">
                  <Map className="mr-2 h-4 w-4" />
                  View on Floor Map
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Tool Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <Input type="search" placeholder="Search tools..." className="w-full md:w-64 mb-4 md:mb-0" />
                    <div className="flex items-center space-x-2">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Tool ID</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="lastMaintenance">Last Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tool ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Maintenance</TableHead>
                          <TableHead>Next Scheduled Maintenance</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {toolsData.map((tool) => (
                          <TableRow key={tool.id}>
                            <TableCell className="font-medium">{tool.id}</TableCell>
                            <TableCell>
                              <Badge variant={tool.status === 'Available' ? 'default' : tool.status === 'In Use' ? 'secondary' : 'outline'}>
                                {tool.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{tool.lastMaintenance}</TableCell>
                            <TableCell>{tool.nextMaintenance}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceMetrics.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{metric.metric}</span>
                          <span className="font-bold">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tool Health Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Excellent', value: 30, color: '#4CAF50' },
                            { name: 'Good', value: 40, color: '#2196F3' },
                            { name: 'Fair', value: 20, color: '#FFC107' },
                            { name: 'Poor', value: 10, color: '#F44336' },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {toolStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tool Usage Heatmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={heatmapData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="Mon" stackId="1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="Tue" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                          <Area type="monotone" dataKey="Wed" stackId="1" stroke="#ffc658" fill="#ffc658" />
                          <Area type="monotone" dataKey="Thu" stackId="1" stroke="#ff7300" fill="#ff7300" />
                          <Area type="monotone" dataKey="Fri" stackId="1" stroke="#387908" fill="#387908" />
                          <Area type="monotone" dataKey="Sat" stackId="1" stroke="#38abc8" fill="#38abc8" />
                          <Area type="monotone" dataKey="Sun" stackId="1" stroke="#d64161" fill="#d64161" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Cost Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={[
                        { month: 'Jan', cost: 1000 },
                        { month: 'Feb', cost: 1500 },
                        { month: 'Mar', cost: 1200 },
                        { month: 'Apr', cost: 1800 },
                        { month: 'May', cost: 2000 },
                      ]}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="cost" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tool Efficiency Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { tool: 'DR001', efficiency: 85 },
                        { tool: 'DR002', efficiency: 78 },
                        { tool: 'DR003', efficiency: 92 },
                        { tool: 'DR004', efficiency: 88 },
                        { tool: 'DR005', efficiency: 76 },
                      ]}>
                        <XAxis dataKey="tool" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="efficiency" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}