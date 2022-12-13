import { ProjectFields } from "../services/project_fields";
import { ProjectIssueItem } from "../services/project_issue_items";

type Props = {
  project_fields: ProjectFields;
  project_issue_items: ProjectIssueItem[];
};

export default ({project_fields, project_issue_items}: Props) => {

  console.log({project_fields, project_issue_items});

  return (
  <div>
    <h1>Chart</h1>
  </div>
  )
};
