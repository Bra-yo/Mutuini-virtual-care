/**
 * useDoctor Hook
 * Manages doctor data and operations
 */

import { useCallback, useState } from "react";
import { Doctor, DoctorProfile } from "@/lib/types";
import { doctorService } from "@/lib/services";

export const useDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async (filters?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await doctorService.listDoctors(filters);
      setDoctors(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch doctors";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDoctorProfile = useCallback(async (doctorId: string) => {
    setLoading(true);
    setError(null);
    try {
      const profile = await doctorService.getDoctorProfile(doctorId);
      setSelectedDoctor(profile);
      return profile;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch doctor profile";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOnlineDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await doctorService.getOnlineDoctors();
      setDoctors(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch online doctors";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchBySpecialization = useCallback(async (specialization: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await doctorService.searchBySpecialization(specialization);
      setDoctors(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    doctors,
    selectedDoctor,
    loading,
    error,
    fetchDoctors,
    fetchDoctorProfile,
    fetchOnlineDoctors,
    searchBySpecialization,
  };
};
