/**
 * Dashboard Page
 * Main dashboard and overview
 */

import React from "react";
import { Card, CardBody, Badge } from "@/components/common";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to Mutuini Virtual Care Portal</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Patients Registered", value: "2,145", color: "primary" },
          { label: "In Queue", value: "23", color: "warning" },
          { label: "Active Consultations", value: "8", color: "success" },
          { label: "Today's Completed", value: "156", color: "info" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Register Patient",
              "Check Queue",
              "View Reports",
              "Assign Doctor",
              "Monitor Alerts",
              "Manage Settings",
            ].map((action) => (
              <button
                key={action}
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-medium transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-900">Patient Consultation</p>
                  <p className="text-sm text-gray-600">
                    Patient #000{i} completed consultation
                  </p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
