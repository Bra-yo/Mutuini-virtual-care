/**
 * Patient Types
 * Patient registration, master register, and patient-related interfaces
 */

import { AuditTrail, StatusCode } from "./common";

export interface Patient extends AuditTrail {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  phone: string;
  nationalId: string;
  kraPin?: string;
  status: StatusCode;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  medicalHistory?: string[];
  allergies?: string[];
  insuranceInfo?: InsuranceInfo;
}

export interface InsuranceInfo {
  provider: string; // e.g., NHIF, SHA, Private Insurance
  memberId: string;
  groupNumber?: string;
  expiryDate?: string;
  coverageType?: string;
}

export interface PatientRegistration {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  phone: string;
  nationalId: string;
  kraPin?: string;
  password: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface PatientMasterRegisterEntry extends Patient {
  registrationNumber: string;
  lastConsultation?: string;
  totalConsultations: number;
  taifaCareLinked: boolean;
  shaLinked: boolean;
}

export interface PatientSearchFilter {
  query?: string;
  status?: StatusCode;
  startDate?: string;
  endDate?: string;
  insuranceProvider?: string;
}
