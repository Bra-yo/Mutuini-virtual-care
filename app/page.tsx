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

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Phase 1 - Foundation Ready
          </h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Clean project structure
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> TypeScript & Tailwind CSS
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Comprehensive type definitions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Reusable UI components
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Service layer placeholders
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Custom React hooks
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> All module placeholders
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}