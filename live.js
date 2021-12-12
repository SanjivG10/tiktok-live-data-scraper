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

    const usernameFromComment = commentingPeopleData[username]["comment"];

    const refactoredUsernameFromComment = usernameFromComment.substring(1);

    if (commentingPeopleData[username]?.opened) {
      return;
    }

    commentingPeopleData[username] = {
      ...commentingPeopleData[username],
      opened: true,
    };

    const possibleProfileUrl = `https://tiktok.com/@${refactoredUsernameFromComment}`;
    openInNewTab(possibleProfileUrl);
  }, 1000 * 10);
}
