const header = document.querySelector("[data-header]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal]");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const previewVideos = document.querySelectorAll("video[data-autoplay]");

if (!reducedMotion && "IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay can be blocked by browser policy; native controls remain available.
          });
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.48 },
  );

  previewVideos.forEach((video) => videoObserver.observe(video));
}

document.querySelectorAll("[data-sound-toggle]").forEach((button) => {
  const video = button.closest(".video-frame")?.querySelector("video");
  const label = button.querySelector("span");

  if (!video || !label) return;

  button.addEventListener("click", () => {
    video.muted = !video.muted;
    label.textContent = video.muted ? "Muted" : "Sound on";
    button.setAttribute("aria-label", video.muted ? "Turn sound on" : "Mute video");

    if (!video.paused) return;
    video.play().catch(() => {
      // The user can still use the native play control if playback fails.
    });
  });
});

document.querySelectorAll("details.long-demo").forEach((details) => {
  details.addEventListener(
    "toggle",
    () => {
      if (!details.open) return;

      const video = details.querySelector("video");
      const source = video?.querySelector("source[data-src]");
      if (!video || !source) return;

      source.src = source.dataset.src;
      source.removeAttribute("data-src");
      video.load();
    },
    { once: true },
  );
});
