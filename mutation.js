let commentingPeopleData = {};
let giftingPeopleData = {};

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

        let comment = node.find("span.content").text();

        if (!/^[a-z0-9_.]+$/i.test(comment)) {
          return;
        }

        if (comment.charAt(0) === "@") {
          comment = comment.substring(1);
        }

        if (commentingPeopleData[actualUsername]) {
          commentingPeopleData[actualUsername].totalComments += 1;
          commentingPeopleData[actualUsername].comment = comment;
        } else {
          commentingPeopleData[actualUsername] = {
            totalComments: 1,
            image: userImgNode.attr("src"),
            comment,
          };
        }
      }

      // const className = node.attr("class");
      // if (className?.includes("send-gift-count")) {
      //   const parentNode = node.parent().parent();
      //   const gifterName = parentNode
      //     .find(".send-gift-bar-content-nickname")
      //     .text();
      //   let giftName = parentNode.find(".send-gift-bar-content-desc").text();
      //   giftName = giftName.replace("sent", "");
      //   const giftCount = parseInt(node.text().replace("x", ""));
      //   const gifterImg = parentNode.find("img").attr("src");

      //   if (giftingPeopleData[gifterName]) {
      //     let prevGifts = giftingPeopleData[gifterName]["gifts"];
      //     if (prevGifts) {
      //       const doesThisGiftExist = prevGifts.find(
      //         (gift) => gift["name"] === giftName
      //       );
      //       if (!doesThisGiftExist) {
      //         prevGifts.push({
      //           name: giftName,
      //           count: giftCount,
      //         });
      //       }

      //       const newGifts = prevGifts.map((gift) => {
      //         if (gift["name"] === giftName) {
      //           let newCount = 0;
      //           if (giftCount > gift["count"]) {
      //             newCount = giftCount;
      //           } else {
      //             newCount = giftCount + gift["count"];
      //           }

      //           return {
      //             name: giftName,
      //             count: newCount,
      //           };
      //         }
      //         return gift;
      //       });

      //       giftingPeopleData[gifterName]["gifts"] = newGifts;
      //     } else {
      //       giftingPeopleData[gifterName]["gifts"] = [
      //         { name: giftName, count: giftCount },
      //       ];
      //     }
      //   } else {
      //     giftingPeopleData[gifterName] = {
      //       gifts: [
      //         {
      //           name: giftName,
      //           count: giftCount,
      //         },
      //       ],
      //       img: gifterImg,
      //     };
      //   }
      // }
    }
  }
});
