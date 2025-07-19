<div style="display:flex;flex-direction:column;">
  <a href="#">
    <img src="./src/askala_baseapp_frontend/public/logo-background.png" alt="ASKALA Logo" role="presentation"/>
  </a>

<br/>
<br/>

[![Internet Computer portal](https://img.shields.io/badge/Internet-Computer-grey?logo=internet%20computer)](https://internetcomputer.org)
</div>

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

- [Node.js](https://nodejs.org/) (v22+)
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install) (for ICP development)
- [npm](https://www.npmjs.com/) (v11+)

1. **Clone the Repository**

```sh
git clone https://github.com/chainrooks/askala_baseapp.git
cd askala_baseapp
```

2. **Install Dependencies**

```sh
npm install
```

3. **Start the Local ICP Replica**

```sh
dfx start --background
```

4. **Deploy Local**
```sh
dfx deploy --network=local
```

## Content & Deployment Workflow

1. **Content Change**  
   Update lesson content or metadata as needed (MDX files, lesson registry, dsb).

2. **Generate Hash**  
   Run the script to generate hashes of content and metadata::
   ```sh
   npm run build:content-hash
   ```

2. **Deploy Metadata To Backend Canister**  
   Run the script to deploy content to the canister backend
   ```sh
   npm run deploy:metadata
   ```

---

Workflow ini memastikan setiap perubahan konten terintegrasi dengan backend dan frontend secara konsisten.

## Project Structure

- `src/askala_baseapp_backend/` – Motoko backend canister code
- `src/askala_baseapp_frontend/` – React frontend code
- `build-scripts/` – Scripts for content registry and deployment
- `deployment/` – Generated lesson metadata for backend

## Learn More

- [ICP Developer Docs](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [Motoko Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)

---

For any issues, please check the documentation or reach out to the ICP developer