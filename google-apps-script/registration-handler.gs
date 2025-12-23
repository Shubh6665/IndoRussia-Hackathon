/**
 * Google Apps Script for Indo-Russia Hackathon Registration Form
 * 
 * Instructions to deploy:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save and deploy as a web app
 * 5. Set permissions to "Anyone" and execution as "Me"
 * 6. Copy the web app URL to your Next.js environment variables as GOOGLE_SCRIPT_URL
 * 
 * Make sure to:
 * - Create a Google Sheet and replace SHEET_ID with your sheet ID
 * - The sheet ID is found in the URL: docs.google.com/spreadsheets/d/{SHEET_ID}/edit
 */

// Replace this with your actual Google Sheet ID
const SHEET_ID = '1AC3XxDrz0OuiFJxZrbxp1cLtDfqj8AEWchV5yLZQJX0';
const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    // Parse the JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Invalid JSON data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Open the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Prepare the row data based on form structure
    const rowData = [
      data.timestamp || new Date().toISOString(),
      
      // Section 1: Personal Information
      data.fullName || '',
      data.email || '',
      sanitizePhoneNumber(data.phone),
      sanitizePhoneNumber(data.whatsapp),
      data.whatsappSameAsPhone ? 'Yes' : 'No',
      data.gender || '',
      
      // Section 2: Academic Information
      data.university || '',
      data.degree || '',
      data.graduationYear || '',
      data.rollId || '',
      data.collegeIdUrl || '',
      data.resumeUrl || '',
      data.linkedin || '',
      data.github || '',
      data.portfolio || '',
      
      // Section 3: Team Information
      data.participationMode || '',
      data.teamName || '',
      data.teamSize || '',
      (data.teamMemberEmails || []).join(', '),
      
      // Section 4: Technical Information
      data.preferredTrack || '',
      data.primarySkill || '',
      (data.techStack || []).join(', '),
      data.hasIdea !== null ? (data.hasIdea ? 'Yes' : 'No') : '',
      
      // Section 5: Event Information
      data.attendanceMode || '',
      data.city || '',
      data.dietary || '',
      data.needsAccommodation !== null ? (data.needsAccommodation ? 'Yes' : 'No') : '',
      
      // Section 6: Agreements
      data.agreeTerms ? 'Yes' : 'No',
      data.agreeConduct ? 'Yes' : 'No',
      data.consentResumeShare ? 'Yes' : 'No',
      data.captcha ? 'Yes' : 'No'
    ];

    // Add the data to the sheet
    const lastRow = sheet.getLastRow();
    const targetRow = lastRow + 1;
    const range = sheet.getRange(targetRow, 1, 1, rowData.length);
    
    // CRITICAL: Set number format to plain text BEFORE setting values to prevent formula parsing errors
    // This ensures that values like "+91 929292" are treated as text, not formulas
    range.setNumberFormat('@');
    
    // Now set the values - they will be interpreted as plain text due to the format above
    range.setValues([rowData]);
    
    // Generate a unique ID for this registration
    const registrationId = 'IRH-' + Date.now();
    
    // Log successful submission
    console.log('Registration submitted successfully:', registrationId);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        id: registrationId,
        message: 'Registration submitted successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error processing registration:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: 'Failed to process registration: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sanitize phone numbers to prevent formula parsing errors in Google Sheets
 * Prepends an apostrophe which tells Sheets to treat it as text (apostrophe won't be displayed)
 */
function sanitizePhoneNumber(phoneNumber) {
  if (!phoneNumber || phoneNumber === '') {
    return '';
  }
  // Prepend apostrophe to force Google Sheets to treat this as text
  return "'" + phoneNumber;
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = [
      'Timestamp',
      
      // Section 1: Personal Information
      'Full Name',
      'Email',
      'Phone',
      'WhatsApp',
      'WhatsApp Same as Phone',
      'Gender',
      
      // Section 2: Academic Information
      'University',
      'Degree',
      'Graduation Year',
      'Roll/Student ID',
      'College ID URL',
      'Resume URL',
      'LinkedIn',
      'GitHub',
      'Portfolio',
      
      // Section 3: Team Information
      'Participation Mode',
      'Team Name',
      'Team Size',
      'Team Member Emails',
      
      // Section 4: Technical Information
      'Preferred Track',
      'Primary Skill',
      'Tech Stack',
      'Has Idea',
      
      // Section 5: Event Information
      'Attendance Mode',
      'City',
      'Dietary Preference',
      'Needs Accommodation',
      
      // Section 6: Agreements
      'Agree Terms',
      'Agree Conduct',
      'Consent Resume Share',
      'Captcha Verified'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    
    // Freeze the header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
  }
  
  return sheet;
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      error: 'GET method not supported. Use POST to submit registration data.' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the setup
 * Run this function in the Apps Script editor to test your configuration
 */
function testSetup() {
  try {
    const sheet = getOrCreateSheet();
    console.log('Sheet setup successful. Sheet name:', sheet.getName());
    console.log('Headers row count:', sheet.getLastRow());
    return 'Setup test passed';
  } catch (error) {
    console.error('Setup test failed:', error);
    return 'Setup test failed: ' + error.toString();
  }
}