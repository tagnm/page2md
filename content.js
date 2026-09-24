// Content script to handle text selection and convert to markdown
import TurndownService from 'turndown';

// Initialize turndown service
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

function cleanHtml(html) {
  // Create a temporary div to parse and clean the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Normalize tags - convert b to strong, i to em
  let normalized = tempDiv.innerHTML;
  normalized = normalized.replace(/<b\b[^>]*>/gi, '<strong>');
  normalized = normalized.replace(/<\/b>/gi, '</strong>');
  normalized = normalized.replace(/<i\b[^>]*>/gi, '<em>');
  normalized = normalized.replace(/<\/i>/gi, '</em>');

  // Remove nested duplicate tags
  normalized = normalized.replace(/(<strong>\s*)+<strong>/gi, '<strong>');
  normalized = normalized.replace(/(<\/strong>\s*)+<\/strong>/gi, '</strong>');
  normalized = normalized.replace(/(<em>\s*)+<em>/gi, '<em>');
  normalized = normalized.replace(/(<\/em>\s*)+<\/em>/gi, '</em>');

  return normalized;
}

function cleanMarkdown(markdown) {
  // Clean up double asterisks that may have been created
  let cleaned = markdown.replace(/\*\*\*\*/g, '**');
  cleaned = cleaned.replace(/\*\*/g, '**'); // Ensure consistent double asterisks
  
  // Clean up other common issues
  cleaned = cleaned.replace(/\*\*\*\*\*\*/g, '***'); // Handle triple asterisks
  cleaned = cleaned.replace(/\*\*\*\*/g, '**'); // Handle quadruple asterisks
  
  return cleaned;
}

function htmlToMarkdown(html) {
  const cleanedHtml = cleanHtml(html);
  const markdown = turndownService.turndown(cleanedHtml);
  return cleanMarkdown(markdown);
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelection') {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const div = document.createElement('div');
      div.appendChild(range.cloneContents());
      const html = div.innerHTML;
      const markdown = htmlToMarkdown(html);
      sendResponse({ markdown: markdown });
    } else {
      sendResponse({ markdown: '' });
    }
  }
  return true; // Keep message channel open for async response
});