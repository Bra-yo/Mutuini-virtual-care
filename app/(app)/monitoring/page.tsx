/**
 * Monitoring Page
 * Virtual patient monitoring and alerts
 */

"use client";

import React from "react";
import { Card, CardBody, Badge, Button, Alert } from "@/components/common";

export default function MonitoringPage() {
  const alerts = [
    {
      id: "A001",
      patient: "John Doe",
      type: "HIGH_BLOOD_PRESSURE",
      severity: "HIGH",
      message: "BP reading 160/100",
      time: "2 minutes ago",
    },
    {
      id: "A002",
      patient: "Jane Smith",
      type: "LOW_OXYGEN",
      severity: "CRITICAL",
      message: "SpO2 reading 88%",
      time: "5 minutes ago",
    },
  ];

  const severityColors: Record<
    string,
    "success" | "warning" | "danger" | "info"
  > = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "danger",
    CRITICAL: "danger",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Virtual Monitoring</h1>
        <p className="text-gray-600 mt-1">Patient vital signs and health alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Patients Monitored", value: "234" },
          { label: "Active Alerts", value: "12" },
          { label: "Critical Alerts", value: "3" },
          { label: "Yesterday Readings", value: "2,145" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Critical Alerts */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                type={alert.severity === "CRITICAL" ? "error" : "warning"}
                message={`${alert.patient} - ${alert.message} (${alert.time})`}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Monitored Patients */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Vital Signs
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>John Doe - BP: 140/90, HR: 78, SpO2: 98%</span>
              <Badge variant="warning">Review</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Jane Smith - BP: 120/80, HR: 72, SpO2: 97%</span>
              <Badge variant="success">Normal</Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Module Status */}
      <Card>
        <CardBody className="bg-blue-50">
          <p className="text-blue-900 text-sm">
            <strong>Phase 1 Note:</strong> Monitoring module is a placeholder.
            Real-time vital signs collection, alert thresholds, and trend analysis
            will be implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
