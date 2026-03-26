import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to Code Analysis</button>
        <h1 class="mt-4">Upload Project for Analysis</h1>
        <p class="text-gray">Choose how you want to submit your code for analysis</p>
      </div>

      <div class="grid grid-cols-2 mb-6">
        <div class="card upload-option" (click)="selectUploadMethod('git')" [class.selected]="selectedMethod === 'git'">
          <div class="upload-icon">🔗</div>
          <h3>Git Repository</h3>
          <p>Connect directly from GitHub, GitLab, or Bitbucket</p>
        </div>
        
        <div class="card upload-option" (click)="selectUploadMethod('zip')" [class.selected]="selectedMethod === 'zip'">
          <div class="upload-icon">📦</div>
          <h3>ZIP File</h3>
          <p>Upload a compressed file of your project</p>
        </div>
        
        <div class="card upload-option" (click)="selectUploadMethod('folder')" [class.selected]="selectedMethod === 'folder'">
          <div class="upload-icon">📁</div>
          <h3>Folder Upload</h3>
          <p>Select and upload entire project folder</p>
        </div>
        
        <div class="card upload-option" (click)="selectUploadMethod('url')" [class.selected]="selectedMethod === 'url'">
          <div class="upload-icon">🌐</div>
          <h3>Repository URL</h3>
          <p>Enter any Git repository URL manually</p>
        </div>
      </div>

      <div class="card" *ngIf="selectedMethod">
        <h3>Project Details</h3>
        
        <!-- Git Repository Form -->
        <div *ngIf="selectedMethod === 'git'" class="upload-form">
          <div class="form-group">
            <label>Git Provider</label>
            <select class="form-control" [(ngModel)]="gitProvider">
              <option value="github">GitHub</option>
              <option value="gitlab">GitLab</option>
              <option value="bitbucket">Bitbucket</option>
            </select>
          </div>
          <div class="form-group">
            <label>Repository URL</label>
            <input type="text" class="form-control" placeholder="https://github.com/user/repo" [(ngModel)]="repoUrl">
          </div>
          <div class="form-group">
            <label>Branch</label>
            <input type="text" class="form-control" placeholder="main" [(ngModel)]="branch">
          </div>
          <div class="form-group">
            <label>Access Token (if private)</label>
            <input type="password" class="form-control" placeholder="Optional access token" [(ngModel)]="accessToken">
          </div>
        </div>

        <!-- ZIP File Form -->
        <div *ngIf="selectedMethod === 'zip'" class="upload-form">
          <div class="upload-area" (click)="triggerFileUpload()">
            <div class="upload-content">
              <div class="upload-icon">📁</div>
              <h4>Drop your ZIP file here or click to browse</h4>
              <p>Maximum file size: 100MB</p>
              <button class="btn btn-outline mt-4">Choose File</button>
            </div>
          </div>
          <input type="file" #fileInput (change)="onFileSelected($event)" accept=".zip" style="display: none;">
          <div *ngIf="selectedFile" class="file-info mt-4">
            <p><strong>Selected file:</strong> {{ selectedFile.name }}</p>
            <p><strong>Size:</strong> {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
          </div>
        </div>

        <!-- Folder Upload Form -->
        <div *ngIf="selectedMethod === 'folder'" class="upload-form">
          <div class="upload-area" (click)="triggerFolderUpload()">
            <div class="upload-content">
              <div class="upload-icon">📁</div>
              <h4>Click to select project folder</h4>
              <p>All files and subdirectories will be included</p>
              <button class="btn btn-outline mt-4">Select Folder</button>
            </div>
          </div>
          <div *ngIf="selectedFolder" class="file-info mt-4">
            <p><strong>Selected folder:</strong> {{ selectedFolder }}</p>
            <p><strong>Files to analyze:</strong> {{ estimatedFiles }}</p>
          </div>
        </div>

        <!-- Repository URL Form -->
        <div *ngIf="selectedMethod === 'url'" class="upload-form">
          <div class="form-group">
            <label>Repository URL</label>
            <input type="text" class="form-control" placeholder="https://github.com/user/repo" [(ngModel)]="customRepoUrl">
          </div>
          <div class="form-group">
            <label>Branch (optional)</label>
            <input type="text" class="form-control" placeholder="main" [(ngModel)]="customBranch">
          </div>
          <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="form-control" placeholder="My Project" [(ngModel)]="projectName">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" placeholder="Brief description of your project" [(ngModel)]="projectDescription"></textarea>
          </div>
        </div>

        <!-- Analysis Options -->
        <div class="analysis-options">
          <h4>Analysis Options</h4>
          <div class="grid grid-cols-2">
            <div class="checkbox-group">
              <label>
                <input type="checkbox" [(ngModel)]="options.codeQuality">
                Code Quality Analysis
              </label>
            </div>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" [(ngModel)]="options.security">
                Security Vulnerability Scan
              </label>
            </div>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" [(ngModel)]="options.performance">
                Performance Metrics
              </label>
            </div>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" [(ngModel)]="options.dependencies">
                Dependency Analysis
              </label>
            </div>
          </div>
        </div>

        <div class="form-actions mt-6">
          <button class="btn btn-outline" (click)="goBack()">Cancel</button>
          <button class="btn btn-primary" (click)="startAnalysis()" [disabled]="!canStartAnalysis">
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-option {
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid var(--border);
    }

    .upload-option:hover,
    .upload-option.selected {
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    }

    .upload-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .upload-form {
      margin-top: 2rem;
    }

    .upload-area {
      border: 2px dashed var(--border);
      border-radius: 0.75rem;
      padding: 3rem;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .upload-area:hover {
      border-color: var(--primary);
    }

    .upload-content h4 {
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    .upload-content p {
      color: var(--gray);
      margin-bottom: 1rem;
    }

    .file-info {
      background: var(--light);
      padding: 1rem;
      border-radius: 0.5rem;
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

    textarea.form-control {
      min-height: 100px;
      resize: vertical;
    }

    .analysis-options {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
    }

    .analysis-options h4 {
      margin-bottom: 1rem;
      color: var(--dark);
    }

    .checkbox-group {
      margin-bottom: 0.75rem;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-group input[type="checkbox"] {
      width: 18px;
      height: 18px;
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
export class UploadProjectComponent {
  selectedMethod: string = '';
  
  // Git repository fields
  gitProvider: string = 'github';
  repoUrl: string = '';
  branch: string = 'main';
  accessToken: string = '';
  
  // File upload fields
  selectedFile: File | null = null;
  selectedFolder: string = '';
  estimatedFiles: number = 0;
  
  // Custom URL fields
  customRepoUrl: string = '';
  customBranch: string = '';
  projectName: string = '';
  projectDescription: string = '';
  
  // Analysis options
  options = {
    codeQuality: true,
    security: true,
    performance: true,
    dependencies: false
  };

  constructor(private router: Router) {}

  selectUploadMethod(method: string) {
    this.selectedMethod = method;
  }

  triggerFileUpload() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert('File size exceeds 100MB limit');
        return;
      }
      this.selectedFile = file;
    }
  }

  triggerFolderUpload() {
    alert('Folder upload would open native file picker. In a real application, this would use the File System Access API.');
    this.selectedFolder = '/path/to/project';
    this.estimatedFiles = Math.floor(Math.random() * 500) + 100;
  }

  get canStartAnalysis() {
    switch (this.selectedMethod) {
      case 'git':
        return this.repoUrl.trim() !== '';
      case 'zip':
        return this.selectedFile !== null;
      case 'folder':
        return this.selectedFolder !== '';
      case 'url':
        return this.customRepoUrl.trim() !== '' && this.projectName.trim() !== '';
      default:
        return false;
    }
  }

  goBack() {
    this.router.navigate(['/code-analysis']);
  }

  startAnalysis() {
    if (!this.canStartAnalysis) {
      return;
    }

    // Create project data
    const projectData = {
      id: Date.now().toString(),
      name: this.getProjectName(),
      method: this.selectedMethod,
      options: this.options,
      timestamp: new Date()
    };

    console.log('Starting analysis:', projectData);

    // Navigate to results page
    this.router.navigate(['/code-analysis/results'], { 
      queryParams: { 
        project: JSON.stringify(projectData) 
      } 
    });
  }

  private getProjectName(): string {
    switch (this.selectedMethod) {
      case 'git':
        return this.repoUrl.split('/').pop() || 'Git Project';
      case 'zip':
        return this.selectedFile?.name.replace('.zip', '') || 'ZIP Project';
      case 'folder':
        return this.selectedFolder.split('/').pop() || 'Folder Project';
      case 'url':
        return this.projectName;
      default:
        return 'Unknown Project';
    }
  }
}
