import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="mb-6">
        <button class="btn btn-outline" (click)="goBack()">← Back to Code Analysis</button>
        <h1 class="mt-4">Analysis Results</h1>
        <p class="text-gray">Detailed analysis report for {{ projectName }}</p>
      </div>

      <!-- Overall Score -->
      <div class="card mb-6">
        <div class="overall-score">
          <div class="score-circle" [style.--score]="overallScore">
            <div class="score-value">{{ overallScore }}</div>
            <div class="score-label">Overall Score</div>
          </div>
          <div class="score-details">
            <h3>Analysis Summary</h3>
            <p>Project analyzed on {{ analysisDate | date:'longDate' }}</p>
            <div class="score-breakdown">
              <div class="score-item">
                <span class="label">Code Quality:</span>
                <span class="value" [class]="'score-' + getScoreClass(analysisResults.codeQuality)">{{ analysisResults.codeQuality }}%</span>
              </div>
              <div class="score-item">
                <span class="label">Security:</span>
                <span class="value" [class]="'score-' + getScoreClass(analysisResults.security)">{{ analysisResults.security }}%</span>
              </div>
              <div class="score-item">
                <span class="label">Performance:</span>
                <span class="value" [class]="'score-' + getScoreClass(analysisResults.performance)">{{ analysisResults.performance }}%</span>
              </div>
              <div class="score-item">
                <span class="label">Maintainability:</span>
                <span class="value grade-{{ analysisResults.maintainability }}">{{ analysisResults.maintainability }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Results -->
      <div class="grid grid-cols-3">
        <!-- Code Quality -->
        <div class="card">
          <h3>Code Quality</h3>
          <div class="quality-metrics">
            <div class="metric">
              <span class="metric-label">Code Coverage</span>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="analysisResults.coverage"></div>
              </div>
              <span class="metric-value">{{ analysisResults.coverage }}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">Technical Debt</span>
              <div class="progress-bar">
                <div class="progress-fill warning" [style.width.%]="(analysisResults.technicalDebt / 10)"></div>
              </div>
              <span class="metric-value">{{ analysisResults.technicalDebt }} days</span>
            </div>
            <div class="metric">
              <span class="metric-label">Duplicate Code</span>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="analysisResults.duplicateCode"></div>
              </div>
              <span class="metric-value">{{ analysisResults.duplicateCode }}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">Test Coverage</span>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="analysisResults.testCoverage"></div>
              </div>
              <span class="metric-value">{{ analysisResults.testCoverage }}%</span>
            </div>
          </div>
        </div>

        <!-- Security Analysis -->
        <div class="card">
          <h3>Security Analysis</h3>
          <div class="security-issues">
            <div class="issue-category" *ngFor="let category of securityIssues">
              <div class="category-header">
                <span class="category-name">{{ category.name }}</span>
                <span class="issue-count" [class]="'severity-' + category.severity">{{ category.count }}</span>
              </div>
              <div class="issue-list" *ngIf="category.issues.length > 0">
                <div class="issue-item" *ngFor="let issue of category.issues">
                  <span class="issue-title">{{ issue.title }}</span>
                  <span class="issue-location">{{ issue.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="card">
          <h3>Performance Metrics</h3>
          <div class="performance-metrics">
            <div class="perf-metric">
              <span class="metric-label">Bundle Size</span>
              <span class="metric-value">{{ analysisResults.bundleSize }}KB</span>
            </div>
            <div class="perf-metric">
              <span class="metric-label">Load Time</span>
              <span class="metric-value">{{ analysisResults.loadTime }}s</span>
            </div>
            <div class="perf-metric">
              <span class="metric-label">Memory Usage</span>
              <span class="metric-value">{{ analysisResults.memoryUsage }}MB</span>
            </div>
            <div class="perf-metric">
              <span class="metric-label">API Calls</span>
              <span class="metric-value">{{ analysisResults.apiCalls }}</span>
            </div>
            <div class="perf-metric">
              <span class="metric-label">Database Queries</span>
              <span class="metric-value">{{ analysisResults.dbQueries }}</span>
            </div>
            <div class="perf-metric">
              <span class="metric-label">Cache Hit Rate</span>
              <span class="metric-value">{{ analysisResults.cacheHitRate }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="card mt-6">
        <h3>Recommendations</h3>
        <div class="recommendations">
          <div class="recommendation-item" *ngFor="let rec of recommendations" [class]="'priority-' + rec.priority">
            <div class="rec-header">
              <span class="rec-title">{{ rec.title }}</span>
              <span class="rec-priority">{{ rec.priority }}</span>
            </div>
            <p class="rec-description">{{ rec.description }}</p>
            <div class="rec-impact">
              <span class="impact-label">Expected Impact:</span>
              <span class="impact-value">{{ rec.impact }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="form-actions mt-6">
        <button class="btn btn-outline" (click)="downloadReport()">Download Report</button>
        <button class="btn btn-outline" (click)="shareResults()">Share Results</button>
        <button class="btn btn-primary" (click)="runNewAnalysis()">Run New Analysis</button>
      </div>
    </div>
  `,
  styles: [`
    .overall-score {
      display: flex;
      align-items: center;
      gap: 3rem;
    }

    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: conic-gradient(var(--primary) 0deg, var(--primary) calc(var(--score) * 3.6deg), var(--border) calc(var(--score) * 3.6deg));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .score-circle::before {
      content: '';
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: white;
    }

    .score-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary);
      z-index: 1;
    }

    .score-label {
      font-size: 0.875rem;
      color: var(--gray);
      z-index: 1;
    }

    .score-details h3 {
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    .score-details p {
      color: var(--gray);
      margin-bottom: 1rem;
    }

    .score-breakdown {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .score-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .score-item .label {
      color: var(--gray);
    }

    .score-item .value {
      font-weight: 600;
    }

    .score-excellent { color: var(--success); }
    .score-good { color: var(--primary); }
    .score-fair { color: var(--warning); }
    .score-poor { color: var(--danger); }

    .grade-A { color: var(--success); }
    .grade-B { color: var(--primary); }
    .grade-C { color: var(--warning); }
    .grade-D { color: var(--danger); }

    .quality-metrics,
    .security-issues,
    .performance-metrics {
      margin-top: 1rem;
    }

    .metric {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .metric-label {
      flex: 1;
      color: var(--gray);
      font-size: 0.875rem;
    }

    .progress-bar {
      flex: 2;
      height: 8px;
      background: var(--border);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary);
      transition: width 0.3s ease;
    }

    .progress-fill.warning {
      background: var(--warning);
    }

    .metric-value {
      width: 60px;
      text-align: right;
      font-weight: 600;
      color: var(--dark);
    }

    .issue-category {
      margin-bottom: 1.5rem;
    }

    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .category-name {
      font-weight: 600;
      color: var(--dark);
    }

    .issue-count {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .severity-critical { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
    .severity-high { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
    .severity-medium { background: rgba(59, 130, 246, 0.1); color: var(--primary); }
    .severity-low { background: rgba(16, 185, 129, 0.1); color: var(--success); }

    .issue-list {
      margin-top: 0.5rem;
    }

    .issue-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 0.875rem;
    }

    .issue-title {
      color: var(--dark);
    }

    .issue-location {
      color: var(--gray);
    }

    .perf-metric {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }

    .perf-metric:last-child {
      border-bottom: none;
    }

    .recommendations {
      margin-top: 1rem;
    }

    .recommendation-item {
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      border-left: 4px solid;
    }

    .priority-high {
      background: rgba(239, 68, 68, 0.05);
      border-left-color: var(--danger);
    }

    .priority-medium {
      background: rgba(245, 158, 11, 0.05);
      border-left-color: var(--warning);
    }

    .priority-low {
      background: rgba(16, 185, 129, 0.05);
      border-left-color: var(--success);
    }

    .rec-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .rec-title {
      font-weight: 600;
      color: var(--dark);
    }

    .rec-priority {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-high .rec-priority {
      background: var(--danger);
      color: white;
    }

    .priority-medium .rec-priority {
      background: var(--warning);
      color: white;
    }

    .priority-low .rec-priority {
      background: var(--success);
      color: white;
    }

    .rec-description {
      color: var(--gray);
      margin-bottom: 0.5rem;
    }

    .rec-impact {
      font-size: 0.875rem;
    }

    .impact-label {
      color: var(--gray);
    }

    .impact-value {
      font-weight: 600;
      color: var(--dark);
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    @media (max-width: 768px) {
      .overall-score {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
      }

      .grid-cols-3 {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ResultsComponent {
  projectName: string = '';
  analysisDate: Date = new Date();
  overallScore: number = 0;
  
  analysisResults = {
    codeQuality: 0,
    security: 0,
    performance: 0,
    maintainability: 'A',
    coverage: 0,
    technicalDebt: 0,
    duplicateCode: 0,
    testCoverage: 0,
    bundleSize: 0,
    loadTime: 0,
    memoryUsage: 0,
    apiCalls: 0,
    dbQueries: 0,
    cacheHitRate: 0
  };

  securityIssues = [
    {
      name: 'Critical',
      severity: 'critical' as const,
      count: 0,
      issues: [] as { title: string; location: string }[]
    },
    {
      name: 'High',
      severity: 'high' as const,
      count: 0,
      issues: [] as { title: string; location: string }[]
    },
    {
      name: 'Medium',
      severity: 'medium' as const,
      count: 0,
      issues: [] as { title: string; location: string }[]
    },
    {
      name: 'Low',
      severity: 'low' as const,
      count: 0,
      issues: [] as { title: string; location: string }[]
    }
  ];

  recommendations = [
    {
      title: 'Improve Code Coverage',
      description: 'Increase test coverage to improve code reliability and maintainability.',
      priority: 'high',
      impact: '+15% Code Quality'
    },
    {
      title: 'Optimize Bundle Size',
      description: 'Reduce bundle size by removing unused dependencies and implementing code splitting.',
      priority: 'medium',
      impact: '-30% Load Time'
    },
    {
      title: 'Fix Security Vulnerabilities',
      description: 'Address identified security issues to improve application security.',
      priority: 'high',
      impact: '+25% Security Score'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.loadAnalysisData();
  }

  loadAnalysisData() {
    // Get project data from query params
    this.route.queryParams.subscribe(params => {
      if (params['project']) {
        try {
          const projectData = JSON.parse(params['project']);
          this.projectName = projectData.name;
          this.generateMockResults();
        } catch (e) {
          console.error('Error parsing project data:', e);
          this.generateMockResults();
        }
      } else {
        this.generateMockResults();
      }
    });
  }

  generateMockResults() {
    // Generate realistic mock analysis results
    this.analysisResults = {
      codeQuality: Math.floor(Math.random() * 25) + 75,
      security: Math.floor(Math.random() * 20) + 80,
      performance: Math.floor(Math.random() * 30) + 70,
      maintainability: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      coverage: Math.floor(Math.random() * 30) + 70,
      technicalDebt: Math.floor(Math.random() * 5) + 1,
      duplicateCode: Math.floor(Math.random() * 15) + 5,
      testCoverage: Math.floor(Math.random() * 40) + 60,
      bundleSize: Math.floor(Math.random() * 200) + 100,
      loadTime: parseFloat((Math.random() * 2 + 1).toFixed(1)),
      memoryUsage: Math.floor(Math.random() * 100) + 50,
      apiCalls: Math.floor(Math.random() * 50) + 20,
      dbQueries: Math.floor(Math.random() * 30) + 10,
      cacheHitRate: Math.floor(Math.random() * 30) + 70
    };

    this.overallScore = Math.floor(
      (this.analysisResults.codeQuality + this.analysisResults.security + this.analysisResults.performance) / 3
    );

    // Generate security issues
    this.securityIssues[0].count = Math.floor(Math.random() * 3);
    this.securityIssues[1].count = Math.floor(Math.random() * 5) + 1;
    this.securityIssues[2].count = Math.floor(Math.random() * 8) + 2;
    this.securityIssues[3].count = Math.floor(Math.random() * 10) + 5;

    // Add sample issues
    this.securityIssues[1].issues = [
      { title: 'SQL Injection vulnerability', location: 'user-service.ts:45' },
      { title: 'XSS in template rendering', location: 'template.html:23' }
    ];

    this.securityIssues[2].issues = [
      { title: 'Weak password policy', location: 'auth.service.ts:12' },
      { title: 'Missing rate limiting', location: 'api.controller.ts:67' }
    ];
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'fair';
    return 'poor';
  }

  goBack() {
    this.router.navigate(['/code-analysis']);
  }

  downloadReport() {
    alert('Downloading analysis report...\n\nReport would include:\n• Executive summary\n• Detailed metrics\n• Security findings\n• Performance analysis\n• Recommendations\n• Action items\n\nFormat: PDF');
  }

  shareResults() {
    alert('Share Results\n\nSharing options:\n• Email report to team\n• Generate shareable link\n• Export to CSV\n• Integrate with JIRA\n• Post to Slack\n\nIn a real application, this would open sharing dialog.');
  }

  runNewAnalysis() {
    this.router.navigate(['/code-analysis/upload-project']);
  }
}
