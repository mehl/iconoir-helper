import { useSnapshot } from "valtio";
import { IconList } from "~/components/IconList";
import { PageLayout } from "~/components/PageLayout";
import { SelectedList } from "~/components/SelectedList";
import iconStore from "~/state/IconStore";

export function Home({ }: {}) {
  const { filteredCategorizedIcons } = useSnapshot(iconStore);
  const content = Object.entries(filteredCategorizedIcons || {}).map(([category, icons]) => (
    <div key={category} className="mb-4">
      <h3>{category}</h3>
      <IconList iconlist={[...icons]} />
    </div>
  ));
  return (
    <PageLayout sidebar={<SelectedList />} showSearch={true}>
      {content}
    </PageLayout>
  );
}
