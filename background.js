chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "color-picker",
        title: "Show color picker",
        contexts: ["all"],
    });
})

chrome.contextMenus.onClicked.addListener(async (_, tab) => {
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["script.js"],
    })
})