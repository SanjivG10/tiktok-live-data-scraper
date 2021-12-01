let commentingPeopleData = {};
let giftingPeopleData = {};

let firstConsoledDate = new Date().getTime();

let observer = new MutationObserver(async (mutations) => {
  let secondConsoledDate = new Date().getTime();
  if (secondConsoledDate - firstConsoledDate > 10000) {
    firstConsoledDate = new Date().getTime();
  }
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      const node = $(addedNode);
      if (node.find(".chat-message-item").length) {
        const userImgNode = node.find("img");
        const usernameNode = node.find(
          ".webcast-chatroom__profile_wrapper .nickname"
        );
        const actualUsername = usernameNode.text();

        if (commentingPeopleData[actualUsername]) {
          commentingPeopleData[actualUsername].totalComments += 1;
        } else {
          commentingPeopleData[actualUsername] = {
            totalComments: 1,
            image: userImgNode.attr("src"),
          };
        }
      }

      const className = node.attr("class");
      if (className?.includes("send-gift-count")) {
        const parentNode = node.parent().parent();
        const gifterName = parentNode
          .find(".send-gift-bar-content-nickname")
          .text();
        let giftName = parentNode.find(".send-gift-bar-content-desc").text();
        giftName = giftName.replace("sent", "");
        const giftCount = parseInt(node.text().replace("x", ""));
        const gifterImg = parentNode.find("img").attr("src");

        if (giftingPeopleData[gifterName]) {
          let prevGifts = giftingPeopleData[gifterName]["gifts"];
          if (prevGifts) {
            const doesThisGiftExist = prevGifts.find(
              (gift) => gift["name"] === giftName
            );
            if (!doesThisGiftExist) {
              prevGifts.push({
                name: giftName,
                count: giftCount,
              });
            }

            const newGifts = prevGifts.map((gift) => {
              if (gift["name"] === giftName) {
                let newCount = 0;
                if (giftCount > gift["count"]) {
                  newCount = giftCount;
                } else {
                  newCount = giftCount + gift["count"];
                }

                return {
                  name: giftName,
                  count: newCount,
                };
              }
              return gift;
            });

            giftingPeopleData[gifterName]["gifts"] = newGifts;
          } else {
            giftingPeopleData[gifterName]["gifts"] = [
              { name: giftName, count: giftCount },
            ];
          }
        } else {
          giftingPeopleData[gifterName] = {
            gifts: [
              {
                name: giftName,
                count: giftCount,
              },
            ],
            img: gifterImg,
          };
        }
      }
    }
  }
});
