const base = document.createElement("base");
base.href = import.meta.env.BASE_URL;
document.head.insertBefore(base, document.head.firstChild);
