# 🌍 GeoQuest - Complete Rewrite Implementation Plan

## Project Overview

**GeoQuest** is a modern, visually stunning geography learning game that's accessible to everyone (no sign-in required). The game features multiple engaging game modes, beautiful animations, and an educational approach to learning about countries worldwide.

---

## 🎯 Core Design Principles

1. **No Authentication Required** - All features available instantly
2. **Modern, Premium UI** - Dark theme with vibrant gradients, glassmorphism, micro-animations
3. **Multiple Game Modes** - Variety keeps users engaged
4. **Educational First** - Learn while playing
5. **Mobile Responsive** - Works beautifully on all devices
6. **Offline Capable** - All data bundled, no external API dependencies

---

## 🎮 Game Modes (5 Total)

### 1. **Flag Master** 🏳️
- **Concept**: Identify countries by their flags
- **Gameplay**: Show a flag, player picks from 4 multiple-choice options
- **Difficulty Levels**:
  - Easy: Major countries (USA, UK, Japan, France)
  - Medium: Common countries (Thailand, Egypt, Portugal)
  - Hard: Obscure nations (Kiribati, Comoros, Liechtenstein)
- **Scoring**: 100pts correct first try, -25pts per wrong guess
- **Visual**: Large, high-quality flag display with wave animation

### 2. **Capital Cities** 🏛️
- **Concept**: Match countries to their capitals
- **Gameplay**: Given a country name, select the correct capital from 4 options
- **Reverse Mode**: Given a capital, guess the country
- **Features**: Map snippet showing general region as hint
- **Scoring**: Time-based bonus, +10pts per second remaining

### 3. **Shape Shifter** 🗺️
- **Concept**: Identify countries by their outline/silhouette
- **Gameplay**: Black silhouette of country shape, player types or selects answer
- **Hints System**:
  - Hint 1: Show continent
  - Hint 2: Show neighboring countries
  - Hint 3: Show one city marker
- **Scoring**: Base 150pts, -50pts per hint used

### 4. **Fact Detective** 🔍
- **Concept**: Guess the country from progressive clues (improved from current)
- **Gameplay**: 
  - 5 facts revealed one at a time
  - First fact is vague, last is very specific
  - Can guess after any clue
- **Example Flow**:
  1. "This country is in South America" 
  2. "It has the world's largest rainforest"
  3. "Portuguese is the official language"
  4. "Famous for Carnival in Rio"
  5. "Home to Christ the Redeemer statue"
- **Scoring**: More points for fewer clues needed

### 5. **Speed Geography** ⚡
- **Concept**: Rapid-fire quick answer mode
- **Gameplay**: 
  - 30 seconds on the clock
  - Random mix of all question types
  - Quick answer or skip
  - Chain bonus for consecutive correct answers
- **Scoring**: Streak multiplier (2x, 3x, 4x, 5x max)

---

## 🎨 Visual Design System

### Color Palette
```css
/* Core Colors */
--bg-deep: #0c1222;           /* Deep space blue */
--bg-panel: #151d30;          /* Panel background */
--bg-card: #1a2540;           /* Card surfaces */

/* Accent Gradients */
--gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6);  /* Indigo to Purple */
--gradient-success: linear-gradient(135deg, #10b981, #34d399);  /* Green tones */
--gradient-danger: linear-gradient(135deg, #ef4444, #f472b6);   /* Red to Pink */
--gradient-gold: linear-gradient(135deg, #f59e0b, #fbbf24);     /* Gold tones */

/* Text Colors */
--text-primary: #f8fafc;
--text-secondary: #94a3b8;
--text-muted: #64748b;

/* Glow Effects */
--glow-primary: 0 0 30px rgba(99, 102, 241, 0.4);
--glow-success: 0 0 30px rgba(16, 185, 129, 0.4);
```

### Typography
- **Headings**: "Plus Jakarta Sans" - Modern geometric sans-serif
- **Body**: "Inter" - Clean, highly readable
- **Decorative**: "Outfit" - For stats and numbers

### UI Components
1. **Glassmorphism Cards** - Translucent backgrounds with blur
2. **Gradient Buttons** - With hover glow effects
3. **Animated Badges** - Pulse animation on achievements
4. **Progress Rings** - Circular progress indicators
5. **Particle Backgrounds** - Subtle floating particles
6. **Confetti Explosions** - On correct answers
7. **Shake Animations** - On wrong answers

---

## 📂 Project Structure

