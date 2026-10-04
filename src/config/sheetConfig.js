// Google Sheets Integration Configuration
// 
// Instructions:
// 1. Create a Google Sheet and deploy an Apps Script web app (see GOOGLE_SHEETS_SETUP.md for full guide)
// 2. Paste your Web App URL into .env as:
//    VITE_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
// 3. Or paste it directly below as the fallback string.

export const GOOGLE_SHEETS_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_URL || '';
