import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AppStatus =
  | "submitted" | "under-review" | "documents-required"
  | "accepted" | "rejected" | "enrolled";

export type NotifType = "application" | "scholarship" | "message" | "document" | "system" | "commission";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  city: string;
  highSchool: string;
  gpa: string;
  joinedAt: string;
  agentId: string | null;
  profileCompletion: number;
  status: "active" | "inactive";
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  universityId: string;
  universityName: string;
  program: string;
  country: string;
  status: AppStatus;
  submittedAt: string;
  updatedAt: string;
  agentId: string | null;
  commissionRate: number;
  commissionAmount: number;
  commissionPaid: boolean;
  notes: string;
  documents: { name: string; status: "pending" | "approved" | "rejected" }[];
}

export interface Referral {
  id: string;
  agentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  program: string;
  preferredCountry: string;
  studyLevel: string;
  budget: string;
  status: AppStatus | "pending";
  applicationId: string | null;
  submittedAt: string;
  commissionRate: number;
  commissionAmount: number;
  commissionPaid: boolean;
}

export interface Notification {
  id: string;
  recipientType: "student" | "admin" | "agent";
  recipientId: string;
  type: NotifType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  relatedId: string | null;
}

export interface Message {
  id: string;
  fromId: string;
  fromName: string;
  fromRole: "student" | "admin" | "agent";
  toId: string;
  toName: string;
  body: string;
  sentAt: string;
  read: boolean;
}

