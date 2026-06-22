# Onae Project Deployment Guide

This guide outlines the steps required to deploy the Onae project, which consists of a React/Vite frontend and a Node.js/Express backend.

## 1. Backend Deployment (Node.js + Express)

The backend is responsible for handling contact form submissions, sending emails, and storing data in Google Sheets. It can be deployed to platforms like Render, Heroku, Railway, or a standard VPS.

### Prerequisites
- Node.js (v18+)
- Environment variables configured

### Environment Variables Required
Ensure the following variables are set in your deployment environment:
- `PORT` (Optional, defaults to 5000 or the platform's port)
- `EMAIL_USER`: Gmail address for sending emails
- `EMAIL_PASS`: Gmail App Password
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email for Google Sheets
- `GOOGLE_PRIVATE_KEY`: Private key for the service account
- `GOOGLE_SHEET_ID`: ID of the Google Sheet

### Steps (General)
1. Push your backend code to a GitHub repository.
2. Connect the repository to your chosen hosting platform (e.g., Render Web Service).
3. Set the **Build Command** to `npm install`.
4. Set the **Start Command** to `npm start` (which runs `node server.js`).
5. Add all the required Environment Variables in the platform's dashboard.
6. Deploy the application and note the backend live URL.

---

## 2. Frontend Deployment (React + Vite)

The frontend can be easily deployed as a static site on platforms like Vercel, Netlify, or Cloudflare Pages.

### Prerequisites
- Node.js (v18+)
- Backend API URL (to point the frontend to the deployed backend)

### Configuration
1. In your frontend code, ensure that the API requests (e.g., using Axios) point to your **live backend URL** instead of `http://localhost:5000`. You can set this up using a `.env` file in the frontend with `VITE_API_URL` and using it in your code.

### Steps (e.g., using Vercel or Netlify)
1. Push your frontend code to a GitHub repository.
2. Log in to Vercel/Netlify and "Add New Project" from your GitHub repository.
3. The platform should automatically detect that it's a Vite project.
4. Set the following:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add any required environment variables (e.g., `VITE_API_URL=https://your-backend-url.com`).
6. Deploy the application.

## 3. Post-Deployment Checks
- **Test the Contact Form**: Submit a test message on the live frontend URL.
- **Verify Email**: Check if the email was received by `EMAIL_USER`.
- **Verify Google Sheets**: Check if the submission was added to the designated Google Sheet.
