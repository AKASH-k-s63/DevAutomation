import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to AI Services</button>
        <h1 class="mt-4">AI Assistant</h1>
        <p class="text-gray">Chat with your AI development assistant</p>
      </div>

      <div class="chat-container">
        <div class="chat-sidebar">
          <div class="sidebar-header">
            <h3>Chat History</h3>
            <button class="btn btn-sm btn-outline" (click)="newChat()">New Chat</button>
          </div>
          <div class="chat-list">
            <div class="chat-item" 
                 *ngFor="let chat of chatHistory" 
                 [class.active]="chat.id === currentChatId"
                 (click)="loadChat(chat.id)">
              <div class="chat-title">{{ chat.title }}</div>
              <div class="chat-preview">{{ chat.lastMessage }}</div>
              <div class="chat-time">{{ formatTime(chat.timestamp) }}</div>
            </div>
          </div>
        </div>

        <div class="chat-main">
          <div class="chat-header">
            <div class="chat-info">
              <h3>{{ currentChat?.title || 'New Chat' }}</h3>
              <p>AI Development Assistant</p>
            </div>
            <div class="chat-actions">
              <button class="btn btn-sm btn-outline" (click)="clearChat()">Clear</button>
              <button class="btn btn-sm btn-outline" (click)="exportChat()">Export</button>
            </div>
          </div>

          <div class="chat-messages" #messagesContainer>
            <div class="message" 
                 *ngFor="let message of messages" 
                 [class]="'message-' + message.type">
              <div class="message-avatar">
                {{ message.type === 'user' ? '👤' : '🤖' }}
              </div>
              <div class="message-content">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
            
            <div class="typing-indicator" *ngIf="isTyping">
              <div class="message-avatar">🤖</div>
              <div class="message-content">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input">
            <div class="input-container">
              <textarea 
                class="message-input" 
                placeholder="Ask me anything about your code..."
                [(ngModel)]="currentMessage"
                (keydown.enter)="handleEnter($event)"
                (input)="autoResize($event)"></textarea>
              <button class="btn btn-primary" (click)="sendMessage()" [disabled]="!currentMessage.trim() || isTyping">
                Send
              </button>
            </div>
            <div class="quick-actions">
              <button class="btn btn-sm btn-outline" (click)="insertPrompt('Generate code for user authentication')">Generate Code</button>
              <button class="btn btn-sm btn-outline" (click)="insertPrompt('Review this code for improvements')">Review Code</button>
              <button class="btn btn-sm btn-outline" (click)="insertPrompt('Explain this error: TypeError: Cannot read property')">Explain Error</button>
              <button class="btn btn-sm btn-outline" (click)="insertPrompt('Suggest improvements for performance')">Optimize Performance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      height: calc(100vh - 200px);
      gap: 1rem;
    }

    .chat-sidebar {
      width: 300px;
      background: white;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidebar-header h3 {
      margin: 0;
      color: var(--dark);
    }

    .chat-list {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem;
    }

    .chat-item {
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      margin-bottom: 0.5rem;
      transition: background-color 0.2s;
    }

    .chat-item:hover {
      background: var(--light);
    }

    .chat-item.active {
      background: rgba(59, 130, 246, 0.1);
      border-left: 3px solid var(--primary);
    }

    .chat-title {
      font-weight: 600;
      color: var(--dark);
      margin-bottom: 0.25rem;
    }

    .chat-preview {
      font-size: 0.875rem;
      color: var(--gray);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chat-time {
      font-size: 0.75rem;
      color: var(--gray);
      margin-top: 0.25rem;
    }

    .chat-main {
      flex: 1;
      background: white;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      display: flex;
      flex-direction: column;
    }

    .chat-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-info h3 {
      margin: 0;
      color: var(--dark);
    }

    .chat-info p {
      margin: 0;
      color: var(--gray);
      font-size: 0.875rem;
    }

    .chat-actions {
      display: flex;
      gap: 0.5rem;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      gap: 0.75rem;
      max-width: 80%;
    }

    .message-user {
      align-self: flex-end;
      flex-direction: row-reverse;
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

    .message-user .message-avatar {
      background: var(--primary);
      color: white;
    }

    .message-ai .message-avatar {
      background: var(--secondary);
      color: white;
    }

    .message-content {
      flex: 1;
    }

    .message-user .message-content {
      text-align: right;
    }

    .message-text {
      background: var(--light);
      padding: 0.75rem;
      border-radius: 0.75rem;
      margin-bottom: 0.25rem;
      line-height: 1.5;
    }

    .message-user .message-text {
      background: var(--primary);
      color: white;
    }

    .message-time {
      font-size: 0.75rem;
      color: var(--gray);
    }

    .message-user .message-time {
      text-align: right;
    }

    .typing-indicator {
      display: flex;
      gap: 0.75rem;
      max-width: 80%;
      align-self: flex-start;
    }

    .typing-dots {
      background: var(--light);
      padding: 0.75rem;
      border-radius: 0.75rem;
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }

    .typing-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--gray);
      animation: typing 1.4s infinite;
    }

    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
      }
      30% {
        transform: translateY(-10px);
      }
    }

    .chat-input {
      padding: 1rem;
      border-top: 1px solid var(--border);
    }

    .input-container {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;
    }

    .message-input {
      flex: 1;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 0.75rem;
      resize: none;
      min-height: 44px;
      max-height: 120px;
      font-family: inherit;
      font-size: 0.875rem;
    }

    .message-input:focus {
      outline: none;
      border-color: var(--primary);
    }

    .quick-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .chat-container {
        flex-direction: column;
        height: auto;
      }

      .chat-sidebar {
        width: 100%;
        height: 200px;
      }

      .chat-main {
        height: 500px;
      }

      .message {
        max-width: 95%;
      }
    }
  `]
})
export class ChatComponent {
  messages: any[] = [];
  currentMessage = '';
  isTyping = false;
  currentChatId: string = '';
  currentChat: any = null;
  chatHistory: any[] = [];

  constructor(private router: Router) {
    this.initializeChat();
    this.loadChatHistory();
  }

  initializeChat() {
    // Welcome message
    this.messages = [{
      type: 'ai',
      text: 'Hello! I\'m your AI development assistant. I can help you with:\n\n• Code generation and debugging\n• Code review and optimization\n• Error explanation and solutions\n• Best practices and patterns\n• Architecture and design advice\n\nHow can I help you today?',
      timestamp: new Date()
    }];

    // Create initial chat
    this.currentChatId = 'chat-' + Date.now();
    this.currentChat = {
      id: this.currentChatId,
      title: 'New Chat',
      lastMessage: 'Hello! I\'m your AI development assistant...',
      timestamp: new Date()
    };
  }

  loadChatHistory() {
    // Mock chat history
    this.chatHistory = [
      {
        id: 'chat-1',
        title: 'React Component Help',
        lastMessage: 'How to optimize React component performance?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'chat-2',
        title: 'API Design Discussion',
        lastMessage: 'Best practices for REST API design',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'chat-3',
        title: 'Database Optimization',
        lastMessage: 'How to improve database query performance',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  goBack() {
    this.router.navigate(['/ai-services']);
  }

  newChat() {
    this.saveCurrentChat();
    this.initializeChat();
  }

  loadChat(chatId: string) {
    this.saveCurrentChat();
    this.currentChatId = chatId;
    this.currentChat = this.chatHistory.find(chat => chat.id === chatId);
    
    // Load messages for this chat (in real app, this would load from storage/backend)
    this.messages = [{
      type: 'ai',
      text: 'This is a previous chat. How can I help you continue?',
      timestamp: new Date()
    }];
  }

  clearChat() {
    if (confirm('Clear this conversation?')) {
      this.messages = [{
        type: 'ai',
        text: 'Conversation cleared. How can I help you?',
        timestamp: new Date()
      }];
    }
  }

  exportChat() {
    const chatContent = this.messages.map(msg => 
      `[${msg.type.toUpperCase()}] ${this.formatTime(msg.timestamp)}\n${msg.text}\n`
    ).join('\n---\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  sendMessage() {
    if (!this.currentMessage.trim() || this.isTyping) return;

    const userMessage = {
      type: 'user',
      text: this.currentMessage.trim(),
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.currentMessage = '';

    // Update chat history
    this.currentChat.lastMessage = userMessage.text;
    this.currentChat.timestamp = userMessage.timestamp;

    // Simulate AI response
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
      const aiResponse = this.generateAIResponse(userMessage.text);
      this.messages.push({
        type: 'ai',
        text: aiResponse,
        timestamp: new Date()
      });
      
      this.scrollToBottom();
    }, 1500);

    this.scrollToBottom();
  }

  generateAIResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    if (message.includes('generate code') || message.includes('create function')) {
      return `I can help you generate code! Here's a sample function based on your request:\n\n\`\`\`javascript\nfunction authenticateUser(username, password) {\n  // Validate credentials\n  if (!username || !password) {\n    throw new Error('Username and password required');\n  }\n  \n  // Hash password for security\n  const hashedPassword = hashPassword(password);\n  \n  // Check against database\n  const user = database.findUser(username, hashedPassword);\n  \n  if (user) {\n    return generateToken(user);\n  }\n  \n  throw new Error('Invalid credentials');\n}\n\`\`\`\n\nWould you like me to explain any part of this code or modify it for your specific use case?`;
    }
    
    if (message.includes('review') || message.includes('improve')) {
      return `I'd be happy to review your code! Based on best practices, here are some common areas to check:\n\n🔍 **Code Quality**:\n- Consistent naming conventions\n- Proper error handling\n- Code comments and documentation\n- Single responsibility principle\n\n🚀 **Performance**:\n- Avoid unnecessary computations\n- Use appropriate data structures\n- Implement caching where needed\n- Optimize database queries\n\n🔒 **Security**:\n- Input validation\n- SQL injection prevention\n- Authentication and authorization\n- Data encryption\n\nPlease share your specific code and I'll provide detailed recommendations!`;
    }
    
    if (message.includes('error') || message.includes('bug')) {
      return `I can help you debug that error! Here's my systematic approach:\n\n🐛 **Error Analysis Steps**:\n1. **Read the error message carefully** - it usually tells you exactly what's wrong\n2. **Check the line number** - look at the specific location mentioned\n3. **Examine the context** - what's happening around that code?\n4. **Check data types** - are you trying to access something that doesn't exist?\n\n🛠️ **Common Solutions**:\n- Add null/undefined checks\n- Use optional chaining (\`?.\`)\n- Validate function parameters\n- Check array/object bounds\n\nCould you share the specific error message and the code around it? I'll help you identify and fix the issue!`;
    }
    
    if (message.includes('performance') || message.includes('optimize')) {
      return `Performance optimization is crucial! Here are key strategies:\n\n⚡ **Frontend Optimization**:\n- Lazy loading components and images\n- Code splitting and tree shaking\n- Minimize DOM manipulations\n- Use virtual scrolling for large lists\n- Implement caching strategies\n\n🔧 **Backend Optimization**:\n- Database indexing and query optimization\n- Implement caching (Redis, Memcached)\n- Use connection pooling\n- Batch database operations\n- Implement rate limiting\n\n📊 **Monitoring**:\n- Track response times\n- Monitor memory usage\n- Profile database queries\n- Use performance monitoring tools\n\nWhat specific performance issues are you experiencing? I can provide targeted solutions!`;
    }
    
    return `I understand you need help with: "${userMessage}". I can assist you with various development tasks including:\n\n• **Code Generation**: Creating functions, classes, and components\n• **Code Review**: Analyzing and improving existing code\n• **Debugging**: Finding and fixing errors\n• **Performance**: Optimizing your applications\n• **Architecture**: Design patterns and best practices\n• **Security**: Implementing secure coding practices\n\nCould you provide more details about what you'd like to accomplish? I'll give you specific guidance and code examples!`;
  }

  insertPrompt(prompt: string) {
    this.currentMessage = prompt;
    // Auto-resize textarea
    setTimeout(() => {
      const textarea = document.querySelector('.message-input') as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
      }
    }, 0);
  }

  handleEnter(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  autoResize(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }

  formatTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  }

  saveCurrentChat() {
    if (this.messages.length > 1) {
      // Update or add to chat history
      const existingIndex = this.chatHistory.findIndex(chat => chat.id === this.currentChatId);
      if (existingIndex >= 0) {
        this.chatHistory[existingIndex] = this.currentChat;
      } else {
        this.chatHistory.unshift(this.currentChat);
      }
    }
  }
}
