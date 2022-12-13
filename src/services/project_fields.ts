import { graphql } from "./_graphql";

type _GitHub_Project = {
  data: {
    viewer: {
      projectsV2: {
        nodes: {
          id: string;
          number: number;
          title: string;
          fields: {
            nodes: {
              id: string;
              name: string;
              dataType: string;
              options?: {
                id: string;
                name: string;
              }[];
            }[];
          };
        }[];
      };
    };
  };
};

export type ProjectFields = {
  id: string;
  number: number;
  title: string;
  fields: {
    id: string;
    name: string;
    dataType: string;
    options: {
      id: string;
      name: string;
    }[];
  }[];
};

export default async () => {
  const query = `
  {
    viewer {
      projectsV2(first: 100) {
        nodes {
          id
          number
          title
          fields(first: 100) {
            nodes {
              ... on ProjectV2Field {
                id
                name
                dataType
              }
              ... on ProjectV2IterationField {
                id
                name
                dataType
              }
              ... on ProjectV2SingleSelectField {
                id
                name
                dataType
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const request = await graphql<_GitHub_Project>(query);

  const project: ProjectFields = {
    id: request.data.viewer.projectsV2.nodes[0].id,
    number: request.data.viewer.projectsV2.nodes[0].number,
    title: request.data.viewer.projectsV2.nodes[0].title,
    fields: request.data.viewer.projectsV2.nodes[0].fields.nodes.map((field) => ({
      id: field.id,
      name: field.name,
      dataType: field.dataType,
      options: field.options ?? [],
    })),
  };

  return project;
}
