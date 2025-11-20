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
      <p>Created by <a href="https://bastian-frank.de/">Bastian Frank</a> (<a href="https://github.com/mehl" target="_blank" rel="noopener noreferrer">@mehl</a>) for own use.</p>
      <p>May it be useful for you as well!</p>
      <p>For more information, visit the <a href="https://iconoir.com" target="_blank" rel="noopener noreferrer">ICONOIR website</a>.</p>
      <br />
      <h2>Contact Information</h2>
      <p>
        Bastian Frank<br />
        <a href="https://bastian-frank.de" target="_blank" rel="noopener noreferrer">https://bastian-frank.de</a><br />
        Email: <a href="mailto:iconoir-helper@bastian-frank.de">iconoir-helper@bastian-frank.de</a>
      </p>
      <p>
        <a href="https://github.com/mehl/iconoir-helper" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-1">
          <i className="iconoir-github" style={{ fontSize: "1.5rem" }}></i>
          https://github.com/mehl/iconoir-helper
        </a>
      </p>
    </div>
  </PageLayout>;
}
