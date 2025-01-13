import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  ipAddress: string;
  lastSeen: string;
  manufacturer: string;
  bandwidth: string;
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Main Server',
    type: 'Server',
    status: 'online',
    ipAddress: '192.168.1.100',
    lastSeen: 'Active now',
    manufacturer: 'Dell',
    bandwidth: '2.4 Gbps'
  },
  {
    id: '2',
    name: 'Reception Printer',
    type: 'Printer',
    status: 'warning',
    ipAddress: '192.168.1.101',
    lastSeen: '5 mins ago',
    manufacturer: 'HP',
    bandwidth: '100 Mbps'
  },
  {
    id: '3',
    name: 'Security Camera',
    type: 'IoT',
    status: 'online',
    ipAddress: '192.168.1.102',
    lastSeen: 'Active now',
    manufacturer: 'Axis',
    bandwidth: '500 Mbps'
  }
];

const DeviceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, deviceId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDevice(deviceId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDevice(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredDevices = mockDevices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ipAddress.includes(searchTerm) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Device Management</Typography>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search devices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Device Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Last Seen</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Bandwidth</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={device.status}
                      color={getStatusColor(device.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{device.ipAddress}</TableCell>
                  <TableCell>{device.lastSeen}</TableCell>
                  <TableCell>{device.manufacturer}</TableCell>
                  <TableCell>{device.bandwidth}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, device.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Configure</MenuItem>
          <MenuItem onClick={handleMenuClose}>View History</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default DeviceManagement; 