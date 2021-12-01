let isDone = false;
const usernameNodesList = [];
let firstDate = new Date().getTime();

let usernameDone = {};
var totalTabCount = 0;

let usersClicked = {};

$(document).ready(() => {
  const url = window.location.href;
  const isProfileUrl = !isLiveUrl(url);
  const username = url.split("?")[0];
  if (isProfileUrl) {
    const followButton = $("button.follow-button");
    if (followButton.text() === "Follow") {
      if (usersClicked[username]) {
        return;
      }

      usersClicked[username] = 1;
      const randomNum = 10000 + Math.floor(Math.random() * 10000);
      setTimeout(() => {
        followButton.click();

        const randomNumSecond = 10000 + Math.floor(Math.random() * 20000);
        setTimeout(() => {
          window.close();
        }, randomNumSecond);
      }, randomNum);
    } else {
      window.close();
    }
  } else {
    let observer = new MutationObserver(async (mutations) => {
      for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
          const node = $(addedNode);
          if (node.find(".chat-message-item").length) {
            const userImgNode = node.find("img");
            const usernameNode = node.find(
              ".webcast-chatroom__profile_wrapper .nickname"
            );

            const actualUsername = usernameNode.text();
            openNewTab(actualUsername);
          }
          const className = node.attr("class");
          if (className?.includes("send-gift-count")) {
            const parentNode = node.parent().parent();
            const gifterName = parentNode
              .find(".send-gift-bar-content-nickname")
              .text();
            let giftName = parentNode
              .find(".send-gift-bar-content-desc")
              .text();
            giftName = giftName.replace("sent", "");
            const giftCount = node.text().replace("x", "");
            const gifterImg = parentNode.find("img").attr("src");
          }
        }
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
});
