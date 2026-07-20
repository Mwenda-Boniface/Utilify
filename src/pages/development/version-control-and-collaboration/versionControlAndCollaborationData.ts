export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const VERSIONCONTROLANDCOLLABORATION_ITEMS: DevItem[] = [
  { name: "Git", desc: "The most widely used distributed version control system.", url: "https://git-scm.com/" },
  { name: "GitHub", desc: "The leading cloud-based Git repository and collaboration platform.", url: "https://github.com/" },
  { name: "GitLab", desc: "An enterprise-grade DevOps platform with built-in Git repository management.", url: "https://about.gitlab.com/" },
  { name: "Bitbucket", desc: "Git repository management solution for teams, by Atlassian.", url: "https://bitbucket.org/" },
  { name: "SVN (Apache Subversion)", desc: "A centralized version control system.", url: "https://subversion.apache.org/" },
  { name: "Mercurial", desc: "A distributed version control system.", url: "https://www.mercurial-scm.org/" },
  { name: "Perforce Helix", desc: "A version control system for large-scale development.", url: "https://www.perforce.com/products/helix-core" },
  { name: "Azure Repos", desc: "A set of version control tools from Microsoft.", url: "https://azure.microsoft.com/en-us/services/devops/repos/" },
  { name: "AWS CodeCommit", desc: "A fully-managed source control service from Amazon.", url: "https://aws.amazon.com/codecommit/" },
];
