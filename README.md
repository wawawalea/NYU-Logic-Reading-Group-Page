# NYU Logic Reading Group Page

A static website for the NYU Unnamed Logic Reading Group.

The group meets every Thursday, 6:30–8:00 PM Eastern Time, in Philosophy Department Room 201 (subject to change).

## Update the content

Edit `dist/content.json` to change the introduction, meeting details, or weekly readings. The `weeks` list starts empty because the reading schedule is still undecided. Add entries in the order you want them displayed:

```json
{
  "date": "2026-10-01",
  "topic": "Your topic",
  "description": "Session details and discussion questions.",
  "readings": [
    {"title": "Reading title", "url": "https://example.com/reading.pdf"}
  ]
}
```

The example is a template, not a scheduled session. Use full HTTP or HTTPS URLs for readings. The meeting timezone is America/New_York, which follows Eastern daylight and standard time.

## Files

- `dist/index.html`: page structure and fallback meeting information.
- `dist/styles.css`: ocean colors, layout, and animation styles.
- `dist/app.js`: separate topics and readings panels, and bounded drifting motion.
- `dist/content.json`: editable group content.
- `dist/assets/logo.png`: supplied group logo, unchanged.
- `dist/assets/manatee.webp`: generated manatee illustration.

Serve `dist` with any static HTTP server. No build or installation is required. Publish the contents of `dist` to use another static host. The website uses Google Fonts with system font fallbacks.

Buttons work with the keyboard. Escape closes a panel. The page respects reduced-motion settings and includes a motion toggle.

## Email signup

Set `signup.url` in `dist/content.json` to the mailing list or signup form URL. The email manatee opens that link from its panel. Until a URL is supplied, the panel shows that the link is pending. The static website does not collect or store email addresses.

Session descriptions support line breaks through the optional `description` field. Detail panels fill most of the screen and scroll for long content.
