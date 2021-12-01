const openNewTab = (username) => {
  const TIKTOK_PROFILE_URL = `https://www.tiktok.com/@${username}`;

  chrome.runtime.sendMessage({
    type: "OPEN_NEW_TAB",
    url: TIKTOK_PROFILE_URL,
  });
};
