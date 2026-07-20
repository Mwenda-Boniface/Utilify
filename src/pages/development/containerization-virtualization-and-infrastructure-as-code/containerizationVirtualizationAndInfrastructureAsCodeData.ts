export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const CONTAINERIZATIONVIRTUALIZATIONANDINFRASTRUCTUREASCODE_ITEMS: DevItem[] = [
  { name: "Docker", desc: "The industry standard for containerization.", url: "https://www.docker.com/" },
  { name: "Kubernetes", desc: "An open-source system for automating containerized application deployment.", url: "https://kubernetes.io/" },
  { name: "Podman", desc: "A daemonless container engine.", url: "https://podman.io/" },
  { name: "Terraform", desc: "A tool for building, changing, and versioning infrastructure safely and efficiently.", url: "https://www.terraform.io/" },
  { name: "Ansible", desc: "An open-source automation tool for configuration management.", url: "https://www.ansible.com/" },
  { name: "Puppet", desc: "A configuration management tool.", url: "https://puppet.com/" },
  { name: "Chef", desc: "A configuration management tool.", url: "https://www.chef.io/" },
  { name: "SaltStack", desc: "A configuration management and remote execution tool.", url: "https://saltproject.io/" },
  { name: "Vagrant", desc: "A tool for building and managing virtual machine environments.", url: "https://www.vagrantup.com/" },
  { name: "Packer", desc: "A tool for creating identical machine images.", url: "https://www.packer.io/" },
  { name: "Nomad", desc: "A flexible workload orchestrator.", url: "https://www.nomadproject.io/" },
  { name: "Consul", desc: "A service networking solution.", url: "https://www.consul.io/" },
  { name: "Vault", desc: "A tool for securely accessing secrets.", url: "https://www.vaultproject.io/" },
  { name: "Helm", desc: "The package manager for Kubernetes.", url: "https://helm.sh/" },
  { name: "Kustomize", desc: "A Kubernetes-native configuration management tool.", url: "https://kustomize.io/" },
  { name: "ArgoCD", desc: "A declarative, GitOps continuous delivery tool for Kubernetes.", url: "https://argoproj.github.io/cd/" },
  { name: "FluxCD", desc: "A GitOps tool for Kubernetes.", url: "https://fluxcd.io/" },
  { name: "Rancher", desc: "A complete container management platform.", url: "https://rancher.com/" },
  { name: "OpenShift", desc: "Red Hat's enterprise Kubernetes platform.", url: "https://www.redhat.com/en/technologies/cloud-computing/openshift" },
  { name: "Docker Compose", desc: "A tool for defining and running multi-container Docker applications.", url: "https://docs.docker.com/compose/" },
];
