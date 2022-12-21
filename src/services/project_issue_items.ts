import { graphql } from "./_graphql";

type _GitHub_Project_Issue_Item = {
  data: {
    viewer: {
      projectV2: {
        items: {
          nodes: {
            id: string;
            createdAt: string;
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
  id: number;
  cell: string;
  createdAt: string;
  title: string;
  priority: number;
  impact: number;
  probability: number;
  isMitigated: boolean;
};

export default async (projectNumber: number): Promise<ProjectIssueItem[]> => {
  const getCellName = (impact: number, probability: number): string => {
    let cellName = "";
    if (impact <= 3 && impact >= 2 && probability <= 1) {
      cellName = "High-Low";
    } else if (impact <= 3 && impact >= 2 && probability <= 2 && probability >= 1) {
      cellName = "High-Medium";
    } else if (impact <= 3 && impact >= 2 && probability <= 3 && probability >= 2) {
      cellName = "High-High";
    } else if (impact <= 2 && impact >= 1 && probability <= 1) {
      cellName = "Medium-Low";
    } else if (impact <= 2 && impact >= 1 && probability <= 2 && probability >= 1) {
      cellName = "Medium-Medium";
    } else if (impact <= 2 && impact >= 1 && probability <= 3 && probability >= 2) {
      cellName = "Medium-High";
    } else if (impact <= 1 && probability <= 1) {
      cellName = "Low-Low";
    } else if (impact <= 1 && probability <= 2 && probability >= 1) {
      cellName = "Low-Medium";
    } else if (impact <= 1 && probability <= 3 && probability >= 2) {
      cellName = "Low-High";
    } else {
      cellName = "Unknown";
    }
    return cellName;
  };

  const query = `
  {
    viewer {
      projectV2(number: ${projectNumber}) {
        items(first: 100) {
          nodes {
            id
            createdAt
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

  console.log(JSON.stringify(request, null, 2));

  return request.data.viewer.projectV2.items.nodes.map((item) => {
    const impact = Number(item.fieldValues.nodes.find((node) => node.field?.name === "Impact")?.number ?? 0);
    const probability = Number(item.fieldValues.nodes.find((node) => node.field?.name === "Probability")?.number ?? 0);

    return {
      id: Number(item.id),
      cell: getCellName(impact, probability),
      createdAt: item.createdAt,
      title: item.content.title,
      priority: Number(item.fieldValues.nodes.find((node) => node.field?.name === "Priority")?.name?.split(" ")[1] ?? 0),
      impact,
      probability,
      isMitigated: false
    };
  });
}