```
mammet-guess-the-country/
├── index.html                 # Single page application
├── css/
│   ├── main.css               # Core styles + variables
│   ├── components.css         # UI component styles
│   ├── animations.css         # All keyframe animations
│   └── responsive.css         # Mobile breakpoints
├── js/
│   ├── app.js                 # Main application controller
│   ├── router.js              # SPA navigation
│   ├── state.js               # Global state management
│   ├── data/
│   │   └── countries.js       # Complete country database
│   ├── games/
│   │   ├── flagMaster.js      # Flag game logic
│   │   ├── capitalCities.js   # Capital game logic
│   │   ├── shapeShifter.js    # Shape game logic
│   │   ├── factDetective.js   # Fact game logic
│   │   └── speedGeography.js  # Speed game logic
│   ├── components/
│   │   ├── header.js          # Nav & stats bar
│   │   ├── modal.js           # Modal system
│   │   ├── toast.js           # Notifications
│   │   ├── confetti.js        # Celebration effects
│   │   └── progressRing.js    # Circular progress
│   └── utils/
│       ├── sounds.js          # Sound effects manager
│       ├── storage.js         # LocalStorage wrapper
│       └── helpers.js         # Utility functions
├── assets/
│   ├── flags/                 # SVG flag files (or use emoji)
│   ├── shapes/                # Country silhouettes
│   ├── sounds/                # Sound effects
│   └── images/                # UI images
└── README.md
```

---

## 🗃️ Data Structure

### Country Database Schema
```javascript
const countries = [
  {
    id: "br",
    name: "Brazil",
    capital: "Brasília",
    continent: "South America",
    region: "Latin America",
    population: 214000000,
    area: 8515767,  // km²
    languages: ["Portuguese"],
    currency: { name: "Brazilian Real", code: "BRL", symbol: "R$" },
    flag: "🇧🇷",  // or path to SVG
    difficulty: "easy",
    facts: [
      "Has the largest rainforest in the world",
      "Home to over 60% of the Amazon River",
      "Portuguese is the only official language",
      "Won 5 FIFA World Cup titles",
      "Christ the Redeemer is in Rio de Janeiro"
    ],
    hints: {
      continent: "Located in South America",
      neighbor: "Shares borders with 10 countries",
      landmark: "Famous for Sugarloaf Mountain"
    },
    neighbors: ["Argentina", "Uruguay", "Paraguay", "Bolivia", "Peru", "Colombia", "Venezuela", "Guyana", "Suriname", "French Guiana"]
  },
  // ... 150+ countries
];
```

---

## 📱 Page Layouts

