export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const FEATUREFLAGGINGANDEXPERIMENTATION_ITEMS: DevItem[] = [
  { name: "LaunchDarkly", desc: "A feature management and experimentation platform.", url: "https://launchdarkly.com/" },
  { name: "Flagsmith", desc: "An open-source feature flagging and remote configuration service.", url: "https://flagsmith.com/" },
  { name: "Split", desc: "A platform for feature flagging and experimentation.", url: "https://www.split.io/" },
  { name: "ConfigCat", desc: "A feature flag and configuration management service.", url: "https://configcat.com/" },
  { name: "GrowthBook", desc: "An open-source feature flagging and A/B testing platform.", url: "https://www.growthbook.io/" },
];
