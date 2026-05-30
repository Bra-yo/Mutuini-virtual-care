/**
 * Project Structure Documentation
 * 
 * FOLDER ORGANIZATION
 * ==================
 * 
 * /app
 *   /(auth) - Authentication pages (login, register, forgot password)
 *     /login - User login page
 *     /register - User registration page
 *   
 *   /(app) - Main application pages (protected routes)
 *     /layout.tsx - Shared layout with sidebar and header
 *     /dashboard - Main dashboard/overview
 *     /patients - Patient management and master register
 *     /queue - Virtual care queue management
 *     /doctors - Doctor management and workload
 *     /consultations - Teleconsultation notes and records
 *     /chp - CHP assignment and follow-up management
 *     /monitoring - Virtual monitoring and alerts
 *     /reports - Reports and analytics
 *     /audit - Audit logs and compliance
 *     /settings - System settings and configuration
 *   
 *   /api - Backend API routes (to be implemented)
 *     /auth - Authentication endpoints
 *     /patients - Patient CRUD operations
 *     /queue - Queue management
 *     /doctors - Doctor management
 *     /consultations - Consultation records
 *     /chp - CHP management
 *     /monitoring - Monitoring and alerts
 *     /reports - Report generation
 *     /audit - Audit logging
 * 
 * /components
 *   /common - Reusable UI components
 *     Button.tsx - Versatile button component
 *     Card.tsx - Card container with sections
 *     Badge.tsx - Status and label badges
 *     Modal.tsx - Dialog/modal component
 *     Input.tsx - Text input field
 *     Select.tsx - Dropdown select
 *     Alert.tsx - Alert/notification messages
 *     LoadingSpinner.tsx - Loading indicator
 *     Table.tsx - Data table component
 *     Pagination.tsx - Pagination controls
 *   
 *   /layout - Layout components
 *     AppLayout.tsx - Main app layout with sidebar
 *     AuthLayout.tsx - Auth pages layout
 *     Header.tsx - Top navigation header
 *     Sidebar.tsx - Left navigation sidebar
 *   
 *   /forms - Form components (future)
 *     LoginForm.tsx
 *     PatientForm.tsx
 *     DoctorAssignmentForm.tsx
 *   
 *   /modules - Module-specific components (future)
 *     Patient related components
 *     Queue related components
 *     Doctor related components
 * 
 * /lib
 *   /api - API client and utilities
 *     client.ts - API client setup
 *     endpoints.ts - API endpoint definitions
 *   
 *   /services - Business logic services
 *     authService.ts - Authentication service
 *     patientService.ts - Patient management service
 *     queueService.ts - Queue management service
 *     doctorService.ts - Doctor service
 *     consultationService.ts - Consultation service
 *     monitoringService.ts - Monitoring service
 *     chpService.ts - CHP service
 *     auditService.ts - Audit logging service
 *     reportService.ts - Report generation service
 *   
 *   /types - TypeScript type definitions
 *     index.ts - Main exports
 *     common.ts - Common types (ApiResponse, StatusCode, etc.)
 *     user.ts - User and authentication types
 *     patient.ts - Patient types
 *     queue.ts - Queue types
 *     doctor.ts - Doctor types
 *     consultation.ts - Consultation types
 *     monitoring.ts - Monitoring and alert types
 *     chp.ts - CHP types
 *     audit.ts - Audit types
 *     api.ts - API configuration types
 *   
 *   /utils - Utility functions
 *     validators.ts - Form and input validators
 *     formatters.ts - Data formatting functions
 *     helpers.ts - General helper functions
 *   
 *   /hooks - Custom React hooks
 *     useAuth.ts - Authentication hook
 *     useFetch.ts - Data fetching hook
 *     usePatient.ts - Patient data hook
 *     useQueue.ts - Queue data hook
 *     useDoctor.ts - Doctor data hook
 *     useForm.ts - Form state management hook
 * 
 * /public
 *   /images - Image assets
 *   /icons - Icon assets
 * 
 * CONFIG FILES
 * ============
 * 
 * next.config.ts - Next.js configuration
 * tsconfig.json - TypeScript configuration
 * tailwind.config.js - Tailwind CSS configuration
 * postcss.config.mjs - PostCSS configuration
 * eslint.config.mjs - ESLint configuration
 * package.json - Dependencies and scripts
 */

export {};
