/**
 * GeoQuest - Confetti Effect
 */

const Confetti = {
  container: null,
  colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'],

  init() {
    this.container = document.getElementById('confetti-container');
  },

  /**
   * Launch confetti celebration
   */
  launch(intensity = 50) {
    if (!this.container) this.init();

    for (let i = 0; i < intensity; i++) {
      setTimeout(() => this.createPiece(), i * 20);
    }
  },

  /**
   * Create a single confetti piece
   */
  createPiece() {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    
    // Random properties
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const left = Math.random() * 100;
    const size = Math.random() * 10 + 5;
    const duration = Math.random() * 2 + 2;
    const rotation = Math.random() * 360;

    piece.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      animation-duration: ${duration}s;
      transform: rotate(${rotation}deg);
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;

    this.container.appendChild(piece);

    // Remove after animation
    setTimeout(() => piece.remove(), duration * 1000);
  },

  /**
   * Quick burst for correct answer
   */
  burst() {
    this.launch(20);
  },

  /**
   * Big celebration for game completion
   */
  celebrate() {
    this.launch(100);
  }
};

// Make available globally
window.Confetti = Confetti;
