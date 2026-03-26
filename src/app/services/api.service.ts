import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  lastAnalyzed: Date;
  codeQuality: number;
  securityScore: number;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'inactive';
  lastRun: Date;
  successRate: number;
}

export interface AIUsage {
  totalCalls: number;
  codeGeneration: number;
  codeReviews: number;
  documentation: number;
  monthlyLimit: number;
}

export interface BillingInfo {
  plan: string;
  price: number;
  nextBillingDate: Date;
  usage: {
    apiCalls: { used: number; limit: number };
    storage: { used: number; limit: number };
    teamMembers: { used: number; limit: number };
    automations: { used: number; limit: number };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  // Dashboard methods
  getDashboardStats(): Observable<any> {
    const stats = {
      projectsAnalyzed: 24,
      automationsRunning: 156,
      codeQualityScore: 89,
      monthlySpending: 2450
    };
    return of(stats);
  }

  getRecentActivities(): Observable<any[]> {
    const activities = [
      { id: 1, message: 'Code analysis completed for Project Alpha', time: '2 hours ago' },
      { id: 2, message: 'Automation workflow triggered for beta deployment', time: '4 hours ago' },
      { id: 3, message: 'AI code review finished with 12 suggestions', time: '6 hours ago' },
      { id: 4, message: 'Payment processed for Enterprise plan', time: '1 day ago' }
    ];
    return of(activities);
  }

  // Code Analysis methods
  getProjects(): Observable<Project[]> {
    const projects: Project[] = [
      {
        id: '1',
        name: 'Project Alpha',
        description: 'Main application frontend',
        status: 'active',
        lastAnalyzed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        codeQuality: 85,
        securityScore: 92
      },
      {
        id: '2',
        name: 'Project Beta',
        description: 'Backend API services',
        status: 'active',
        lastAnalyzed: new Date(Date.now() - 5 * 60 * 60 * 1000),
        codeQuality: 78,
        securityScore: 88
      }
    ];
    return of(projects);
  }

  analyzeCode(projectId: string): Observable<any> {
    return of({ success: true, message: 'Analysis started successfully' });
  }

  // Automation methods
  getAutomations(): Observable<Automation[]> {
    const automations: Automation[] = [
      {
        id: '1',
        name: 'CI/CD Pipeline',
        trigger: 'Git Push',
        action: 'Build & Deploy',
        status: 'active',
        lastRun: new Date(Date.now() - 15 * 60 * 1000),
        successRate: 98.5
      },
      {
        id: '2',
        name: 'Security Scan',
        trigger: 'Schedule',
        action: 'Vulnerability Assessment',
        status: 'active',
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
        successRate: 99.2
      },
      {
        id: '3',
        name: 'Performance Monitoring',
        trigger: 'Schedule',
        action: 'Performance Reports',
        status: 'inactive',
        lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        successRate: 95.8
      }
    ];
    return of(automations);
  }

  createAutomation(automation: Partial<Automation>): Observable<any> {
    return of({ success: true, id: Date.now().toString() });
  }

  updateAutomation(id: string, automation: Partial<Automation>): Observable<any> {
    return of({ success: true });
  }

  deleteAutomation(id: string): Observable<any> {
    return of({ success: true });
  }

  // AI Services methods
  getAIUsage(): Observable<AIUsage> {
    const usage: AIUsage = {
      totalCalls: 7500,
      codeGeneration: 3000,
      codeReviews: 800,
      documentation: 300,
      monthlyLimit: 10000
    };
    return of(usage);
  }

  generateCode(prompt: string): Observable<any> {
    return of({
      success: true,
      code: '// Generated code based on: ' + prompt + '\nfunction example() {\n  // Implementation\n}',
      suggestions: ['Consider adding error handling', 'Add type annotations', 'Include unit tests']
    });
  }

  reviewCode(code: string): Observable<any> {
    return of({
      success: true,
      issues: [
        { type: 'warning', message: 'Unused variable detected', line: 15 },
        { type: 'error', message: 'Missing semicolon', line: 23 },
        { type: 'info', message: 'Consider using const instead of let', line: 8 }
      ],
      score: 78,
      suggestions: ['Improve code readability', 'Add documentation', 'Optimize performance']
    });
  }

  generateDocumentation(code: string): Observable<any> {
    return of({
      success: true,
      documentation: '# API Documentation\n\nGenerated documentation for the provided code...',
      format: 'markdown'
    });
  }

  // Payment methods
  getBillingInfo(): Observable<BillingInfo> {
    const billing: BillingInfo = {
      plan: 'Professional',
      price: 99,
      nextBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      usage: {
        apiCalls: { used: 7500, limit: 10000 },
        storage: { used: 45, limit: 100 },
        teamMembers: { used: 8, limit: 15 },
        automations: { used: 156, limit: 200 }
      }
    };
    return of(billing);
  }

  updatePaymentMethod(paymentMethod: any): Observable<any> {
    return of({ success: true, message: 'Payment method updated successfully' });
  }

  upgradePlan(planId: string): Observable<any> {
    return of({ success: true, message: 'Plan upgraded successfully' });
  }

  getBillingHistory(): Observable<any[]> {
    const history = [
      { id: 1, date: '2024-03-01', description: 'Professional Plan - Monthly', amount: 99 },
      { id: 2, date: '2024-02-01', description: 'Professional Plan - Monthly', amount: 99 },
      { id: 3, date: '2024-01-15', description: 'API Usage Overage', amount: 25 }
    ];
    return of(history);
  }
}
