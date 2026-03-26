import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to Payments</button>
        <h1 class="mt-4">Billing Settings</h1>
        <p class="text-gray">Manage your billing preferences and notifications</p>
      </div>

      <div class="grid grid-cols-2">
        <div class="card">
          <h3>Notification Preferences</h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive billing updates via email</p>
              </div>
              <label class="switch">
                <input type="checkbox" [(ngModel)]="emailNotifications">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Monthly Statements</h4>
                <p>Get detailed monthly billing statements</p>
              </div>
              <label class="switch">
                <input type="checkbox" [(ngModel)]="monthlyStatements">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Payment Reminders</h4>
                <p>Remind me before payment is due</p>
              </div>
              <label class="switch">
                <input type="checkbox" [(ngModel)]="paymentReminders">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Usage Alerts</h4>
                <p>Alert when approaching usage limits</p>
              </div>
              <label class="switch">
                <input type="checkbox" [(ngModel)]="usageAlerts">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Payment Settings</h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Auto-Renewal</h4>
                <p>Automatically renew subscription</p>
              </div>
              <label class="switch">
                <input type="checkbox" [(ngModel)]="autoRenewal">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Currency</h4>
                <p>Choose your preferred currency</p>
              </div>
              <select class="form-control" [(ngModel)]="currency">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Billing Cycle</h4>
                <p>Choose your billing frequency</p>
              </div>
              <select class="form-control" [(ngModel)]="billingCycle">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly (Save 20%)</option>
              </select>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Default Payment Method</h4>
                <p>Select primary payment method</p>
              </div>
              <select class="form-control" [(ngModel)]="defaultPaymentMethod">
                <option value="credit-card">•••• 4242</option>
                <option value="paypal">user&#64;example.com</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-6">
        <h3>Tax Settings</h3>
        <div class="grid grid-cols-2">
          <div class="form-group">
            <label>Tax ID / VAT Number</label>
            <input type="text" class="form-control" placeholder="Enter your tax ID" [(ngModel)]="taxId">
          </div>
          <div class="form-group">
            <label>Billing Address</label>
            <input type="text" class="form-control" placeholder="Company address" [(ngModel)]="billingAddress">
          </div>
          <div class="form-group">
            <label>Country</label>
            <select class="form-control" [(ngModel)]="country">
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
          </div>
          <div class="form-group">
            <label>Postal Code</label>
            <input type="text" class="form-control" placeholder="12345" [(ngModel)]="postalCode">
          </div>
        </div>
      </div>

      <div class="form-actions mt-6">
        <button class="btn btn-outline" (click)="goBack()">Cancel</button>
        <button class="btn btn-primary" (click)="saveSettings()">Save Settings</button>
      </div>
    </div>
  `,
  styles: [`
    .settings-list {
      margin-top: 1rem;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
    }

    .setting-item:last-child {
      border-bottom: none;
    }

    .setting-info h4 {
      margin-bottom: 0.25rem;
      color: var(--dark);
    }

    .setting-info p {
      color: var(--gray);
      font-size: 0.875rem;
      margin: 0;
    }

    // Toggle switch styles
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--gray);
      transition: .4s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--primary);
    }

    input:checked + .slider:before {
      transform: translateX(26px);
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

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    @media (max-width: 768px) {
      .grid-cols-2 {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BillingSettingsComponent {
  // Notification preferences
  emailNotifications: boolean = true;
  monthlyStatements: boolean = true;
  paymentReminders: boolean = true;
  usageAlerts: boolean = false;

  // Payment settings
  autoRenewal: boolean = true;
  currency: string = 'USD';
  billingCycle: string = 'monthly';
  defaultPaymentMethod: string = 'credit-card';

  // Tax settings
  taxId: string = '';
  billingAddress: string = '';
  country: string = 'US';
  postalCode: string = '';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/payments']);
  }

  saveSettings() {
    // In a real app, this would save to a backend
    console.log('Saving billing settings:', {
      notifications: {
        email: this.emailNotifications,
        statements: this.monthlyStatements,
        reminders: this.paymentReminders,
        usage: this.usageAlerts
      },
      payment: {
        autoRenewal: this.autoRenewal,
        currency: this.currency,
        cycle: this.billingCycle,
        defaultMethod: this.defaultPaymentMethod
      },
      tax: {
        taxId: this.taxId,
        address: this.billingAddress,
        country: this.country,
        postalCode: this.postalCode
      }
    });

    // Navigate back with success message
    this.router.navigate(['/payments'], { 
      queryParams: { success: 'settings-saved' } 
    });
  }
}
