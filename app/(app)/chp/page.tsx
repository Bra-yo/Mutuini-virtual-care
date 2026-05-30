/**
 * CHP Management Page
 * Community Health Promoter assignment and follow-ups
 */

"use client";

import React from "react";
import { Card, CardBody, Badge, Button } from "@/components/common";

export default function CHPPage() {
  const chpList = [
    {
      id: "CHP001",
      name: "Peter Kiplagat",
      area: "Kirigiti Ward",
      assignedPatients: 45,
      status: "ACTIVE",
    },
    {
      id: "CHP002",
      name: "Susan Kipchoge",
      area: "Suguta Ward",
      assignedPatients: 38,
      status: "ACTIVE",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">CHP Management</h1>
        <Button variant="primary">+ Assign CHP</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total CHPs", value: "12" },
          { label: "Active Assignments", value: "89" },
          { label: "Follow-ups Today", value: "24" },
          { label: "Completion Rate", value: "94%" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* CHPs List */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Community Health Promoters
          </h2>
          <div className="space-y-3">
            {chpList.map((chp) => (
              <div
                key={chp.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{chp.name}</p>
                  <p className="text-sm text-gray-600">Area: {chp.area}</p>
                  <p className="text-sm text-gray-500">
                    Assigned Patients: {chp.assignedPatients}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{chp.status}</Badge>
                  <Button variant="outline" size="sm">
                    Manage
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
            <strong>Phase 1 Note:</strong> CHP module is a placeholder. Full
            assignment management, follow-up tracking, and health education
            reporting will be implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
