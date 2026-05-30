/**
 * Register Page
 * User registration page
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout";
import { Input, Button, Select, Alert } from "@/components/common";
import { validateEmail, validatePassword } from "@/lib/utils/validators";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual registration
      console.log("Registration attempt:", formData);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      description="Join Mutuini Virtual Care Portal"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert type="error" message={error} />}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            required
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />

        <Select
          label="User Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={[
            { value: "PATIENT", label: "Patient" },
            { value: "DOCTOR", label: "Doctor" },
            { value: "NURSE", label: "Nurse" },
            { value: "CHP", label: "Community Health Promoter" },
          ]}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          name="password"
          required
          helpText="Min 8 chars, uppercase, lowercase, number, special char"
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={loading}
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
