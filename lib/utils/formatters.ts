/**
 * Format Utilities
 * Common formatting functions for display and output
 */

export const formatDate = (date: string | Date, format: string = "DD/MM/YYYY"): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "Invalid date";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", String(year))
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

export const formatTime = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatCurrency = (amount: number, currency: string = "KES"): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+254${cleaned.slice(1)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("254")) {
    return `+${cleaned}`;
  }
  return phone;
};

export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const formatAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const formatGender = (gender: string): string => {
  const genderMap: Record<string, string> = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
  };
  return genderMap[gender] || gender;
};

export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    ADMIN: "Administrator",
    DOCTOR: "Doctor",
    CHP: "Community Health Promoter",
    NURSE: "Nurse",
    RECEPTIONIST: "Receptionist",
    PATIENT: "Patient",
    SYSTEM: "System",
  };
  return roleMap[role] || role;
};

export const truncateText = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};
