let giftStore = {};

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

      //       if (node.find(".send-gift-bar").length) {
      //       }

      const className = node.attr("class");
      if (className?.includes("send-gift-count")) {
        const parentNode = node.parent().parent();
        const gifterName = parentNode
          .find(".send-gift-bar-content-nickname")
          .text();
        let giftName = parentNode.find(".send-gift-bar-content-desc").text();
        giftName = giftName.replace("sent", "");
        const giftCount = node.text().replace("x", "");
      }

      //       if (node.attr("class")?.includes("gift")) {
      //         console.log(addedNode);
      //       }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
