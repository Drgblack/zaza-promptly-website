'use client';

// Simple A/B Testing Framework for Zaza Promptly
// Supports cookie-based assignment with localStorage fallback
// Designed for the specified experiments: hero headline, CTA labels, snippet demo layout

export interface ABTest {
  id: string;
  name: string;
  variants: {
    id: string;
    name: string;
    weight: number; // 0-100, should sum to 100 across variants
  }[];
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export interface ABTestAssignment {
  testId: string;
  variantId: string;
  assignedAt: number;
  userId?: string;
}

// Define our specific A/B tests
export const AB_TESTS: Record<string, ABTest> = {
  hero_headline: {
    id: 'hero_headline',
    name: 'Hero Headline Test',
    variants: [
      { id: 'control', name: 'AI Teaching Assistant Built by PhD Educator', weight: 50 },
      { id: 'variant_a', name: 'Save 5+ Hours Weekly with AI That Understands Teaching', weight: 50 }
    ],
    isActive: true
  },
  
  cta_primary: {
    id: 'cta_primary',
    name: 'Primary CTA Label Test',
    variants: [
      { id: 'control', name: 'Try Promptly Free', weight: 50 },
      { id: 'variant_a', name: 'See it in Action', weight: 50 }
    ],
    isActive: true
  },
  
  snippet_demo_layout: {
    id: 'snippet_demo_layout',
    name: 'Snippet Demo Layout Test',
    variants: [
      { id: 'control', name: 'tabs_above', weight: 50 },
      { id: 'variant_a', name: 'tabs_beside', weight: 50 }
    ],
    isActive: true
  }
};

export class ABTestingFramework {
  private static readonly COOKIE_NAME = 'ab_test_assignments';
  private static readonly STORAGE_KEY = 'zaza_ab_assignments';
  private static readonly COOKIE_DURATION_DAYS = 30;

  // Get user's assignment for a specific test
  static getAssignment(testId: string): string {
    const test = AB_TESTS[testId];
    if (!test || !test.isActive) {
      return test?.variants[0]?.id || 'control';
    }

    // Check for existing assignment
    const existingAssignment = this.getExistingAssignment(testId);
    if (existingAssignment) {
      return existingAssignment.variantId;
    }

    // Create new assignment
    const assignment = this.createNewAssignment(test);
    this.saveAssignment(assignment);
    
    // Track assignment event
    this.trackAssignment(testId, assignment.variantId);
    
    return assignment.variantId;
  }

  // Get existing assignment from cookie or localStorage
  private static getExistingAssignment(testId: string): ABTestAssignment | null {
    try {
      // Try cookie first
      if (typeof document !== 'undefined') {
        const cookieAssignments = this.getCookieAssignments();
        const assignment = cookieAssignments.find(a => a.testId === testId);
        if (assignment) return assignment;
      }

      // Fallback to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedAssignments = localStorage.getItem(this.STORAGE_KEY);
        if (storedAssignments) {
          const assignments: ABTestAssignment[] = JSON.parse(storedAssignments);
          return assignments.find(a => a.testId === testId) || null;
        }
      }
    } catch (error) {
      console.warn('Error reading AB test assignments:', error);
    }
    
    return null;
  }

