// Popup script to handle user interactions

document.addEventListener('DOMContentLoaded', function() {
  const convertBtn = document.getElementById('convertBtn');
  const copyBtn = document.getElementById('copyBtn');
  const output = document.getElementById('output');
  const status = document.getElementById('status');

  convertBtn.addEventListener('click', async function() {
    status.textContent = 'Converting...';
    
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        status.textContent = 'Error: No active tab found';
        return;
      }

      // Inject content script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });

      // Wait a moment for the script to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      // Send message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'getSelection' }, function(response) {
        if (chrome.runtime.lastError) {
          status.textContent = 'Error: ' + chrome.runtime.lastError.message;
          return;
        }

        if (response && response.markdown) {
          output.value = response.markdown;
          copyBtn.disabled = false;
          status.textContent = 'Conversion complete!';
        } else {
          output.value = '';
          copyBtn.disabled = true;
          status.textContent = 'No text selected. Please select some text first.';
        }
      });
    } catch (error) {
      status.textContent = 'Error: ' + error.message;
    }
  });

  copyBtn.addEventListener('click', function() {
    if (output.value) {
      output.select();
      navigator.clipboard.writeText(output.value).then(function() {
        status.textContent = 'Copied to clipboard!';
        setTimeout(function() {
          status.textContent = '';
        }, 2000);
      }).catch(function(err) {
        status.textContent = 'Failed to copy: ' + err;
      });
    }
  });
});