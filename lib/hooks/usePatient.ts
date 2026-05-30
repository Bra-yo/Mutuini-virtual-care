/**
 * usePatient Hook
 * Manages patient data and operations
 */

import { useCallback, useState } from "react";
import { Patient } from "@/lib/types";
import { patientService } from "@/lib/services";

export const usePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = useCallback(async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const patient = await patientService.getPatient(patientId);
      setSelectedPatient(patient);
      return patient;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch patient";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPatients = useCallback(async (filters?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientService.listPatients(filters);
      setPatients(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch patients";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPatients = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await patientService.searchPatients(query);
      setPatients(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePatient = useCallback(
    async (patientId: string, data: Partial<Patient>) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await patientService.updatePatient(patientId, data);
        setSelectedPatient(updated);
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Update failed";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    patients,
    selectedPatient,
    loading,
    error,
    fetchPatient,
    fetchPatients,
    searchPatients,
    updatePatient,
  };
};
