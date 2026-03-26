import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <h1>Dashboard</h1>
        <p class="text-gray">Welcome to your Dev Automation Platform</p>
      </div>
      
      <div class="grid grid-cols-4 mb-6">
        <div class="card">
          <div class="stat-item">
            <h3 class="stat-number">24</h3>
            <p class="stat-label">Projects Analyzed</p>
          </div>
        </div>
        <div class="card">
          <div class="stat-item">
            <h3 class="stat-number">156</h3>
            <p class="stat-label">Automations Running</p>
          </div>
        </div>
        <div class="card">
          <div class="stat-item">
            <h3 class="stat-number">89%</h3>
            <p class="stat-label">Code Quality Score</p>
          </div>
        </div>
        <div class="card">
          <div class="stat-item">
            <h3 class="stat-number">$2,450</h3>
            <p class="stat-label">Monthly Spending</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2">
        <div class="card">
          <h3>Recent Activities</h3>
          <ul class="activity-list">
            <li>Code analysis completed for Project Alpha</li>
            <li>Automation workflow triggered for beta deployment</li>
            <li>AI code review finished with 12 suggestions</li>
            <li>Payment processed for Enterprise plan</li>
          </ul>
        </div>
        
        <div class="card">
          <h3>Quick Actions</h3>
          <div class="quick-actions">
            <button class="btn btn-primary mb-4" (click)="startNewAnalysis()">Start New Analysis</button>
            <button class="btn btn-secondary mb-4" (click)="createAutomation()">Create Automation</button>
            <button class="btn btn-outline mb-4" (click)="viewAIInsights()">View AI Insights</button>
            <button class="btn btn-outline" (click)="manageBilling()">Manage Billing</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      color: var(--gray);
      font-size: 0.875rem;
      margin: 0;
    }
    
    .activity-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0 0;
    }
    
    .activity-list li {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
      color: var(--dark);
    }
    
    .activity-list li:last-child {
      border-bottom: none;
    }
    
    .quick-actions {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
    }
    
    .quick-actions .btn {
      width: 100%;
    }
  `]
})
export class DashboardComponent {
  dashboardStats: any = {};
  recentActivities: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.apiService.getDashboardStats().subscribe(data => {
      this.dashboardStats = data;
    });
    
    this.apiService.getRecentActivities().subscribe(data => {
      this.recentActivities = data;
    });
  }

  startNewAnalysis() {
    alert('Starting New Code Analysis...\n\nPlease select a project to analyze:\n\n1. Project Alpha (Frontend)\n2. Project Beta (Backend)\n3. Upload New Project\n\nIn a real application, this would open a project selection modal.');
    this.router.navigate(['/code-analysis']);
  }

  createAutomation() {
    alert('Creating New Automation...\n\nAutomation types:\n\n1. CI/CD Pipeline\n2. Security Scan\n3. Performance Monitoring\n4. Custom Workflow\n\nIn a real application, this would open the automation builder.');
    this.router.navigate(['/automation']);
  }

  viewAIInsights() {
    alert('AI Insights Dashboard\n\nRecent AI Activities:\n• Code generation: 45 functions\n• Code reviews: 23 analyses\n• Documentation: 12 documents\n• Issues found: 8 critical, 15 warnings\n\nTop Recommendations:\n• Improve error handling in auth module\n• Optimize database queries\n• Add unit tests for API endpoints\n\nIn a real application, this would show detailed AI analytics.');
    this.router.navigate(['/ai-services']);
  }

  manageBilling() {
    alert('Billing Management\n\nCurrent Plan: Professional\nMonthly Cost: $99\n\nUsage Summary:\n• API Calls: 7,500/10,000\n• Storage: 45GB/100GB\n• Team Members: 8/15\n\nNext Billing Date: April 1, 2024\n\nIn a real application, this would navigate to billing settings.');
    this.router.navigate(['/payments']);
  }
}
