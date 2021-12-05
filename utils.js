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
    return window.location.pathname;
  }
  return window.location.href.split("/")[3];
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function showTimeAfterThisMinute(givenMinute) {
  const TIKTOKGAME_TIMER_NAME = "tiktokgame-timer";
  let interval = null;

  if (interval) {
    clearInterval(interval);
    document.getElementById(TIKTOKGAME_TIMER_NAME).innerHTML = "";
  }

  interval = setInterval(() => {
    const now = new Date().getTime();
    const laterDate = new Date(now + givenMinute * 60 * 1000);

    const distance = laterDate - now;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(TIKTOKGAME_TIMER_NAME).innerHTML =
      hours + "h " + minutes + "m " + seconds + "s";

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById(TIKTOKGAME_TIMER_NAME).innerHTML =
        "WAITING FOR NEXT ...";
    }
  }, 1000);
}

function showUserDetails(userInfo) {
  // reset the timer  (Next shoutout in 2 minutes vanera)
  showTimeAfterThisMinute(2);
  if (userInfo.videos && userInfo.img && userInfo.username) {
    $("img.main-gifter").attr("src", userInfo.img);
    $(".gifter-name").html(userInfo.username);

    $("img.each-tiktok-embed-image").forEach((img, index) => {
      img.attr("src", userInfo.videos[index].img);
    });
  }
  // replace the main photo, username, 4 video thumbnails
}
