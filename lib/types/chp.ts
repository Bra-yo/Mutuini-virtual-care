/**
 * Community Health Promoter (CHP) Types
 * CHP assignment, follow-up, and community health management
 */

import { User, AuditTrail } from "./index";

export interface CHP extends User {
  licenseNumber: string;
  communityArea: string;
  registrationNumber: string;
  yearsOfExperience: number;
}

export interface CHPAssignment extends AuditTrail {
  id: string;
  chpId: string;
  patientId: string;
  assignmentDate: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  reason: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  targetCompletionDate?: string;
}

export interface FollowUpTask extends AuditTrail {
  id: string;
  chpAssignmentId: string;
  chpId: string;
  patientId: string;
  description: string;
  taskType: "HEALTH_EDUCATION" | "MEDICATION_ADHERENCE" | "VITAL_MONITORING" | "COUNSELING" | "HOME_VISIT";
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
  completionDate?: string;
  notes?: string;
  attachments?: string[];
}

export interface CHPFollowUpReport {
  id: string;
  chpId: string;
  patientId: string;
  followUpTaskId: string;
  reportDate: string;
  findings: string;
  patientAdherence: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  challenges?: string;
  recommendations?: string;
  nextFollowUpDate?: string;
}

export interface CHPWorkload {
  chpId: string;
  assignedPatients: number;
  activeFollowUps: number;
  completedThisMonth: number;
  overdueTasks: number;
}

export interface CommunityHealthIndicators {
  chpId: string;
  periodStart: string;
  periodEnd: string;
  healthEducationSessions: number;
  homeVisits: number;
  medicationAdherenceRate: number;
  patientSatisfactionScore: number;
}
