export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const DATABASEMANAGEMENTANDANALYTICS_ITEMS: DevItem[] = [
  { name: "MySQL", desc: "A widely-used open-source relational database.", url: "https://www.mysql.com/" },
  { name: "PostgreSQL", desc: "A powerful, open-source object-relational database.", url: "https://www.postgresql.org/" },
  { name: "MongoDB", desc: "A popular NoSQL document database.", url: "https://www.mongodb.com/" },
  { name: "DBeaver", desc: "A popular universal database management tool.", url: "https://dbeaver.io/" },
  { name: "SQLite", desc: "A C-language library that implements a small, fast, self-contained SQL database.", url: "https://www.sqlite.org/" },
  { name: "Redis", desc: "An in-memory data store used as a database, cache, and message broker.", url: "https://redis.io/" },
  { name: "Elasticsearch", desc: "A distributed, RESTful search and analytics engine.", url: "https://www.elastic.co/" },
  { name: "Apache Cassandra", desc: "A distributed NoSQL database.", url: "https://cassandra.apache.org/" },
  { name: "Amazon DynamoDB", desc: "A key-value and document database from AWS.", url: "https://aws.amazon.com/dynamodb/" },
  { name: "Google Firebase Realtime Database", desc: "A NoSQL cloud database.", url: "https://firebase.google.com/products/realtime-database" },
  { name: "Azure Cosmos DB", desc: "A globally distributed database service.", url: "https://azure.microsoft.com/en-us/services/cosmos-db/" },
  { name: "TablePlus", desc: "A modern, native database GUI.", url: "https://tableplus.com/" },
  { name: "DataGrip", desc: "A powerful database IDE from JetBrains.", url: "https://www.jetbrains.com/datagrip/" },
  { name: "pgAdmin", desc: "The leading administration tool for PostgreSQL.", url: "https://www.pgadmin.org/" },
  { name: "MySQL Workbench", desc: "A unified visual tool for database architects, developers, and DBAs.", url: "https://www.mysql.com/products/workbench/" },
  { name: "MongoDB Compass", desc: "The GUI for MongoDB.", url: "https://www.mongodb.com/products/compass" },
  { name: "RedisInsight", desc: "A GUI for Redis.", url: "https://redis.com/redis-enterprise/redis-insight/" },
  { name: "InfluxDB", desc: "A time-series database.", url: "https://www.influxdata.com/" },
  { name: "Prometheus", desc: "A monitoring system and time-series database.", url: "https://prometheus.io/" },
  { name: "Grafana", desc: "A multi-platform open-source analytics and interactive visualization web application.", url: "https://grafana.com/" },
  { name: "Tableau", desc: "A powerful data visualization tool.", url: "https://www.tableau.com/" },
  { name: "Power BI", desc: "A business analytics service from Microsoft.", url: "https://powerbi.microsoft.com/" },
  { name: "Looker", desc: "A business intelligence and data analytics platform.", url: "https://looker.com/" },
  { name: "Apache Spark", desc: "A unified analytics engine for large-scale data processing.", url: "https://spark.apache.org/" },
  { name: "Apache Flink", desc: "A framework for stateful computations over data streams.", url: "https://flink.apache.org/" },
  { name: "Hadoop", desc: "A framework for distributed storage and processing of big data.", url: "https://hadoop.apache.org/" },
];
