// Zapis presetów w localStorage. Każdy dostęp jest w try/catch, bo
// przeglądarka może zablokować pamięć (tryb prywatny, wyczyszczone dane).

const STORAGE_KEY = 'dojazd-presety';

function loadPresets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return saved.map(migratePreset);
  } catch (e) {
    return [];
  }
}

// Zwraca true, gdy zapis się udał.
function savePresets(presets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    return true;
  } catch (e) {
    return false;
  }
}

// Starsze presety miały pole "round" (tam i z powrotem) zamiast "trips".
function migratePreset(preset) {
  const { round, ...rest } = preset;
  return { ...rest, trips: preset.trips ?? (round ? 2 : 1) };
}
