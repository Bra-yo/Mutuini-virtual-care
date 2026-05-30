/**
 * Reports Page
 * System reports and analytics
 */

"use client";

import React from "react";
import { Card, CardBody, Button } from "@/components/common";

export default function ReportsPage() {
  const reportTypes = [
    {
      name: "Consultation Report",
      description: "Summary of all consultations",
      icon: "📊",
    },
    {
      name: "Patient Statistics",
      description: "Patient registration and demographics",
      icon: "👥",
    },
    {
      name: "Doctor Performance",
      description: "Doctor activity and metrics",
      icon: "👨‍⚕️",
    },
    { name: "Queue Analytics", description: "Queue statistics and trends", icon: "📋" },
    {
      name: "Health Monitoring",
      description: "Vital signs and alert trends",
      icon: "⚕️",
    },
    { name: "CHP Performance", description: "Community health promoter metrics", icon: "🤝" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and view system reports</p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <Card key={report.name} hover>
            <CardBody className="text-center">
              <div className="text-4xl mb-3">{report.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                Generate
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {[
              "Consultation Report (May 2024)",
              "Patient Statistics (May 2024)",
              "Doctor Performance (April 2024)",
            ].map((report) => (
              <div
                key={report}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-900">{report}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Module Status */}
      <Card>
        <CardBody className="bg-blue-50">
          <p className="text-blue-900 text-sm">
            <strong>Phase 1 Note:</strong> Reports module is a placeholder.
            Advanced analytics, scheduled reports, and export functionality will
            be implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
