# Pokercluj

This project is a local reconstruction of the currently deployed `pokercluj.vercel.app` site.

## Structure

- `src/app/layout.tsx`: app shell, metadata, and root classes
- `src/app/page.tsx`: page entrypoint
- `src/app/page-sections.ts`: source-owned section content used by the page
- `snapshot/production.html`: captured production page markup
- `snapshot/production.css`: captured production stylesheet
- `archive/`: old comparison, verification, and extraction artifacts kept for reference

## Notes

- The original authored source was not available in this workspace.
- The rendered page no longer reads the snapshot files at runtime.
- The current layout/content is now owned by `src/app/page-sections.ts`, while `snapshot/` remains as reference material.
- The next refinement step is to replace the remaining HTML string sections with typed data and JSX components section by section.
- Latest repository sync for deployment was updated on `2026-03-31`.