export interface CounselingSession {
  id: string;
  studentId: string;
  studentName: string;
  counselor: string;
  type: "Initial Consultation" | "Application Review" | "Visa Guidance" | "Follow-up";
  date: string;
  time: string;
  duration: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface PortalStore {
  // Data
  students: Student[];
  applications: Application[];
  referrals: Referral[];
  notifications: Notification[];
  messages: Message[];
  sessions: CounselingSession[];

  // Live activity feed (last 20 actions across portals)
  activityFeed: { id: string; actor: string; action: string; time: string; color: string }[];

  // Actions — Applications
  updateApplicationStatus: (id: string, status: AppStatus, notes?: string) => void;
  addApplication: (app: Omit<Application, "id" | "submittedAt" | "updatedAt">) => void;

  // Actions — Referrals
  addReferral: (ref: Omit<Referral, "id" | "submittedAt" | "applicationId" | "status">) => void;
  updateReferralStatus: (id: string, status: Referral["status"]) => void;

  // Actions — Notifications
  addNotification: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (recipientId: string) => void;

  // Actions — Messages
  sendMessage: (m: Omit<Message, "id" | "sentAt" | "read">) => void;
  markMessageRead: (id: string) => void;

  // Actions — Counseling
  addSession: (s: Omit<CounselingSession, "id">) => void;
  updateSessionStatus: (id: string, status: CounselingSession["status"]) => void;

  // Selectors helpers
  getUnreadCount: (recipientId: string) => number;
  getStudentApplications: (studentId: string) => Application[];
  getAgentReferrals: (agentId: string) => Referral[];
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedStudents: Student[] = [
  { id: "s1", name: "Emmanuel Kollie", email: "e.kollie@email.com", phone: "+231 770 000 001", nationality: "Liberian", city: "Monrovia", highSchool: "St. Patrick's High School", gpa: "3.7", joinedAt: "2024-09-01", agentId: "a1", profileCompletion: 85, status: "active" },
  { id: "s2", name: "Patience Saah", email: "p.saah@email.com", phone: "+231 770 000 002", nationality: "Liberian", city: "Gbarnga", highSchool: "Sanniquellie Central High", gpa: "3.9", joinedAt: "2024-09-05", agentId: "a1", profileCompletion: 92, status: "active" },
  { id: "s3", name: "James Brownell", email: "j.brownell@email.com", phone: "+231 770 000 003", nationality: "Liberian", city: "Buchanan", highSchool: "B.W. Harris Episcopal", gpa: "3.4", joinedAt: "2024-09-10", agentId: null, profileCompletion: 70, status: "active" },
  { id: "s4", name: "Mary Flomo", email: "m.flomo@email.com", phone: "+231 770 000 004", nationality: "Liberian", city: "Monrovia", highSchool: "C.W.A. High School", gpa: "3.8", joinedAt: "2024-09-15", agentId: "a1", profileCompletion: 78, status: "active" },
  { id: "s5", name: "Titus Mulbah", email: "t.mulbah@email.com", phone: "+231 770 000 005", nationality: "Liberian", city: "Voinjama", highSchool: "Kolahun Central High", gpa: "3.5", joinedAt: "2024-10-01", agentId: "a1", profileCompletion: 88, status: "active" },
  { id: "s6", name: "Sarah Konneh", email: "s.konneh@email.com", phone: "+231 770 000 006", nationality: "Liberian", city: "Monrovia", highSchool: "Monrovia Consolidated", gpa: "3.6", joinedAt: "2024-10-10", agentId: "a1", profileCompletion: 65, status: "active" },
];

const seedApplications: Application[] = [
  { id: "TIH-001", studentId: "s1", studentName: "Emmanuel Kollie", studentEmail: "e.kollie@email.com", universityId: "lpu", universityName: "Lovely Professional University", program: "BSc Computer Science", country: "India", status: "under-review", submittedAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-20T14:00:00Z", agentId: "a1", commissionRate: 12, commissionAmount: 384, commissionPaid: false, notes: "", documents: [{ name: "Passport", status: "approved" }, { name: "WAEC Result", status: "pending" }] },
  { id: "TIH-002", studentId: "s2", studentName: "Patience Saah", studentEmail: "p.saah@email.com", universityId: "amity", universityName: "Amity University", program: "MBA International Business", country: "India", status: "accepted", submittedAt: "2024-01-14T09:00:00Z", updatedAt: "2024-01-25T11:00:00Z", agentId: "a1", commissionRate: 12, commissionAmount: 480, commissionPaid: true, notes: "Excellent profile", documents: [{ name: "Passport", status: "approved" }, { name: "WAEC Result", status: "approved" }, { name: "Bank Statement", status: "approved" }] },
  { id: "TIH-003", studentId: "s3", studentName: "James Brownell", studentEmail: "j.brownell@email.com", universityId: "cyrus-international", universityName: "Cyrus International University", program: "LLB Law", country: "North Cyprus", status: "documents-required", submittedAt: "2024-01-13T11:00:00Z", updatedAt: "2024-01-18T09:00:00Z", agentId: null, commissionRate: 0, commissionAmount: 0, commissionPaid: false, notes: "Bank statement missing", documents: [{ name: "Passport", status: "approved" }, { name: "Bank Statement", status: "rejected" }] },
  { id: "TIH-004", studentId: "s4", studentName: "Mary Flomo", studentEmail: "m.flomo@email.com", universityId: "sharda", universityName: "SHARDA University", program: "MBBS", country: "India", status: "submitted", submittedAt: "2024-01-12T14:00:00Z", updatedAt: "2024-01-12T14:00:00Z", agentId: "a1", commissionRate: 12, commissionAmount: 600, commissionPaid: false, notes: "", documents: [{ name: "Passport", status: "pending" }] },
  { id: "TIH-005", studentId: "s5", studentName: "Titus Mulbah", studentEmail: "t.mulbah@email.com", universityId: "marwadi-university", universityName: "Marwadi University", program: "BTech Mechanical", country: "India", status: "accepted", submittedAt: "2024-01-11T08:00:00Z", updatedAt: "2024-01-22T16:00:00Z", agentId: "a1", commissionRate: 12, commissionAmount: 360, commissionPaid: true, notes: "", documents: [{ name: "Passport", status: "approved" }, { name: "WAEC Result", status: "approved" }] },
  { id: "TIH-006", studentId: "s6", studentName: "Sarah Konneh", studentEmail: "s.konneh@email.com", universityId: "lpu", universityName: "Lovely Professional University", program: "BSc Computer Science", country: "India", status: "under-review", submittedAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z", agentId: "a1", commissionRate: 12, commissionAmount: 384, commissionPaid: false, notes: "", documents: [{ name: "Passport", status: "approved" }, { name: "WAEC Result", status: "pending" }] },
];

const seedReferrals: Referral[] = [
  { id: "ref1", agentId: "a1", studentName: "Sarah Konneh", studentEmail: "s.konneh@email.com", studentPhone: "+231 880 001", program: "BSc Computer Science", preferredCountry: "India", studyLevel: "Undergraduate", budget: "$3000-5000", status: "under-review", applicationId: "TIH-006", submittedAt: "2024-01-10T09:00:00Z", commissionRate: 12, commissionAmount: 384, commissionPaid: false },
  { id: "ref2", agentId: "a1", studentName: "Patience Saah", studentEmail: "p.saah@email.com", studentPhone: "+231 880 002", program: "MBA International Business", preferredCountry: "India", studyLevel: "Postgraduate", budget: "$5000-8000", status: "accepted", applicationId: "TIH-002", submittedAt: "2024-01-05T10:00:00Z", commissionRate: 12, commissionAmount: 480, commissionPaid: true },
  { id: "ref3", agentId: "a1", studentName: "Marcus Dolo", studentEmail: "m.dolo@email.com", studentPhone: "+231 880 003", program: "MBBS Medicine", preferredCountry: "India", studyLevel: "Undergraduate", budget: ">$8000", status: "pending", applicationId: null, submittedAt: "2024-01-28T11:00:00Z", commissionRate: 12, commissionAmount: 0, commissionPaid: false },
  { id: "ref4", agentId: "a1", studentName: "Grace Pewu", studentEmail: "g.pewu@email.com", studentPhone: "+231 880 004", program: "MBA Business", preferredCountry: "India", studyLevel: "Postgraduate", budget: "$5000-8000", status: "documents-required", applicationId: null, submittedAt: "2024-01-20T09:00:00Z", commissionRate: 12, commissionAmount: 0, commissionPaid: false },
];

const seedNotifications: Notification[] = [
  { id: "n1", recipientType: "student", recipientId: "s1", type: "application", title: "Application Under Review", body: "Your application to LPU is now under review by the admissions team.", read: false, createdAt: "2024-01-20T14:00:00Z", relatedId: "TIH-001" },
  { id: "n2", recipientType: "student", recipientId: "s2", type: "application", title: "Application Accepted!", body: "Congratulations! Amity University has accepted your application.", read: false, createdAt: "2024-01-25T11:00:00Z", relatedId: "TIH-002" },
  { id: "n3", recipientType: "student", recipientId: "s3", type: "document", title: "Documents Required", body: "Please upload your bank statement to proceed with your application.", read: false, createdAt: "2024-01-18T09:00:00Z", relatedId: "TIH-003" },
  { id: "n4", recipientType: "agent", recipientId: "a1", type: "commission", title: "Commission Credited!", body: "$480 commission credited for Patience Saah's enrollment at Amity University.", read: false, createdAt: "2024-01-25T12:00:00Z", relatedId: "ref2" },
  { id: "n5", recipientType: "admin", recipientId: "admin", type: "application", title: "New Application", body: "Mary Flomo submitted a new application for MBBS at SHARDA University.", read: false, createdAt: "2024-01-12T14:00:00Z", relatedId: "TIH-004" },
];

const seedSessions: CounselingSession[] = [
  { id: "cs1", studentId: "s1", studentName: "Emmanuel Kollie", counselor: "Dr. Amara Kamara", type: "Application Review", date: "2024-02-05", time: "10:00 AM", duration: 60, status: "confirmed", notes: "Review LPU application documents" },
  { id: "cs2", studentId: "s3", studentName: "James Brownell", counselor: "Ms. Fatu Massaquoi", type: "Visa Guidance", date: "2024-02-07", time: "2:00 PM", duration: 30, status: "pending", notes: "" },
];

const seedActivity = [
  { id: "act1", actor: "Admin", action: "Updated TIH-001 status to Under Review", time: "2 min ago", color: "bg-blue-500" },
  { id: "act2", actor: "Agent JB", action: "Added new referral: Marcus Dolo", time: "15 min ago", color: "bg-emerald-500" },
  { id: "act3", actor: "Patience Saah", action: "Uploaded bank statement", time: "1 hr ago", color: "bg-purple-500" },
  { id: "act4", actor: "Admin", action: "Accepted TIH-002 — Amity University", time: "3 hr ago", color: "bg-green-500" },
  { id: "act5", actor: "Emmanuel Kollie", action: "Submitted application TIH-001", time: "5 hr ago", color: "bg-slate-400" },
];

// ─── Create store ─────────────────────────────────────────────────────────────

export const usePortalStore = create<PortalStore>()(
  persist(
    (set, get) => ({
      students: seedStudents,
      applications: seedApplications,
      referrals: seedReferrals,
      notifications: seedNotifications,
      messages: [],
      sessions: seedSessions,
      activityFeed: seedActivity,

      updateApplicationStatus: (id, status, notes = "") => {
        const app = get().applications.find(a => a.id === id);
        if (!app) return;
        const now = new Date().toISOString();
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        set(s => ({
          applications: s.applications.map(a =>
            a.id === id ? { ...a, status, notes: notes || a.notes, updatedAt: now } : a
          ),
          activityFeed: [
            { id: `act-${Date.now()}`, actor: "Admin", action: `Updated ${id} to ${status.replace("-", " ")}`, time: `${time}`, color: status === "accepted" ? "bg-green-500" : status === "rejected" ? "bg-red-500" : "bg-amber-500" },
            ...s.activityFeed.slice(0, 19),
          ],
        }));

        // Notify student
        get().addNotification({
          recipientType: "student", recipientId: app.studentId, type: "application",
          title: status === "accepted" ? "Application Accepted! 🎉" : status === "rejected" ? "Application Update" : "Application Status Changed",
          body: `Your application to ${app.universityName} is now: ${status.replace("-", " ")}.`,
          relatedId: id,
        });

        // Notify agent if linked
        if (app.agentId && status === "accepted") {
          get().addNotification({
            recipientType: "agent", recipientId: app.agentId, type: "commission",
            title: "Commission Earned! 💰",
            body: `${app.studentName}'s application to ${app.universityName} was accepted. Commission: $${app.commissionAmount}.`,
            relatedId: id,
          });
          // Mark referral as accepted
          set(s => ({
            referrals: s.referrals.map(r => r.applicationId === id ? { ...r, status: "accepted" } : r),
          }));
        }
      },

      addApplication: (appData) => {
        const id = `TIH-${String(get().applications.length + 1).padStart(3, "0")}`;
        const now = new Date().toISOString();
        const newApp: Application = { ...appData, id, submittedAt: now, updatedAt: now };
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        set(s => ({
          applications: [newApp, ...s.applications],
          activityFeed: [
            { id: `act-${Date.now()}`, actor: appData.studentName, action: `Submitted application to ${appData.universityName}`, time, color: "bg-blue-500" },
            ...s.activityFeed.slice(0, 19),
          ],
        }));

        get().addNotification({
          recipientType: "admin", recipientId: "admin", type: "application",
          title: "New Application",
          body: `${appData.studentName} submitted a new application for ${appData.program} at ${appData.universityName}.`,
          relatedId: id,
        });
      },

      addReferral: (refData) => {
        const id = `ref-${Date.now()}`;
        const now = new Date().toISOString();
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newRef: Referral = { ...refData, id, submittedAt: now, applicationId: null, status: "pending" };

        set(s => ({
          referrals: [newRef, ...s.referrals],
          activityFeed: [
            { id: `act-${Date.now()}`, actor: "Agent", action: `Added new referral: ${refData.studentName}`, time, color: "bg-emerald-500" },
            ...s.activityFeed.slice(0, 19),
          ],
        }));

        get().addNotification({
          recipientType: "admin", recipientId: "admin", type: "system",
          title: "New Agent Referral",
          body: `A new student referral was submitted: ${refData.studentName} for ${refData.program} in ${refData.preferredCountry}.`,
          relatedId: id,
        });
      },

      updateReferralStatus: (id, status) => {
        set(s => ({ referrals: s.referrals.map(r => r.id === id ? { ...r, status } : r) }));
      },

      addNotification: (n) => {
        const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        set(s => ({
          notifications: [{ ...n, id, createdAt: new Date().toISOString(), read: false }, ...s.notifications],
        }));
      },

      markNotificationRead: (id) => {
        set(s => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) }));
      },

      markAllNotificationsRead: (recipientId) => {
        set(s => ({ notifications: s.notifications.map(n => n.recipientId === recipientId ? { ...n, read: true } : n) }));
      },

      sendMessage: (m) => {
        const id = `msg-${Date.now()}`;
        const now = new Date().toISOString();
        set(s => ({ messages: [...s.messages, { ...m, id, sentAt: now, read: false }] }));
        get().addNotification({
          recipientType: m.toId === "admin" ? "admin" : "student",
          recipientId: m.toId,
          type: "message",
          title: `New message from ${m.fromName}`,
          body: m.body.slice(0, 80),
          relatedId: id,
        });
      },

      markMessageRead: (id) => {
        set(s => ({ messages: s.messages.map(m => m.id === id ? { ...m, read: true } : m) }));
      },

      addSession: (s) => {
        const id = `cs-${Date.now()}`;
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        set(st => ({
          sessions: [{ ...s, id }, ...st.sessions],
          activityFeed: [
            { id: `act-${Date.now()}`, actor: s.studentName, action: `Booked ${s.type} session`, time, color: "bg-purple-500" },
            ...st.activityFeed.slice(0, 19),
          ],
        }));
      },

      updateSessionStatus: (id, status) => {
        set(s => ({ sessions: s.sessions.map(cs => cs.id === id ? { ...cs, status } : cs) }));
      },

      getUnreadCount: (recipientId) =>
        get().notifications.filter(n => n.recipientId === recipientId && !n.read).length,

      getStudentApplications: (studentId) =>
        get().applications.filter(a => a.studentId === studentId),

      getAgentReferrals: (agentId) =>
        get().referrals.filter(r => r.agentId === agentId),
    }),
    {
      name: "tolbert-portal-store",
      // Only persist data, not functions
      partialize: (s) => ({
        students: s.students,
        applications: s.applications,
        referrals: s.referrals,
        notifications: s.notifications,
        messages: s.messages,
        sessions: s.sessions,
        activityFeed: s.activityFeed,
      }),
    }
  )
);

// Cross-tab sync: broadcast store changes to other browser tabs
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "tolbert-portal-store") {
      usePortalStore.persist.rehydrate();
    }
  });
}
