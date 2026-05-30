/**
 * Virtual Care Queue Types
 * Queue management and queue-related interfaces
 */

import { AuditTrail, StatusCode } from "./common";

export enum QueueStatus {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW",
}

export interface QueueEntry extends AuditTrail {
  id: string;
  patientId: string;
  patientName: string;
  queueNumber: number;
  status: QueueStatus;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  checkInTime?: string;
  estimatedWaitTime?: number; // in minutes
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  reason: string;
  consultationType: "GENERAL" | "FOLLOW_UP" | "EMERGENCY";
}

export interface QueueStats {
  totalInQueue: number;
  pending: number;
  ongoing: number;
  averageWaitTime: number;
  completedToday: number;
}

export interface DoctorAvailability {
  doctorId: string;
  doctorName: string;
  isAvailable: boolean;
  currentPatientCount: number;
  estimatedAvailableTime?: string;
  specialization?: string;
}

export interface QueueAssignment {
  queueEntryId: string;
  doctorId: string;
  assignmentTime: string;
  estimatedStartTime: string;
}
