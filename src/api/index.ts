import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchOrganizations = () => 
  api.get('/organizations').then(response => response.data);

export const fetchNetworks = (orgId: string) => 
  api.get(`/networks/${orgId}`).then(response => response.data);

export const fetchNetworkHealth = (networkId: string) => 
  api.get(`/networks/${networkId}/health`).then(response => response.data);

export const fetchClients = (networkId: string) => 
  api.get(`/networks/${networkId}/clients`).then(response => response.data);

export const fetchLatencyStats = (networkId: string) => 
  api.get(`/networks/${networkId}/latency`).then(response => response.data);

export const fetchSecurityEvents = (networkId: string) => 
  api.get(`/networks/${networkId}/security/events`).then(response => response.data);

export const fetchDeviceStatus = (serial: string) => 
  api.get(`/devices/${serial}/status`).then(response => response.data);

export const fetchVpnStatus = (orgId: string) => 
  api.get(`/organizations/${orgId}/vpn/status`).then(response => response.data); 