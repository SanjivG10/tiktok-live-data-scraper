let url = "";

const { userInfo } = chrome.storage.local.get(["userInfo"], (result) => {
  console.log(result, " hahah");
  //   $("img.main-gifter").attr("src", userInfo.img);
  //   $(".gifter-name").html(userInfo.username);
  //   $("img.each-tiktok-embed-image").forEach((img, index) => {
  //     img.attr("src", userInfo.videos[index].img);
  //   });
});
