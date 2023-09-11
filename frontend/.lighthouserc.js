module.exports = {
  ci: {
    collect: {
      staticDistDir: 'dist',
      url: ['http://localhost:3000'],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        // performance 카테고리 점수가 50점 미만이면 warning
        'categories:performance': ['warn', { minScore: 0.5 }],
        // accessibility 카테고리 점수가 70점 미만이면 error 발생, build 실패시키기
        'categories:accessibility': ['error', { minScore: 0.7 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
