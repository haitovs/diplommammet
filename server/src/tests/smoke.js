const assert = require('assert');
const { createRound, listDifficulties } = require('../services/gameService');

function run() {
  const round = createRound('easy', { region: 'Europe' });
  assert(round.roundId, 'Round should expose id.');
  assert(Array.isArray(round.facts) && round.facts.length === 3, 'Round should contain three facts.');
  assert(round.metadata?.region, 'Round should include metadata region.');

  const asiaRound = createRound('medium', { region: 'Asia' });
  assert(asiaRound.metadata?.region, 'Filtered round should include metadata.');

  const difficulties = listDifficulties();
  assert(difficulties.length === 3, 'Should expose difficulty metadata.');
  console.log('Smoke test passed:', {
    europeRound: { id: round.roundId, region: round.metadata.region },
    asiaRound: { id: asiaRound.roundId, region: asiaRound.metadata.region },
    sampleFact: round.facts[0]
  });
}

run();
