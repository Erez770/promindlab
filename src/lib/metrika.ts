const METRIKA_ID = 106744316;

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    if (params) {
      window.ym(METRIKA_ID, 'reachGoal', goal, params);
    } else {
      window.ym(METRIKA_ID, 'reachGoal', goal);
    }
  }
}

declare global {
  interface Window {
    ym: (id: number, action: string, goal?: string, params?: Record<string, unknown>) => void;
  }
}
