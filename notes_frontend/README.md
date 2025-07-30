# Notes Frontend App – Modern Minimalist React

A modern, minimalistic, and responsive Notes web application written in React, featuring full CRUD for notes, search/filter, and a branded light theme.

## Features

- **Create, edit, delete notes** — fast, client-side by default (replace stub with real API via env)
- **Search and filter notes** live as you type
- **Sidebar navigation** for all notes, plus quick-access "Recent Notes"
- **Mark notes as favorite** and highlight them
- **Responsive layout** – Clean mobile/tablet/desktop UI, sidebar toggle
- **Lightweight & performant** — no UI framework, pure React + CSS
- **Production Ready:** All API endpoints and config via environment variables

## Production API configuration

**RECOMMENDED:**  
Set the environment variable `REACT_APP_NOTES_API` to your notes API endpoint URL.  
This app reads all endpoints from `process.env.REACT_APP_NOTES_API`.

1. In your deployment environment, set a variable like

   ```
   REACT_APP_NOTES_API=https://your-backend/notes-api
   ```

2. Update the app to POST/GET notes from your backend.  
   (Current version stubs data client-side for fast demo.)

3. To add authentication or connect to other services,
   use new environment variables (e.g., `REACT_APP_AUTH_URL`).

## Getting Started

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Customization

### Colors / Theme

Main brand colors are CSS variables in `src/App.css`, see palette at the file top.

### Components

This project uses pure HTML/CSS React components; see `src/App.js` and `src/App.css`.

- Buttons (class: `.add-note-btn`, `.save-btn`, etc.)
- Sidebar, Editor, List sections (`.sidebar`, `.main-area`)
- Responsive breakpoints and mobile/desktop toggle included

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
