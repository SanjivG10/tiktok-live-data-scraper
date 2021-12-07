let firstTimeDataCollected = new Date().getTime();
let scrappedUserDetails = {};
let userDataFromScrappedDetailsToShow = {};

$(document).ready(() => {
  const url = window.location.href;

  if (isProfileUrl(url)) {
    const username = getUsernameFromUrl(url);
    scrapUserDetails(username);
  } else if (isLiveUrl(url)) {
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
});
