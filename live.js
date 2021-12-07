let username = null;
let commentingPeopleDataUsernames = null;
if (isLiveUrl(window.location.href)) {
  setInterval(() => {
    commentingPeopleDataUsernames = Object.keys(commentingPeopleData);
    const randomIndex = getRandomNumber(commentingPeopleDataUsernames.length);

    username = commentingPeopleDataUsernames[randomIndex];

    if (!username) {
      return;
    }

    if (scrappedUserDetails[username]) {
      return;
    }

    const usernameFromComment = commentingPeopleData[username]["comment"];

    // for testing purpose
    const possibleProfileUrl = `https://tiktok.com/@sun_dhi_yaa`;
    openInNewTab(possibleProfileUrl);
  }, 1000 * 10);
}
