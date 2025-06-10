/**
 * EMAILJS CONFIGURATION
 * -----------------------
 *
 * To use EmailJS and send emails directly from your frontend application without a backend:
 *
 * 1. Sign up at EmailJS: https://www.emailjs.com/
 * 2. Create a service (connect your Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your credentials and replace them below
 *
 * Variables you can use in your template:
 * - {{to_email}} - Recipient's email
 * - {{to_name}} - Recipient's name
 * - {{subject}} - Email subject
 * - {{name}} - Sender's name
 * - {{time}} - Message time
 * - {{message}} - Email body (plain text)
 * - {{html_content}} - Email body (HTML) - IMPORTANT: Must be inserted using {{{html_content}}} (triple braces) to be rendered as HTML
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_abc123", // Replace with your Service ID
  TEMPLATE_ID: "template_xyz789", // Replace with your Template ID
  PUBLIC_KEY: "YOUR_PUBLIC_KEY_HERE", // Replace with your Public Key

  // If you are in development, you can set this to true to avoid sending real emails
  // Remember to change it to false in production
  IS_DEV_MODE: false
};
