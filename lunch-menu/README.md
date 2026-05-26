# AISG Lunch Picker

Static lunch picker for Luca and Noah.

## Local Use

Run:

```powershell
node serve.mjs 8081
```

Open:

```text
http://127.0.0.1:8081/
```

## Weekly Update Flow

1. Save the new menu image in `assets/source/original-menu.jpg`.
2. Update the `MENU_ITEMS` array in `app.js` with the new days, dishes, allergens, and nutrition.
3. Generate one new food photo per lunch set, or one clean contact sheet and crop it.
4. Save final web images in `assets/food/`.
5. Update each menu item's `image` path.
6. Change `STORAGE_KEY` in `app.js` for the new week so Luca and Noah start with clean choices.

## Voice Reading

Each lunch card has a speaker button. It uses the browser's built-in Web Speech API, so there is no API key and no server cost. The button reads the English lunch details first, then the Putonghua details.

Speech quality depends on the device browser and installed voices. iPhone, iPad, Chrome, Edge, and Safari usually work after the first tap. For Chinese, the app asks for a `zh-CN` or Mandarin/Putonghua voice.

## Online Hosting

This app is static, so it can be hosted on GitHub Pages, Netlify, Cloudflare Pages, Vercel, or any basic web host.

For your current workflow, static hosting is enough:

- Your wife opens one URL on her phone or tablet.
- Luca chooses on the Luca tab.
- Noah chooses on the Noah tab.
- The Results tab shows orderable matches for the parent decision. A match can be the exact same set, or different sets that are available on the same day.

Important: choices are stored in that browser only. If you want Luca and Noah to choose on different devices and have results sync automatically, the app needs a small backend database.
