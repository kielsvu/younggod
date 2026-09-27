# REVGNG Redesign

Next.js + React redesign intended for Vercel.

## Data model

Edit `data/site.json` for the site configuration and `data/members.json` for members.

Put member images in:

`public/images/`

The browser reads these files from the deployed app. They are versioned with Git, so changing a member means committing the JSON/image change and redeploying.

## Local storage

The project uses browser `localStorage` only for small client preferences:

- whether the visitor has already entered
- sound preference

Do not use localStorage as the source of truth for members. A visitor's localStorage cannot update the GitHub repository.

## Deploy

Push the folder to GitHub and import the repository into Vercel. No database or server filesystem is required.

## Important

Vercel's server filesystem should not be treated as permanent storage. If you later want a dashboard that edits members from the website itself, use a database or a GitHub-authenticated commit workflow instead of writing directly to disk.
