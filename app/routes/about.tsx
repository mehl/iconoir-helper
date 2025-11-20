import { Anim } from "~/components/Anim";
import { PageLayout } from "~/components/PageLayout";

export default function AboutRoute() {
  return <PageLayout>
    <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
      <Anim />
      <br />
      <h1>
        About ICONOIR Helper{" "}
      </h1>
      <p>ICONOIR Helper is a tool designed to help you browse, select, and generate CSS for ICONOIR icons easily.</p>
      <p>Created by <a href="https://bastian-frank.de/">Bastian Frank</a> (<a href="https://github.com/mehl" target="_blank" rel="noopener noreferrer">@mehl</a>) for his own use.</p>
      <p>May it be useful for you as well!</p>
      <p>For more information, visit the <a href="https://iconoir.com" target="_blank" rel="noopener noreferrer">ICONOIR website</a>.</p>
      <br />
      <h2>Contact Information</h2>
      <p>
        Bastian Frank<br />
        Fregestraße 73<br />
        12159 Berlin<br />
        Germany<br />
        Email: <a href="mailto:iconoir-helper@bastian-frank.de">iconoir-helper@bastian-frank.de</a>
      </p>
    </div>
  </PageLayout>;
}
