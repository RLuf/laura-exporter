// Copyright 2025 Roger Luft
// Licensed under the Apache License, Version 2.0
// See LICENSE file in the project root for full license information.

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("save");

  btn.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText
    }, (results) => {
      const text = results[0].result;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const filename = `conversa_gpt_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;

      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      });
    });
  });
});
