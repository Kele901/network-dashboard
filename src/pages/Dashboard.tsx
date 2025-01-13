import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Alert, Tabs, Tab, Paper } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import DeviceManagement from '../components/DeviceManagement';
import SecurityMonitoring from '../components/SecurityMonitoring';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [networkHealth] = useState({
    status: 'healthy',
    uptime: '99.9%',
    bandwidth: '1.2 Gbps',
    activeConnections: 245
  });

  const [deviceTypes] = useState({
    labels: ['Laptops', 'Smartphones', 'Tablets', 'IoT Devices', 'Servers'],
    data: [30, 45, 15, 25, 10]
  });

  const [bandwidthUsage] = useState({
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    download: [20, 15, 60, 85, 75, 45],
    upload: [10, 8, 30, 40, 35, 20]
  });

  const [locationInfo] = useState({
    name: 'London HQ',
    address: 'Central London, UK',
    timezone: 'GMT/BST',
    coordinates: '51.5074° N, 0.1278° W',
    networkRegion: 'Europe/London',
    buildingType: 'Corporate Office',
    floorCount: 5,
    networkZone: 'Primary Data Center',
    ipAddress: '192.168.1.100'
  });

  const [recentAlerts] = useState([
    {
      id: 1,
      severity: 'error',
      message: 'High CPU usage detected on Server 3',
      timestamp: '10 minutes ago'
    },
    {
      id: 2,
      severity: 'warning',
      message: 'Bandwidth threshold reached on Floor 2',
      timestamp: '25 minutes ago'
    },
    {
      id: 3,
      severity: 'info',
      message: 'System update completed successfully',
      timestamp: '1 hour ago'
    }
  ]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const deviceTypeChart = {
    labels: deviceTypes.labels,
    datasets: [
      {
        data: deviceTypes.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const bandwidthChart = {
    labels: bandwidthUsage.labels,
    datasets: [
      {
        label: 'Download',
        data: bandwidthUsage.download,
        borderColor: '#36A2EB',
        fill: false
      },
      {
        label: 'Upload',
        data: bandwidthUsage.upload,
        borderColor: '#FF6384',
        fill: false
      }
    ]
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Overview" />
        <Tab label="Devices" />
        <Tab label="Security" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Network Health Overview */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Network Health</Typography>
                <Typography variant="h4" color="primary">{networkHealth.uptime}</Typography>
                <Typography color="textSecondary">Uptime</Typography>
                <Box mt={2}>
                  <Typography variant="body2">
                    Status: {networkHealth.status}
                  </Typography>
                  <Typography variant="body2">
                    Bandwidth: {networkHealth.bandwidth}
                  </Typography>
                  <Typography variant="body2">
                    Active Connections: {networkHealth.activeConnections}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Alerts Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Alerts</Typography>
                <Box>
                  {recentAlerts.map((alert) => (
                    <Alert 
                      key={alert.id} 
                      severity={alert.severity as 'error' | 'warning' | 'info' | 'success'}
                      sx={{ mb: 1.5 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">{alert.message}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                          {alert.timestamp}
                        </Typography>
                      </Box>
                    </Alert>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Device Distribution */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Device Distribution</Typography>
                <Box height={300}>
                  <Pie data={deviceTypeChart} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Bandwidth Usage */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Bandwidth Usage</Typography>
                <Box height={300}>
                  <Line data={bandwidthChart} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Location Information */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Location Information
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {locationInfo.name}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    p: 1, 
                    borderRadius: 1,
                    height: 'fit-content'
                  }}>
                    <Typography variant="body2">
                      {locationInfo.networkZone}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 1.5, 
                      bgcolor: 'background.default',
                      border: 1,
                      borderColor: 'divider'
                    }}>
                      <Typography variant="body2" color="textSecondary">
                        Building Type
                      </Typography>
                      <Typography variant="body1">
                        {locationInfo.buildingType}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 1.5, 
                      bgcolor: 'background.default',
                      border: 1,
                      borderColor: 'divider'
                    }}>
                      <Typography variant="body2" color="textSecondary">
                        Floor Count
                      </Typography>
                      <Typography variant="body1">
                        {locationInfo.floorCount} Floors
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>📍</span> {locationInfo.address}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>🕒</span> {locationInfo.timezone}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>🌍</span> {locationInfo.coordinates}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>🌐</span> {locationInfo.networkRegion}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>🔌</span> {locationInfo.ipAddress}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box 
                      component="iframe"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1377,51.5000,-0.1177,51.5150&layer=mapnik&marker=51.5074,-0.1278"
                      sx={{
                        width: '100%',
                        height: 200,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1
                      }}
                      frameBorder="0"
                      title="London HQ Location"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <DeviceManagement />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <SecurityMonitoring />
      </TabPanel>
    </Box>
  );
};

export default Dashboard; 