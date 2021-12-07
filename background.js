const getTotalTabsCount = async () => {
  const tabs = await chrome.tabs.query({ windowType: "normal" });
  return tabs.length;
};

async function getCurrentTab() {
  let queryOptions = {
    currentWindow: true,
    active: true,
  };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(async function (message) {
  if (message.type === "OPEN_NEW_TAB") {
    chrome.tabs.create({
      url: message.url,
      active: false,
    });
  }
});

chrome.storage.onChanged.addListener(async (changes) => {
  const tab = await getCurrentTab();
  console.log(tab, " is the title ");
  // chrome.scripting.executeScript({
  //   files: ["./domChanger.js"],
  //   target: { tabId: tab.id },
  // });
});
