$(document).ready(() => {
  const url = window.location.href;
  const isProfileUrl = !isLiveUrl(url);

  if (isProfileUrl) {
  } else {
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
});
