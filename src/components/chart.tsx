import { ProjectFields } from "../services/project_fields";
import { ProjectIssueItem } from "../services/project_issue_items";

type Props = {
  project_fields: ProjectFields;
  project_issue_items: ProjectIssueItem[];
};

type GroupItem = { cell: string, key: ProjectIssueItem, group: ProjectIssueItem[] };

export default ({project_fields, project_issue_items}: Props) => {

  const borderColorList = ["", "#4c206d", "#cc0000", "#7a83dd", "#5b88ab", "#005b99", "#4B0082", "#EE82EE"];

  const renderGroupItem = (item: GroupItem): ReactNode => {
    return <button key={item.key.id} className="flex w-8 h-8 z-10" onClick={e => setSelectedGroup(item)} style={{
      left: item.key.impact * 10 * stepWidth,
      top: item.key.probability * 10 * stepHeight,
      borderColor: borderColorList[0]
    }} title={item.group.length === 0 ? item.key.title : `${item.group.length+1} grouped risks:\n${item.key.id}: ${item.key.title}\n${item.group.map(e => `${e.id}: ${e.title}\n`)}`}>
      { renderShapeIcon(item.key, item.group.length) }
      <span>{item.group.length === 0 ? item.key.id : `# ${item.group.length+1}`}</span>
    </button>;
  };

  return (
  <div>
    <h1>Chart</h1>
  </div>
  )
};
