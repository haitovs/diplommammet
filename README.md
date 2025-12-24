# 🌍 GeoQuest - World Geography Challenge

A modern, visually stunning geography learning game that's accessible to everyone. No sign-in required!

![GeoQuest](https://img.shields.io/badge/version-2.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Game Modes

| Mode | Description |
|------|-------------|
| 🏳️ **Flag Master** | Identify countries by their flags |
| 🏛️ **Capital Cities** | Match countries with their capitals |
| 🔍 **Fact Detective** | Guess countries from progressive clues |
| ⚡ **Speed Geography** | 30-second rapid-fire challenge |

## ✨ Features

- **No authentication required** - Play instantly!
- **Beautiful modern UI** - Dark theme with smooth animations
- **Multiple game modes** - 4 unique ways to test your knowledge
- **Progress tracking** - Stats saved locally
- **Achievement system** - Unlock badges as you play
- **Mobile responsive** - Works on all devices
- **Keyboard support** - Use number keys for quick answers

## 🚀 Quick Start

### Option 1: Direct File
Simply open `index.html` in your browser!

### Option 2: Local Server
```bash
# Using npx serve
npx serve -l 4000

# Or using run.bat
./run.bat
```

Then visit: http://localhost:4000

## 🎯 How to Play

1. **Choose a game mode** from the home screen
2. **Select difficulty** (Easy, Medium, or Hard)
3. **Answer questions** by clicking options or typing
4. **Build streaks** for bonus points
5. **Track your progress** and unlock achievements!

## 📊 Scoring

- **Base points**: 80 (Easy), 100 (Medium), 150 (Hard)
- **Streak bonus**: Up to 2x multiplier
- **Hint penalty**: -10 points per hint used
- **Speed mode**: 50 base + streak bonuses

## 🏆 Achievements

- 🎮 First Game - Play your first game
- 🎯 Sharp Shooter - Get 10 correct answers
- 🔥 On Fire - 5 correct answers in a row
- 🌍 World Traveler - Learn 25 countries
- ⭐ Perfect Round - 100% accuracy in a game
- ⚡ Speed Demon - Score 500+ in Speed mode

## 🛠️ Tech Stack

- **Pure HTML, CSS, JavaScript** - No frameworks
- **No build tools required** - Just open and play
- **LocalStorage** - For persistent progress
- **Web Audio API** - For sound effects

## 📁 Project Structure

```
geoquest/
├── index.html          # Main application
├── css/
│   ├── main.css        # Core styles
│   ├── components.css  # UI components
│   └── animations.css  # Keyframe animations
├── js/
│   ├── app.js          # Main controller
│   ├── state.js        # State management
│   ├── data/
│   │   └── countries.js # Country database
│   ├── utils/
│   │   ├── helpers.js  # Utility functions
│   │   └── storage.js  # LocalStorage wrapper
│   ├── components/
│   │   ├── toast.js    # Notifications
│   │   ├── modal.js    # Modal dialogs
│   │   └── confetti.js # Celebrations
│   └── games/
│       ├── baseGame.js       # Base class
│       ├── flagMaster.js     # Flag game
│       ├── capitalCities.js  # Capital game
│       ├── factDetective.js  # Facts game
│       └── speedGeography.js # Speed game
├── package.json
└── README.md
```

## 🌍 Country Database

50+ countries with:
- Flags (emoji)
- Capitals
- Continents
- Population
- Languages
- Currencies
- 5 unique facts each
- Difficulty ratings

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for geography lovers everywhere.
