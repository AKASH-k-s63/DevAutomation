import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <h1>Payments & Billing</h1>
        <p class="text-gray">Manage your subscription and payment methods</p>
      </div>
      
      <div class="grid grid-cols-3 mb-6">
        <div class="card">
          <h3>Current Plan</h3>
          <div class="plan-info">
            <div class="plan-name">Professional</div>
            <div class="plan-price">$99/month</div>
            <div class="plan-features">
              <ul>
                <li>Unlimited projects</li>
                <li>Advanced AI features</li>
                <li>Priority support</li>
                <li>Custom integrations</li>
              </ul>
            </div>
            <button class="btn btn-outline" (click)="upgradePlan()">Upgrade Plan</button>
          </div>
        </div>
        
        <div class="card">
          <h3>Usage Overview</h3>
          <div class="usage-overview">
            <div class="usage-metric">
              <span class="metric-label">API Calls</span>
              <span class="metric-value">7,500 / 10,000</span>
            </div>
            <div class="usage-metric">
              <span class="metric-label">Storage</span>
              <span class="metric-value">45GB / 100GB</span>
            </div>
            <div class="usage-metric">
              <span class="metric-label">Team Members</span>
              <span class="metric-value">8 / 15</span>
            </div>
            <div class="usage-metric">
              <span class="metric-label">Automations</span>
              <span class="metric-value">156 / 200</span>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h3>Quick Actions</h3>
          <div class="quick-actions">
            <button class="btn btn-primary mb-3" (click)="addPaymentMethod()">Add Payment Method</button>
            <button class="btn btn-outline mb-3" (click)="downloadInvoices()">Download Invoices</button>
            <button class="btn btn-outline mb-3" (click)="manageTeam()">Manage Team</button>
            <button class="btn btn-outline" (click)="billingSettings()">Billing Settings</button>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 mb-6">
        <div class="card">
          <h3>Payment Methods</h3>
          <div class="payment-methods">
            <div class="payment-method">
              <div class="payment-info">
                <div class="payment-type">Credit Card</div>
                <div class="payment-details">•••• •••• •••• 4242</div>
                <div class="payment-expiry">Expires 12/25</div>
              </div>
              <div class="payment-actions">
                <span class="default-badge">Default</span>
                <button class="btn btn-sm btn-outline" (click)="editPaymentMethod('credit-card')">Edit</button>
              </div>
            </div>
            <div class="payment-method">
              <div class="payment-info">
                <div class="payment-type">PayPal</div>
                <div class="payment-details">usexample.com</div>
                <div class="payment-expiry">Connected</div>
              </div>
              <div class="payment-actions">
                <button class="btn btn-sm btn-outline" (click)="editPaymentMethod('paypal')">Edit</button>
              </div>
            </div>
          </div>
          <button class="btn btn-outline mt-4" (click)="addPaymentMethod()">+ Add Payment Method</button>
        </div>
        
        <div class="card">
          <h3>Billing History</h3>
          <div class="billing-history">
            <div class="billing-item">
              <div class="billing-info">
                <div class="billing-date">March 1, 2024</div>
                <div class="billing-description">Professional Plan - Monthly</div>
              </div>
              <div class="billing-amount">$99.00</div>
            </div>
            <div class="billing-item">
              <div class="billing-info">
                <div class="billing-date">February 1, 2024</div>
                <div class="billing-description">Professional Plan - Monthly</div>
              </div>
              <div class="billing-amount">$99.00</div>
            </div>
            <div class="billing-item">
              <div class="billing-info">
                <div class="billing-date">January 15, 2024</div>
                <div class="billing-description">API Usage Overage</div>
              </div>
              <div class="billing-amount">$25.00</div>
            </div>
          </div>
          <button class="btn btn-outline mt-4" (click)="viewAllInvoices()">View All Invoices</button>
        </div>
      </div>
      
      <div class="card">
        <h3>Pricing Plans</h3>
        <div class="pricing-plans">
          <div class="plan-card">
            <div class="plan-header">
              <h4>Starter</h4>
              <div class="plan-price">$29<span>/month</span></div>
            </div>
            <ul class="plan-features-list">
              <li>✓ 5 projects</li>
              <li>✓ Basic AI features</li>
              <li>✓ Email support</li>
              <li>✓ 10GB storage</li>
            </ul>
            <button class="btn btn-outline" (click)="selectPlan('starter')">Choose Plan</button>
          </div>
          
          <div class="plan-card featured">
            <div class="plan-badge">Popular</div>
            <div class="plan-header">
              <h4>Professional</h4>
              <div class="plan-price">$99<span>/month</span></div>
            </div>
            <ul class="plan-features-list">
              <li>✓ Unlimited projects</li>
              <li>✓ Advanced AI features</li>
              <li>✓ Priority support</li>
              <li>✓ 100GB storage</li>
              <li>✓ Custom integrations</li>
            </ul>
            <button class="btn btn-primary" (click)="currentPlanDetails()">Current Plan</button>
          </div>
          
          <div class="plan-card">
            <div class="plan-header">
              <h4>Enterprise</h4>
              <div class="plan-price">Custom</div>
            </div>
            <ul class="plan-features-list">
              <li>✓ Everything in Pro</li>
              <li>✓ Unlimited storage</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
              <li>✓ Custom features</li>
            </ul>
            <button class="btn btn-outline" (click)="contactSales()">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .plan-info {
      text-align: center;
    }
    
    .plan-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    
    .plan-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 1.5rem;
    }
    
    .plan-features ul {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
    }
    
    .plan-features li {
      padding: 0.5rem 0;
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .plan-features li::before {
      content: "✓";
      color: var(--success);
      margin-right: 0.5rem;
    }
    
    .usage-overview {
      margin-top: 1rem;
    }
    
    .usage-metric {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .usage-metric:last-child {
      border-bottom: none;
    }
    
    .metric-label {
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .metric-value {
      font-weight: 600;
      color: var(--dark);
      font-size: 0.875rem;
    }
    
    .quick-actions {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
    }
    
    .quick-actions .btn {
      width: 100%;
    }
    
    .payment-methods {
      margin-top: 1rem;
    }
    
    .payment-method {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .payment-type {
      font-weight: 600;
      color: var(--dark);
      margin-bottom: 0.25rem;
    }
    
    .payment-details {
      color: var(--gray);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .payment-expiry {
      color: var(--gray);
      font-size: 0.75rem;
    }
    
    .payment-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .default-badge {
      background: var(--success);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .billing-history {
      margin-top: 1rem;
    }
    
    .billing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .billing-item:last-child {
      border-bottom: none;
    }
    
    .billing-date {
      font-weight: 600;
      color: var(--dark);
      margin-bottom: 0.25rem;
    }
    
    .billing-description {
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .billing-amount {
      font-weight: 600;
      color: var(--dark);
      font-size: 1rem;
    }
    
    .pricing-plans {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 1rem;
    }
    
    .plan-card {
      position: relative;
      padding: 2rem;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      text-align: center;
      transition: all 0.2s;
    }
    
    .plan-card:hover {
      border-color: var(--primary);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .plan-card.featured {
      border-color: var(--primary);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
    }
    
    .plan-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: white;
      padding: 0.25rem 1rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .plan-header h4 {
      font-size: 1.5rem;
      color: var(--dark);
      margin-bottom: 0.5rem;
    }
    
    .plan-header .plan-price {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0;
    }
    
    .plan-header .plan-price span {
      font-size: 1rem;
      font-weight: 400;
      color: var(--gray);
    }
    
    .plan-features-list {
      list-style: none;
      padding: 1.5rem 0;
      margin: 0;
      text-align: left;
    }
    
    .plan-features-list li {
      padding: 0.5rem 0;
      color: var(--dark);
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .pricing-plans {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `]
})
export class PaymentsComponent {
  currentPlan = 'Professional';
  billingInfo: any = {};
  paymentMethods = [
    {
      id: 'credit-card',
      type: 'Credit Card',
      details: '•••• •••• •••• 4242',
      expiry: 'Expires 12/25',
      isDefault: true
    },
    {
      id: 'paypal',
      type: 'PayPal',
      details: 'user@example.com',
      expiry: 'Connected',
      isDefault: false
    }
  ];
  billingHistory = [
    { id: 1, date: 'March 1, 2024', description: 'Professional Plan - Monthly', amount: 99 },
    { id: 2, date: 'February 1, 2024', description: 'Professional Plan - Monthly', amount: 99 },
    { id: 3, date: 'January 15, 2024', description: 'API Usage Overage', amount: 25 }
  ];

  constructor(private router: Router, private apiService: ApiService) {
    this.loadBillingInfo();
  }

  loadBillingInfo() {
    this.apiService.getBillingInfo().subscribe(data => {
      this.billingInfo = data;
    });
  }

  upgradePlan() {
    alert('Upgrade Plan: Redirecting to plan selection...\n\nAvailable upgrades:\n- Enterprise: Custom pricing\n- Professional: $99/month (current)\n\nIn a real application, this would open a plan comparison modal.');
  }

  addPaymentMethod() {
    this.router.navigate(['/payments/add-payment-method']);
  }

  editPaymentMethod(methodId: string) {
    const method = this.paymentMethods.find(m => m.id === methodId);
    if (method) {
      if (method.type === 'Credit Card') {
        const newExpiry = prompt('Update expiry date (MM/YY):', method.expiry.replace('Expires ', ''));
        if (newExpiry) {
          method.expiry = 'Expires ' + newExpiry;
          alert('Payment method updated successfully!');
        }
      } else {
        const newEmail = prompt('Update email:', method.details);
        if (newEmail) {
          method.details = newEmail;
          alert('Payment method updated successfully!');
        }
      }
    }
  }

  downloadInvoices() {
    alert('Download Invoices:\n\nPreparing invoice downloads...\n\nInvoices ready for download:\n- March 2024: $99.00\n- February 2024: $99.00\n- January 2024: $25.00\n\nIn a real application, this would generate PDF files.');
  }

  manageTeam() {
    this.router.navigate(['/payments/manage-team']);
  }

  billingSettings() {
    this.router.navigate(['/payments/billing-settings']);
  }

  viewAllInvoices() {
    const invoices = this.billingHistory.map(item => 
      `${item.date}: ${item.description} - $${item.amount.toFixed(2)}`
    ).join('\n');
    
    alert(`All Invoices\n\n${invoices}\n\nTotal: $${this.billingHistory.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}\n\nIn a real application, this would show paginated invoice history.`);
  }

  selectPlan(planName: string) {
    if (planName === 'starter') {
      alert('Starter Plan Selected:\n\nPlan features:\n- 5 projects\n- Basic AI features\n- Email support\n- 10GB storage\n- $29/month\n\nProceeding to checkout...');
    }
  }

  currentPlanDetails() {
    alert(`Current Plan: Professional\n\nFeatures:\n- Unlimited projects\n- Advanced AI features\n- Priority support\n- 100GB storage\n- Custom integrations\n\nPrice: $99/month\n\nNext billing: ${new Date(this.billingInfo.nextBillingDate).toLocaleDateString()}\n\nUsage:\n- API: ${this.billingInfo.usage?.apiCalls?.used || 7500}/${this.billingInfo.usage?.apiCalls?.limit || 10000}\n- Storage: ${this.billingInfo.usage?.storage?.used || 45}GB/${this.billingInfo.usage?.storage?.limit || 100}GB\n- Team: ${this.billingInfo.usage?.teamMembers?.used || 8}/${this.billingInfo.usage?.teamMembers?.limit || 15}\n- Automations: ${this.billingInfo.usage?.automations?.used || 156}/${this.billingInfo.usage?.automations?.limit || 200}`);
  }

  contactSales() {
    alert('Contact Sales:\n\nEnterprise Plan Features:\n- Everything in Professional\n- Unlimited storage\n- Dedicated support\n- SLA guarantee\n- Custom features\n\nContact: sales@devautomation.com\nPhone: 1-800-DEV-AUTO\n\nIn a real application, this would open a contact form or initiate chat.');
  }
}
