import Head from 'next/head'
import Chart from '../components/chart';
import Header from '../components/header';

import project_fields, { ProjectFields } from '../services/project_fields';
import project_issue_items, { ProjectIssueItem } from '../services/project_issue_items';

type Props = {
  project_fields: ProjectFields;
  project_issue_items: ProjectIssueItem[];
};

export async function getStaticProps() {
  const projectFields = await project_fields();
  const projectIssueItems = await project_issue_items(projectFields.number);

  const result: Props = {
    project_fields: projectFields,
    project_issue_items: projectIssueItems,
  };

  return { props: result };
}

export default ({project_fields, project_issue_items}: Props) => {

  console.log({project_fields, project_issue_items});

  return (
    <>
      <Head>
        <title>Project Florida</title>
        <meta name="description" content="Project Florida" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="h-full p-6">
          <Chart project_fields={project_fields} project_issue_items={project_issue_items} />
        </main>
      </div>
    </>
  )
}
