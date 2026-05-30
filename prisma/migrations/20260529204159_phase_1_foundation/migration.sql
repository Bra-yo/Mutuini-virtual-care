-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SYSTEM_ADMIN', 'HOSPITAL_MANAGER', 'VIRTUAL_CARE_COORDINATOR', 'CLINICIAN', 'CHP', 'HEALTH_RECORDS_OFFICER', 'PHARMACIST', 'RESEARCH_ME_OFFICER');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('PRE_ENROLLED', 'AWAITING_TAIFACARE_REGISTRATION', 'TAIFACARE_LINKED', 'SHA_LINKED', 'ACTIVE_VIRTUAL_CARE', 'INACTIVE', 'LOST_TO_FOLLOW_UP', 'EXITED_DECEASED');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('WAITING', 'ASSIGNED', 'IN_CONSULTATION', 'COMPLETED', 'REFERRED', 'NOT_REACHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "ClinicianStatus" AS ENUM ('AVAILABLE', 'BUSY', 'OFFLINE', 'ON_BREAK', 'ON_LEAVE', 'EMERGENCY_ONLY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "clinicianStatus" "ClinicianStatus",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "telemedicineId" TEXT NOT NULL,
    "taifacarePatientId" TEXT,
    "shaPatientId" TEXT,
    "hospitalPatientId" TEXT,
    "nationalIdOrBirthCert" TEXT,
    "fullName" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT NOT NULL,
    "alternativePhone" TEXT,
    "residence" TEXT,
    "ward" TEXT,
    "villageOrEstate" TEXT,
    "nearestLandmark" TEXT,
    "enrollmentStatus" "PatientStatus" NOT NULL DEFAULT 'PRE_ENROLLED',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaifaCareLinkage" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "portalTelemedicineId" TEXT NOT NULL,
    "taifacarePatientId" TEXT NOT NULL,
    "shaPatientId" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'TaifaCare',
    "shaFacilityCode" TEXT,
    "shaEnvironment" TEXT,
    "dateLinked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "linkedById" TEXT,
    "matchingConfidence" DOUBLE PRECISION,
    "matchingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaifaCareLinkage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueEntry" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "assignedCoordinatorId" TEXT,
    "assignedClinicianId" TEXT,
    "reasonForContact" TEXT NOT NULL,
    "contactMode" TEXT NOT NULL,
    "urgencyLevel" "UrgencyLevel" NOT NULL DEFAULT 'LOW',
    "status" "QueueStatus" NOT NULL DEFAULT 'WAITING',
    "patientStatus" "PatientStatus" NOT NULL DEFAULT 'ACTIVE_VIRTUAL_CARE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QueueEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "clinicianId" TEXT,
    "presentingComplaint" TEXT,
    "historyNotes" TEXT,
    "clinicalImpression" TEXT,
    "diagnosis" TEXT,
    "adviceGiven" TEXT,
    "prescriptionRecommendation" TEXT,
    "referralDecision" TEXT,
    "followUpPlan" TEXT,
    "nextAppointmentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VitalsRecord" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "bloodPressureSystolic" INTEGER,
    "bloodPressureDiastolic" INTEGER,
    "bloodGlucose" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "pulseRate" INTEGER,
    "oxygenSaturation" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "muac" DOUBLE PRECISION,
    "symptoms" TEXT,
    "recordedById" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VitalsRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_telemedicineId_key" ON "Patient"("telemedicineId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaifaCareLinkage" ADD CONSTRAINT "TaifaCareLinkage_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaifaCareLinkage" ADD CONSTRAINT "TaifaCareLinkage_linkedById_fkey" FOREIGN KEY ("linkedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueEntry" ADD CONSTRAINT "QueueEntry_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueEntry" ADD CONSTRAINT "QueueEntry_assignedCoordinatorId_fkey" FOREIGN KEY ("assignedCoordinatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueEntry" ADD CONSTRAINT "QueueEntry_assignedClinicianId_fkey" FOREIGN KEY ("assignedClinicianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalsRecord" ADD CONSTRAINT "VitalsRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalsRecord" ADD CONSTRAINT "VitalsRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
