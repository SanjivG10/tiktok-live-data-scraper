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
  } else if (message.type === "EXECUTE_SCRIPT") {
    const tab = await getCurrentTab();
    const { data } = message;

    chrome.scripting.executeScript({
      args: [data],
      target: {
        tabId: tab.id,
      },
      func: (args) => {
        let username = args.username.replace("/@", "");
        const mainGifterImg = document.querySelector("img.main-gifter");
        const mainGifterName = document.querySelector("div.gifter-name");
        mainGifterImg.src = args.data.img;
        mainGifterName.innerHTML = username;

        for (let i = 0; i < args.data.videos.length; i++) {
          const video = args.data.videos[i];
          const videoImageUrl = (video.image = video.image.replace(
            /^"|"$/g,
            ""
          ));
          const allPresentImages = document.querySelectorAll(
            "img.each-tiktok-embed-image"
          );
          const imageComponent = allPresentImages?.[i];
          if (imageComponent) {
            imageComponent.src = videoImageUrl;
          }
        }
      },
    });
    console.log(tab, message.data);
  }
});
