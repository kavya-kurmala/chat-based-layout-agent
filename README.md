# Chat-Based Layout Agent

## Project Overview

This project is a Chat-Based Layout Agent built for the AI Engineer Intern POC assignment.

The application allows users to modify a design layout JSON using natural language chat instructions. The system uses Gemini API for layout reasoning and JSON transformation.

Users can enter instructions such as:

* Convert this design to 9:16
* Move the headline to the top
* Move the offer badge higher
* Make the headline smaller
* Keep the product large

The updated layout JSON is displayed in real time along with a basic wireframe preview.

---

# Tech Stack

## Frontend

* React
* Vite
* Axios
* CSS

## Backend

* Node.js
* Express.js
* Gemini API

---

# Features

* Chat-based layout editing
* LLM integration using Gemini
* Layout reasoning
* JSON transformation
* Real-time updated JSON display
* Basic wireframe preview
* Handles follow-up instructions

---

# Folder Structure

```txt
layout-agent/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# Setup Instructions

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
cd layout-agent
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

## Run backend

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Render

---

# Example Prompts

```txt
Convert this design to 9:16
Move the headline to the top
Move the offer badge higher
Make the headline smaller
Keep the product large
```

---

# Approach

The frontend stores the current layout JSON in state. When the user enters a chat instruction, the frontend sends both the instruction and the current layout JSON to the backend.

The backend uses Gemini API to understand the instruction and perform layout reasoning. It updates the layout JSON accordingly and returns the transformed JSON response.

The frontend then updates:

* Wireframe preview
* Updated JSON panel
* Chat history

This creates an interactive chat-based layout editing workflow.

---

