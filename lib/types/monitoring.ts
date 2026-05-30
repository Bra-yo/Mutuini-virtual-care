/**
 * Virtual Monitoring Types
 * Patient vital signs, monitoring, and alerts
 */

import { AuditTrail } from "./common";

export interface VitalSigns extends AuditTrail {
  id: string;
  patientId: string;
  temperature: number; // Celsius
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number; // bpm
  respiratoryRate: number; // breaths per minute
  oxygenSaturation: number; // SpO2 %
  bloodGlucose?: number; // mg/dL
  weight?: number; // kg
  height?: number; // cm
  notes?: string;
}

export interface MonitoringAlert extends AuditTrail {
  id: string;
  patientId: string;
  vitalSignsId?: string;
  alertType: "CRITICAL" | "WARNING" | "INFO";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  isResolved: boolean;
  resolvedAt?: string;
  acknowledgedBy?: string;
  followUpAction?: string;
}

export interface MonitoringSchedule extends AuditTrail {
  id: string;
  patientId: string;
  frequency: "HOURLY" | "EVERY_4_HOURS" | "DAILY" | "WEEKLY";
  monitoringType: "AUTOMATIC" | "MANUAL" | "DEVICE";
  startDate: string;
  endDate?: string;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
  parameters: string[]; // e.g., ["temperature", "bloodPressure", "heartRate"]
}

export interface VitalSignsThreshold {
  patientId: string;
  parameterName: string;
  lowerBound?: number;
  upperBound?: number;
  criticalLower?: number;
  criticalUpper?: number;
}

export interface MonitoringReport {
  patientId: string;
  periodStart: string;
  periodEnd: string;
  totalReadings: number;
  alertsGenerated: number;
  criticalAlerts: number;
  averageVitalSigns: Partial<VitalSigns>;
  trends: Record<string, "IMPROVING" | "STABLE" | "DECLINING">;
}
