# Charles Jansen — Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. No package installation or build step is required.

The portfolio introduces Charles as a Computer Science student and aspiring software developer. It includes a Licenses & Certifications section, a real-time drowsiness-detection case study, TradeJournal, TAPENDANCE, the HAUPokemon Monster App database contribution, a Serverless EC2 Dashboard concept, HAUnted Sightings backend work, multi-region AWS infrastructure, and an opt-in local camera demo.

## Run locally

Open `index.html` in a browser, or serve this folder from PowerShell:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Update content

- `index.html` contains the profile introduction, contact copy, and section structure; replace `profile.jpg` to change the profile photo.
- `fonts/` contains the Steph typefaces used throughout the portfolio.
- `app.js` contains project descriptions, repository links, filters, project details, and skills; `camera-demo.js` runs the opt-in camera demo.
- `styles.css` contains the visual theme, responsive layout, and reduced-motion treatment.

Project summaries are based on the provided project information and linked public repositories. Project panels are original illustrations, not application screenshots. The camera demo requests access only after the visitor starts it, processes video locally with MediaPipe face landmarks, and stops the camera when stopped or when leaving the page. It downloads the MediaPipe runtime and model from public CDNs; camera frames are not uploaded. The eye-closure and mouth-opening cues are a simplified browser demo, not the linked project's EAR + CNN detector or a driver-safety system.
