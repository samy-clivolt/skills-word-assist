const listEl = document.getElementById('skill-list');
const countEl = document.getElementById('count');
const searchEl = document.getElementById('search');

const state = {
  skills: [],
  query: '',
};

function normalize(value) {
  return (value || '').toLowerCase().trim();
}

function render() {
  const query = normalize(state.query);
  const filtered = state.skills.filter((skill) => {
    if (!query) return true;
    return (
      normalize(skill.name).includes(query) ||
      normalize(skill.description).includes(query) ||
      normalize(skill.folder).includes(query)
    );
  });

  countEl.textContent = `${filtered.length}`;
  listEl.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'Aucun skill trouve.';
    listEl.appendChild(empty);
    return;
  }

  for (const skill of filtered) {
    const row = document.createElement('div');
    row.className = 'list-row';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = skill.name;

    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = skill.description || '-';

    const folder = document.createElement('div');
    folder.className = 'folder';
    folder.textContent = skill.folder || '-';

    row.appendChild(name);
    row.appendChild(description);
    row.appendChild(folder);
    listEl.appendChild(row);
  }
}

async function loadSkills() {
  const response = await fetch('./skills.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Impossible de charger skills.json');
  }
  const data = await response.json();
  state.skills = Array.isArray(data.skills) ? data.skills : [];
  render();
}

searchEl.addEventListener('input', (event) => {
  state.query = event.target.value;
  render();
});

loadSkills().catch((error) => {
  listEl.innerHTML = '';
  const empty = document.createElement('div');
  empty.className = 'empty';
  empty.textContent = error.message || 'Erreur de chargement.';
  listEl.appendChild(empty);
});
