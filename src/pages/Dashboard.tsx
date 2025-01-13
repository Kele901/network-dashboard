import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, CircularProgress, Card, CardContent, List, ListItem, ListItemText, Divider, Box, Chip } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'laptop' | 'smartphone' | 'tablet' | 'iot' | 'other';
  status: 'online' | 'idle' | 'offline';
  ipAddress: string;
  lastSeen: string;
}

interface SecurityAlert {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
}

interface AccessPoint {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  clients: number;
  channel: number;
  band: '2.4GHz' | '5GHz';
  signalStrength: number;
  lastReboot: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState<any>(null);
  const [latencyData, setLatencyData] = useState<any>(null);
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([]);
  const [trafficData, setTrafficData] = useState<any>(null);
  const [deviceTypes, setDeviceTypes] = useState<any>(null);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [hqInfo, setHqInfo] = useState({
    name: 'London HQ',
    location: 'London, United Kingdom',
    timezone: 'GMT+0',
    networkStatus: 'active',
    ipAddress: '192.168.1.1'
  });
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Mock data for now
        setHealthData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [98, 97, 99, 96, 98, 97, 99]
        });
        
        setLatencyData({
          timestamps: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [15, 18, 12, 25, 14, 16, 13]
        });

        // Mock traffic data
        setTrafficData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [120, 145, 132, 168, 140, 90, 110]
        });

        // Mock device types data
        setDeviceTypes({
          labels: ['Laptops', 'Smartphones', 'IoT Devices', 'Tablets', 'Others'],
          data: [20, 12, 5, 3, 2]
        });

        // Mock security alerts
        setSecurityAlerts([
          {
            id: 1,
            type: 'Intrusion Detection',
            severity: 'high',
            message: 'Unusual login attempt detected',
            timestamp: '2 mins ago'
          },
          {
            id: 2,
            type: 'Malware',
            severity: 'medium',
            message: 'Suspicious outbound traffic blocked',
            timestamp: '15 mins ago'
          },
          {
            id: 3,
            type: 'System',
            severity: 'low',
            message: 'Firmware update available',
            timestamp: '1 hour ago'
          }
        ]);

        // Mock connected devices data
        setConnectedDevices([
          {
            id: '1',
            name: "John's Laptop",
            type: 'laptop',
            status: 'online',
            ipAddress: '192.168.1.101',
            lastSeen: 'Active now'
          },
          {
            id: '2',
            name: 'Reception iPad',
            type: 'tablet',
            status: 'online',
            ipAddress: '192.168.1.102',
            lastSeen: 'Active now'
          },
          {
            id: '3',
            name: 'Meeting Room Display',
            type: 'iot',
            status: 'idle',
            ipAddress: '192.168.1.103',
            lastSeen: '5 mins ago'
          }
        ]);

        // Mock AP data
        setAccessPoints([
          {
            id: 'ap1',
            name: 'AP-Floor1-Main',
            location: 'Main Office Area',
            status: 'active',
            clients: 15,
            channel: 6,
            band: '2.4GHz',
            signalStrength: 85,
            lastReboot: '7 days ago'
          },
          {
            id: 'ap2',
            name: 'AP-Floor1-Meeting',
            location: 'Conference Rooms',
            status: 'active',
            clients: 8,
            channel: 36,
            band: '5GHz',
            signalStrength: 92,
            lastReboot: '3 days ago'
          },
          {
            id: 'ap3',
            name: 'AP-Floor2-East',
            location: 'East Wing',
            status: 'active',
            clients: 12,
            channel: 11,
            band: '2.4GHz',
            signalStrength: 78,
            lastReboot: '5 days ago'
          }
        ]);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#4caf50';
      case 'idle':
        return '#ff9800';
      case 'offline':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return '💻';
      case 'smartphone':
        return '📱';
      case 'tablet':
        return '📱';
      case 'iot':
        return '🔌';
      default:
        return '📱';
    }
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 80) return '#4caf50';
    if (strength >= 60) return '#ff9800';
    return '#f44336';
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          boxShadow: 3,
          height: '100%'
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" gutterBottom>Connected Devices</Typography>
                <Typography variant="h4">{connectedDevices.length}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2">
                  Online: {connectedDevices.filter(d => d.status === 'online').length}
                </Typography>
                <Typography variant="body2">
                  Idle: {connectedDevices.filter(d => d.status === 'idle').length}
                </Typography>
              </Box>
            </Box>
            <List sx={{ 
              bgcolor: 'primary.dark',
              borderRadius: 1,
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {connectedDevices.map((device, index) => (
                <React.Fragment key={device.id}>
                  {index > 0 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />}
                  <ListItem sx={{ py: 1 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{getDeviceTypeIcon(device.type)}</span>
                          <Typography variant="body2">{device.name}</Typography>
                          <Chip 
                            label={device.status}
                            size="small"
                            sx={{ 
                              bgcolor: getStatusColor(device.status),
                              color: 'white',
                              ml: 1,
                              height: '20px'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {device.ipAddress} • {device.lastSeen}
                        </Typography>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          bgcolor: 'secondary.main', 
          color: 'secondary.contrastText',
          boxShadow: 3,
          height: '100%'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Headquarters</Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>{hqInfo.name}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>📍 {hqInfo.location}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>🕒 {hqInfo.timezone}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>🌐 IP: {hqInfo.ipAddress}</Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: hqInfo.networkStatus === 'active' ? '#4caf50' : '#f44336',
                fontWeight: 'bold'
              }}
            >
              ● Network {hqInfo.networkStatus.charAt(0).toUpperCase() + hqInfo.networkStatus.slice(1)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Network Health</Typography>
          {healthData && (
            <Line
              data={{
                labels: healthData.labels,
                datasets: [{
                  label: 'Health Score (%)',
                  data: healthData.values,
                  borderColor: '#4caf50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  tension: 0.1,
                  fill: true
                }]
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    min: 90,
                    max: 100
                  }
                }
              }}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Network Latency</Typography>
          {latencyData && (
            <Line
              data={{
                labels: latencyData.timestamps,
                datasets: [{
                  label: 'Latency (ms)',
                  data: latencyData.values,
                  borderColor: '#1976d2',
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  tension: 0.1,
                  fill: true
                }]
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Network Traffic</Typography>
          {trafficData && (
            <Line
              data={{
                labels: trafficData.labels,
                datasets: [{
                  label: 'Traffic (Mbps)',
                  data: trafficData.values,
                  borderColor: '#9c27b0',
                  backgroundColor: 'rgba(156, 39, 176, 0.1)',
                  tension: 0.1,
                  fill: true
                }]
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Device Types</Typography>
          {deviceTypes && (
            <Doughnut
              data={{
                labels: deviceTypes.labels,
                datasets: [{
                  data: deviceTypes.data,
                  backgroundColor: [
                    '#1976d2',
                    '#4caf50',
                    '#ff9800',
                    '#9c27b0',
                    '#757575'
                  ]
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Access Points</Typography>
          <Grid container spacing={2}>
            {accessPoints.map((ap) => (
              <Grid item xs={12} md={4} key={ap.id}>
                <Card sx={{ bgcolor: 'background.paper', height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{ap.name}</Typography>
                      <Chip
                        label={ap.status.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: ap.status === 'active' ? '#4caf50' : '#f44336',
                          color: 'white',
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        📍 Location: {ap.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        👥 Connected Clients: {ap.clients}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📡 Channel: {ap.channel} ({ap.band})
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          📶 Signal Strength:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: getSignalStrengthColor(ap.signalStrength),
                            fontWeight: 'medium'
                          }}
                        >
                          {ap.signalStrength}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        🔄 Last Reboot: {ap.lastReboot}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 1.5 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>Security Alerts</Typography>
          <List dense disablePadding>
            {securityAlerts.map((alert, index) => (
              <React.Fragment key={alert.id}>
                {index > 0 && <Divider />}
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemText
                    sx={{ my: 0 }}
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={alert.severity.toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getSeverityColor(alert.severity),
                            color: 'white',
                            minWidth: 45,
                            height: '18px',
                            '& .MuiChip-label': {
                              px: 0.5,
                              fontSize: '0.7rem',
                              fontWeight: 'bold'
                            }
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {alert.type}:
                          </Typography>
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {alert.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                            {alert.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
} 