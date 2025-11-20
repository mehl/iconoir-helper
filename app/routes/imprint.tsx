import { Anim } from "~/components/Anim";
import { PageLayout } from "~/components/PageLayout";
import impressumHtml from "../impressum/impressum.html?raw";
export default function AboutRoute() {
  return <PageLayout>
    <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
      <div dangerouslySetInnerHTML={{ __html: impressumHtml }} />
    </div>
  </PageLayout>;
}
