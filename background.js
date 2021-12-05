const getTotalTabsCount = async () => {
  const tabs = await chrome.tabs.query({ windowType: "normal" });
  return tabs.length;
};

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "OPEN_NEW_TAB") {
    chrome.tabs.create({
      url: message.url,
      active: false,
    });
  }
});
