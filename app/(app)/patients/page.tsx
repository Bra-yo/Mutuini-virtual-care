/**
 * Patients Page
 * Patient management and master register
 */

"use client";

import React, { useState } from "react";
import { Card, CardBody, Button, Input, Badge, Table } from "@/components/common";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder data
  const patients = [
    {
      id: "1",
      name: "John Doe",
      registrationNo: "MUT-001",
      phone: "+254712345678",
      lastConsultation: "2024-05-28",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Jane Smith",
      registrationNo: "MUT-002",
      phone: "+254712345679",
      lastConsultation: "2024-05-27",
      status: "ACTIVE",
    },
  ];

  const columns = [
    { key: "registrationNo" as const, label: "Registration No." },
    { key: "name" as const, label: "Patient Name" },
    { key: "phone" as const, label: "Phone" },
    { key: "lastConsultation" as const, label: "Last Consultation" },
    {
      key: "status" as const,
      label: "Status",
      render: (value: unknown) => (
        <Badge variant={value === "ACTIVE" ? "success" : "warning"}>
          {String(value)}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
        <Button variant="primary">+ Register Patient</Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardBody className="flex gap-4">
          <Input
            placeholder="Search by name, ID, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline">Filter</Button>
        </CardBody>
      </Card>

      {/* Master Register Table */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Patient Master Register
          </h2>
          <div className="overflow-x-auto">
            <Table columns={columns} data={patients} keyField="id" />
          </div>
        </CardBody>
      </Card>

      {/* Module Status */}
      <Card>
        <CardBody className="bg-blue-50">
          <p className="text-blue-900 text-sm">
            <strong>Phase 1 Note:</strong> This module is a placeholder. Full
            patient registration, TaifaCare/SHA linkage, and advanced search will
            be implemented in Phase 2.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
