// Drobne funkcje pomocnicze używane w całej aplikacji.

const $ = (id) => document.getElementById(id);

const formatPLN = (value) =>
  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });

const formatNumber = (value, decimals = 1) =>
  value.toLocaleString('pl-PL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

// Czyta liczbę z pola formularza. Akceptuje przecinek, błędne dane i wartości
// ujemne zamienia na 0.
function readNumber(id) {
  const n = parseFloat(String($(id).value).replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

// Czyta liczbę całkowitą nie mniejszą niż 1 (osoby, przejazdy).
function readCount(id) {
  return Math.max(1, Math.round(readNumber(id)) || 1);
}
