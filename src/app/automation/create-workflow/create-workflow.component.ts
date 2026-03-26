import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-workflow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to Automation</button>
        <h1 class="mt-4">Create New Workflow</h1>
        <p class="text-gray">Design your custom automation workflow</p>
      </div>

      <div class="workflow-builder">
        <div class="card">
          <h3>Workflow Configuration</h3>
          <div class="form-group">
            <label>Workflow Name</label>
            <input type="text" class="form-control" placeholder="My Custom Workflow" [(ngModel)]="workflow.name">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" placeholder="Describe what this workflow does" [(ngModel)]="workflow.description"></textarea>
          </div>
        </div>

        <div class="card mt-6">
          <h3>Workflow Steps</h3>
          <div class="steps-container">
            <div class="step" *ngFor="let step of workflow.steps; let i = index">
              <div class="step-header">
                <div class="step-number">{{ i + 1 }}</div>
                <div class="step-info">
                  <h4>{{ step.name || 'Step ' + (i + 1) }}</h4>
                  <p>{{ step.description || 'Configure this step' }}</p>
                </div>
                <div class="step-actions">
                  <button class="btn btn-sm btn-outline" (click)="editStep(i)">Edit</button>
                  <button class="btn btn-sm btn-outline" (click)="removeStep(i)" [disabled]="workflow.steps.length <= 1">Remove</button>
                </div>
              </div>
              <div class="step-details" *ngIf="step.type">
                <span class="step-type">{{ step.type }}</span>
                <span class="step-config">{{ step.configuration }}</span>
              </div>
            </div>
            
            <button class="btn btn-outline" (click)="addStep()">+ Add Step</button>
          </div>
        </div>

        <div class="card mt-6">
          <h3>Workflow Settings</h3>
          <div class="grid grid-cols-2">
            <div class="form-group">
              <label>Trigger Type</label>
              <select class="form-control" [(ngModel)]="workflow.trigger.type">
                <option value="manual">Manual</option>
                <option value="schedule">Schedule</option>
                <option value="webhook">Webhook</option>
                <option value="git-push">Git Push</option>
              </select>
            </div>
            <div class="form-group" *ngIf="workflow.trigger.type === 'schedule'">
              <label>Schedule</label>
              <select class="form-control" [(ngModel)]="workflow.trigger.schedule">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div class="form-group" *ngIf="workflow.trigger.type === 'webhook'">
              <label>Webhook URL</label>
              <input type="text" class="form-control" placeholder="https://api.example.com/webhook" [(ngModel)]="workflow.trigger.webhookUrl">
            </div>
            <div class="form-group">
              <label>Retry Policy</label>
              <select class="form-control" [(ngModel)]="workflow.retryPolicy">
                <option value="none">No Retry</option>
                <option value="linear">Linear Backoff</option>
                <option value="exponential">Exponential Backoff</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-actions mt-6">
          <button class="btn btn-outline" (click)="goBack()">Cancel</button>
          <button class="btn btn-outline" (click)="saveAsDraft()">Save as Draft</button>
          <button class="btn btn-primary" (click)="saveWorkflow()">Save Workflow</button>
        </div>
      </div>

      <!-- Step Editor Modal -->
      <div class="modal" *ngIf="showStepEditor" [class.active]="showStepEditor">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Edit Step {{ editingStepIndex + 1 }}</h3>
            <button class="btn btn-sm btn-outline" (click)="closeStepEditor()">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Step Name</label>
              <input type="text" class="form-control" [(ngModel)]="editingStep.name">
            </div>
            <div class="form-group">
              <label>Action Type</label>
              <select class="form-control" [(ngModel)]="editingStep.type" (change)="onStepTypeChange()">
                <option value="run-tests">Run Tests</option>
                <option value="build-deploy">Build & Deploy</option>
                <option value="code-analysis">Code Analysis</option>
                <option value="security-scan">Security Scan</option>
                <option value="send-notification">Send Notification</option>
                <option value="api-call">API Call</option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea class="form-control" [(ngModel)]="editingStep.description"></textarea>
            </div>
            
            <!-- Dynamic configuration based on step type -->
            <div *ngIf="editingStep.type === 'run-tests'" class="step-config">
              <div class="form-group">
                <label>Test Framework</label>
                <select class="form-control" [(ngModel)]="editingStep.configuration.framework">
                  <option value="jest">Jest</option>
                  <option value="mocha">Mocha</option>
                  <option value="jasmine">Jasmine</option>
                </select>
              </div>
              <div class="form-group">
                <label>Test Pattern</label>
                <input type="text" class="form-control" placeholder="*.test.js" [(ngModel)]="editingStep.configuration.pattern">
              </div>
            </div>

            <div *ngIf="editingStep.type === 'build-deploy'" class="step-config">
              <div class="form-group">
                <label>Build Command</label>
                <input type="text" class="form-control" placeholder="npm run build" [(ngModel)]="editingStep.configuration.buildCommand">
              </div>
              <div class="form-group">
                <label>Deploy Target</label>
                <select class="form-control" [(ngModel)]="editingStep.configuration.deployTarget">
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>
            </div>

            <div *ngIf="editingStep.type === 'send-notification'" class="step-config">
              <div class="form-group">
                <label>Notification Channel</label>
                <select class="form-control" [(ngModel)]="editingStep.configuration.channel">
                  <option value="email">Email</option>
                  <option value="slack">Slack</option>
                  <option value="teams">Microsoft Teams</option>
                </select>
              </div>
              <div class="form-group">
                <label>Recipients</label>
                <input type="text" class="form-control" placeholder="team@example.com" [(ngModel)]="editingStep.configuration.recipients">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeStepEditor()">Cancel</button>
            <button class="btn btn-primary" (click)="saveStep()">Save Step</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .workflow-builder {
      max-width: 800px;
      margin: 0 auto;
    }

    .steps-container {
      margin-top: 1rem;
    }

    .step {
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
      background: white;
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 1rem;
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
      flex-shrink: 0;
    }

    .step-info {
      flex: 1;
    }

    .step-info h4 {
      margin-bottom: 0.25rem;
      color: var(--dark);
    }

    .step-info p {
      color: var(--gray);
      font-size: 0.875rem;
      margin: 0;
    }

    .step-actions {
      display: flex;
      gap: 0.5rem;
    }

    .step-details {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
    }

    .step-type {
      background: var(--primary);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }

    .step-config {
      color: var(--gray);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--dark);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--primary);
    }

    textarea.form-control {
      min-height: 100px;
      resize: vertical;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal:not(.active) {
      display: none;
    }

    .modal-content {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .modal-body {
      margin-bottom: 1.5rem;
    }

    .modal-footer {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .step-config {
      background: var(--light);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .step-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .step-actions {
        width: 100%;
        justify-content: flex-end;
      }

      .modal-content {
        padding: 1rem;
      }
    }
  `]
})
export class CreateWorkflowComponent {
  workflow = {
    name: '',
    description: '',
    trigger: {
      type: 'manual',
      schedule: 'daily',
      webhookUrl: ''
    },
    retryPolicy: 'none',
    steps: [
      {
        name: '',
        type: '',
        description: '',
        configuration: {}
      }
    ]
  };

  showStepEditor = false;
  editingStepIndex = 0;
  editingStep: any = {};

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/automation']);
  }

  addStep() {
    this.workflow.steps.push({
      name: '',
      type: '',
      description: '',
      configuration: {}
    });
  }

  editStep(index: number) {
    this.editingStepIndex = index;
    this.editingStep = { ...this.workflow.steps[index] };
    this.showStepEditor = true;
  }

  removeStep(index: number) {
    if (this.workflow.steps.length > 1) {
      this.workflow.steps.splice(index, 1);
    }
  }

  closeStepEditor() {
    this.showStepEditor = false;
    this.editingStep = {};
  }

  onStepTypeChange() {
    // Reset configuration when type changes
    this.editingStep.configuration = {};
    
    // Set default configuration based on type
    switch (this.editingStep.type) {
      case 'run-tests':
        this.editingStep.configuration = {
          framework: 'jest',
          pattern: '*.test.js'
        };
        break;
      case 'build-deploy':
        this.editingStep.configuration = {
          buildCommand: 'npm run build',
          deployTarget: 'staging'
        };
        break;
      case 'send-notification':
        this.editingStep.configuration = {
          channel: 'email',
          recipients: 'team@example.com'
        };
        break;
    }
  }

  saveStep() {
    this.workflow.steps[this.editingStepIndex] = { ...this.editingStep };
    this.closeStepEditor();
  }

  saveAsDraft() {
    console.log('Saving workflow as draft:', this.workflow);
    alert('Workflow saved as draft! You can continue editing later.');
    this.goBack();
  }

  saveWorkflow() {
    if (!this.workflow.name.trim()) {
      alert('Please enter a workflow name');
      return;
    }

    if (this.workflow.steps.some(step => !step.type)) {
      alert('Please configure all workflow steps');
      return;
    }

    console.log('Saving workflow:', this.workflow);
    alert('Workflow created successfully! It will be available in your automation dashboard.');
    this.goBack();
  }
}
