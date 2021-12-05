let username = null;
let commentingPeopleDataUsernames = null;
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

  const usernameFromComment = scrappedUserDetails[username].comment;

  // for testing purpose
  if (usernameFromComment === "tiktokgamebot") {
    possibleProfileUrl = `https://tiktok.com/@${usernameFromComment}`;
    openInNewTab(possibleProfileUrl);
  }
}, 1000 * 60 * 2); // every 2 minutes
