import { graphql } from "./_graphql";

type _GitHub_Project_Issue_Item = {
  data: {
    viewer: {
      projectV2: {
        items: {
          nodes: {
            id: string;
            content: {
              id: string;
              title: string;
            };
            fieldValues: {
              nodes: {
                id: string;
                text: string;
                name: string;
                optionId: string;
                number: number;
                field: {
                  id: string;
                  name: string;
                };
              }[];
            };
          }[];
        };
      };
    };
  };
};

export type ProjectIssueItem = {
  id: string;
  title: string;
  priority: number;
  impact: number;
  probability: number;
};

export default async (projectNumber: number): Promise<ProjectIssueItem[]> => {
  const query = `
  {
    viewer {
      projectV2(number: ${projectNumber}) {
        items(first: 100) {
          nodes {
            id
            content {
              ... on DraftIssue {
                id
                title
              }
              ... on Issue {
                id
                title
              }
            }
            fieldValues(first: 100) {
              nodes {
                ... on ProjectV2ItemFieldTextValue {
                  id
                  text
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  id
                  name
                  optionId
                  field {
                    ... on ProjectV2SingleSelectField {
                      id
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldNumberValue {
                  id
                  number
                  field {
                    ... on ProjectV2Field {
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
    }
  }
  `;

  const request = await graphql<_GitHub_Project_Issue_Item>(query);

  return request.data.viewer.projectV2.items.nodes.map((item) => {
    return {
      id: item.id,
      title: item.content.title,
      priority: Number(item.fieldValues.nodes.find((node) => node.field?.name === "Priority")?.name?.split(" ")[1] ?? 0),
      impact: Number(item.fieldValues.nodes.find((node) => node.field?.name === "Impact")?.number ?? 0),
      probability: Number(item.fieldValues.nodes.find((node) => node.field?.name === "Probability")?.number ?? 0),
    };
  });
}
