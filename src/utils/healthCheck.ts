// Production health check utility
export const healthCheck = {
  // Check if all critical services are available
  async checkServices(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy'; details: Record<string, boolean> }> {
    const checks = {
      supabase: await this.checkSupabase(),
      assessment: await this.checkAssessment(),
      localStorage: this.checkLocalStorage()
    };

    const allHealthy = Object.values(checks).every(Boolean);
    const someHealthy = Object.values(checks).some(Boolean);

    return {
      status: allHealthy ? 'healthy' : someHealthy ? 'degraded' : 'unhealthy',
      details: checks
    };
  },

  async checkSupabase(): Promise<boolean> {
    try {
      const { data, error } = await import('@/integrations/supabase/client').then(m => 
        m.supabase.from('submissions').select('count').limit(1)
      );
      return !error;
    } catch {
      return false;
    }
  },

  async checkAssessment(): Promise<boolean> {
    try {
      const { assessmentSections } = await import('@/data/assessmentQuestions');
      return assessmentSections.length > 0;
    } catch {
      return false;
    }
  },

  checkLocalStorage(): boolean {
    try {
      const test = 'health-check';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};

// Export for monitoring tools
if (typeof window !== 'undefined') {
  (window as any).__healthCheck = healthCheck;
}