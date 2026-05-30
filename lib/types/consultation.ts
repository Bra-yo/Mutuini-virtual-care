/**
 * Consultation Types
 * Teleconsultation notes, diagnoses, and prescriptions
 */

import { AuditTrail, StatusCode } from "./common";

export interface Consultation extends AuditTrail {
  id: string;
  patientId: string;
  doctorId: string;
  startTime: string;
  endTime?: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  type: "GENERAL" | "FOLLOW_UP" | "EMERGENCY";
  notes?: string;
  diagnosis?: Diagnosis[];
  prescriptions?: Prescription[];
  attachments?: string[]; // URLs or file paths
}

export interface Diagnosis extends AuditTrail {
  id: string;
  consultationId: string;
  icdCode: string;
  description: string;
  isPrimary: boolean;
  severity?: "MILD" | "MODERATE" | "SEVERE";
}

export interface Prescription extends AuditTrail {
  id: string;
  consultationId: string;
  medicationName: string;
  dosage: string;
  frequency: string; // e.g., "Twice daily", "Once before bed"
  duration: string; // e.g., "7 days", "2 weeks"
  instructions?: string;
  quantity: number;
  refillsAllowed?: number;
}

export interface ConsultationNotes {
  presentingComplaints: string;
  historyOfPresentIllness: string;
  pastMedicalHistory?: string;
  medications?: string;
  allergies?: string;
  physicalExamination: string;
  assessment: string;
  plan: string;
  followUp?: {
    required: boolean;
    timeframe?: string;
    type?: "PHONE" | "IN_PERSON" | "VIDEO";
  };
}

export interface ConsultationFilter {
  patientId?: string;
  doctorId?: string;
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}
