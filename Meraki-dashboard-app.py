from flask import Flask, jsonify
from flask_cors import CORS
import meraki
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Meraki dashboard
MERAKI_API_KEY = os.getenv('MERAKI_API_KEY')
dashboard = meraki.DashboardAPI(MERAKI_API_KEY)

@app.route('/api/organizations', methods=['GET'])
def get_organizations():
    try:
        organizations = dashboard.organizations.getOrganizations()
        return jsonify(organizations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/networks/<org_id>', methods=['GET'])
def get_networks(org_id):
    try:
        networks = dashboard.organizations.getOrganizationNetworks(org_id)
        return jsonify(networks)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices/<network_id>', methods=['GET'])
def get_devices(network_id):
    try:
        devices = dashboard.networks.getNetworkDevices(network_id)
        return jsonify(devices)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Network Health and Monitoring
@app.route('/api/networks/<network_id>/health', methods=['GET'])
def get_network_health(network_id):
    try:
        health = dashboard.networks.getNetworkHealthAlerts(network_id)
        return jsonify(health)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/networks/<network_id>/clients', methods=['GET'])
def get_network_clients(network_id):
    try:
        # Get clients from last 24 hours
        timespan = 86400
        clients = dashboard.networks.getNetworkClients(
            network_id,
            timespan=timespan,
            total_pages='all'
        )
        return jsonify(clients)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Wireless Specific Endpoints
@app.route('/api/networks/<network_id>/ssids', methods=['GET'])
def get_wireless_ssids(network_id):
    try:
        ssids = dashboard.wireless.getNetworkWirelessSsids(network_id)
        return jsonify(ssids)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/networks/<network_id>/air-marshal', methods=['GET'])
def get_air_marshal(network_id):
    try:
        rogues = dashboard.wireless.getNetworkWirelessAirMarshal(network_id)
        return jsonify(rogues)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Security Center
@app.route('/api/networks/<network_id>/security/events', methods=['GET'])
def get_security_events(network_id):
    try:
        timespan = 86400  # Last 24 hours
        events = dashboard.networks.getNetworkEvents(
            network_id,
            timespan=timespan,
            productType='security'
        )
        return jsonify(events)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Performance Monitoring
@app.route('/api/networks/<network_id>/latency', methods=['GET'])
def get_latency_stats(network_id):
    try:
        timespan = 86400
        latency = dashboard.networks.getNetworkLatencyStats(
            network_id,
            timespan=timespan
        )
        return jsonify(latency)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Device Management
@app.route('/api/devices/<serial>/uplink', methods=['GET'])
def get_device_uplink(serial):
    try:
        uplink = dashboard.devices.getDeviceUplink(serial)
        return jsonify(uplink)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices/<serial>/status', methods=['GET'])
def get_device_status(serial):
    try:
        status = dashboard.devices.getDeviceStatus(serial)
        return jsonify(status)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# VPN Status
@app.route('/api/organizations/<org_id>/vpn/status', methods=['GET'])
def get_vpn_status(org_id):
    try:
        vpn_status = dashboard.appliance.getOrganizationApplianceVpnStatuses(org_id)
        return jsonify(vpn_status)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
