import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ai-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <h1>AI Services</h1>
        <p class="text-gray">Leverage artificial intelligence to enhance your development workflow</p>
      </div>
      
      <div class="grid grid-cols-3 mb-6">
        <div class="card ai-service-card">
          <div class="ai-icon">🤖</div>
          <h3>Code Generation</h3>
          <p>Generate boilerplate code, APIs, and complete functions using AI</p>
          <div class="ai-features">
            <ul>
              <li>Smart code completion</li>
              <li>API endpoint generation</li>
              <li>Database schema design</li>
            </ul>
          </div>
          <button class="btn btn-primary" (click)="generateCode()">Start Generating</button>
        </div>
        
        <div class="card ai-service-card">
          <div class="ai-icon">🔍</div>
          <h3>Code Review</h3>
          <p>AI-powered code analysis and improvement suggestions</p>
          <div class="ai-features">
            <ul>
              <li>Bug detection</li>
              <li>Performance optimization</li>
              <li>Security vulnerability scanning</li>
            </ul>
          </div>
          <button class="btn btn-primary" (click)="reviewCode()">Review Code</button>
        </div>
        
        <div class="card ai-service-card">
          <div class="ai-icon">📝</div>
          <h3>Documentation</h3>
          <p>Automatically generate comprehensive documentation</p>
          <div class="ai-features">
            <ul>
              <li>API documentation</li>
              <li>Code comments</li>
              <li>README generation</li>
            </ul>
          </div>
          <button class="btn btn-primary" (click)="generateDocumentation()">Generate Docs</button>
        </div>
      </div>
      
      <div class="grid grid-cols-2 mb-6">
        <div class="card">
          <h3>AI Chat Assistant</h3>
          <div class="chat-container">
            <div class="chat-messages">
              <div class="message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                  <p>Hello! I'm your AI development assistant. How can I help you today?</p>
                </div>
              </div>
              <div class="message user-message">
                <div class="message-avatar">👤</div>
                <div class="message-content">
                  <p>Can you help me optimize this React component?</p>
                </div>
              </div>
              <div class="message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                  <p>I'd be happy to help! Please share your component code, and I'll provide optimization suggestions...</p>
                </div>
              </div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Ask me anything about your code..." class="form-control">
              <button class="btn btn-primary" (click)="openChat()">Send</button>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h3>AI Usage Statistics</h3>
          <div class="usage-stats">
            <div class="usage-item">
              <div class="usage-label">API Calls This Month</div>
              <div class="usage-bar">
                <div class="usage-fill" style="width: 75%"></div>
              </div>
              <div class="usage-value">7,500 / 10,000</div>
            </div>
            <div class="usage-item">
              <div class="usage-label">Code Generation</div>
              <div class="usage-bar">
                <div class="usage-fill" style="width: 60%"></div>
              </div>
              <div class="usage-value">3,000 / 5,000</div>
            </div>
            <div class="usage-item">
              <div class="usage-label">Code Reviews</div>
              <div class="usage-bar">
                <div class="usage-fill" style="width: 40%"></div>
              </div>
              <div class="usage-value">800 / 2,000</div>
            </div>
            <div class="usage-item">
              <div class="usage-label">Documentation</div>
              <div class="usage-bar">
                <div class="usage-fill" style="width: 30%"></div>
              </div>
              <div class="usage-value">300 / 1,000</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3>Recent AI Activities</h3>
        <div class="activity-timeline">
          <div class="timeline-item">
            <div class="timeline-icon success">✅</div>
            <div class="timeline-content">
              <h4>Code generation completed</h4>
              <p>Generated REST API for user management - 15 endpoints created</p>
              <span class="timeline-time">2 hours ago</span>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon info">🔍</div>
            <div class="timeline-content">
              <h4>Code review finished</h4>
              <p>Analyzed 245 files, found 12 optimization opportunities</p>
              <span class="timeline-time">5 hours ago</span>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon warning">📝</div>
            <div class="timeline-content">
              <h4>Documentation generated</h4>
              <p>Created comprehensive API documentation for Project Alpha</p>
              <span class="timeline-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ai-service-card {
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .ai-service-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .ai-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .ai-features {
      margin: 1rem 0;
      text-align: left;
    }
    
    .ai-features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .ai-features li {
      padding: 0.25rem 0;
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .ai-features li::before {
      content: "✓";
      color: var(--success);
      margin-right: 0.5rem;
    }
    
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 400px;
    }
    
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .message {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    
    .ai-message .message-avatar {
      background: var(--primary);
      color: white;
    }
    
    .user-message .message-avatar {
      background: var(--gray);
      color: white;
    }
    
    .message-content {
      flex: 1;
      background: var(--light);
      padding: 0.75rem;
      border-radius: 0.5rem;
    }
    
    .message-content p {
      margin: 0;
      font-size: 0.875rem;
    }
    
    .chat-input {
      display: flex;
      gap: 0.5rem;
    }
    
    .chat-input .form-control {
      flex: 1;
    }
    
    .usage-stats {
      margin-top: 1rem;
    }
    
    .usage-item {
      margin-bottom: 1rem;
    }
    
    .usage-label {
      font-size: 0.875rem;
      color: var(--gray);
      margin-bottom: 0.5rem;
    }
    
    .usage-bar {
      height: 8px;
      background: var(--border);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }
    
    .usage-fill {
      height: 100%;
      background: var(--primary);
      transition: width 0.3s ease;
    }
    
    .usage-value {
      font-size: 0.75rem;
      color: var(--gray);
    }
    
    .activity-timeline {
      margin-top: 1rem;
    }
    
    .timeline-item {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .timeline-item:last-child {
      border-bottom: none;
    }
    
    .timeline-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      flex-shrink: 0;
    }
    
    .timeline-icon.success {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }
    
    .timeline-icon.info {
      background: rgba(59, 130, 246, 0.1);
      color: var(--primary);
    }
    
    .timeline-icon.warning {
      background: rgba(245, 158, 11, 0.1);
      color: var(--warning);
    }
    
    .timeline-content {
      flex: 1;
    }
    
    .timeline-content h4 {
      margin-bottom: 0.25rem;
      color: var(--dark);
      font-size: 1rem;
    }
    
    .timeline-content p {
      color: var(--gray);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .timeline-time {
      color: var(--gray);
      font-size: 0.75rem;
    }
  `]
})
export class AiServicesComponent {
  aiUsage: any = {};
  recentActivities: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.loadData();
  }

  loadData() {
    this.apiService.getAIUsage().subscribe(data => {
      this.aiUsage = data;
    });
    
    // Mock recent activities
    this.recentActivities = [
      { id: 1, message: 'Code generation completed', time: '2 hours ago', type: 'success' },
      { id: 2, message: 'Code review finished', time: '5 hours ago', type: 'info' },
      { id: 3, message: 'Documentation generated', time: '1 day ago', type: 'warning' }
    ];
  }

  openChat() {
    this.router.navigate(['/ai-services/chat']);
  }

  generateCode() {
    this.router.navigate(['/ai-services/chat'], { 
      queryParams: { prompt: 'generate-code' } 
    });
  }

  reviewCode() {
    this.router.navigate(['/ai-services/chat'], { 
      queryParams: { prompt: 'review-code' } 
    });
  }

  generateDocumentation() {
    this.router.navigate(['/ai-services/chat'], { 
      queryParams: { prompt: 'generate-docs' } 
    });
  }
}
