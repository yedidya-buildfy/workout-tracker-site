# App website (Support / Privacy / Marketing)

Plain static site: HTML + one CSS file + one tiny script. No build step, no framework.
Works opened straight from disk (`file://`) and hosted at any address or sub-path, because every
link is relative.

| File | What it is | App Store Connect field |
|---|---|---|
| `index.html` | Product page | Marketing URL |
| `support.html` | Contact + FAQ | **Support URL** |
| `privacy.html` | Privacy Policy (effective 18 Oct 2026) | **Privacy Policy URL** |
| `terms.html` | Terms of Use / EULA | License Agreement (optional) or link in description |
| `copyright.html` | Copyright, trademarks, third-party credits, copyright complaints | — |
| `404.html` | Not-found page (GitHub Pages and Netlify use it automatically) | — |
| `config.js` | **The one place for the app name and icon** | — |
| `style.css` | All styling (lavender theme from the app) | — |
| `icon.png` | 512 px copy of `assets/icon.png` | — |
| `robots.txt`, `sitemap.xml` | Search engines; contain a `{{BASE_URL}}` placeholder | — |

## Change the app name or icon

1. Open `config.js` and change `appName` (and `icon` if the icon file name changes).
   That updates every page name, heading, nav brand, image and `<title>` in the browser.
2. The HTML also contains the default name as plain text, so the pages read correctly with
   JavaScript off (search engines, link previews, App Review). Once the name is final, bake it in
   (run inside `site/`, replace `New Name`):

   ```sh
   sed -i '' -e 's/Workout Tracker/New Name/g' -e 's/Workout%20Tracker/New%20Name/g' *.html config.js
   ```

   (On Linux drop the `''` after `-i`.)
3. New icon: export a square PNG (512 px is plenty) over `site/icon.png`, or point `icon` in
   `config.js` at another file and bake it in the same way (`s/icon.png/new-icon.png/g`).

## Before publishing

- Replace `{{BASE_URL}}` in `robots.txt` and `sitemap.xml` with the final address, without a
  trailing slash, e.g. `https://yedidya-dan.github.io/workout-tracker`:

  ```sh
  sed -i '' 's#{{BASE_URL}}#https://your.domain/path#g' robots.txt sitemap.xml
  ```
- If the address is a sub-path (e.g. GitHub Pages project site), `robots.txt` only counts at the
  domain root, so it is harmless but unused there; the sitemap still works.
- The 404 page uses relative links. A missing page one folder deep (e.g. `/path/a/b`) shows the
  404 text without styling. Nothing on the site links to such addresses, so this only affects
  mistyped URLs.

## Hosting options (nothing has been set up yet)

### 1. GitHub Pages (free, `https://<user>.github.io/<repo>/`)

1. Create a new **public** repository on GitHub, e.g. `workout-tracker-site`.
2. Copy the contents of `site/` (not the folder itself) into it and push:
   ```sh
   cd site
   git init -b main && git add . && git commit -m "Website"
   git remote add origin https://github.com/<user>/workout-tracker-site.git
   git push -u origin main
   ```
3. On GitHub: **Settings › Pages › Build and deployment › Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`, **Save**.
4. After about a minute the site is at `https://<user>.github.io/workout-tracker-site/`.
   Support URL = `…/support.html`, Privacy Policy URL = `…/privacy.html`.
5. Optional own domain: Settings › Pages › Custom domain, then add the DNS record GitHub shows.

### 2. Netlify Drop (free, no account needed to try)

1. Open https://app.netlify.com/drop in a browser.
2. Drag the whole `site` folder onto the page.
3. Netlify gives a random address like `https://random-name-123.netlify.app`. Sign in (free) to
   keep it permanently and rename it under **Site configuration › Change site name**.
4. To update later: **Deploys** tab › drag the folder again.

### 3. Static container on the Coolify server

Coolify can serve a folder of static files with its built-in static web server.

1. Put `site/` in a Git repository Coolify can reach (e.g. the GitHub repository from option 1,
   private is fine once the Coolify GitHub App has access).
2. In Coolify (`http://172.233.209.162:8000`): **Projects › (project) › + New › Resource ›
   Public/Private Repository**, pick the repository and branch.
3. **Build Pack: Static**. Base directory `/` (or `/site` if you point it at the app repository
   itself). Coolify serves it with nginx; no build command.
4. **Domains**: enter the address, e.g. `https://app.yourdomain.com`, and point that domain's DNS
   **A record** at `172.233.209.162`. Coolify requests the HTTPS certificate itself.
5. **Deploy**. Later pushes redeploy automatically if the webhook is enabled (Advanced › Auto deploy).

   The site is a few hundred kilobytes of static files, so it adds no noticeable load to the
   production apps on that server.
