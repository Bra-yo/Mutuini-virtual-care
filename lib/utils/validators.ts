/**
 * Common Validators
 * Reusable validation functions for forms and API inputs
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one digit");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePhone = (phone: string): boolean => {
  // Kenyan phone number format
  const phoneRegex = /^(\+254|0)[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
};

export const validateNationalId = (id: string): boolean => {
  // Kenyan national ID format (8 digits)
  return /^\d{8}$/.test(id);
};

export const validateKraPin = (kraPin: string): boolean => {
  // Kenyan KRA PIN format (starts with A-Z, followed by 9 digits)
  return /^[A-Z]\d{9}[A-Z]$/.test(kraPin);
};

export const validateIcdCode = (code: string): boolean => {
  // ICD-10 format (e.g., A01.0, B20)
  return /^[A-Z]\d{2}(\.[0-9]{1,2})?$/.test(code);
};

export const validateDateFormat = (date: string): boolean => {
  // ISO 8601 format (YYYY-MM-DD)
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date));
};

export const validateRequiredField = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateNumberRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};
