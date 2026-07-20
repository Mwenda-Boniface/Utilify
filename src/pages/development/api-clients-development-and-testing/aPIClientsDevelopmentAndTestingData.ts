export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const APICLIENTSDEVELOPMENTANDTESTING_ITEMS: DevItem[] = [
  { name: "Postman", desc: "A widely-used collaboration platform for API development.", url: "https://www.postman.com/" },
  { name: "Insomnia", desc: "A powerful, open-source API client.", url: "https://insomnia.rest/" },
  { name: "Swagger", desc: "A suite of tools for API design and documentation.", url: "https://swagger.io/" },
  { name: "Apifox", desc: "A collaborative API design and testing platform.", url: "https://apifox.com/" },
  { name: "Hoppscotch", desc: "A lightweight, web-based API client.", url: "https://hoppscotch.io/" },
  { name: "Bruno", desc: "An open-source API client, Git-friendly and offline.", url: "https://www.usebruno.com/" },
  { name: "Paw", desc: "A native Mac API client.", url: "https://paw.cloud/" },
  { name: "SoapUI", desc: "A headless functional testing tool for APIs.", url: "https://www.soapui.org/" },
  { name: "Mockoon", desc: "A desktop app for mocking APIs.", url: "https://mockoon.com/" },
  { name: "Hasura", desc: "An instant real-time GraphQL API engine.", url: "https://hasura.io/" },
  { name: "GraphQL Playground", desc: "A graphical, interactive, in-browser GraphQL IDE.", url: "https://github.com/graphql/graphql-playground" },
  { name: "Apollo GraphQL", desc: "A platform for building a supergraph.", url: "https://www.apollographql.com/" },
];
