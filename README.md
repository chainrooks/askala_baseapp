# Askala BaseApp

Askala BaseApp is an AI-powered learning platform built on the Internet Computer (ICP) using Motoko for the backend and React + Vite for the frontend. It provides interactive Python learning content, secure authentication via Internet Identity, and tracks user progress.

## Features

- Interactive Python lessons with rich MDX content
- Secure login using Internet Identity
- Tracks user progress per lesson
- AI-powered chat assistant for each topic
- Modern UI with Tailwind CSS

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install) (for ICP development)
- [npm](https://www.npmjs.com/) (v7+)

### 1. Clone the Repository

```sh
git clone https://github.com/chainrooks/askala_baseapp.git
cd askala_baseapp
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start the Local ICP Replica

```sh
dfx start --background
```

### 4. Deploy Canisters & Generate Declarations

```sh
npm run setup
```

### 5. Start the Frontend Development Server

```sh
npm start
```

- The frontend will be available at [http://localhost:3000](http://localhost:3000)
- The backend canister runs locally at [http://localhost:4943](http://localhost:4943)

### 6. Build for Production

```sh
npm run build
```

## Content & Deployment Workflow

1. **Content Change**  
   Update lesson content or metadata as needed (MDX files, lesson registry, dsb).

2. **Generate Hash**  
   Jalankan script untuk menghasilkan hash konten dan metadata:
   ```sh
   npm run build:hash
   ```

3. **Update Registry**  
   Pastikan registry dan metadata sudah terupdate:
   ```sh
   npm run build:registry
   ```

4. **Build Frontend**  
   Build ulang frontend agar perubahan konten tercermin:
   ```sh
   npm run build
   ```

5. **Deploy Metadata**  
   Deploy metadata ke backend canister:
   ```sh
   dfx deploy
   ```

6. **Verify Success**  
   Cek aplikasi di browser dan pastikan perubahan sudah tampil.

---

Workflow ini memastikan setiap perubahan konten terintegrasi dengan backend dan frontend secara konsisten.

## Project Structure

- `src/askala_baseapp_backend/` – Motoko backend canister code
- `src/askala_baseapp_frontend/` – React frontend code
- `build-scripts/` – Scripts for content registry and deployment
- `deployment/` – Generated lesson metadata for backend

## Useful Commands

- `npm run build` – Build the project
- `npm run setup` – Install, create canisters, generate declarations, deploy
- `npm start` – Start frontend dev server
- `dfx deploy` – Deploy canisters to local replica

## Learn More

- [ICP Developer Docs](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [Motoko Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)

---

For any issues, please check the documentation or reach out to the ICP developer