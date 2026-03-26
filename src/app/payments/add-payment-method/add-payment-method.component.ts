import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to Payments</button>
        <h1 class="mt-4">Add Payment Method</h1>
        <p class="text-gray">Choose how you want to pay for your subscription</p>
      </div>

      <div class="grid grid-cols-3 mb-6">
        <div class="card payment-option" (click)="selectPaymentType('credit-card')" [class.selected]="selectedType === 'credit-card'">
          <div class="payment-icon">💳</div>
          <h3>Credit Card</h3>
          <p>Visa, Mastercard, American Express</p>
        </div>
        
        <div class="card payment-option" (click)="selectPaymentType('paypal')" [class.selected]="selectedType === 'paypal'">
          <div class="payment-icon">🅿️</div>
          <h3>PayPal</h3>
          <p>Fast and secure payments</p>
        </div>
        
        <div class="card payment-option" (click)="selectPaymentType('bank')" [class.selected]="selectedType === 'bank'">
          <div class="payment-icon">🏦</div>
          <h3>Bank Transfer</h3>
          <p>Direct bank payment</p>
        </div>
      </div>

      <div class="card" *ngIf="selectedType">
        <h3>Payment Details</h3>
        
        <!-- Credit Card Form -->
        <div *ngIf="selectedType === 'credit-card'" class="payment-form">
          <div class="form-group">
            <label>Card Number</label>
            <input type="text" class="form-control" placeholder="1234 5678 9012 3456" [(ngModel)]="cardNumber">
          </div>
          <div class="grid grid-cols-2">
            <div class="form-group">
              <label>Expiry Date</label>
              <input type="text" class="form-control" placeholder="MM/YY" [(ngModel)]="expiryDate">
            </div>
            <div class="form-group">
              <label>CVV</label>
              <input type="text" class="form-control" placeholder="123" [(ngModel)]="cvv">
            </div>
          </div>
          <div class="form-group">
            <label>Cardholder Name</label>
            <input type="text" class="form-control" placeholder="John Doe" [(ngModel)]="cardholderName">
          </div>
        </div>

        <!-- PayPal Form -->
        <div *ngIf="selectedType === 'paypal'" class="payment-form">
          <div class="form-group">
            <label>PayPal Email</label>
            <input type="email" class="form-control" placeholder="your@email.com" [(ngModel)]="paypalEmail">
          </div>
          <div class="form-group">
            <label>PayPal Password</label>
            <input type="password" class="form-control" placeholder="Enter your PayPal password" [(ngModel)]="paypalPassword">
          </div>
        </div>

        <!-- Bank Transfer Form -->
        <div *ngIf="selectedType === 'bank'" class="payment-form">
          <div class="form-group">
            <label>Account Holder Name</label>
            <input type="text" class="form-control" placeholder="John Doe" [(ngModel)]="accountHolder">
          </div>
          <div class="form-group">
            <label>Bank Name</label>
            <input type="text" class="form-control" placeholder="Bank of America" [(ngModel)]="bankName">
          </div>
          <div class="form-group">
            <label>Account Number</label>
            <input type="text" class="form-control" placeholder="1234567890" [(ngModel)]="accountNumber">
          </div>
          <div class="form-group">
            <label>Routing Number</label>
            <input type="text" class="form-control" placeholder="021000021" [(ngModel)]="routingNumber">
          </div>
        </div>

        <div class="form-actions mt-6">
          <button class="btn btn-outline" (click)="goBack()">Cancel</button>
          <button class="btn btn-primary" (click)="savePaymentMethod()">Add Payment Method</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-option {
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid var(--border);
    }

    .payment-option:hover,
    .payment-option.selected {
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    }

    .payment-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .payment-form {
      margin-top: 2rem;
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
      transition: border-color 0.2s;
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
      .grid-cols-3 {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AddPaymentMethodComponent {
  selectedType: string = '';
  
  // Credit Card fields
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardholderName: string = '';
  
  // PayPal fields
  paypalEmail: string = '';
  paypalPassword: string = '';
  
  // Bank fields
  accountHolder: string = '';
  bankName: string = '';
  accountNumber: string = '';
  routingNumber: string = '';

  constructor(private router: Router) {}

  selectPaymentType(type: string) {
    this.selectedType = type;
  }

  goBack() {
    this.router.navigate(['/payments']);
  }

  savePaymentMethod() {
    // Validate form based on selected type
    let isValid = false;
    
    if (this.selectedType === 'credit-card') {
      isValid = !!(this.cardNumber && this.expiryDate && this.cvv && this.cardholderName);
    } else if (this.selectedType === 'paypal') {
      isValid = !!(this.paypalEmail && this.paypalPassword);
    } else if (this.selectedType === 'bank') {
      isValid = !!(this.accountHolder && this.bankName && this.accountNumber && this.routingNumber);
    }

    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would save to a backend
    console.log('Saving payment method:', {
      type: this.selectedType,
      details: this.getPaymentDetails()
    });

    // Navigate back to payments with success
    this.router.navigate(['/payments'], { 
      queryParams: { success: 'payment-method-added' } 
    });
  }

  private getPaymentDetails() {
    switch (this.selectedType) {
      case 'credit-card':
        return {
          last4: this.cardNumber.slice(-4),
          expiry: this.expiryDate,
          holder: this.cardholderName
        };
      case 'paypal':
        return {
          email: this.paypalEmail
        };
      case 'bank':
        return {
          holder: this.accountHolder,
          bank: this.bankName,
          last4: this.accountNumber.slice(-4)
        };
      default:
        return {};
    }
  }
}
