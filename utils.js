function sleep(time, node = null) {
  return new Promise((resolve) => {
    const res_fn = resolve(node);
    return setTimeout(res_fn, time);
  });
}

function isLiveUrl(url) {
  return url.split("/").length === 5;
}

function isProfileUrl(url) {
  const urlSplit = url.split("/");
  return urlSplit.length === 4 && urlSplit[urlSplit.length - 1].includes("@");
}

function openInNewTab(url) {
  chrome.runtime.sendMessage({
    type: "OPEN_NEW_TAB",
    url,
  });
}

function getUsernameFromUrl(url) {
  if (isProfileUrl(url)) {
    const pathname = window.location.pathname;
    return pathname.substring(pathname.indexOf("@") + 1);
  }
  return window.location.href.split("/")[3];
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function scrapUserDetails(username) {
  setTimeout(() => {
    const videoHrefs = $("a");
    const videoData = [];
    for (let i = 0; i < videoHrefs.length; i++) {
      const anchor = videoHrefs[i];
      const classOfAnchor = $(anchor).attr("class");
      if (classOfAnchor?.includes("video-feed-item-wrapper")) {
        const href = $(anchor).attr("href");
        const imageStyle = $(anchor).find("div.image-card")?.attr("style");
        const image = imageStyle?.substring(
          imageStyle.indexOf("(") + 1,
          imageStyle.lastIndexOf(")")
        );
        if (image) {
          videoData.push({
            image,
            video: href,
          });
        }
      }
    }

    const userImage = $(".share-info span.tiktok-avatar img")?.attr("src");

    if (videoData.length < 3 || !username) {
      window.close();
      return;
    }

    const data = { videos: videoData, img: userImage };

    scrappedUserDetails[username] = data;

    chrome.runtime.sendMessage({
      type: "EXECUTE_SCRIPT",
      data: { username, data },
    });

    window.close();
  }, 1000 * 10);
}
