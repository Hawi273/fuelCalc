// Obliczenia kosztów i obsługa pól formularza.

// Pola zapisywane w presecie. Ich id w HTML jest takie samo jak nazwa.
const FIELDS = ['dist', 'cons', 'price', 'people', 'extra', 'trips'];

function calculate() {
  const trips = readCount('trips');
  const people = readCount('people');

  const km = readNumber('dist') * trips;
  const liters = (km * readNumber('cons')) / 100;
  const fuelCost = liters * readNumber('price');
  const total = fuelCost + readNumber('extra');

  return {
    km,
    liters,
    fuelCost,
    total,
    perPerson: total / people,
    perKm: km > 0 ? total / km : null,
  };
}

function showResult() {
  const r = calculate();
  $('rPer').textContent = formatPLN(r.perPerson);
  $('rTotal').textContent = formatPLN(r.total);
  $('rKm').textContent = formatNumber(r.km) + ' km';
  $('rL').textContent = formatNumber(r.liters, 2) + ' l';
  $('rFuel').textContent = formatPLN(r.fuelCost);
  $('rPerKm').textContent = r.perKm === null ? '–' : formatPLN(r.perKm);
}

// Przyciski − i + przy liczbie osób i przejazdów.
function changeCount(id, delta, max) {
  const current = parseInt($(id).value, 10) || 1;
  $(id).value = Math.min(max, Math.max(1, current + delta));
  showResult();
}

function initCalculator() {
  FIELDS.forEach((id) => $(id).addEventListener('input', showResult));

  $('minus').onclick = () => changeCount('people', -1, 9);
  $('plus').onclick = () => changeCount('people', 1, 9);
  $('tminus').onclick = () => changeCount('trips', -1, 999);
  $('tplus').onclick = () => changeCount('trips', 1, 999);

  showResult();
}
