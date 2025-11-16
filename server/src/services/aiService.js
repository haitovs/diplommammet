const playbooks = [
  {
    id: 'climate-angle',
    title: 'Climate Clues',
    template: 'Are the facts pointing toward a tropical, desert, or polar climate? Match that to regions globally.'
  },
  {
    id: 'language-focus',
    title: 'Language Lens',
    template: 'Look for official languages hinted in the facts and align them with former empires or regions.'
  },
  {
    id: 'economy-export',
    title: 'Export Patterns',
    template: 'Think about which country leads the world in the mentioned exports or industries.'
  }
];

function buildAiResponse(payload = {}) {
  const { difficulty = 'medium', facts = [], guessHistory = [], mood = 'supportive' } = payload;
  const leadFact = facts[0] || 'Focus on the strongest fact you have.';
  const summary = `Based on the clue "${leadFact}", filter countries by region, language, and flagship industries.`;
  const suggestions = playbooks.map((item) => ({
    id: item.id,
    title: item.title,
    tip: item.template,
    confidence: difficulty === 'hard' ? 0.6 : 0.8
  }));
  return {
    tone: mood,
    summary,
    suggestions,
    guessReminder: guessHistory.slice(-3),
    disclaimer: 'Assistant uses a scripted knowledge base for offline demonstrations.'
  };
}

module.exports = {
  buildAiResponse
};
