function sleep(time, node = null) {
  return new Promise((resolve) => {
    const res_fn = resolve(node);
    return setTimeout(res_fn, time);
  });
}

function isLiveUrl(url) {
  return url.split("/").length === 5;
}
