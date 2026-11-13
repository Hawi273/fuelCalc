// Lista presetów: zapis, wczytanie i usuwanie.

let presets = [];
let pendingDeleteIndex = -1; // preset czekający na potwierdzenie usunięcia
let messageTimer;

function showMessage(text) {
  $('msg').textContent = text;
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => ($('msg').textContent = ''), 3500);
}

function describePreset(p) {
  const parts = [
    `${p.dist} km × ${p.trips}`,
    `${p.cons} l/100`,
    `${p.price} zł/l`,
    `${p.people} os.`,
  ];
  if (Number(p.extra)) parts.push(`+${p.extra} zł`);
  return parts.join(' · ');
}

function makeButton(label, className, onClick) {
  const button = document.createElement('button');
  button.textContent = label;
  if (className) button.className = className;
  button.onclick = onClick;
  return button;
}

function makePresetRow(preset, index) {
  const row = document.createElement('div');
  row.className = 'chip';

  const info = document.createElement('div');
  info.className = 'info';
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = preset.name;
  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = describePreset(preset);
  info.append(name, meta);
  row.append(info);

  if (pendingDeleteIndex === index) {
    row.append(
      makeButton('Usuń', 'yes', () => deletePreset(index)),
      makeButton('Anuluj', '', () => {
        pendingDeleteIndex = -1;
        renderPresets();
      })
    );
  } else {
    const del = makeButton('Usuń', 'del', () => {
      pendingDeleteIndex = index;
      renderPresets();
    });
    del.setAttribute('aria-label', 'Usuń ' + preset.name);
    row.append(makeButton('Wczytaj', '', () => loadPreset(preset)), del);
  }
  return row;
}

function renderPresets() {
  const list = $('list');
  list.innerHTML = '';
  $('empty').hidden = presets.length > 0;
  presets.forEach((preset, i) => list.append(makePresetRow(preset, i)));
}

function loadPreset(preset) {
  FIELDS.forEach((id) => ($(id).value = preset[id]));
  $('pname').value = preset.name;
  showResult();
  showMessage(`Wczytano „${preset.name}”.`);
}

function deletePreset(index) {
  presets.splice(index, 1);
  savePresets(presets);
  pendingDeleteIndex = -1;
  renderPresets();
  showMessage('Usunięto preset.');
}

function saveCurrentPreset() {
  const name = $('pname').value.trim();
  if (!name) {
    showMessage('Wpisz nazwę presetu, żeby go zapisać.');
    $('pname').focus();
    return;
  }

  const preset = { name };
  FIELDS.forEach((id) => (preset[id] = readNumber(id)));
  preset.trips = readCount('trips');

  // Ta sama nazwa (bez względu na wielkość liter) nadpisuje stary preset.
  const existing = presets.findIndex(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  if (existing >= 0) presets[existing] = preset;
  else presets.push(preset);

  const stored = savePresets(presets);
  pendingDeleteIndex = -1;
  renderPresets();

  if (!stored) {
    showMessage('Zapisano tylko do zamknięcia strony, bo przeglądarka blokuje pamięć.');
  } else {
    showMessage(existing >= 0 ? `Zaktualizowano „${name}”.` : `Zapisano „${name}”.`);
  }
}

function initPresets() {
  presets = loadPresets();
  $('saveBtn').onclick = saveCurrentPreset;
  $('pname').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveCurrentPreset();
  });
  renderPresets();
}
