/**
 * Doctor Types
 * Doctor profile, availability, and assignment-related interfaces
 */

import { User, AuditTrail } from "./index";

export interface Doctor extends User {
  licenseNumber: string;
  specialization: string;
  qualifications: string[];
  registrationNumber: string;
  yearsOfExperience: number;
}

export interface DoctorProfile extends Doctor {
  bio?: string;
  consultationFee?: number;
  availability: AvailabilitySchedule[];
  ratings?: DoctorRating;
  totalConsultations: number;
}

export interface AvailabilitySchedule extends AuditTrail {
  id: string;
  doctorId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

export interface DoctorRating extends AuditTrail {
  doctorId: string;
  averageRating: number; // 1-5
  totalReviews: number;
  reviewCount: Record<number, number>; // Rating => Count
}

export interface DoctorAssignment {
  queueEntryId: string;
  patientId: string;
  doctorId: string;
  assignmentTime: string;
  startTime?: string;
  endTime?: string;
  status: "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export interface DoctorWorkload {
  doctorId: string;
  currentlyOnline: boolean;
  activeConsultations: number;
  pendingPatients: number;
  completedToday: number;
  averageConsultationTime: number; // in minutes
}
