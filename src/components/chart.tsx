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

  const high_low_CellRef = useRef<HTMLDivElement>(null);

  const [riskItems, setRiskItems] = useState<ProjectIssueItem[]>();
  const [filteredRiskItems, setFilteredRiskItems] = useState<ProjectIssueItem[]>();
  const [groupedRiskItems, setGroupedRiskItems] = useState<GroupItem[]>();
  const [selectedPriorities, setSelectedPriorities] = useState<{p:number, s:boolean}[]>([]);
  const [filterMitigated, setFilterMitigated] = useState<boolean>(true);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const [stepHeight, setStepHeight] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<GroupItem>();

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

  const updatePriorityFilter = (e: any) => {
    setSelectedPriorities(selectedPriorities.map(sp => {
      if (sp.p === parseInt(e.value, 10)) {
        sp.s = !sp.s;
      }
      return sp;
    }));
  };

  const getDurationByPriority = (priority: number): number => {
    switch (priority) {
      case 1:
        return 2;
      case 2:
        return 7;
      case 3:
        return 14;
      case 4:
        return 30;
      case 5:
        return 90;
      case 6:
        return 180;
      case 7:
        return 365;
      default:
        return 2;
    }
  };
  const flattenGroups = (groups: GroupItem[]): number[] => {
    const idListGroup = groups.map(e => e.group.map(m => m.id));
    const idListGroupFlatten = ([] as number[]).concat(...idListGroup);
    const idListKey = groups.map(e => e.key.id);
    return [...idListGroupFlatten, ...idListKey];
  };

  useEffect(() => {
    const width = high_low_CellRef.current?.clientWidth ?? 0;
    const height = high_low_CellRef.current?.clientHeight ?? 0;
    setStepWidth((width-30) / 30);
    setStepHeight((height-30) / 30);

    setRiskItems(project_issue_items);
    setFilteredRiskItems(project_issue_items);
    setSelectedPriorities(project_issue_items.map(e => e.priority).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b).map(e => { return {p:e, s:true} }) ?? []);
  }, [high_low_CellRef.current?.clientWidth, high_low_CellRef.current?.clientHeight]);

  useEffect(() => {
    if (filteredRiskItems === undefined) {
      return;
    }
    if (filteredRiskItems.length === 0) {
      return;
    }
    const items = filteredRiskItems?.filter(e => { if (!filterMitigated) { return !e.isMitigated } return true; }).filter(e => selectedPriorities.filter(sp => sp.s).map(sp => sp.p).indexOf(e.priority) > -1 ) ?? [];
    const groups: GroupItem[] = [];
    items.forEach((item) => {
      const collisionItems = detectCollision(item, items);
      if (collisionItems.length > 0) {
        groups.push({cell: item.cell, key:item, group: collisionItems});
        collisionItems.forEach((collisionItem) => {
          const index = items.findIndex((i) => i.id === collisionItem.id);
          if (index > -1) {
            items.splice(index, 1);
          }
        });
      } else {
        groups.push({cell: item.cell, key:item, group: []});
        const index = items.findIndex((i) => i.id === item.id);
        if (index > -1) {
          items.splice(index, 1);
        }
      }
    });

    const flattenedIdList = flattenGroups(groups);

    items
      .map(e => e.id)
      .filter(e => flattenedIdList.indexOf(e) === -1)
      .forEach(e => {
        const item = items.find(i => i.id === e);
        if (item !== undefined) {
          groups.push({cell: item.cell, key:item, group: []});
        }
      });

    console.log({filteredRiskItems, selectedPriorities, items, groups});

    setGroupedRiskItems(groups);
  }, [selectedPriorities, filteredRiskItems, filterMitigated]);

  return (
  <div>
    <h1>Chart</h1>
  </div>
  )
};
