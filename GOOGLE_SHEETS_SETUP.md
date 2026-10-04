# 📊 Google Sheets Setup Guide for "LET'S TALK" Form

This guide walks you step-by-step through connecting the **LET'S TALK** inquiry form on your Grovix website to your personal or organization's **Google Sheet**.

---

## ⚡ Quick 2-Minute Setup

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Name your spreadsheet (e.g., `Grovix - Client Inquiries`).
3. *(Optional)* Name the bottom sheet tab `Inquiries` or leave it as `Sheet1`.

---

### Step 2: Open Apps Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any default code inside the editor window (`function myFunction() { ... }`).
3. Copy and paste the following code into the editor:

```javascript
/**
 * Grovix "LET'S TALK" Form Integration
 * Automatically receives leads and records them into Google Sheets
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent writes

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create polished headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Name / Company",
        "Email / Phone",
        "Primary Interest",
        "Bottleneck Details",
        "Source"
      ];
      sheet.appendRow(headers);
      
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#2F4FD2");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming data (supports JSON or Form url-encoded)
    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }
    
    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var topic = data.topic || "Business Automation";
    var message = data.message || "-";
    var source = data.source || "Grovix Website";
    
    // Append the inquiry as a new row
    sheet.appendRow([timestamp, name, email, topic, message, source]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Inquiry saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}
```

---

### Step 3: Deploy as Web App
1. In the top-right corner of the Apps Script page, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Grovix Inquiry Webhook`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(⚠️ IMPORTANT: Must be set to "Anyone" so visitors on your website can submit without logging into Google!)*
4. Click **Deploy**.
5. When prompted to **Authorize access**:
   - Select your Google account.
   - If Google shows *"Google hasn't verified this app"*, click **Advanced** at the bottom left.
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Google will provide a **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).
7. **Copy this URL**.

---

### Step 4: Add the URL to Grovix
You have two easy ways to paste your URL:

#### Option A: In `.env` (Recommended)
Open `landing-page/.env` and paste your URL:
```env
VITE_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```
*(If you are running the local Vite server, restart it with `npm run dev` to pick up changes in `.env`)*

#### Option B: In `src/config/sheetConfig.js`
Open `landing-page/src/config/sheetConfig.js` and paste it as the fallback:
```javascript
export const GOOGLE_SHEETS_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

---

### Step 5: Test Your Form!
1. Start your dev server: `npm run dev`
2. Click any **"Let's Talk"** button on the website.
3. Fill in the form and click **"Send to Engineering"**.
4. Check your Google Sheet — the new row with timestamp, name, email, interest, and details will appear instantly! 🎉
