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

  const renderShapeIcon = (item: ProjectIssueItem, groupLength: number): ReactNode => {
    const today = new Date();
    const priorityInDays = getDurationByPriority(item.priority);
    const expirationDate = new Date(new Date(item.createdAt).getTime() + (priorityInDays * 24 * 60 * 60 * 1000));
    const remainingDays = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return groupLength > 0 ?
        <CircleIcon />
        : remainingDays > 7 ? <CircleIcon />
        : remainingDays > 1 ? <OctagonIcon style={{borderColor:"#00000050"}} />
        : <FireIcon style={{borderColor:"#00000050"}} />
  };
  const detectCollision = (item: ProjectIssueItem, items: ProjectIssueItem[]): ProjectIssueItem[] => {
    const collisionItems: ProjectIssueItem[] = [];
    items.forEach((i) => {
      if (i.id !== item.id && i.cell === item.cell) {
        const x1 = item.impact * 10 * stepWidth;
        const y1 = item.probability * 10 * stepHeight;
        const x2 = i.impact * 10 * stepWidth;
        const y2 = i.probability * 10 * stepHeight;
        const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        if (distance < 30) {
          collisionItems.push(i);
        }
      }
    });
    return collisionItems;
  };
  return (
  <div>
    <h1>Chart</h1>
  </div>
  )
};
