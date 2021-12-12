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

  const allTabs = await chrome.tabs.query({ currentWindow: true });
  const myTab = allTabs.find((tab) => tab.title === "Tiktok Game");
  return myTab ?? tab;
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
        const getImg = (img, index) => {
          return `<span style= --i:${index}>
              <img src=${img} alt="" />
            </span>`;
        };

        let username = args.username.replace("/@", "");
        const mainGifterImg = document.querySelector("img.main-gifter");
        const mainGifterName = document.querySelector("div.gifter-name");
        mainGifterImg.src = args.data.img;
        mainGifterName.innerHTML = username;

        const imgOptions = args.data.videos;

        document.querySelector(".slider").innerHTML = "";

        const allImages = imgOptions.map((video) =>
          video.image.replace(/^"|"$/g, "")
        );

        let htmlString = ``;
        allImages.forEach((img, index) => {
          htmlString += getImg(img, index + 1) + "\n";
        });

        document.querySelector(".slider").innerHTML = htmlString;
      },
    });
  }
});
