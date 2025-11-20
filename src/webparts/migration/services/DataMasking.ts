/**
 * Utility functions for masking sensitive data
 */

/**
 * Mask the first 4 characters of an email address
 * Example: john.doe@example.com -> ****.doe@example.com
 */
export function maskEmail(email: string): string {
  if (!email || email.trim() === '') {
    return '';
  }

  const trimmed = email.trim();
  const atIndex = trimmed.indexOf('@');
  
  if (atIndex === -1 || atIndex <= 4) {
    // If @ is not found or within first 4 chars, mask first 4 chars
    return '****' + trimmed.substring(4);
  }

  // Mask first 4 characters before @
  return '****' + trimmed.substring(4);
}

/**
 * Mask the first 4 characters of a phone number
 * Example: +1-555-123-4567 -> ****-123-4567
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.trim() === '') {
    return '';
  }

  const trimmed = phone.trim();
  
  // Remove common separators for masking, then add them back
  const cleaned = trimmed.replace(/[\s\-().]/g, '');
  
  if (cleaned.length <= 4) {
    return '****';
  }

  // Mask first 4 digits, preserve formatting
  let masked = '****';
  let originalIndex = 4;
  
  // Preserve separators after the masked portion
  for (let i = 4; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (/[\s\-().]/.test(char)) {
      masked += char;
    } else {
      masked += trimmed[i];
      originalIndex++;
    }
  }

  return masked;
}

/**
 * Mask all emails in a comma-separated or newline-separated string
 */
export function maskAllEmails(emailsString: string): string {
  if (!emailsString || emailsString.trim() === '') {
    return '';
  }

  // Split by comma or newline
  const emails = emailsString
    .split(/[,\n]/)
    .map(e => e.trim())
    .filter(e => e.length > 0);

  return emails.map(maskEmail).join(', ');
}

/**
 * Mask all phone numbers in a comma-separated or newline-separated string
 */
export function maskAllPhones(phonesString: string): string {
  if (!phonesString || phonesString.trim() === '') {
    return '';
  }

  // Split by comma or newline
  const phones = phonesString
    .split(/[,\n]/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return phones.map(maskPhone).join(', ');
}

