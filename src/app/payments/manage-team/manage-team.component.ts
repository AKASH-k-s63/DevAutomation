import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to Payments</button>
        <h1 class="mt-4">Team Management</h1>
        <p class="text-gray">Manage your team members and their access</p>
      </div>

      <div class="grid grid-cols-3 mb-6">
        <div class="card stat-card">
          <div class="stat-number">{{ teamMembers.length }}</div>
          <div class="stat-label">Total Members</div>
        </div>
        <div class="card stat-card">
          <div class="stat-number">{{ activeMembers }}</div>
          <div class="stat-label">Active Members</div>
        </div>
        <div class="card stat-card">
          <div class="stat-number">{{ teamLimit - teamMembers.length }}</div>
          <div class="stat-label">Slots Available</div>
        </div>
      </div>

      <div class="card mb-6">
        <div class="card-header">
          <h3>Team Members</h3>
          <button class="btn btn-primary" (click)="showAddMember = !showAddMember">
            {{ showAddMember ? 'Cancel' : '+ Add Member' }}
          </button>
        </div>

        <!-- Add Member Form -->
        <div *ngIf="showAddMember" class="add-member-form">
          <div class="grid grid-cols-2">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" placeholder="John Doe" [(ngModel)]="newMember.name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" placeholder="john@example.com" [(ngModel)]="newMember.email">
            </div>
            <div class="form-group">
              <label>Role</label>
              <select class="form-control" [(ngModel)]="newMember.role">
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div class="form-group">
              <label>Department</label>
              <input type="text" class="form-control" placeholder="Engineering" [(ngModel)]="newMember.department">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-outline" (click)="showAddMember = false">Cancel</button>
            <button class="btn btn-primary" (click)="addMember()">Add Member</button>
          </div>
        </div>

        <!-- Team Members List -->
        <div class="team-list">
          <div class="team-item" *ngFor="let member of teamMembers">
            <div class="member-avatar">
              {{ member.name.charAt(0).toUpperCase() }}
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <p>{{ member.email }}</p>
              <div class="member-details">
                <span class="role-badge" [class]="'role-' + member.role">{{ member.role }}</span>
                <span class="department">{{ member.department }}</span>
                <span class="status" [class]="member.status">{{ member.status }}</span>
              </div>
            </div>
            <div class="member-actions">
              <button class="btn btn-sm btn-outline" (click)="editMember(member)">Edit</button>
              <button class="btn btn-sm btn-outline" (click)="removeMember(member)" 
                      [disabled]="member.role === 'admin' && adminCount === 1">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Team Settings</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <h4>Allow Self-Registration</h4>
              <p>Team members can register themselves with invitation code</p>
            </div>
            <label class="switch">
              <input type="checkbox" [(ngModel)]="allowSelfRegistration">
              <span class="slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h4>Email Notifications</h4>
              <p>Send team activity notifications</p>
            </div>
            <label class="switch">
              <input type="checkbox" [(ngModel)]="emailNotifications">
              <span class="slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h4>Two-Factor Authentication</h4>
              <p>Require 2FA for all team members</p>
            </div>
            <label class="switch">
              <input type="checkbox" [(ngModel)]="require2FA">
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="form-actions mt-6">
          <button class="btn btn-outline" (click)="goBack()">Back</button>
          <button class="btn btn-primary" (click)="saveSettings()">Save Settings</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--gray);
      font-size: 0.875rem;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .add-member-form {
      background: var(--light);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
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

    .team-list {
      margin-top: 1rem;
    }

    .team-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
    }

    .team-item:last-child {
      border-bottom: none;
    }

    .member-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.25rem;
    }

    .member-info {
      flex: 1;
    }

    .member-info h4 {
      margin-bottom: 0.25rem;
      color: var(--dark);
    }

    .member-info p {
      color: var(--gray);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .member-details {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .role-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .role-admin {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger);
    }

    .role-developer {
      background: rgba(59, 130, 246, 0.1);
      color: var(--primary);
    }

    .role-viewer {
      background: rgba(107, 114, 128, 0.1);
      color: var(--gray);
    }

    .department {
      color: var(--gray);
      font-size: 0.75rem;
    }

    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status.active {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }

    .status.inactive {
      background: rgba(107, 114, 128, 0.1);
      color: var(--gray);
    }

    .member-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
    }

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

    @media (max-width: 768px) {
      .grid-cols-2,
      .grid-cols-3 {
        grid-template-columns: 1fr;
      }

      .team-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .member-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class ManageTeamComponent {
  teamMembers: any[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      department: 'Engineering',
      status: 'active',
      joinedDate: new Date('2023-01-15')
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'developer',
      department: 'Engineering',
      status: 'active',
      joinedDate: new Date('2023-02-20')
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'developer',
      department: 'Engineering',
      status: 'active',
      joinedDate: new Date('2023-03-10')
    }
  ];

  teamLimit = 15;
  showAddMember = false;
  newMember = {
    name: '',
    email: '',
    role: 'developer',
    department: ''
  };

  // Team settings
  allowSelfRegistration = false;
  emailNotifications = true;
  require2FA = false;

  constructor(private router: Router) {}

  get activeMembers() {
    return this.teamMembers.filter(m => m.status === 'active').length;
  }

  get adminCount() {
    return this.teamMembers.filter(m => m.role === 'admin').length;
  }

  goBack() {
    this.router.navigate(['/payments']);
  }

  addMember() {
    if (!this.newMember.name || !this.newMember.email || !this.newMember.department) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.teamMembers.length >= this.teamLimit) {
      alert('Team limit reached. Upgrade your plan to add more members.');
      return;
    }

    const member = {
      id: Date.now(),
      ...this.newMember,
      status: 'active',
      joinedDate: new Date()
    };

    this.teamMembers.push(member);
    this.newMember = { name: '', email: '', role: 'developer', department: '' };
    this.showAddMember = false;
  }

  editMember(member: any) {
    const newName = prompt('Edit name:', member.name);
    if (newName && newName.trim()) {
      member.name = newName.trim();
    }
  }

  removeMember(member: any) {
    if (member.role === 'admin' && this.adminCount === 1) {
      alert('Cannot remove the last admin. Assign admin role to another member first.');
      return;
    }

    if (confirm(`Remove ${member.name} from the team?`)) {
      const index = this.teamMembers.findIndex(m => m.id === member.id);
      if (index > -1) {
        this.teamMembers.splice(index, 1);
      }
    }
  }

  saveSettings() {
    console.log('Saving team settings:', {
      allowSelfRegistration: this.allowSelfRegistration,
      emailNotifications: this.emailNotifications,
      require2FA: this.require2FA
    });

    this.router.navigate(['/payments'], { 
      queryParams: { success: 'team-settings-saved' } 
    });
  }
}
