/**
 * Doctors Page
 * Doctor management and assignments
 */

"use client";

import React from "react";
import { Card, CardBody, Badge, Button } from "@/components/common";

export default function DoctorsPage() {
  const doctors = [
    {
      id: "D001",
      name: "Dr. James Kipchoge",
      specialization: "General Practitioner",
      status: "ONLINE",
      activeConsultations: 2,
    },
    {
      id: "D002",
      name: "Dr. Emily Mwangi",
      specialization: "Pediatrician",
      status: "ONLINE",
      activeConsultations: 1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
        <Button variant="primary">+ Add Doctor</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Doctors", value: "24" },
          { label: "Online Now", value: "18" },
          { label: "Active Consultations", value: "12" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Doctors List */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Registered Doctors</h2>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">
                    Active Consultations: {doctor.activeConsultations}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={doctor.status === "ONLINE" ? "success" : "warning"}
                  >
                    {doctor.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Profile
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
            <strong>Phase 1 Note:</strong> Doctor management is a placeholder.
            Full profile management, availability scheduling, and ratings will be
            implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
