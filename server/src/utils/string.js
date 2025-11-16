const DIACRITIC_REGEX = /\p{Diacritic}/gu;

function normalizeText(value) {
  if (!value && value !== 0) {
    return '';
  }
  return value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITIC_REGEX, '')
    .replace(/[^a-z0-9]/g, '');
}

module.exports = {
  normalizeText
};
