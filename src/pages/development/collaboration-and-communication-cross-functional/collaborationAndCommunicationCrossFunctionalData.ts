export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const COLLABORATIONANDCOMMUNICATIONCROSSFUNCTIONAL_ITEMS: DevItem[] = [
  { name: "Slack", desc: "A team communication platform.", url: "https://slack.com/" },
  { name: "Microsoft Teams", desc: "A team communication platform.", url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software" },
  { name: "Discord", desc: "A popular communication app for gaming and developer communities.", url: "https://discord.com/" },
  { name: "Mattermost", desc: "An open-source self-hostable Slack alternative.", url: "https://mattermost.com/" },
  { name: "Rocket.Chat", desc: "An open-source communication platform.", url: "https://rocket.chat/" },
  { name: "Zulip", desc: "An open-source chat platform with a unique topic-based threading model.", url: "https://zulip.com/" },
];
