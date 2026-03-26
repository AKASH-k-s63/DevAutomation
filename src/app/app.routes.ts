import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'code-analysis', loadComponent: () => import('./code-analysis/code-analysis.component').then(m => m.CodeAnalysisComponent) },
  { path: 'code-analysis/upload-project', loadComponent: () => import('./code-analysis/upload-project/upload-project.component').then(m => m.UploadProjectComponent) },
  { path: 'code-analysis/results', loadComponent: () => import('./code-analysis/results/results.component').then(m => m.ResultsComponent) },
  { path: 'automation', loadComponent: () => import('./automation/automation.component').then(m => m.AutomationComponent) },
  { path: 'automation/create-workflow', loadComponent: () => import('./automation/create-workflow/create-workflow.component').then(m => m.CreateWorkflowComponent) },
  { path: 'ai-services', loadComponent: () => import('./ai-services/ai-services.component').then(m => m.AiServicesComponent) },
  { path: 'ai-services/chat', loadComponent: () => import('./ai-services/chat/chat.component').then(m => m.ChatComponent) },
  { path: 'payments', loadComponent: () => import('./payments/payments.component').then(m => m.PaymentsComponent) },
  { path: 'payments/add-payment-method', loadComponent: () => import('./payments/add-payment-method/add-payment-method.component').then(m => m.AddPaymentMethodComponent) },
  { path: 'payments/billing-settings', loadComponent: () => import('./payments/billing-settings/billing-settings.component').then(m => m.BillingSettingsComponent) },
  { path: 'payments/manage-team', loadComponent: () => import('./payments/manage-team/manage-team.component').then(m => m.ManageTeamComponent) },
  { path: '**', redirectTo: '/dashboard' }
];
