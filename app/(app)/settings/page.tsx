/**
 * Settings Page
 * System settings and configuration
 */

"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input, Select } from "@/components/common";

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">System configuration and preferences</p>
      </div>

      {/* Hospital Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Hospital Information</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input label="Hospital Name" defaultValue="Mutuini Hospital" />
          <Input
            label="Registration Number"
            defaultValue="HOS-REG-2024-001"
          />
          <Input label="Email Address" defaultValue="info@mutuini.health" />
          <Input label="Phone Number" defaultValue="+254-703-456789" />
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </CardBody>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">System Configuration</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Select
            label="Time Zone"
            options={[
              { value: "UTC", label: "UTC" },
              { value: "EAT", label: "East Africa Time (EAT)" },
            ]}
            defaultValue="EAT"
          />
          <Select
            label="Currency"
            options={[
              { value: "KES", label: "Kenyan Shilling (KES)" },
              { value: "USD", label: "US Dollar (USD)" },
            ]}
            defaultValue="KES"
          />
          <Input
            label="Queue Refresh Interval (seconds)"
            type="number"
            defaultValue="30"
          />
          <Button variant="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </CardBody>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium text-gray-900">Session Timeout</p>
              <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
            </div>
            <Input type="number" defaultValue={30} className="w-20" />
          </div>
          <Button variant="primary" onClick={handleSave}>
            Update Security Settings
          </Button>
        </CardBody>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            Third-Party Integrations
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium text-gray-900">TaifaCare API Key</label>
            <Input placeholder="Enter TaifaCare API key" type="password" />
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-900">SHA Integration</label>
            <Input placeholder="Enter SHA integration details" />
          </div>
          <Button variant="primary" onClick={handleSave}>
            Save Integrations
          </Button>
        </CardBody>
      </Card>

      {/* Module Status */}
      <Card>
        <CardBody className="bg-blue-50">
          <p className="text-blue-900 text-sm">
            <strong>Phase 1 Note:</strong> Settings module is a placeholder. Full
            configuration management, email templates, notification settings, and
            advanced security options will be implemented in Phase 2.
          </p>
        </CardBody>
      </Card>

      {/* Success Message */}
      {saveSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}
