// placeholder redirector just for images that failed to load (e.g. 404, 403, cors, corb, etc.) //
(() => {
  document.querySelectorAll("img").forEach(img => {
    if (!/bg/i.test(img.src)) {
      img.addEventListener("error", () => {
        img.src = "https://youtomb.github.io/placeholder-img.png";
      }, { once: true });
    }
  });

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === "IMG" && !/bg/i.test(node.src)) {
          node.addEventListener("error", () => {
            node.src = "https://youtomb.github.io/placeholder-img.png";
          }, { once: true });
        } else if (node.querySelectorAll) {
          node.querySelectorAll("img").forEach(img => {
            if (!/bg/i.test(img.src)) {
              img.addEventListener("error", () => {
                img.src = "https://youtomb.github.io/placeholder-img.png";
              }, { once: true });
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
