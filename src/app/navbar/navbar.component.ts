import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <h2>DevAutomation Platform</h2>
        </div>
        <ul class="nav-menu">
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/dashboard']" [routerLinkActive]="['active']">
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/code-analysis']" [routerLinkActive]="['active']">
              Code Analysis
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/automation']" [routerLinkActive]="['active']">
              Automation
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/ai-services']" [routerLinkActive]="['active']">
              AI Services
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/payments']" [routerLinkActive]="['active']">
              Payments
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      border-bottom: 1px solid var(--border);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-brand h2 {
      color: var(--primary);
      font-size: 1.5rem;
      margin: 0;
    }
    
    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }
    
    .nav-link {
      text-decoration: none;
      color: var(--gray);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    
    .nav-link:hover,
    .nav-link.active {
      color: var(--primary);
      background: rgba(59, 130, 246, 0.1);
    }
    
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav-menu {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }
    }
  `]
})
export class NavbarComponent {}
