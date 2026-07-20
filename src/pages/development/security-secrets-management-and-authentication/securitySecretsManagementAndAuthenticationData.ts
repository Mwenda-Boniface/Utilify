export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const SECURITYSECRETSMANAGEMENTANDAUTHENTICATION_ITEMS: DevItem[] = [
  { name: "Vault", desc: "A tool for securely accessing secrets.", url: "https://www.vaultproject.io/" },
  { name: "AWS Secrets Manager", desc: "A service for managing secrets on AWS.", url: "https://aws.amazon.com/secrets-manager/" },
  { name: "Azure Key Vault", desc: "A service for managing keys, secrets, and certificates on Azure.", url: "https://azure.microsoft.com/en-us/services/key-vault/" },
  { name: "Google Cloud Secret Manager", desc: "A service for managing secrets on GCP.", url: "https://cloud.google.com/secret-manager" },
  { name: "CyberArk", desc: "A privileged access management solution.", url: "https://www.cyberark.com/" },
  { name: "1Password", desc: "A password manager for teams and individuals.", url: "https://1password.com/" },
  { name: "Okta", desc: "An identity management platform.", url: "https://www.okta.com/" },
  { name: "Auth0", desc: "A platform for authentication and authorization.", url: "https://auth0.com/" },
  { name: "Keycloak", desc: "An open-source identity and access management solution.", url: "https://www.keycloak.org/" },
  { name: "Firebase Authentication", desc: "A backend service for authenticating users.", url: "https://firebase.google.com/products/auth" },
  { name: "OWASP ZAP", desc: "A web application security scanner.", url: "https://www.zaproxy.org/" },
  { name: "Burp Suite", desc: "An integrated platform for performing security testing of web applications.", url: "https://portswigger.net/burp" },
  { name: "Nmap", desc: "A network discovery and security auditing tool.", url: "https://nmap.org/" },
  { name: "Wireshark", desc: "A network protocol analyzer.", url: "https://www.wireshark.org/" },
  { name: "Metasploit", desc: "A penetration testing framework.", url: "https://www.metasploit.com/" },
  { name: "Snyk", desc: "A tool for finding and fixing vulnerabilities in dependencies.", url: "https://snyk.io/" },
  { name: "WhiteSource", desc: "A tool for open-source security and license compliance.", url: "https://www.mend.io/" },
  { name: "Nexus", desc: "A repository manager for build artifacts and dependencies.", url: "https://www.sonatype.com/products/nexus-repository" },
  { name: "Tines", desc: "A security automation platform.", url: "https://www.tines.com/" },
  { name: "Akamai", desc: "A content delivery network and cloud security provider.", url: "https://www.akamai.com/" },
  { name: "Cloudflare", desc: "A web performance and security company.", url: "https://www.cloudflare.com/" },
  { name: "Incogni", desc: "A personal data removal service.", url: "https://incogni.com/" },
  { name: "Mullvad", desc: "A VPN provider.", url: "https://mullvad.net/" },
  { name: "ProtonMail", desc: "An email service focused on privacy and security.", url: "https://proton.me/mail" },
  { name: "Tutanota", desc: "A secure email service.", url: "https://tuta.com/" },
  { name: "Signal", desc: "A privacy-focused messaging app.", url: "https://signal.org/" },
  { name: "Telegram", desc: "A cloud-based mobile and desktop messaging app.", url: "https://telegram.org/" },
];
