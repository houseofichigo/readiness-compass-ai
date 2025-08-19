import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  eventType: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  eventData?: Record<string, any>;
}

export class SecurityUtils {
  /**
   * Log security events for monitoring and audit purposes
   */
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      await supabase.from('security_events').insert({
        event_type: event.eventType,
        user_id: event.userId,
        ip_address: event.ipAddress,
        user_agent: event.userAgent || navigator.userAgent,
        event_data: event.eventData
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  /**
   * Sanitize user input to prevent XSS attacks
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove basic HTML chars
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  /**
   * Validate email format with additional security checks
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email) && 
           email.length <= 100 && 
           !email.includes('<') && 
           !email.includes('>');
  }

  /**
   * Check rate limits for feedback submissions
   */
  static async checkFeedbackRateLimit(): Promise<boolean> {
    try {
      // Get client IP (in real deployment, this would come from headers)
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { data, error } = await supabase.rpc('check_feedback_rate_limit', {
        _ip_address: ip
      });
      
      if (error) {
        console.warn('Rate limit check failed:', error);
        return true; // Allow on error to not block legitimate users
      }
      
      return data;
    } catch (error) {
      console.warn('Rate limit check error:', error);
      return true; // Allow on error
    }
  }

  /**
   * Add security headers for admin routes
   */
  static getSecureHeaders(): HeadersInit {
    return {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    };
  }

  /**
   * Generate CSRF token for forms
   */
  static generateCSRFToken(): string {
    return crypto.randomUUID();
  }

  /**
   * Validate text input length and content
   */
  static validateTextInput(text: string, maxLength: number = 1000): { isValid: boolean; error?: string } {
    if (!text || text.trim().length === 0) {
      return { isValid: false, error: 'Text cannot be empty' };
    }
    
    if (text.length > maxLength) {
      return { isValid: false, error: `Text cannot exceed ${maxLength} characters` };
    }
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(text)) {
        return { isValid: false, error: 'Invalid content detected' };
      }
    }
    
    return { isValid: true };
  }

  /**
   * Log authentication attempts for monitoring
   */
  static async logAuthAttempt(email: string, success: boolean, attemptType: 'login' | 'signup'): Promise<void> {
    await this.logSecurityEvent({
      eventType: `auth_${attemptType}_${success ? 'success' : 'failure'}`,
      eventData: {
        email: email.toLowerCase(),
        timestamp: new Date().toISOString(),
        success
      }
    });
  }
}

/**
 * React hook for security monitoring
 */
export function useSecurityMonitoring() {
  const logSecurityEvent = async (event: SecurityEvent) => {
    await SecurityUtils.logSecurityEvent(event);
  };

  return { logSecurityEvent };
}