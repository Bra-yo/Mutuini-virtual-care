/**
 * Auth Layout
 * Layout for authentication pages (login, register, etc.)
 */

import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {title && (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-center text-gray-600 text-sm mb-6">{description}</p>
              )}
            </>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
