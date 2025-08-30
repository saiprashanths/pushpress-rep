# Welcome to your project

**Use your preferred IDE**

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Supabase Configuration

This project uses Supabase for its backend. You'll need to configure a few things to get it running locally or for a new deployment.

**1. Supabase Project ID:**

The Supabase Project ID is stored in the `supabase/config.toml` file.
```toml
project_id = "your-project-id"
```
- This ID is typically generated and set when you initialize your Supabase project using the Supabase CLI (`supabase init`).
- Ensure this `project_id` matches your Supabase project. You can find your project ID in your Supabase project's dashboard URL (e.g., `https://supabase.com/dashboard/project/<YOUR-PROJECT-ID>`).

**2. Supabase URL and Anon Key:**

The Supabase URL and the public anonymous key are stored in the `supabase.config.js` file at the root of the project.
```javascript
export const SUPABASE_URL = "your-supabase-url";
export const SUPABASE_PUBLISHABLE_KEY = "your-supabase-anon-key";
```
- You need to replace `"your-supabase-url"` and `"your-supabase-anon-key"` with the actual URL and Anon key for your Supabase project.
- You can find these values in your Supabase project dashboard under Project Settings > API.
  - **Project URL** corresponds to `SUPABASE_URL`.
  - **Anon (public) key** corresponds to `SUPABASE_PUBLISHABLE_KEY`.
