/**
 * Global State Store using Zustand
 * Manages app-wide state including auth, AI status, and user data
 */

import { create } from 'zustand';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  onboarded: boolean;
  createdAt: string;
}

export interface CreatorDNA {
  primaryTone: string;
  humorLevel: number;
  darkHumorPresent: boolean;
  riskTolerance: 'low' | 'medium' | 'high';
  audienceType: string;
  confidence: {
    tone: number;
    humor: number;
    risk: number;
    audience: number;
  };
  generatedAt: string;
}

export type AIProcessStatus = 'idle' | 'active' | 'processing';

export interface AIProcess {
  id: string;
  name: string;
  status: AIProcessStatus;
  lastRun?: string;
  progress?: number;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Creator DNA
  creatorDNA: CreatorDNA | null;
  setCreatorDNA: (dna: CreatorDNA) => void;

  // AI Processes
  aiProcesses: AIProcess[];
  updateAIProcess: (id: string, updates: Partial<AIProcess>) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;

  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  rightPanelOpen: boolean;
  toggleRightPanel: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth initial state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false, creatorDNA: null }),

  // Creator DNA initial state
  creatorDNA: null,
  setCreatorDNA: (dna) => set({ creatorDNA: dna }),

  // AI Processes initial state
  aiProcesses: [
    { id: 'dna-scanner', name: 'Creator DNA Scanner', status: 'idle' },
    { id: 'growth-memory', name: 'Growth Memory', status: 'idle' },
    { id: 'emotion-analyzer', name: 'Audience Emotion Analyzer', status: 'idle' },
    { id: 'revenue-detector', name: 'Revenue Opportunity Detector', status: 'idle' },
    { id: 'risk-guard', name: 'Risk Guard', status: 'idle' },
  ],
  updateAIProcess: (id, updates) =>
    set((state) => ({
      aiProcesses: state.aiProcesses.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  // Onboarding initial state
  onboardingStep: 0,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  completeOnboarding: () =>
    set((state) => ({
      onboardingStep: 0,
      user: state.user ? { ...state.user, onboarded: true } : null,
    })),

  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  rightPanelOpen: false,
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
}));
