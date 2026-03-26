import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-code-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <h1>Code Analysis</h1>
        <p class="text-gray">Analyze your code for quality, security, and performance</p>
      </div>
      
      <div class="card mb-6">
        <h3>Upload Project</h3>
        <div class="upload-area">
          <div class="upload-content">
            <div class="upload-icon">📁</div>
            <h4>Drop your code here or click to browse</h4>
            <p>Support for Git repositories, ZIP files, or direct folder upload</p>
            <button class="btn btn-primary mt-4" (click)="chooseFiles()">Choose Files</button>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-3 mb-6">
        <div class="card">
          <h4>Quality Metrics</h4>
          <div class="metric">
            <span class="metric-label">Code Coverage</span>
            <span class="metric-value">78%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Technical Debt</span>
            <span class="metric-value">2.5 days</span>
          </div>
          <div class="metric">
            <span class="metric-label">Maintainability</span>
            <span class="metric-value good">A</span>
          </div>
        </div>
        
        <div class="card">
          <h4>Security Analysis</h4>
          <div class="metric">
            <span class="metric-label">Vulnerabilities</span>
            <span class="metric-value warning">3</span>
          </div>
          <div class="metric">
            <span class="metric-label">Security Score</span>
            <span class="metric-value good">85/100</span>
          </div>
          <div class="metric">
            <span class="metric-label">Compliance</span>
            <span class="metric-value good">✓</span>
          </div>
        </div>
        
        <div class="card">
          <h4>Performance</h4>
          <div class="metric">
            <span class="metric-label">Bundle Size</span>
            <span class="metric-value">245KB</span>
          </div>
          <div class="metric">
            <span class="metric-label">Load Time</span>
            <span class="metric-value good">1.2s</span>
          </div>
          <div class="metric">
            <span class="metric-label">Optimization</span>
            <span class="metric-value warning">B+</span>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3>Recent Analysis Results</h3>
        <div class="analysis-results">
          <div class="result-item">
            <div class="result-info">
              <h4>Project Alpha - Main Branch</h4>
              <p>Analyzed 2 hours ago • 1,245 files • Score: B+</p>
            </div>
            <button class="btn btn-outline" (click)="viewDetails('alpha')">View Details</button>
          </div>
          <div class="result-item">
            <div class="result-info">
              <h4>Project Beta - Feature/auth</h4>
              <p>Analyzed 5 hours ago • 892 files • Score: A-</p>
            </div>
            <button class="btn btn-outline" (click)="viewDetails('beta')">View Details</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-area {
      border: 2px dashed var(--border);
      border-radius: 0.75rem;
      padding: 3rem;
      text-align: center;
      margin-top: 1rem;
      transition: border-color 0.2s;
    }
    
    .upload-area:hover {
      border-color: var(--primary);
    }
    
    .upload-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .upload-content h4 {
      margin-bottom: 0.5rem;
      color: var(--dark);
    }
    
    .upload-content p {
      color: var(--gray);
      margin-bottom: 1rem;
    }
    
    .metric {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .metric:last-child {
      border-bottom: none;
    }
    
    .metric-label {
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .metric-value {
      font-weight: 600;
      color: var(--dark);
    }
    
    .metric-value.good {
      color: var(--success);
    }
    
    .metric-value.warning {
      color: var(--warning);
    }
    
    .analysis-results {
      margin-top: 1rem;
    }
    
    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .result-item:last-child {
      border-bottom: none;
    }
    
    .result-info h4 {
      margin-bottom: 0.25rem;
      color: var(--dark);
    }
    
    .result-info p {
      color: var(--gray);
      font-size: 0.875rem;
      margin: 0;
    }
  `]
})
export class CodeAnalysisComponent {
  projects: any[] = [];
  analysisResults: any[] = [];
  isAnalyzing = false;

  constructor(private router: Router, private apiService: ApiService) {
    this.loadProjects();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe(data => {
      this.projects = data;
      this.analysisResults = data.map(project => ({
        ...project,
        analyzed: project.lastAnalyzed,
        score: project.codeQuality
      }));
    });
  }

  chooseFiles() {
    this.router.navigate(['/code-analysis/upload-project']);
  }

  simulateGitUpload() {
    const repoUrl = prompt('Enter Git repository URL:');
    if (repoUrl) {
      this.startAnalysis(`Git Repository: ${repoUrl}`);
    }
  }

  simulateZipUpload() {
    alert('ZIP File Upload\n\nPlease select a ZIP file containing your project...\n\nIn a real application, this would open a file dialog.');
    this.startAnalysis('ZIP File Upload');
  }

  simulateFolderUpload() {
    alert('Folder Upload\n\nPlease select a folder containing your project...\n\nIn a real application, this would open a folder selection dialog.');
    this.startAnalysis('Folder Upload');
  }

  simulateRepoUrlUpload() {
    const repoUrl = prompt('Enter repository URL:');
    if (repoUrl) {
      this.startAnalysis(`Repository: ${repoUrl}`);
    }
  }

  startAnalysis(projectName: string) {
    this.isAnalyzing = true;
    alert(`Starting Analysis for: ${projectName}\n\nAnalyzing...\n\n• Scanning files...\n• Checking code quality...\n• Security analysis...\n• Performance metrics...\n\nThis may take a few moments.`);
    
    // Simulate analysis completion
    setTimeout(() => {
      this.isAnalyzing = false;
      const newProject = {
        id: Date.now().toString(),
        name: projectName,
        description: 'Newly analyzed project',
        status: 'active',
        lastAnalyzed: new Date(),
        codeQuality: Math.floor(Math.random() * 20) + 80,
        securityScore: Math.floor(Math.random() * 15) + 85
      };
      this.projects.unshift(newProject);
      alert('Analysis Complete!\n\nResults:\n• Code Quality: ' + newProject.codeQuality + '%\n• Security Score: ' + newProject.securityScore + '%\n• Issues Found: ' + Math.floor(Math.random() * 5) + '\n• Recommendations: ' + Math.floor(Math.random() * 8) + '\n\nView detailed results in the analysis history.');
    }, 2000);
  }

  viewDetails(projectId: string) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const projectData = {
        id: project.id,
        name: project.name,
        method: 'existing',
        options: {
          codeQuality: true,
          security: true,
          performance: true,
          dependencies: false
        },
        timestamp: new Date()
      };
      
      this.router.navigate(['/code-analysis/results'], { 
        queryParams: { 
          project: JSON.stringify(projectData) 
        } 
      });
    }
  }
}
