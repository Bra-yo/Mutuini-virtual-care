/**
 * Audit Logs Page
 * System audit trail and compliance
 */

"use client";

import React from "react";
import { Card, CardBody, Badge, Button } from "@/components/common";

export default function AuditPage() {
  const logs = [
    {
      id: "1",
      timestamp: "2024-05-28 10:45:23",
      user: "Dr. James Kipchoge",
      action: "UPDATE",
      resource: "Patient #001",
      status: "SUCCESS",
    },
    {
      id: "2",
      timestamp: "2024-05-28 10:30:15",
      user: "Receptionist",
      action: "CREATE",
      resource: "Queue Entry",
      status: "SUCCESS",
    },
    {
      id: "3",
      timestamp: "2024-05-28 10:15:42",
      user: "Admin",
      action: "DELETE",
      resource: "Consultation #234",
      status: "FAILURE",
    },
  ];

  const actionColors: Record<string, "success" | "warning" | "danger" | "info"> = {
    CREATE: "success",
    READ: "info",
    UPDATE: "warning",
    DELETE: "danger",
  };

  const statusColors: Record<string, "success" | "danger"> = {
    SUCCESS: "success",
    FAILURE: "danger",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-1">System activity and compliance tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Actions", value: "12,456" },
          { label: "This Month", value: "3,245" },
          { label: "Failed Actions", value: "23" },
          { label: "Users", value: "145" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Timestamp
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    User
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Action
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Resource
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{log.timestamp}</td>
                    <td className="px-4 py-3">{log.user}</td>
                    <td className="px-4 py-3">
                      <Badge variant={actionColors[log.action] || "info"}>
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{log.resource}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusColors[log.status] || "info"}>
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Module Status */}
      <Card>
        <CardBody className="bg-blue-50">
          <p className="text-blue-900 text-sm">
            <strong>Phase 1 Note:</strong> Audit logs are a placeholder. Detailed
            audit trails, filtering, search, and compliance reports will be
            implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
