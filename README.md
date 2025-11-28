# SharePoint Migration Site

This is a SharePoint Framework (SPFx) solution built with React for the SharePoint Migration Test site.

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Gulp CLI (install globally: `npm install -g gulp-cli`)

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the solution:
   ```bash
   npm run build
   ```

3. Serve the solution locally:
   ```bash
   gulp serve
   ```

4. Bundle and package the solution:
   ```bash
   gulp bundle --ship
   gulp package-solution --ship
   ```

## Project Structure

- `src/` - Source code
  - `webparts/` - Web parts
    - `migration/` - Migration web part
- `config/` - Configuration files
- `lib/` - Compiled output (generated)
- `temp/` - Temporary files (generated)
- `dist/` - Distribution files (generated)

## SharePoint Site

Target Site: https://m365x65470037.sharepoint.com/sites/MigrationTest2

