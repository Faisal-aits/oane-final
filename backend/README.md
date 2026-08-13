# Microsoft Integration Setup Guide

This guide explains how to get all the credentials needed to power the ONAÈ contact form using **Microsoft Outlook** (for emails) and **Microsoft Excel on OneDrive** (as a database).

---

## Prerequisites

You need one of the following:
- A **Microsoft 365 business account** (provided by your client), OR
- A **free Microsoft 365 Developer Sandbox** (for testing — see Step 0 below)

---

## Step 0 — Get a Free Developer Account (For Testing Only)

> Skip this step if you already have a Microsoft 365 account.

1. Go to **https://developer.microsoft.com/en-us/microsoft-365/dev-program**
2. Click **"Join now"** and sign in with any Microsoft account.
3. Click **"Set up E5 subscription"**.
4. Choose an admin username, e.g. `admin@yourcompany.onmicrosoft.com`
5. Save your password — you will need it throughout this guide.

Your free sandbox is now ready. It includes Outlook, Excel, OneDrive, and Azure — all for free.

---

## Step 1 — Register an App in Azure

This creates the "identity" your backend server uses to talk to Microsoft.

1. Go to **https://portal.azure.com**
2. Sign in with your Microsoft 365 admin account.
3. In the top search bar, type **App registrations** and click it.
4. Click **"+ New registration"**.
5. Fill in the form:
   - **Name:** `ONAÈ Website`
   - **Supported account types:** Select `Accounts in any organizational directory and personal Microsoft accounts`
   - **Redirect URI:** Leave blank
6. Click **"Register"**.

You will be taken to your new app's overview page.

---

## Step 2 — Get `MICROSOFT_CLIENT_ID` and `MICROSOFT_TENANT_ID`

On the app overview page you will see:

```
Application (client) ID:   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  ← MICROSOFT_CLIENT_ID
Directory (tenant) ID:     xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  ← MICROSOFT_TENANT_ID
```

Copy both values and paste them into your `.env` file.

---

## Step 3 — Get `MICROSOFT_CLIENT_SECRET`

1. In the left sidebar of your app, click **"Certificates & secrets"**.
2. Under **"Client secrets"**, click **"+ New client secret"**.
3. Set a description, e.g. `onae-backend-secret`.
4. Set expiry to **24 months** (recommended).
5. Click **"Add"**.

> ⚠️ **IMPORTANT:** The secret **Value** is shown only once. Copy it immediately.

```
Value:   your~secret~value~here   ← MICROSOFT_CLIENT_SECRET
```

> Do NOT copy the "Secret ID" — you need the "Value" column.

---

## Step 4 — Grant API Permissions

This tells Microsoft what your app is allowed to do.

1. In the left sidebar, click **"API permissions"**.
2. Click **"+ Add a permission"**.
3. Select **"Microsoft Graph"**.
4. Select **"Application permissions"** (not Delegated).
5. Search for and check these two permissions:
   - ✅ `Mail.Send`
   - ✅ `Files.ReadWrite.All`
6. Click **"Add permissions"**.
7. Click the blue button **"Grant admin consent for [your org]"**.
8. Confirm by clicking **"Yes"**.

Both permissions should now show a green ✅ **Granted** status.

---

## Step 5 — Get `MICROSOFT_SENDER_EMAIL` and `MICROSOFT_EXCEL_USER_ID`

These are simply **the email address** of the Microsoft 365 account that owns the Outlook inbox and the OneDrive where your Excel file will live.

```
MICROSOFT_SENDER_EMAIL=admin@yourcompany.onmicrosoft.com
MICROSOFT_EXCEL_USER_ID=admin@yourcompany.onmicrosoft.com
```

> Both values are usually the same email address.

---

## Step 6 — Create the Excel File and Get `MICROSOFT_EXCEL_FILE_PATH`

1. Go to **https://onedrive.live.com** and sign in with your Microsoft 365 account.
2. Click **"+ New"** → **"Excel workbook"**.
3. Rename the file to: **`ONAÈ Contacts`**
4. In **Sheet1**, type these headers in Row 1:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Name | Email | Project Type | Message | Date |

5. Select cells **A1 to E1** (the headers).
6. Go to **Insert** → **Table** → check "My table has headers" → click **OK**.
7. In the Table Design tab (appears after creating the table), rename the table from `Table1` to exactly **`Table1`** (leave it as is).

The file path in `.env` is the file name **relative to the root of OneDrive**:

```
MICROSOFT_EXCEL_FILE_PATH=ONAÈ Contacts.xlsx
```

> If you put the file inside a folder, e.g. a folder called `CRM`, use:
> ```
> MICROSOFT_EXCEL_FILE_PATH=CRM/ONAÈ Contacts.xlsx
> ```

---

## Final `.env` File

Open `backend/.env` and fill in all 6 values:

```env
PORT=5000

# Azure App Registration
MICROSOFT_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MICROSOFT_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MICROSOFT_CLIENT_SECRET=your~secret~value~here

# Outlook Email
MICROSOFT_SENDER_EMAIL=admin@yourcompany.onmicrosoft.com

# Excel on OneDrive
MICROSOFT_EXCEL_USER_ID=admin@yourcompany.onmicrosoft.com
MICROSOFT_EXCEL_FILE_PATH=ONAÈ Contacts.xlsx
```

---

## Testing

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Submit the contact form on the website.

3. Check your Outlook inbox — you should receive a formatted email.

4. Open the Excel file on OneDrive — a new row should appear with the submission details.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `401 Unauthorized` | Client ID, Tenant ID, or Secret is wrong. Double-check `.env`. |
| `403 Forbidden` | Admin consent was not granted. Repeat Step 4 and click "Grant admin consent". |
| Excel write fails but email works | Make sure the table is named exactly `Table1` and the file path in `.env` is correct. |
| `Cannot find file` error | The `MICROSOFT_EXCEL_FILE_PATH` is wrong. Check the exact file name on OneDrive including the `.xlsx` extension. |
