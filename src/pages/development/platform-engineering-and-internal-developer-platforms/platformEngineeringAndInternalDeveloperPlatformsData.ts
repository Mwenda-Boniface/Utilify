export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const PLATFORMENGINEERINGANDINTERNALDEVELOPERPLATFORMS_ITEMS: DevItem[] = [
  { name: "Backstage", desc: "An open platform for building developer portals.", url: "https://backstage.io/" },
  { name: "Humanitec", desc: "A platform for building Internal Developer Platforms.", url: "https://humanitec.com/" },
  { name: "Crossplane", desc: "A control plane for building platforms.", url: "https://crossplane.io/" },
  { name: "Kratix", desc: "A framework for building internal developer platforms.", url: "https://kratix.io/" },
  { name: "Porter", desc: "A platform for building internal developer platforms on Kubernetes.", url: "https://porter.run/" },
  { name: "Waypoint", desc: "A tool for building, deploying, and releasing applications across any platform.", url: "https://www.waypointproject.io/" },
  { name: "Kubesphere", desc: "A distributed operating system for cloud-native application management.", url: "https://kubesphere.io/" },
];
