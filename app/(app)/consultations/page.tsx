/**
 * Consultations Page
 * Teleconsultation notes and history
 */

"use client";

import React from "react";
import { Card, CardBody, Badge, Button } from "@/components/common";

export default function ConsultationsPage() {
  const consultations = [
    {
      id: "C001",
      patientName: "John Doe",
      doctorName: "Dr. James Kipchoge",
      date: "2024-05-28",
      type: "GENERAL",
      status: "COMPLETED",
      notes: "Follow-up consultation",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
        <p className="text-gray-600 mt-1">Teleconsultation notes and records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Consultations", value: "1,245" },
          { label: "This Month", value: "312" },
          { label: "This Week", value: "87" },
          { label: "Today", value: "12" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody className="space-y-2">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Consultations List */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Consultation Records
          </h2>
          <div className="space-y-3">
            {consultations.map((consult) => (
              <div
                key={consult.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{consult.patientName}</p>
                  <p className="text-sm text-gray-600">
                    {consult.doctorName} • {consult.date}
                  </p>
                  <p className="text-sm text-gray-500">{consult.notes}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{consult.status}</Badge>
                  <Button variant="outline" size="sm">
                    View Details
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
            <strong>Phase 1 Note:</strong> Consultations module is a placeholder.
            Full note creation, diagnoses, prescriptions, and follow-up management
            will be implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
