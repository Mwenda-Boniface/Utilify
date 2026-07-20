export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const CONTINUOUSINTEGRATIONCONTINUOUSDEPLOYMENTCICD_ITEMS: DevItem[] = [
  { name: "GitHub Actions", desc: "CI/CD directly integrated with GitHub.", url: "https://github.com/features/actions" },
  { name: "GitLab CI/CD", desc: "A powerful and popular integrated CI/CD platform.", url: "https://docs.gitlab.com/ee/ci/" },
  { name: "Jenkins", desc: "A widely used, open-source automation server.", url: "https://www.jenkins.io/" },
  { name: "CircleCI", desc: "A fast and popular CI/CD platform.", url: "https://circleci.com/" },
  { name: "Travis CI", desc: "A hosted continuous integration service.", url: "https://travis-ci.org/" },
  { name: "Bitbucket Pipelines", desc: "CI/CD integrated with Bitbucket.", url: "https://bitbucket.org/product/features/pipelines" },
  { name: "Azure Pipelines", desc: "CI/CD from Microsoft.", url: "https://azure.microsoft.com/en-us/services/devops/pipelines/" },
  { name: "AWS CodePipeline", desc: "A fully-managed CI/CD service from Amazon.", url: "https://aws.amazon.com/codepipeline/" },
  { name: "Google Cloud Build", desc: "A CI/CD platform from Google.", url: "https://cloud.google.com/build" },
  { name: "TeamCity", desc: "A CI/CD server from JetBrains.", url: "https://www.jetbrains.com/teamcity/" },
  { name: "Bamboo", desc: "A CI/CD server from Atlassian.", url: "https://www.atlassian.com/software/bamboo" },
  { name: "Drone", desc: "A self-service CI platform.", url: "https://www.drone.io/" },
  { name: "Concourse", desc: "An open-source CI/CD system.", url: "https://concourse-ci.org/" },
  { name: "Argo Workflows", desc: "A container-native workflow engine for Kubernetes.", url: "https://argoproj.github.io/workflows/" },
  { name: "Spinnaker", desc: "A multi-cloud continuous delivery platform.", url: "https://spinnaker.io/" },
  { name: "Octopus Deploy", desc: "A deployment automation tool.", url: "https://octopus.com/" },
  { name: "Harness", desc: "A software delivery platform that uses AI.", url: "https://harness.io/" },
];
