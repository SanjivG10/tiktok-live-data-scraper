let firstTimeDataCollected = new Date().getTime();
let scrappedUserDetails = {};
let userDataFromScrappedDetailsToShow = {};
let possibleProfileUrl = "";

$(document).ready(() => {
  const url = window.location.href;

  if (isProfileUrl(possibleProfileUrl)) {
    const username = getUsernameFromUrl(possibleProfileUrl);

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

      scrappedUserDetails[username] = { videos: videoData, img: userImage };

      showUserDetails({
        username,
        ...scrappedUserDetails[username],
      });

      window.close();
    }, 1000 * 10); // after 10 seconds we scrap the data
  } else if (isLiveUrl(url)) {
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
});