### 1. Home Screen
```
┌─────────────────────────────────────────────────────────┐
│  🌍 GeoQuest                    [Stats] [Settings] [?] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     ╔═══════════════════════════════════════════╗       │
│     ║    🌍  Welcome to GeoQuest!               ║       │
│     ║    Test your world knowledge              ║       │
│     ╚═══════════════════════════════════════════╝       │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ 🏳️ Flag  │ │ 🏛️ Capital│ │ 🗺️ Shape │ │ 🔍 Facts │   │
│  │  Master  │ │  Cities  │ │ Shifter  │ │Detective │   │
│  │          │ │          │ │          │ │          │   │
│  │ [PLAY]   │ │ [PLAY]   │ │ [PLAY]   │ │ [PLAY]   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│         ┌──────────────────────────────────┐            │
│         │  ⚡ Speed Geography               │            │
│         │  Challenge Mode - All Categories │            │
│         │          [START CHALLENGE]       │            │
│         └──────────────────────────────────┘            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 📊 Your Stats                                    │   │
│  │ ● Games Played: 47  ● Correct: 312  ● Streak: 8 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🏆 Achievements                                  │   │
│  │ [🌍] [🎯] [⭐] [🔥] [🏅] [+12 more]              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2. Game Screen (Flag Master Example)
```
┌─────────────────────────────────────────────────────────┐
│  ← Back    Flag Master 🏳️       Round 3/10    ⏱️ 0:45   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ ◯ ◯ ● ◯ ◯ ◯ ◯ ◯ ◯ ◯    Progress: 3/10        │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│            ╔═══════════════════════════════╗            │
│            ║                               ║            │
│            ║     🇧🇷   (Large Flag)        ║            │
│            ║                               ║            │
│            ╚═══════════════════════════════╝            │
│                                                         │
│         Which country does this flag belong to?         │
│                                                         │
│   ┌─────────────┐         ┌─────────────┐              │
│   │  🇦🇷 Argentina │         │  🇧🇷 Brazil   │              │
│   └─────────────┘         └─────────────┘              │
│                                                         │
│   ┌─────────────┐         ┌─────────────┐              │
│   │  🇨🇴 Colombia │         │  🇨🇱 Chile    │              │
│   └─────────────┘         └─────────────┘              │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ 💡 Score: 450    🔥 Streak: 2                   │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 3. Results Screen
```
┌─────────────────────────────────────────────────────────┐
│                 🎉 AWESOME!                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│      ╭───────────────────────────────────────╮          │
│      │       ⭐⭐⭐                           │          │
│      │    You scored 850 points!              │          │
│      │    Correct: 8/10 (80%)                 │          │
│      │    Best streak: 5                      │          │
│      ╰───────────────────────────────────────╯          │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ 🏆 New Personal Best!                           │   │
│   │ Previous: 720 → New: 850 (+130)                 │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ 📚 Countries Learned:                           │   │
│   │ 🇧🇷 Brazil  🇯🇵 Japan  🇳🇴 Norway  🇰🇪 Kenya     │   │
│   │ 🇵🇪 Peru    🇦🇺 Australia  🇵🇹 Portugal          │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────┐   ┌─────────────────┐            │
│   │ 🔄 Play Again   │   │ 🏠 Home         │            │
│   └─────────────────┘   └─────────────────┘            │
│                                                         │
│          [Share Results 📤]                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ⚙️ Features & Functionality

### Core Features
1. **Persistent Stats** - LocalStorage saves all progress
2. **Difficulty Selection** - Easy/Medium/Hard per game
3. **Region Filters** - Play only Africa, Europe, Asia, etc.
4. **Sound Effects** - Toggle on/off, satisfying feedback sounds
5. **Keyboard Support** - 1-4 keys for answers, Space to skip

### Gamification Elements
1. **Achievement System** - 25+ unlockable badges
2. **Daily Challenges** - New challenge each day
3. **Streak Counter** - Days played in a row
4. **XP & Levels** - Progress system
5. **Country Collection** - Track all countries you've correctly identified

### Accessibility
1. **High Contrast Mode** - For visibility needs
2. **Screen Reader Support** - Proper ARIA labels
3. **Keyboard Navigation** - Full keyboard support
4. **Reduced Motion** - Respect prefers-reduced-motion

---

## 🔧 Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Set up project structure
- [ ] Create base HTML with semantic structure
- [ ] Implement CSS design system (variables, typography, base styles)
- [ ] Build responsive layout framework
- [ ] Create countries data file (50+ countries)

### Phase 2: Core Components (Day 2)
- [ ] Router/Navigation system
- [ ] State management
- [ ] LocalStorage persistence
- [ ] Modal system
- [ ] Toast notifications
- [ ] Header with stats

### Phase 3: Home Screen (Day 3)
- [ ] Hero section with animations
- [ ] Game mode cards with hover effects
- [ ] Stats dashboard
- [ ] Settings panel
- [ ] Achievement badges display

### Phase 4: Flag Master Game (Day 4)
- [ ] Game initialization logic
- [ ] Question generation
- [ ] Answer selection UI
- [ ] Scoring system
- [ ] Results screen
- [ ] Animations (correct/wrong)

### Phase 5: Remaining Games (Day 5-6)
- [ ] Capital Cities game
- [ ] Shape Shifter game
- [ ] Fact Detective game
- [ ] Speed Geography game

### Phase 6: Polish & Testing (Day 7)
- [ ] Sound effects integration
- [ ] Confetti/celebration effects
- [ ] Mobile responsiveness testing
- [ ] Bug fixes
- [ ] Performance optimization

---

## 📋 Technical Requirements

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Targets
- First paint: < 1s
- Interactive: < 2s
- Bundle size: < 500KB total

### No Dependencies Required
- Pure HTML, CSS, JavaScript
- No build tools needed
- No external APIs
- Runs from file:// or any static server

---

## 🚀 Stretch Goals

1. **Multiplayer Mode** - Local hot-seat multiplayer
2. **World Map Explorer** - Click countries on a map to learn
3. **Custom Quiz Builder** - Create your own geography quizzes
4. **Leaderboard** - Optional anonymous high scores (would require server)
5. **Dark/Light Theme Toggle** - Theme switching

---

## 📝 Success Metrics

1. **Engagement**: Average session > 5 minutes
2. **Learning**: Users can identify 50+ countries after 1 week
3. **Replayability**: Users return for daily challenges
4. **Accessibility**: WCAG 2.1 AA compliant

---

*This plan provides a complete roadmap for building a modern, engaging, and educational geography game that works for everyone, anywhere, without any barriers to entry.*
