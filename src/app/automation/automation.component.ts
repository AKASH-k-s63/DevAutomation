import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <h1>Automation</h1>
        <p class="text-gray">Streamline your development workflow with intelligent automation</p>
      </div>
      
      <div class="card mb-6">
        <div class="card-header">
          <h3>Create New Automation</h3>
          <button class="btn btn-primary" (click)="createWorkflow()">+ New Workflow</button>
        </div>
        <div class="automation-builder">
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Trigger</h4>
                <select class="form-control">
                  <option>Git Push</option>
                  <option>Schedule</option>
                  <option>Manual</option>
                  <option>Webhook</option>
                </select>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Action</h4>
                <select class="form-control">
                  <option>Run Tests</option>
                  <option>Build & Deploy</option>
                  <option>Code Analysis</option>
                  <option>Send Notification</option>
                </select>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Conditions</h4>
                <select class="form-control">
                  <option>Always</option>
                  <option>On Success</option>
                  <option>On Failure</option>
                  <option>Custom Rules</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 mb-6">
        <div class="card">
          <h3>Active Automations</h3>
          <div class="automation-list">
            <div class="automation-item">
              <div class="automation-status active"></div>
              <div class="automation-info">
                <h4>CI/CD Pipeline</h4>
                <p>Triggers on every push to main branch</p>
                <span class="last-run">Last run: 15 minutes ago</span>
              </div>
              <div class="automation-actions">
                <button class="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
            <div class="automation-item">
              <div class="automation-status active"></div>
              <div class="automation-info">
                <h4>Security Scan</h4>
                <p>Daily vulnerability assessment</p>
                <span class="last-run">Last run: 2 hours ago</span>
              </div>
              <div class="automation-actions">
                <button class="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
            <div class="automation-item">
              <div class="automation-status inactive"></div>
              <div class="automation-info">
                <h4>Performance Monitoring</h4>
                <p>Weekly performance reports</p>
                <span class="last-run">Last run: 3 days ago</span>
              </div>
              <div class="automation-actions">
                <button class="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h3>Automation Statistics</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">⚡</div>
              <div class="stat-details">
                <h4>1,247</h4>
                <p>Total Runs</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-details">
                <h4>98.5%</h4>
                <p>Success Rate</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-details">
                <h4>2.3s</h4>
                <p>Avg Duration</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-details">
                <h4>$124</h4>
                <p>Monthly Cost</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3>Automation Templates</h3>
        <div class="templates-grid">
          <div class="template-card">
            <div class="template-icon">🚀</div>
            <h4>Deployment Pipeline</h4>
            <p>Automated build, test, and deploy workflow</p>
            <button class="btn btn-outline" (click)="useTemplate('deployment')">Use Template</button>
          </div>
          <div class="template-card">
            <div class="template-icon">🔍</div>
            <h4>Code Review Bot</h4>
            <p>Automated code quality checks and reviews</p>
            <button class="btn btn-outline" (click)="useTemplate('code-review')">Use Template</button>
          </div>
          <div class="template-card">
            <div class="template-icon">📊</div>
            <h4>Analytics Reporter</h4>
            <p>Generate and send weekly analytics reports</p>
            <button class="btn btn-outline" (click)="useTemplate('analytics')">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .automation-builder {
      margin-top: 1rem;
    }
    
    .workflow-steps {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
    }
    
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .step-content {
      width: 100%;
      text-align: center;
    }
    
    .step-content h4 {
      margin-bottom: 0.5rem;
      color: var(--dark);
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }
    
    .automation-list {
      margin-top: 1rem;
    }
    
    .automation-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .automation-item:last-child {
      border-bottom: none;
    }
    
    .automation-status {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .automation-status.active {
      background: var(--success);
    }
    
    .automation-status.inactive {
      background: var(--gray);
    }
    
    .automation-info {
      flex: 1;
    }
    
    .automation-info h4 {
      margin-bottom: 0.25rem;
      color: var(--dark);
    }
    
    .automation-info p {
      color: var(--gray);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .last-run {
      color: var(--gray);
      font-size: 0.75rem;
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .stat-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--light);
      border-radius: 0.5rem;
    }
    
    .stat-icon {
      font-size: 1.5rem;
    }
    
    .stat-details h4 {
      margin: 0;
      color: var(--dark);
      font-size: 1.25rem;
    }
    
    .stat-details p {
      margin: 0;
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 1rem;
    }
    
    .template-card {
      text-align: center;
      padding: 1.5rem;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      transition: all 0.2s;
    }
    
    .template-card:hover {
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .template-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    .template-card h4 {
      margin-bottom: 0.5rem;
      color: var(--dark);
    }
    
    .template-card p {
      color: var(--gray);
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    
    @media (max-width: 768px) {
      .workflow-steps {
        flex-direction: column;
        gap: 1rem;
      }
      
      .templates-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AutomationComponent {
  automations: any[] = [];
  stats: any = {};

  constructor(private router: Router, private apiService: ApiService) {
    this.loadData();
  }

  loadData() {
    this.apiService.getAutomations().subscribe(data => {
      this.automations = data;
    });
    
    // Mock stats
    this.stats = {
      totalRuns: 1247,
      successRate: 98.5,
      avgDuration: 2.3,
      monthlyCost: 124
    };
  }

  createWorkflow() {
    this.router.navigate(['/automation/create-workflow']);
  }

  editAutomation(id: string) {
    console.log('Edit automation:', id);
    // Navigate to edit page or open modal
  }

  deleteAutomation(id: string) {
    if (confirm('Are you sure you want to delete this automation?')) {
      this.automations = this.automations.filter(a => a.id !== id);
    }
  }

  useTemplate(template: string) {
    console.log('Using template:', template);
    this.router.navigate(['/automation/create-workflow'], { 
      queryParams: { template: template } 
    });
  }
}