  // Create new assignment based on weights
  private static createNewAssignment(test: ABTest): ABTestAssignment {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const variant of test.variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        return {
          testId: test.id,
          variantId: variant.id,
          assignedAt: Date.now()
        };
      }
    }
    
    // Fallback to first variant
    return {
      testId: test.id,
      variantId: test.variants[0].id,
      assignedAt: Date.now()
    };
  }

  // Save assignment to both cookie and localStorage
  private static saveAssignment(assignment: ABTestAssignment): void {
    try {
      const allAssignments = this.getAllAssignments();
      const filteredAssignments = allAssignments.filter(a => a.testId !== assignment.testId);
      filteredAssignments.push(assignment);

      // Save to cookie
      if (typeof document !== 'undefined') {
        this.setCookieAssignments(filteredAssignments);
      }

      // Save to localStorage as backup
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredAssignments));
      }
    } catch (error) {
      console.warn('Error saving AB test assignment:', error);
    }
  }

  // Get all assignments from storage
  private static getAllAssignments(): ABTestAssignment[] {
    try {
      // Try cookie first
      if (typeof document !== 'undefined') {
        const cookieAssignments = this.getCookieAssignments();
        if (cookieAssignments.length > 0) return cookieAssignments;
      }

      // Fallback to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (error) {
      console.warn('Error reading all AB test assignments:', error);
    }
    
    return [];
  }

  // Cookie management
  private static getCookieAssignments(): ABTestAssignment[] {
    if (typeof document === 'undefined') return [];
    
    const cookies = document.cookie.split(';');
    const abCookie = cookies.find(cookie => cookie.trim().startsWith(this.COOKIE_NAME + '='));
    
    if (abCookie) {
      try {
        const value = decodeURIComponent(abCookie.split('=')[1]);
        return JSON.parse(value);
      } catch (error) {
        console.warn('Error parsing AB test cookie:', error);
      }
    }
    
    return [];
  }

  private static setCookieAssignments(assignments: ABTestAssignment[]): void {
    if (typeof document === 'undefined') return;
    
    try {
      const value = encodeURIComponent(JSON.stringify(assignments));
      const expires = new Date();
      expires.setDate(expires.getDate() + this.COOKIE_DURATION_DAYS);
      
      document.cookie = `${this.COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.warn('Error setting AB test cookie:', error);
    }
  }

  // Track assignment to analytics
  private static trackAssignment(testId: string, variantId: string): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'experiment_assignment', {
          experiment_id: testId,
          variant_id: variantId,
          experiment_name: AB_TESTS[testId]?.name || testId,
          variant_name: AB_TESTS[testId]?.variants.find(v => v.id === variantId)?.name || variantId
        });
      } catch (error) {
        console.warn('Error tracking AB test assignment:', error);
      }
    }

    // Also track with Plausible if available
    if (typeof window !== 'undefined' && (window as any).plausible) {
      try {
        (window as any).plausible('experiment_assignment', {
          props: {
            experiment_id: testId,
            variant_id: variantId,
            experiment_name: AB_TESTS[testId]?.name || testId
          }
        });
      } catch (error) {
        console.warn('Error tracking AB test assignment to Plausible:', error);
      }
    }
  }

  // Track conversion for an experiment
  static trackConversion(testId: string, conversionType: string = 'default'): void {
    const assignment = this.getExistingAssignment(testId);
    if (!assignment) return;

    // Track to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'experiment_conversion', {
          experiment_id: testId,
          variant_id: assignment.variantId,
          conversion_type: conversionType,
          experiment_name: AB_TESTS[testId]?.name || testId
        });
      } catch (error) {
        console.warn('Error tracking AB test conversion:', error);
      }
    }

    // Track to Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      try {
        (window as any).plausible('experiment_conversion', {
          props: {
            experiment_id: testId,
            variant_id: assignment.variantId,
            conversion_type: conversionType,
            experiment_name: AB_TESTS[testId]?.name || testId
          }
        });
      } catch (error) {
        console.warn('Error tracking AB test conversion to Plausible:', error);
      }
    }
  }

  // Get test variant content
  static getVariantContent(testId: string, variantId?: string): string {
    const actualVariantId = variantId || this.getAssignment(testId);
    const test = AB_TESTS[testId];
    const variant = test?.variants.find(v => v.id === actualVariantId);
    return variant?.name || test?.variants[0]?.name || 'control';
  }

  // Check if user is in a specific variant
  static isInVariant(testId: string, variantId: string): boolean {
    return this.getAssignment(testId) === variantId;
  }

  // Get all active test assignments for debugging
  static getDebugInfo(): Record<string, string> {
    const info: Record<string, string> = {};
    Object.keys(AB_TESTS).forEach(testId => {
      if (AB_TESTS[testId].isActive) {
        info[testId] = this.getAssignment(testId);
      }
    });
    return info;
  }

  // Force assignment for testing/QA (adds query param support)
  static getAssignmentWithOverride(testId: string): string {
    // Check for URL override (for QA/testing)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const override = urlParams.get(`ab_${testId}`);
      if (override) {
        const test = AB_TESTS[testId];
        const variant = test?.variants.find(v => v.id === override);
        if (variant) {
          console.log(`AB Test Override: ${testId} = ${override}`);
          return override;
        }
      }
    }

    return this.getAssignment(testId);
  }
}

// React hook for using A/B tests
export function useABTest(testId: string) {
  const [assignment, setAssignment] = React.useState<string>('control');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const variantId = ABTestingFramework.getAssignmentWithOverride(testId);
      setAssignment(variantId);
    } catch (error) {
      console.warn(`Error getting AB test assignment for ${testId}:`, error);
      setAssignment('control');
    } finally {
      setIsLoading(false);
    }
  }, [testId]);

  const trackConversion = React.useCallback((conversionType?: string) => {
    ABTestingFramework.trackConversion(testId, conversionType);
  }, [testId]);

  const getContent = React.useCallback((variantId?: string) => {
    return ABTestingFramework.getVariantContent(testId, variantId);
  }, [testId]);

  const isInVariant = React.useCallback((variantId: string) => {
    return assignment === variantId;
  }, [assignment]);

  return {
    assignment,
    isLoading,
    trackConversion,
    getContent,
    isInVariant
  };
}

// Add React import for the hook
import React from 'react';