import {
  HERO_HTML,
  NAV_HTML,
  REMAINING_PAGE_HTML,
  STATS_STRIP_HTML,
} from "./page-sections";

function HtmlSection({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function HomePage() {
  return (
    <main className="scroll-smooth">
      <HtmlSection html={NAV_HTML} />
      <HtmlSection html={HERO_HTML} />
      <HtmlSection html={STATS_STRIP_HTML} />
      <HtmlSection html={REMAINING_PAGE_HTML} />
    </main>
  );
}
