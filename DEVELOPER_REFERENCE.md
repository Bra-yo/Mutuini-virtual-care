# 👨‍💻 Developer Reference Guide - Mutuini Virtual Care Portal

## Complete API Reference & Development Guide

---

## 📋 Table of Contents
1. [Type System Reference](#type-system-reference)
2. [Service Layer Reference](#service-layer-reference)
3. [Component Library Reference](#component-library-reference)
4. [Hook Reference](#hook-reference)
5. [Utility Functions Reference](#utility-functions-reference)
6. [Common Patterns](#common-patterns)
7. [Code Examples](#code-examples)

---

## Type System Reference

### Location: `/lib/types/`

#### **common.ts** - Common types used across the app
```typescript
export enum UserRole {
  ADMIN = "ADMIN",                    // System administrator
  DOCTOR = "DOCTOR",                  // Medical doctor
  CHP = "CHP",                        // Community health promoter
  NURSE = "NURSE",                    // Nurse
  RECEPTIONIST = "RECEPTIONIST",      // Receptionist
  PATIENT = "PATIENT",                // Patient
  SYSTEM = "SYSTEM"                   // System-generated actions
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

#### **user.ts** - User and authentication
```typescript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthSession {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}
```

#### **patient.ts** - Patient data structures
```typescript
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  email?: string;
  nationalId: string;
  insuranceInfo: InsuranceInfo;
  registeredAt: Date;
}

export interface InsuranceInfo {
  type: 'NHIF' | 'SHA' | 'Private' | 'None';
  memberId: string;
  provider?: string;
  expiryDate?: Date;
}
```

#### **queue.ts** - Queue management
```typescript
export interface QueueEntry {
  id: string;
  patientId: string;
  queueNumber: string;
  status: QueueStatus;
  priorityLevel: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  estimatedWaitTime: number;
}

export enum QueueStatus {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW"
}
```

#### **doctor.ts** - Doctor information
```typescript
export interface Doctor extends User {
  licenseNumber: string;
  specialization: string;
  experience: number;
  qualification: string;
  consultationFee: number;
  isOnline: boolean;
}

export interface DoctorAvailability {
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
```

#### **consultation.ts** - Consultation records
```typescript
export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime?: Date;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
  notes?: ConsultationNotes;
  diagnosis?: Diagnosis[];
  prescriptions?: Prescription[];
}

export interface ConsultationNotes {
  chiefComplaint: string;
  historyOfPresentIllness: string;
  findings: string;
  plan: string;
}
```

#### **monitoring.ts** - Health monitoring
```typescript
export interface VitalSigns {
  patientId: string;
  timestamp: Date;
  temperature: number;
  bloodPressure: {systolic: number; diastolic: number};
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight?: number;
  bloodGlucose?: number;
}

export interface MonitoringAlert {
  id: string;
  patientId: string;
  type: AlertType;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  message: string;
  createdAt: Date;
}
```

#### **chp.ts** - Community Health Promoter
```typescript
export interface CHPAssignment {
  id: string;
  chpId: string;
  patientId: string;
  assignmentDate: Date;
  status: 'Active' | 'Completed' | 'On Hold';
}

export interface FollowUpTask {
  id: string;
  assignmentId: string;
  taskDescription: string;
  dueDate: Date;
  status: 'Pending' | 'Completed';
}
```

#### **audit.ts** - Audit logging
```typescript
export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  changes?: Record<string, any>;
  timestamp: Date;
}

export enum AuditAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}
```

---

## Service Layer Reference

### Location: `/lib/services/`

### **authService**
```typescript
export const authService = {
  // User login
  login: async (email: string, password: string): Promise<AuthSession> => {},
  
  // User registration
  register: async (data: UserRegistration): Promise<User> => {},
  
  // Refresh authentication token
  refreshToken: async (refreshToken: string): Promise<AuthToken> => {},
  
  // Logout user
  logout: async (): Promise<void> => {},
  
  // Verify current session
  verifySession: async (): Promise<AuthSession> => {},
  
  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {},
  
  // Request password reset
  requestPasswordReset: async (email: string): Promise<void> => {},
  
  // Reset password with token
  resetPassword: async (token: string, newPassword: string): Promise<void> => {}
};
```

### **patientService**
```typescript
export const patientService = {
  // Register new patient
  registerPatient: async (data: PatientRegistration): Promise<Patient> => {},
  
  // Get patient by ID
  getPatient: async (patientId: string): Promise<Patient> => {},
  
  // Update patient info
  updatePatient: async (patientId: string, data: Partial<Patient>): Promise<Patient> => {},
  
  // List all patients
  listPatients: async (params: PaginationParams): Promise<Patient[]> => {},
  
  // Get master register
  getMasterRegister: async (params: PaginationParams): Promise<PatientMasterRegisterEntry[]> => {},
  
  // Search patients
  searchPatients: async (query: string): Promise<Patient[]> => {},
  
  // Link TaifaCare
  linkTaifaCare: async (patientId: string, taifacareId: string): Promise<void> => {},
  
  // Link SHA
  linkSHA: async (patientId: string, shaId: string): Promise<void> => {}
};
```

### **queueService**
```typescript
export const queueService = {
  // Add patient to queue
  addToQueue: async (patientId: string, priorityLevel: number): Promise<QueueEntry> => {},
  
  // Get current queue
  getQueue: async (params: PaginationParams): Promise<QueueEntry[]> => {},
  
  // Get specific queue entry
  getQueueEntry: async (queueId: string): Promise<QueueEntry> => {},
  
  // Update queue entry status
  updateQueueEntryStatus: async (queueId: string, status: QueueStatus): Promise<void> => {},
  
  // Get queue statistics
  getQueueStats: async (): Promise<QueueStats> => {},
  
  // Get available doctors
  getAvailableDoctors: async (): Promise<Doctor[]> => {},
  
  // Assign doctor to patient
  assignDoctor: async (queueId: string, doctorId: string): Promise<void> => {},
  
  // Remove from queue
  removeFromQueue: async (queueId: string): Promise<void> => {}
};
```

### **doctorService**
```typescript
export const doctorService = {
  // Get doctor profile
  getDoctorProfile: async (doctorId: string): Promise<Doctor> => {},
  
  // List all doctors
  listDoctors: async (params: PaginationParams): Promise<Doctor[]> => {},
  
  // Update doctor profile
  updateDoctorProfile: async (doctorId: string, data: Partial<Doctor>): Promise<void> => {},
  
  // Get doctor availability
  getDoctorAvailability: async (doctorId: string): Promise<DoctorAvailability[]> => {},
  
  // Set doctor availability
  setDoctorAvailability: async (doctorId: string, schedules: DoctorAvailability[]): Promise<void> => {},
  
  // Get doctor workload
  getDoctorWorkload: async (doctorId: string): Promise<DoctorWorkload> => {},
  
  // Search by specialization
  searchBySpecialization: async (specialization: string): Promise<Doctor[]> => {},
  
  // Get online doctors
  getOnlineDoctors: async (): Promise<Doctor[]> => {},
  
  // Rate doctor
  rateDoctor: async (doctorId: string, rating: number, review: string): Promise<void> => {}
};
```

### **consultationService**
```typescript
export const consultationService = {
  // Create consultation
  createConsultation: async (patientId: string, doctorId: string): Promise<Consultation> => {},
  
  // Get consultation
  getConsultation: async (consultationId: string): Promise<Consultation> => {},
  
  // Update consultation
  updateConsultation: async (consultationId: string, data: Partial<Consultation>): Promise<void> => {},
  
  // Add consultation notes
  addConsultationNotes: async (consultationId: string, notes: ConsultationNotes): Promise<void> => {},
  
  // Add diagnosis
  addDiagnosis: async (consultationId: string, diagnosis: Diagnosis): Promise<void> => {},
  
  // Add prescription
  addPrescription: async (consultationId: string, prescription: Prescription): Promise<void> => {},
  
  // Get patient consultations
  getPatientConsultations: async (patientId: string): Promise<Consultation[]> => {},
  
  // Get doctor consultations
  getDoctorConsultations: async (doctorId: string): Promise<Consultation[]> => {},
  
  // End consultation
  endConsultation: async (consultationId: string): Promise<void> => {}
};
```

### **monitoringService**
```typescript
export const monitoringService = {
  // Record vital signs
  recordVitalSigns: async (vitalSigns: VitalSigns): Promise<void> => {},
  
  // Get patient vital signs
  getPatientVitalSigns: async (patientId: string, limit: number): Promise<VitalSigns[]> => {},
  
  // Get monitoring alerts
  getMonitoringAlerts: async (params: PaginationParams): Promise<MonitoringAlert[]> => {},
  
  // Create alert
  createAlert: async (alert: MonitoringAlert): Promise<void> => {},
  
  // Resolve alert
  resolveAlert: async (alertId: string): Promise<void> => {},
  
  // Create monitoring schedule
  createMonitoringSchedule: async (schedule: MonitoringSchedule): Promise<void> => {},
  
  // Get monitoring schedule
  getMonitoringSchedule: async (patientId: string): Promise<MonitoringSchedule> => {},
  
  // Update schedule
  updateMonitoringSchedule: async (patientId: string, schedule: MonitoringSchedule): Promise<void> => {},
  
  // Get critical alerts
  getCriticalAlerts: async (): Promise<MonitoringAlert[]> => {}
};
```

### **chpService**
```typescript
export const chpService = {
  // Create CHP assignment
  createAssignment: async (assignment: CHPAssignment): Promise<void> => {},
  
  // Get CHP assignments
  getCHPAssignments: async (chpId: string): Promise<CHPAssignment[]> => {},
  
  // Get patient CHP assignment
  getPatientCHPAssignment: async (patientId: string): Promise<CHPAssignment> => {},
  
  // Update assignment
  updateAssignment: async (assignmentId: string, status: string): Promise<void> => {},
  
  // Create follow-up task
  createFollowUpTask: async (task: FollowUpTask): Promise<void> => {},
  
  // Get follow-up tasks
  getFollowUpTasks: async (assignmentId: string): Promise<FollowUpTask[]> => {},
  
  // Update follow-up task
  updateFollowUpTask: async (taskId: string, status: string): Promise<void> => {},
  
  // Complete follow-up task
  completeFollowUpTask: async (taskId: string): Promise<void> => {},
  
  // Get follow-up reports
  getFollowUpReports: async (chpId: string): Promise<CHPFollowUpReport[]> => {}
};
```

### **auditService**
```typescript
export const auditService = {
  // Create audit log
  createAuditLog: async (log: AuditLog): Promise<void> => {},
  
  // Get audit logs
  getAuditLogs: async (params: PaginationParams): Promise<AuditLog[]> => {},
  
  // Get resource audit logs
  getResourceAuditLogs: async (resourceType: string, resourceId: string): Promise<AuditLog[]> => {},
  
  // Get user audit logs
  getUserAuditLogs: async (userId: string): Promise<AuditLog[]> => {},
  
  // Get audit report
  getAuditReport: async (startDate: Date, endDate: Date): Promise<AuditLogReport> => {},
  
  // Search audit logs
  searchAuditLogs: async (query: string): Promise<AuditLog[]> => {},
  
  // Export audit logs
  exportAuditLogs: async (format: 'CSV' | 'PDF'): Promise<Blob> => {}
};
```

### **reportService**
```typescript
export const reportService = {
  // Generate consultation report
  generateConsultationReport: async (consultationId: string): Promise<Report> => {},
  
  // Generate patient statistics
  generatePatientStatsReport: async (startDate: Date, endDate: Date): Promise<Report> => {},
  
  // Generate doctor performance report
  generateDoctorPerformanceReport: async (doctorId: string, period: string): Promise<Report> => {},
  
  // Generate queue analytics
  generateQueueAnalytics: async (startDate: Date, endDate: Date): Promise<Report> => {},
  
  // Generate health monitoring report
  generateHealthMonitoringReport: async (patientId: string): Promise<Report> => {},
  
  // Generate CHP performance report
  generateCHPPerformanceReport: async (chpId: string): Promise<Report> => {},
  
  // Export report
  exportReport: async (reportId: string, format: 'PDF' | 'Excel'): Promise<Blob> => {},
  
  // Schedule report generation
  scheduleReportGeneration: async (config: ReportScheduleConfig): Promise<void> => {}
};
```

---

## Component Library Reference

### Location: `/components/common/`

### **Button.tsx**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'; // default: 'primary'
  size?: 'sm' | 'md' | 'lg'; // default: 'md'
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// Usage:
<Button variant="primary" size="lg">Click Me</Button>
<Button variant="danger" isLoading={true}>Deleting...</Button>
```

### **Card.tsx**
```typescript
// Main Card Component
<Card>
  <CardHeader>
    <h2>Title</h2>
  </CardHeader>
  <CardBody>
    Main content
  </CardBody>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### **Badge.tsx**
```typescript
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
}

// Usage:
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
```

### **Input.tsx**
```typescript
interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
}

// Usage:
<Input 
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email format"
/>
```

### **Select.tsx**
```typescript
interface SelectProps {
  label?: string;
  options: Array<{value: string; label: string}>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
}

// Usage:
<Select 
  label="Role"
  options={[
    {value: 'doctor', label: 'Doctor'},
    {value: 'patient', label: 'Patient'}
  ]}
/>
```

### **Modal.tsx**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  isLoading?: boolean;
}

// Usage:
<Modal 
  isOpen={true}
  title="Confirm Action"
  onConfirm={handleConfirm}
  onClose={handleClose}
>
  Are you sure?
</Modal>
```

### **Table.tsx**
```typescript
interface TableProps<T> {
  data: T[];
  columns: Array<{key: string; header: string; render?: (value: any) => React.ReactNode}>;
  keyField: string;
  onRowClick?: (row: T) => void;
}

// Usage:
<Table 
  data={patients}
  columns={[
    {key: 'name', header: 'Name'},
    {key: 'email', header: 'Email'},
    {key: 'status', header: 'Status', render: (v) => <Badge>{v}</Badge>}
  ]}
  keyField="id"
/>
```

### **Alert.tsx**
```typescript
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

// Usage:
<Alert type="success" message="Patient registered successfully" />
<Alert type="error" message="Registration failed" onClose={() => {}} />
```

---

## Hook Reference

### Location: `/lib/hooks/`

### **useAuth**
```typescript
const {
  user,              // Current user or null
  loading,           // Loading state
  error,             // Error message if any
  isAuthenticated,   // Boolean
  login,             // async (email, password) => void
  logout,            // async () => void
  register,          // async (userData) => void
  changePassword     // async (oldPwd, newPwd) => void
} = useAuth();
```

### **useFetch<T>**
```typescript
const {
  data,              // Fetched data of type T
  loading,           // Loading state
  error,             // Error message if any
  refetch            // Function to manually refetch
} = useFetch(
  () => patientService.getPatient(id),
  { skip: false, refetchInterval: 0 }
);
```

### **useForm**
```typescript
const {
  values,            // Form field values
  errors,            // Validation errors
  touched,           // Which fields have been touched
  isSubmitting,      // Form submission state
  submitError,       // Form-level error
  handleChange,      // Change handler
  handleBlur,        // Blur handler
  handleSubmit,      // Submit handler
  setFieldError,     // Set error for field
  setFieldValue,     // Set field value
  resetForm          // Reset form to initial state
} = useForm({
  initialValues: {email: '', password: ''},
  validate: (values) => ({}),
  onSubmit: async (values) => {}
});
```

### **usePatient**
```typescript
const {
  patients,          // Array of patients
  selectedPatient,   // Currently selected patient
  loading,
  error,
  fetchPatient,      // Fetch single patient
  fetchPatients,     // Fetch multiple patients
  searchPatients,    // Search patients
  updatePatient      // Update patient data
} = usePatient();
```

### **useQueue**
```typescript
const {
  queue,             // Current queue entries
  stats,             // Queue statistics
  loading,
  error,
  fetchQueue,        // Fetch queue
  fetchQueueStats,   // Fetch stats
  addToQueue,        // Add patient to queue
  assignDoctor       // Assign doctor
} = useQueue();
```

### **useDoctor**
```typescript
const {
  doctors,           // List of doctors
  selectedDoctor,    // Currently selected doctor
  loading,
  error,
  fetchDoctors,      // Fetch list
  fetchDoctorProfile, // Fetch single doctor
  fetchOnlineDoctors, // Fetch online doctors
  searchBySpecialization // Search
} = useDoctor();
```

---

## Utility Functions Reference

### Location: `/lib/utils/`

### **validators.ts**
```typescript
validateEmail(email: string): boolean
validatePassword(password: string): {isValid: boolean; errors: string[]}
validatePhone(phone: string): boolean              // Kenyan format
validateNationalId(id: string): boolean            // 8 digits
validateKraPin(pin: string): boolean               // KRA PIN format
validateIcdCode(code: string): boolean             // ICD-10 format
validateDateFormat(date: string, format: string): boolean // ISO 8601
validateRequiredField(value: any): boolean
validateMinLength(value: string, min: number): boolean
validateMaxLength(value: string, max: number): boolean
validateNumberRange(value: number, min: number, max: number): boolean
```

### **formatters.ts**
```typescript
formatDate(date: Date | string, format: string): string
formatTime(date: Date | string): string
formatCurrency(amount: number, currency: string = 'KES'): string
formatPhoneNumber(phone: string): string          // +254... format
formatFullName(firstName: string, lastName: string): string
formatAge(dateOfBirth: Date): number
formatGender(gender: 'M' | 'F' | 'Other'): string
formatUserRole(role: UserRole): string
truncateText(text: string, maxLength: number): string
```

### **helpers.ts**
```typescript
generateId(prefix: string): string
getErrorMessage(error: any): string
delay(ms: number): Promise<void>
debounce<T>(func: T, delay: number): T
throttle<T>(func: T, limit: number): T
mergeObjects<T>(obj1: T, obj2: Partial<T>): T
groupBy<T>(array: T[], key: string): Record<string, T[]>
sortBy<T>(array: T[], key: string, order: 'asc' | 'desc'): T[]
uniqueBy<T>(array: T[], key: string): T[]
isEmpty(value: any): boolean
isProduction(): boolean
getEnvVariable(key: string): string | undefined
```

---

## Common Patterns

### Pattern 1: Fetching and Displaying Data
```typescript
export function PatientList() {
  const { patients, loading, error } = usePatient();

  useEffect(() => {
    const fetchData = async () => {
      await patientService.listPatients({page: 1, limit: 10});
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <Table 
      data={patients}
      columns={[{key: 'name', header: 'Name'}]}
      keyField="id"
    />
  );
}
```

### Pattern 2: Form Submission
```typescript
export function RegistrationForm() {
  const { values, errors, touched, handleChange, handleSubmit } = useForm({
    initialValues: {email: '', password: ''},
    validate: (v) => {
      const errs: any = {};
      if (!validateEmail(v.email)) errs.email = "Invalid email";
      if (!validatePassword(v.password).isValid) errs.password = "Weak password";
      return errs;
    },
    onSubmit: async (v) => {
      await authService.register(v);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={touched.email && errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={touched.password && errors.password}
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
```

### Pattern 3: Modal Confirmation
```typescript
export function DeletePatientButton({patientId}: {patientId: string}) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await patientService.deletePatient(patientId);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete
      </Button>
      <Modal
        isOpen={showModal}
        title="Delete Patient"
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      >
        Are you sure you want to delete this patient?
      </Modal>
    </>
  );
}
```

---

## Code Examples

### Example 1: Patient Registration Form
```typescript
'use client';

import { useState } from 'react';
import { useForm } from '@/lib/hooks';
import { patientService } from '@/lib/services';
import { validateEmail, validatePhone, validateNationalId } from '@/lib/utils/validators';
import { Button, Input, Select, Alert } from '@/components/common';
import { AuthLayout } from '@/components/layout';

export default function RegisterPatient() {
  const [successMessage, setSuccessMessage] = useState('');

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationalId: '',
      dateOfBirth: '',
      insuranceType: 'None'
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.firstName) errors.firstName = "First name required";
      if (!values.lastName) errors.lastName = "Last name required";
      if (!validateEmail(values.email)) errors.email = "Invalid email";
      if (!validatePhone(values.phone)) errors.phone = "Invalid phone format";
      if (!validateNationalId(values.nationalId)) errors.nationalId = "Invalid ID";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await patientService.registerPatient(values as any);
        setSuccessMessage('Patient registered successfully!');
      } catch (error) {
        throw new Error('Registration failed');
      }
    }
  });

  return (
    <AuthLayout title="Register as Patient">
      {successMessage && <Alert type="success" message={successMessage} />}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          value={values.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          onBlur={() => handleBlur('firstName')}
          error={touched.firstName && errors.firstName}
        />
        
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={touched.email && errors.email}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
```

### Example 2: Doctor Assignment Component
```typescript
'use client';

import { useQueue, useDoctor } from '@/lib/hooks';
import { queueService, doctorService } from '@/lib/services';
import { Button, Card, Select, Badge } from '@/components/common';
import { useEffect, useState } from 'react';

export function DoctorAssignment({ queueId }: { queueId: string }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const { doctors, loading: doctorLoading } = useDoctor();

  const handleAssign = async () => {
    if (!selectedDoctorId) return;
    
    setIsAssigning(true);
    try {
      await queueService.assignDoctor(queueId, selectedDoctorId);
      setSelectedDoctorId('');
    } finally {
      setIsAssigning(false);
    }
  };

  const doctorOptions = doctors.map(d => ({
    value: d.id,
    label: `Dr. ${d.firstName} ${d.lastName} (${d.specialization})`
  }));

  return (
    <Card>
      <h3>Assign Doctor</h3>
      <Select
        options={doctorOptions}
        value={selectedDoctorId}
        onChange={setSelectedDoctorId}
        placeholder="Select a doctor"
      />
      <Button 
        onClick={handleAssign}
        isLoading={isAssigning}
        disabled={!selectedDoctorId}
      >
        Assign
      </Button>
    </Card>
  );
}
```

### Example 3: Monitoring Dashboard
```typescript
'use client';

import { useEffect, useState } from 'react';
import { monitoringService } from '@/lib/services';
import { VitalSigns, MonitoringAlert } from '@/lib/types';
import { Card, Badge, Alert, Table } from '@/components/common';
import { formatDate } from '@/lib/utils/formatters';

export function MonitoringDashboard() {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns[]>([]);
  const [alerts, setAlerts] = useState<MonitoringAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vitals, alerts] = await Promise.all([
          monitoringService.getCriticalAlerts(),
          monitoringService.getMonitoringAlerts({page: 1, limit: 10})
        ]);
        setAlerts(alerts);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <h2>Critical Alerts</h2>
        {alerts.filter(a => a.severity === 'Critical').map(alert => (
          <Alert 
            key={alert.id}
            type="error"
            message={alert.message}
          />
        ))}
      </Card>

      <Card>
        <h2>Recent Alerts</h2>
        <Table
          data={alerts}
          columns={[
            {key: 'message', header: 'Alert'},
            {key: 'severity', header: 'Severity'},
            {key: 'createdAt', header: 'Date', render: (v) => formatDate(v, 'DD/MM/YYYY HH:mm')}
          ]}
          keyField="id"
        />
      </Card>
    </div>
  );
}
```

---

## Summary

This reference guide covers all major components, services, types, and utilities available in your Mutuini Virtual Care Portal. Use it as a lookup when developing new features or integrating services.

For more details, refer to individual files in the codebase with their comprehensive JSDoc comments.

---

*Last Updated: May 29, 2024*
