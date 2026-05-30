/**
 * useQueue Hook
 * Manages queue data and operations
 */

import { useCallback, useState } from "react";
import { QueueEntry, QueueStats } from "@/lib/types";
import { queueService } from "@/lib/services";

export const useQueue = () => {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [stats, setStats] = useState<QueueStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queueEntries = await queueService.getQueue();
      setQueue(queueEntries);
      return queueEntries;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch queue";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQueueStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queueStats = await queueService.getQueueStats();
      setStats(queueStats);
      return queueStats;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch queue stats";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addToQueue = useCallback(
    async (data: {
      patientId: string;
      reason: string;
      priority: string;
      consultationType: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const entry = await queueService.addToQueue(data);
        setQueue((prev) => [...prev, entry]);
        return entry;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to add to queue";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const assignDoctor = useCallback(
    async (queueEntryId: string, doctorId: string) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await queueService.assignDoctor(queueEntryId, doctorId);
        setQueue((prev) =>
          prev.map((entry) => (entry.id === queueEntryId ? updated : entry))
        );
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to assign doctor";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    queue,
    stats,
    loading,
    error,
    fetchQueue,
    fetchQueueStats,
    addToQueue,
    assignDoctor,
  };
};
