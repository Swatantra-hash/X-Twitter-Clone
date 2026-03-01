# X / Twitter Clone

> A pixel-perfect Twitter/X UI clone built with HTML, Tailwind CSS v3, Vite, and vanilla JavaScript. Full multi-page SPA with 10+ working pages, interactive posts, Grok AI chat, DMs, and more.

---

## Features

### All Pages Working

| Page | What It Does |
|---|---|
| **Home** | 25+ randomized posts on every refresh, compose box, For You / Following tabs, infinite scroll |
| **Explore** | Trending topics with category tabs (For You, Trending, News, Sports, Entertainment) and search |
| **Notifications** | Likes, reposts, follows, and mentions with avatars and timestamps |
| **Grok** | AI chat interface with mock conversational responses |
| **Messages** | 4 conversations with message bubbles, click to open, send messages |
| **Lists** | Discover new lists with descriptions and follow buttons |
| **Bookmarks** | Session-linked bookmarks from any page, un-bookmark support |
| **Communities** | 8 tech communities with member counts and join buttons |
| **Premium** | 3-tier pricing cards (Basic $3 / Premium $8 / Premium+ $16) |
| **Profile** | Banner, avatar, bio, stats, tabs for Posts / Replies / Likes / Media |

### Interactions

| Feature | Status |
|---|---|
| Like toggle with heart pop animation | Working |
| Retweet toggle with spin animation | Working |
| Bookmark toggle with sidebar badge counter | Working |
| Reply box (slide-in per post) | Working |
| View count ticker | Working |
| Image lightbox (click to fullscreen, Escape to close) | Working |
| Live search filter | Working |
| Infinite scroll (loads more posts) | Working |
| Follow / Unfollow buttons | Working |
| Theme switcher (Dark / Dim / Light) | Working |
| Compose modal (sidebar Post button) | Working |
| Confetti on post submit | Working |
| Skeleton loading shimmer | Working |
| SPA hash-based routing | Working |

---

## Project Structure

```
X-Clone/
|-- index.html           # Main HTML shell with sidebar, feed container, right sidebar
|-- js/
|   |-- data.js          # All mock data (posts, notifications, messages, communities, etc.)
|   |-- pages.js         # Render functions for all 10+ pages
|   |-- router.js        # SPA router, interaction handlers, Grok/Messages chat logic
|-- css/
|   |-- input.css        # Tailwind directives
|   |-- output.css       # Compiled Tailwind CSS
|-- package.json
|-- tailwind.config.js
|-- vite.config.js
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| Tailwind CSS v3 (JIT) | Styling |
| Vanilla JavaScript (ES2020+) | All interactivity and SPA routing |
| Vite | Dev server and bundling |
| Google Material Symbols | Icons |

**No React. No Vue. No Angular.** Pure vanilla JS with a custom hash-based SPA router.

---

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- npm

### Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/swatantra-hash/X-Twitter-Clone.git
cd X-Twitter-Clone

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173/** in your browser.

### Build for Production

```bash
npm run build
```

---

## Responsiveness

| Screen Size | Status |
|---|---|
| Desktop (1280px+) | Full 3-column layout |
| Desktop (1024-1280px) | Right sidebar narrows |
| Tablet (768-1024px) | Sidebar icon-only, right sidebar hidden |
| Mobile (375-768px) | Mobile bottom nav bar |

---

## Honest Disclaimer

- This is a **UI clone for learning purposes only**
- There is **no backend** - all data is in JavaScript arrays
- **Nothing persists** - refresh and everything resets
- Posts, users, and conversations are all mock data
- The interactions (like, retweet, bookmark, reply) work correctly in-session
- Not affiliated with X Corp. or Twitter in any way

---

## What You Would Need to Make This Real

1. **Backend API** - Node.js/Express or Django for CRUD and auth
2. **Database** - PostgreSQL for users, posts, likes, follows
3. **Authentication** - JWT or OAuth
4. **Real-time** - WebSockets for live notifications
5. **Storage** - S3 or Cloudinary for media
6. **Search** - Elasticsearch or Postgres full-text search

---

## License

```
MIT License - do whatever you want with the code.
This is for educational purposes only.
```

---

## Credits

- [Tailwind CSS](https://tailwindcss.com) - v3, utility-first CSS
- [Vite](https://vitejs.dev) - Build tool and dev server
- [Google Material Symbols](https://fonts.google.com/icons) - Icon library
- [X / Twitter](https://x.com) - Original design inspiration

---

*Built by [Swatantra Trivedi](https://github.com/swatantra-hash) | Last updated: March 2026*