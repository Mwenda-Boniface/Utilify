const fs = require('fs');

const file = 'c:/Users/Bonnie/Desktop/MR. BIT TOOLS/src/pages/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

const tabs = [
  { tab: 'IDEs, Code Editors, and Development Environments', comp: 'IdesCodeEditorsAndDevelopmentEnvironmentsCategory' },
  { tab: 'Version Control and Collaboration', comp: 'VersionControlAndCollaborationCategory' },
  { tab: 'Build Tools, Package Managers, and Dependency Management', comp: 'BuildToolsPackageManagersAndDependencyManagementCategory' },
  { tab: 'Containerization, Virtualization, and Infrastructure as Code (IaC)', comp: 'ContainerizationVirtualizationAndInfrastructureAsCodeCategory' },
  { tab: 'Testing, Quality Assurance (QA), and Automation', comp: 'TestingQualityAssuranceQaAndAutomationCategory' },
  { tab: 'Continuous Integration & Continuous Deployment (CI/CD)', comp: 'ContinuousIntegrationContinuousDeploymentCicdCategory' },
  { tab: 'Cloud Platforms, Backend-as-a-Service (BaaS), and Infrastructure', comp: 'CloudPlatformsBackendAsAServiceBaasAndInfrastructureCategory' },
  { tab: 'Database Management and Analytics', comp: 'DatabaseManagementAndAnalyticsCategory' },
  { tab: 'API Clients, Development, and Testing', comp: 'ApiClientsDevelopmentAndTestingCategory' },
  { tab: 'AI-Assisted Development, Agents, and Copilots', comp: 'AiassistedDevelopmentAgentsAndCopilotsCategory' },
  { tab: 'Monitoring, Observability, and Logging', comp: 'MonitoringObservabilityAndLoggingCategory' },
  { tab: 'Project Management, Collaboration, and Team Communication', comp: 'ProjectManagementCollaborationAndTeamCommunicationCategory' },
  { tab: 'Documentation, Code Search, and Learning', comp: 'DocumentationCodeSearchAndLearningCategory' },
  { tab: 'Developer Utilities and Productivity Tools', comp: 'DeveloperUtilitiesAndProductivityToolsCategory' },
  { tab: 'Web Frameworks and Libraries', comp: 'WebFrameworksAndLibrariesCategory' },
  { tab: 'Mobile Development and Cross-Platform Tools', comp: 'MobileDevelopmentAndCrossplatformToolsCategory' },
  { tab: 'Game Development Engines and Tools', comp: 'GameDevelopmentEnginesAndToolsCategory' },
  { tab: 'Design, Prototyping, and Creative Tools', comp: 'DesignPrototypingAndCreativeToolsCategory' },
  { tab: 'Data Science, Machine Learning, and AI Platforms', comp: 'DataScienceMachineLearningAndAiPlatformsCategory' },
  { tab: 'No-Code / Low-Code Development Platforms', comp: 'NocodeLowcodeDevelopmentPlatformsCategory' },
  { tab: 'Security, Secrets Management, and Authentication', comp: 'SecuritySecretsManagementAndAuthenticationCategory' },
  { tab: 'Collaboration and Communication (Cross-Functional)', comp: 'CollaborationAndCommunicationCrossfunctionalCategory' },
  { tab: 'Feature Flagging and Experimentation', comp: 'FeatureFlaggingAndExperimentationCategory' },
  { tab: 'Platform Engineering and Internal Developer Platforms', comp: 'PlatformEngineeringAndInternalDeveloperPlatformsCategory' }
];

let ifBlocks = '\n  // Handle Development sub-category directories\n';
for (const item of tabs) {
  ifBlocks += `  if (activeTab === '${item.tab}') {\n    return <${item.comp} searchValue={searchValue} />;\n  }\n`;
}

if (!content.includes('// Handle Development sub-category directories')) {
  content = content.replace('  // Handle Software directory', ifBlocks + '\n  // Handle Software directory');
  fs.writeFileSync(file, content);
  console.log('Successfully injected if blocks!');
} else {
  console.log('If blocks already exist!');
}
