const { randomUUID } = require('crypto');

const MAX_EVENTS = 200;
const events = [];

function track(eventType, payload = {}) {
  const entry = {
    id: randomUUID(),
    eventType,
    payload,
    timestamp: new Date().toISOString()
  };
  events.push(entry);
  if (events.length > MAX_EVENTS) {
    events.shift();
  }
  return entry;
}

function recent(limit = 50) {
  return events.slice(-limit).reverse();
}

module.exports = {
  track,
  recent
};
