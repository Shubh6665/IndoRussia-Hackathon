# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets integration for the Indo-Russia Hackathon registration form.

## Prerequisites

- A Google account
- Access to Google Sheets and Google Apps Script
- Admin access to your Next.js project

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Indo-Russia Hackathon Registrations" (or any name you prefer)
4. Copy the sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1abc123def456ghi789jkl0mn/edit`
   - Sheet ID: `1abc123def456ghi789jkl0mn`

## Step 2: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default `Code.gs` content with the code from `google-apps-script/registration-handler.gs`
4. Update the `SHEET_ID` variable at the top of the script with your actual Google Sheet ID
5. Save the project (Ctrl+S or Cmd+S)
6. Name your project "IRH Registration Handler"

## Step 3: Deploy the Apps Script as a Web App

1. In the Apps Script editor, click "Deploy" → "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Fill in the deployment configuration:
   - **Description**: "IRH Registration Form Handler"
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click "Deploy"
5. Review and authorize the permissions when prompted
6. Copy the Web App URL (it should look like: `https://script.google.com/macros/s/.../exec`)

## Step 4: Test the Google Apps Script

1. In the Apps Script editor, select the `testSetup` function from the dropdown
2. Click the "Run" button (▶️)
3. Check the execution log to ensure it says "Setup test passed"
4. Check your Google Sheet - it should now have headers in the first row

## Step 5: Configure Your Next.js Environment

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following environment variable:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with the actual URL you copied from step 3.6

## Step 6: Test the Integration

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```
2. Navigate to the registration page
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet to see if the data appears

## Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Make sure the `GOOGLE_SCRIPT_URL` environment variable is set correctly
   - Restart your Next.js server after adding the environment variable

2. **"Failed to submit registration"**
   - Check that your Google Apps Script is deployed as a web app
   - Verify the web app URL is correct
   - Make sure the script has proper permissions

3. **Data not appearing in Google Sheets**
   - Check the Google Apps Script execution logs for errors
   - Verify the `SHEET_ID` in your script matches your actual sheet
   - Run the `testSetup` function to verify the sheet setup

### Checking Google Apps Script Logs

1. Go to your Apps Script project
2. Click on "Executions" in the left sidebar
3. Look for any failed executions and click on them to see error details

## Data Structure

The form data will be saved to Google Sheets with the following columns:

- Timestamp
- Personal Information (Name, Email, Phone, etc.)
- Academic Information (University, Degree, etc.)
- Team Information (if applicable)
- Technical Information (Track, Skills, etc.)
- Event Information (Attendance mode, Dietary preferences, etc.)
- Agreements and Consent

## Security Notes

- The Google Apps Script handles form data processing server-side
- Form data is validated both client-side and server-side
- The Google Sheet is only accessible to the account that created it
- Consider adding additional access controls if multiple people need to view the data

## Support

If you encounter any issues during setup:

1. Check the troubleshooting section above
2. Verify all steps have been completed correctly
3. Check the browser console and Network tab for error messages
4. Review the Google Apps Script execution logs

For development questions, refer to:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)