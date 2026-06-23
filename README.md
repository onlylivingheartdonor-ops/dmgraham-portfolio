# David M. Graham — Presentation Portfolio

## Adding a new presentation

1. **Drop the presentation folder** into `presentations/`
   e.g. `presentations/my-new-deck/index.html`

2. **Add an icon** (16:9 PNG or JPG, ~800×450px) into `icons/`
   e.g. `icons/my-new-deck.png`

3. **Add one entry** to `data/presentations.json`:
   ```json
   {
     "title": "My New Deck",
     "description": "One line describing what this presentation is about.",
     "icon": "icons/my-new-deck.png",
     "url": "presentations/my-new-deck/index.html",
     "label": "INTERACTIVE PRESENTATION"
   }
   ```

4. **Push to GitHub** → Vercel auto-deploys → the new card appears on the site.

That's it. No HTML edits needed.

---

## File structure

```
/
  index.html              ← Home / portfolio grid
  about.html              ← About page + resume + contact
  data/
    presentations.json    ← The manifest (edit this to add work)
  icons/
    dbp.png               ← Thumbnail for Death by PowerPoint
  presentations/
    dbp-build/            ← Death by PowerPoint HTML5 presentation
    dbp-quiz/             ← Quiz standalone page
```

## Notes

- The "Hire Me" button in the nav is hidden but still in the HTML.
  To re-enable it, uncomment the `<a>` tag in the nav section of `index.html`.
- Update the site URL in `about.html`'s contact section once you have
  the `intelligentheart.com` domain pointing at Vercel.
- The portfolio page opens presentations in a **new tab** so visitors
  don't lose their place on the portfolio site.
