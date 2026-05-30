/**
 * Audit Types
 * Audit logs, activity tracking, and compliance
 */

export enum AuditAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  EXPORT = "EXPORT",
  REPORT_GENERATED = "REPORT_GENERATED",
  PERMISSION_CHANGED = "PERMISSION_CHANGED",
  DATA_ACCESSED = "DATA_ACCESSED",
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: AuditAction;
  resourceType: string; // e.g., "PATIENT", "CONSULTATION", "USER"
  resourceId: string;
  changes?: Record<string, { oldValue: unknown; newValue: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  status: "SUCCESS" | "FAILURE";
  errorMessage?: string;
}

export interface AuditLogFilter {
  userId?: string;
  action?: AuditAction;
  resourceType?: string;
  resourceId?: string;
  startDate?: string;
  endDate?: string;
  status?: "SUCCESS" | "FAILURE";
}

export interface AuditLogReport {
  periodStart: string;
  periodEnd: string;
  totalActions: number;
  actionBreakdown: Record<AuditAction, number>;
  userActivity: {
    userId: string;
    email: string;
    actionCount: number;
    lastAction: string;
  }[];
  failedActions: number;
  securityEvents: number;
}

export interface DataAccessLog extends AuditLog {
  dataClassification: "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "RESTRICTED";
  accessLevel: "VIEW" | "DOWNLOAD" | "EXPORT" | "PRINT";
  dataSize?: number; // in bytes
  purposeOfAccess?: string;
}
