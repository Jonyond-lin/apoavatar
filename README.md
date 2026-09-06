# ApoAvatar Project Page

Static, dependency-free project page for **ApoAvatar: Expressive Audio-Driven Avatar Generation via Refocused Audio-Pose Priors**.

## Local preview

From the repository root:

```bash
python3 -m http.server 4173 --directory site
```

Then open `http://localhost:4173`.

## Content to finalize

- Replace the disabled Paper and Code pills in `index.html` when public URLs are available.
- Add equal-contribution or corresponding-author markers once they are confirmed.
- `demos/pose_label_vis.mp4` is excluded because its current MP4 container cannot be parsed by ffmpeg or standard browser tooling.

## GitHub Pages

This repository is designed to publish from the `main` branch root at:

`https://jonyond-lin.github.io/apoavatar/`

The site uses relative asset URLs, so it works both at the project path above and in local previews.

## Media

Web-ready H.264/AAC copies live in `assets/videos/`; posters are in `assets/posters/`. The original source demos remain untouched in the repository-level `demos/` directory.
