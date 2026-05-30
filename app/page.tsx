/**
 * Home/Landing Page
 * Redirect to dashboard if authenticated, otherwise show auth options
 */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/common";

export default function HomePage() {
  const router = useRouter();

  // In a real app, check authentication status
  // For now, redirect to login
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Mutuini Virtual Care Portal
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Hospital-controlled virtual care platform for seamless patient consultations
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </Button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-slate-900 mb-5">
            System Overview
          </h2>
          <p className="text-slate-600 mb-6">
            Mutuini Virtual Care Portal supports hospital-led virtual care workflows designed to streamline patient management and clinical coordination.
          </p>
          <div className="grid gap-3 text-slate-700">
            <div className="rounded-2xl bg-slate-50 p-4">Hospital-based patient registration</div>
            <div className="rounded-2xl bg-slate-50 p-4">Virtual care queue management</div>
            <div className="rounded-2xl bg-slate-50 p-4">Doctor assignment and consultation coordination</div>
            <div className="rounded-2xl bg-slate-50 p-4">Community Health Promoter follow-up</div>
            <div className="rounded-2xl bg-slate-50 p-4">Vitals monitoring and patient tracking</div>
            <div className="rounded-2xl bg-slate-50 p-4">Alerts and escalation workflows</div>
            <div className="rounded-2xl bg-slate-50 p-4">Reports, exports, and operational insight</div>
            <div className="rounded-2xl bg-slate-50 p-4">SHA/TaifaCare readiness and integration support</div>
          </div>
        </div>
      </div>
    </div>
  );
}