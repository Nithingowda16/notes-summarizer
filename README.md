# Summora — AI-Powered Smart Notes Summarizer

**Summora** is a premium, full-stack, local-first application that helps students, researchers, and professionals digest lengthy PDF notes in seconds. It extracts raw text, generates semantic summaries, tags key concepts, and features an interactive Q&A assistant—complete with an **offline Text-to-Speech (TTS) summary reader**.

---

## 🌟 Key Features

*   **Smart PDF Text Extraction**: Parses text dynamically using offline layout analysis.
*   **Extractive AI Summaries**: Uses Latent Semantic Analysis (LSA) and LexRank modules to surface core sentences.
*   **Key Concept Tagging**: Automatically identifies terminology, abbreviations, and jargon tags.
*   **Document Q&A Assistant**: An interactive macOS-style terminal simulation where you can ask natural language questions and fetch matching passages using local TF-IDF cosine similarity.
*   **TTS Audio Summary Reader**: Reads extractive summaries aloud inside the browser with high-quality toggleable male or female voices.
*   **Private & Secure**: Built to run entirely offline, ensuring no telemetry or files ever leave your system.

---

## 🛠️ Technology Stack

### Frontend
*   **React** (Vite runtime)
*   **Tailwind CSS** (v4 theme configuration)
*   **Framer Motion** (Fluid micro-animations & transitions)
*   **Lucide React** (Modern clean iconography)

### Backend
*   **Flask** (Lightweight Python web API)
*   **Flask-CORS** (Handling local cross-origin connections)
*   **PyPDF2** (Binary PDF parsing)
*   **Sumy** (Extractive summarization frameworks)
*   **NLTK** (Offline tokenizers & stopwords corpora)
*   **YAKE** (Statistical keyword scoring engine)

---

## 🚀 Local Development Setup

Clone the repository and follow the setup instructions for both parts of the service:

### 1. Backend (Python/Flask)
Navigate to the backend directory, install the required packages, and run the service:
```bash
# Go to the root repository folder
cd backend

# Install requirements
pip install -r requirements.txt

# Start the Flask backend
python app.py
```
The API server will run locally at `http://127.0.0.1:5000`.

### 2. Frontend (React/Vite)
Open another terminal, navigate to the frontend directory, install npm packages, and run the hot-reload dev server:
```bash
# Go to the frontend folder
cd frontend

# Install Node modules
npm install

# Start local server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ☁️ Deployment on Render

Summora is fully configured to be deployed on the **Render Cloud Platform**.

### Option A: Using the Blueprint (Payment card required on Render)
Render's Blueprint feature deploys the full-stack system automatically in one click using the pre-configured `render.yaml` file:
1. Go to your **Render Dashboard** -> **New +** -> **Blueprint**.
2. Connect your Git repository.
3. Set a service group name (e.g. `summora`) and click **Apply**.

### Option B: Free Tier Setup (No payment card required)
To host the app completely for free, deploy the backend and frontend separately:

#### 1. Deploy the Backend (`summora-backend`)
1. Create a new **Web Service** on Render.
2. Select your repository and choose **Python** as the runtime.
3. Configure the commands:
   *   **Build Command**: `pip install -r backend/requirements.txt`
   *   **Start Command**: `gunicorn --chdir backend app:app`
4. Set the Instance Type to **Free** ($0/mo) and deploy. Copy the public URL provided (e.g., `https://summora-backend.onrender.com`).

#### 2. Deploy the Frontend (`summora-frontend`)
1. Create a new **Static Site** on Render.
2. Select your repository.
3. Configure the commands:
   *   **Build Command**: `cd frontend && npm install && npm run build`
   *   **Publish Directory**: `frontend/dist`
4. Expand **Advanced Options** -> **Add Environment Variable**:
   *   **Key**: `VITE_API_URL`
   *   **Value**: `https://<YOUR-BACKEND-URL>/api` *(e.g., `https://summora-backend.onrender.com/api`)*
5. Select the **Free** tier and click deploy!
