// const base = document.createElement("base");
// base.href = import.meta.env.BASE_URL;
// document.head.insertBefore(base, document.head.firstChild);

(function prependBase() {
  document.querySelectorAll("a").forEach((link) => {
    let url = link.getAttribute("href");
    if (url?.startsWith("/")) {
      url = import.meta.env.BASE_URL + url.slice(1);
      link.setAttribute("href", url);
    }
  });
})();
