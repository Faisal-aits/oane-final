require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Microsoft Graph + MSAL
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');

// node-fetch polyfill required by the Graph client in Node
require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ── MSAL (Auth) Configuration ─────────────────────────────────
const msalConfig = {
    auth: {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
    },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// Get an access token using Client Credentials flow (no user login needed)
async function getAccessToken() {
    const result = await msalClient.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
    });
    return result.accessToken;
}

// Build an authenticated Graph client
async function getGraphClient() {
    const token = await getAccessToken();
    return Client.init({
        authProvider: (done) => done(null, token),
    });
}

// ── /api/contact ──────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
    const { name, email, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const client = await getGraphClient();

        // ── 1. Send email via Outlook ──────────────────────────
        const mailPayload = {
            message: {
                subject: `New Contact Form Submission from ${name}`,
                body: {
                    contentType: 'HTML',
                    content: `
                        <h2 style="font-family:sans-serif;color:#DE3B2B;">New Enquiry — ONAÈ Website</h2>
                        <table style="font-family:sans-serif;border-collapse:collapse;width:100%">
                            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
                            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
                            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Project Type</td><td style="padding:8px;border:1px solid #ddd;">${projectType}</td></tr>
                            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${message}</td></tr>
                            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Date</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleString()}</td></tr>
                        </table>
                    `,
                },
                toRecipients: [
                    { emailAddress: { address: process.env.MICROSOFT_SENDER_EMAIL } },
                ],
                replyTo: [
                    { emailAddress: { address: email, name } },
                ],
            },
            saveToSentItems: true,
        };

        await client
            .api(`/users/${process.env.MICROSOFT_SENDER_EMAIL}/sendMail`)
            .post(mailPayload);

        console.log('✅ Email sent via Outlook');

        // ── 2. Append row to Excel on OneDrive ─────────────────
        if (
            process.env.MICROSOFT_EXCEL_USER_ID &&
            process.env.MICROSOFT_EXCEL_FILE_PATH
        ) {
            try {
                // Find the file by path on the user's OneDrive
                const fileInfo = await client
                    .api(`/users/${process.env.MICROSOFT_EXCEL_USER_ID}/drive/root:/${process.env.MICROSOFT_EXCEL_FILE_PATH}`)
                    .get();

                const driveId  = fileInfo.parentReference.driveId;
                const fileId   = fileInfo.id;

                // Add a new row to the used range (appends below last row)
                await client
                    .api(`/drives/${driveId}/items/${fileId}/workbook/tables/Table1/rows/add`)
                    .post({
                        values: [[name, email, projectType, message, new Date().toLocaleString()]],
                    });

                console.log('✅ Row added to Excel');
            } catch (excelErr) {
                // Don't fail the whole request if Excel write fails
                console.error('⚠️  Excel write failed (non-critical):', excelErr.message);
            }
        }

        res.status(200).json({ success: 'Message sent successfully' });

    } catch (error) {
        console.error('❌ Error handling contact form:', error.message || error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
