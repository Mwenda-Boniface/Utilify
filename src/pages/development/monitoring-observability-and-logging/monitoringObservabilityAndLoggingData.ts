export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const MONITORINGOBSERVABILITYANDLOGGING_ITEMS: DevItem[] = [
  { name: "Datadog", desc: "A monitoring and analytics platform for developers.", url: "https://www.datadoghq.com/" },
  { name: "New Relic", desc: "A observability platform for developers.", url: "https://newrelic.com/" },
  { name: "Prometheus", desc: "A monitoring system and time-series database.", url: "https://prometheus.io/" },
  { name: "Grafana", desc: "An analytics and visualization web application.", url: "https://grafana.com/" },
  { name: "Sentry", desc: "An error tracking and performance monitoring tool.", url: "https://sentry.io/" },
  { name: "ELK Stack (Elasticsearch, Logstash, Kibana)", desc: "A suite for log analysis and search.", url: "https://www.elastic.co/what-is/elk-stack" },
  { name: "Splunk", desc: "A platform for searching, monitoring, and analyzing machine-generated data.", url: "https://www.splunk.com/" },
  { name: "Nagios", desc: "A classic monitoring system.", url: "https://www.nagios.org/" },
  { name: "Zabbix", desc: "An open-source monitoring tool.", url: "https://www.zabbix.com/" },
  { name: "Jaeger", desc: "A distributed tracing platform.", url: "https://www.jaegertracing.io/" },
  { name: "Zipkin", desc: "A distributed tracing system.", url: "https://zipkin.io/" },
  { name: "AppDynamics", desc: "An application performance monitoring (APM) tool.", url: "https://www.appdynamics.com/" },
  { name: "Dynatrace", desc: "An AI-powered observability platform.", url: "https://www.dynatrace.com/" },
  { name: "Loggly", desc: "A cloud-based log management service.", url: "https://www.loggly.com/" },
  { name: "Papertrail", desc: "A cloud-hosted log management tool.", url: "https://www.papertrail.com/" },
  { name: "Sumo Logic", desc: "A cloud-native machine data analytics service.", url: "https://www.sumologic.com/" },
  { name: "AWS CloudWatch", desc: "A monitoring service for AWS resources.", url: "https://aws.amazon.com/cloudwatch/" },
  { name: "Azure Monitor", desc: "A comprehensive monitoring solution for Azure.", url: "https://azure.microsoft.com/en-us/services/monitor/" },
  { name: "Google Cloud Monitoring", desc: "A monitoring service for GCP.", url: "https://cloud.google.com/monitoring" },
];
