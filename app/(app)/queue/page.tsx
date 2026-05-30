/**
 * Queue Page
 * Virtual care queue management
 */

"use client";

import React from "react";
import { Card, CardBody, Badge, Button } from "@/components/common";

export default function QueuePage() {
  const queueEntries = [
    {
      id: "Q001",
      patientName: "John Doe",
      queueNo: 1,
      status: "PENDING",
      priority: "MEDIUM",
      checkInTime: "10:30 AM",
    },
    {
      id: "Q002",
      patientName: "Jane Smith",
      queueNo: 2,
      status: "ONGOING",
      priority: "HIGH",
      checkInTime: "10:45 AM",
    },
  ];

  const statusColors: Record<string, "success" | "warning" | "danger" | "info"> = {
    PENDING: "warning",
    ONGOING: "info",
    COMPLETED: "success",
    CANCELLED: "danger",
  };

  const priorityColors: Record<string, "success" | "warning" | "danger" | "info"> = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "danger",
    URGENT: "danger",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Virtual Care Queue</h1>
        <Button variant="primary">+ Add to Queue</Button>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total in Queue", value: "12" },
          { label: "Pending", value: "7" },
          { label: "In Progress", value: "3" },
          { label: "Avg Wait Time", value: "18 min" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Queue List */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Queue</h2>
          <div className="space-y-3">
            {queueEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-blue-600 w-12 text-center">
                      {entry.queueNo}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{entry.patientName}</p>
                      <p className="text-sm text-gray-600">
                        Check-in: {entry.checkInTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusColors[entry.status] || "info"}>
                    {entry.status}
                  </Badge>
                  <Badge variant={priorityColors[entry.priority] || "warning"}>
                    {entry.priority}
                  </Badge>
                  {entry.status === "PENDING" && (
                    <Button variant="outline" size="sm">
                      Assign Doctor
                    </Button>
                  )}
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
            <strong>Phase 1 Note:</strong> This module is a placeholder. Doctor
            auto-assignment, real-time updates, and queue analytics will be
            implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
