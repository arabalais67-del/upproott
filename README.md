# Uproot 🏙️

> Find your next city — housing and jobs, together.

A relocation platform that combines housing listings and job search so people can make their move with full confidence.

## Pages

- `/` — Home / landing page
- `/explore` — Browse & filter all cities
- `/city/:slug` — Individual city page with housing, jobs & city data
- `/quiz` — City Match Quiz (4 questions → personalized city recommendations)
- `/search` — Unified housing + jobs search with filters

## Tech Stack

- **React 18** + **React Router 6**
- **Vite** (build tool)
- **CSS Modules** (scoped styling, no external CSS framework)

---

## 🚀 Deploy to Vercel (recommended — free, 2 minutes)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done ✅

---

## 🚀 Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

---

## 💻 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
  components/
    Nav.jsx / Nav.module.css
    Footer.jsx / Footer.module.css
    CityCard.jsx / CityCard.module.css
    ListingCard.jsx / ListingCard.module.css
  pages/
    Home.jsx / Home.module.css
    Explore.jsx / Explore.module.css
    CityPage.jsx / CityPage.module.css
    Quiz.jsx / Quiz.module.css
    Search.jsx / Search.module.css
  data/
    index.js    ← All mock city, listing & job data
  App.jsx       ← Routes
  main.jsx      ← Entry point
  index.css     ← Global styles + CSS variables
```

---

## 🛠️ Next Steps / Roadmap

- [ ] Connect to a real housing API (Zillow, RentCast)
- [ ] Connect to a real jobs API (Indeed, LinkedIn)
- [ ] User accounts + saved listings
- [ ] Map view for listings (Mapbox or Google Maps)
- [ ] Email alerts for new listings
- [ ] City comparison tool (side-by-side)
- [ ] Employer/landlord portal
