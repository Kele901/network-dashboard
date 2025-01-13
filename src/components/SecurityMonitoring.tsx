import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  AlertTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';

interface SecurityEvent {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  source: string;
}

interface SecurityMetric {
  name: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 1,
    type: 'Intrusion Detection',
    severity: 'high',
    message: 'Multiple failed login attempts detected',
    timestamp: '2 minutes ago',
    source: '192.168.1.105'
  },
  {
    id: 2,
    type: 'Malware Detection',
    severity: 'medium',
    message: 'Suspicious file activity detected',
    timestamp: '15 minutes ago',
    source: '192.168.1.110'
  },
  {
    id: 3,
    type: 'Policy Violation',
    severity: 'low',
    message: 'Unauthorized port access attempt',
    timestamp: '1 hour ago',
    source: '192.168.1.115'
  }
];

const securityMetrics: SecurityMetric[] = [
  { name: 'Firewall Status', value: 100, status: 'good' },
  { name: 'VPN Security', value: 95, status: 'good' },
  { name: 'Endpoint Protection', value: 85, status: 'warning' },
  { name: 'Data Encryption', value: 100, status: 'good' }
];

const SecurityMonitoring = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#4caf50';
      case 'warning':
        return '#ff9800';
      case 'critical':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert severity="info">
          <AlertTitle>Security Status</AlertTitle>
          Network security is currently at optimal levels. Last scan completed 5 minutes ago.
        </Alert>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Security Metrics</Typography>
            <List>
              {securityMetrics.map((metric, index) => (
                <React.Fragment key={metric.name}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={metric.name}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ flexGrow: 1, mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={metric.value}
                                sx={{
                                  height: 8,
                                  borderRadius: 5,
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: getMetricColor(metric.status)
                                  }
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {metric.value}%
                            </Typography>
                          </Box>
                        </Box>
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
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Security Events</Typography>
            <List>
              {mockSecurityEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip
                            label={event.severity.toUpperCase()}
                            color={getSeverityColor(event.severity)}
                            size="small"
                          />
                          <Typography variant="subtitle2">{event.type}</Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {event.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Source: {event.source} • {event.timestamp}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SecurityMonitoring; 