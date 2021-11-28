let observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      const node = $(addedNode);
      if (node.find(".chat-message-item").length) {
        const username = node
          .find(".webcast-chatroom__profile_wrapper .nickname")
          .text();
        const msg = node.find(".content").text();
        // console.log(username, msg);
      }

      if (node.find(".send-gift-bar").length) {
        const gifterName = node.find(".send-gift-bar-content-nickname").text();
        const giftName = node.find(".send-gift-bar-content-desc").text();
        console.log(gifterName, giftName);
      }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
