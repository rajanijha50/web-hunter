import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Web Hunter
> Web Hunter (https://www.webhunter.space) is a curated directory of 500+ free and useful online tools, AI applications, design utilities, and developer resources organized across 90+ categories.

## What is Web Hunter?
Web Hunter solves tool discovery paralysis by curating hand-picked, high-utility websites and AI services. Users can search by keyword, filter by categories, explore popular tools, and save favorites to personal dashboards.

## Key Categories Curated
- **Artificial Intelligence**: AI Agents, AI Art, AI Assistants, AI Code Assistants, AI Image Generators, AI Video Tools, AI Voice Generators, AI Writing.
- **Developer Tools**: Web Development, APIs, Databases, Hosting, Cybersecurity, Automation, Cheatsheets.
- **Design & Creative**: 3D Modeling, UI/UX Design Resources, Free Icons, Stock Images, Color Tools.
- **Productivity & Business**: Free Analytics, Productivity Apps, E-commerce, Finance, Hiring & Remote Jobs.

## Core Pages & Endpoints
- [Web Hunter Directory](https://www.webhunter.space/): Main portal to search and browse curated web tools.
- [About Web Hunter](https://www.webhunter.space/about): Mission, features, and platform backstory.
- [Sitemap](https://www.webhunter.space/sitemap.xml): Public XML sitemap for search crawlers.

## Optional / Contextual Details
- **Architecture**: Next.js 15, React 19, Tailwind CSS, TanStack React Query, MongoDB.
- **AI-assisted Curation**: Groq Llama inference for auto-categorization and metadata cleanup.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
