const items = [
  { name: 'AK-47 | Neon Rider', price: 420, rarity: 'Classified', icon: '🔫', color: '#d946ef' },
  { name: 'AWP | Asiimov', price: 920, rarity: 'Covert', icon: '🎯', color: '#f97316' },
  { name: 'M4A1-S | Printstream', price: 780, rarity: 'Covert', icon: '⚡', color: '#e5e7eb' },
  { name: 'USP-S | Cortex', price: 180, rarity: 'Restricted', icon: '🧠', color: '#60a5fa' },
  { name: 'Glock-18 | Vogue', price: 140, rarity: 'Restricted', icon: '💎', color: '#38bdf8' },
  { name: 'Karambit | Doppler', price: 4200, rarity: 'Exceedingly Rare', icon: '🔪', color: '#a855f7' },
  { name: 'Desert Eagle | Blaze', price: 2600, rarity: 'Covert', icon: '🔥', color: '#ef4444' },
  { name: 'P250 | See Ya Later', price: 220, rarity: 'Classified', icon: '🐊', color: '#22c55e' }
];

let state = JSON.parse(localStorage.getItem('free-case-state') || 'null') || {
  balance: 500,
  inventory: [items[3], items[4]],
  selectedIndex: null,
  upgrades: 12843,
  players: 587420,
  loggedIn: false,
  lastReward: 0
};

const $ = (id) => document.getElementById(id);
const save = () => localStorage.setItem('free-case-state', JSON.stringify(state));
const money = (value) => new Intl.NumberFormat('ru-RU').format(Math.round(value));

function render() {
  $('balance').textContent = money(state.balance);
  $('onlineCount').textContent = money(1800 + Math.floor(Math.random() * 700));
  $('playersCount').textContent = money(state.players);
  $('upgradesCount').textContent = money(state.upgrades);
  $('loginBtn').textContent = state.loggedIn ? 'Демо-профиль активен' : 'Войти через Steam';

  $('inventoryGrid').innerHTML = state.inventory.map((item, index) => `
    <article class="item ${state.selectedIndex === index ? 'selected' : ''}" data-index="${index}">
      <div class="skin" style="--rarity:${item.color}">${item.icon}</div>
      <h3>${item.name}</h3>
      <div class="rarity">${item.rarity}</div>
      <div class="price">${money(item.price)} ₽</div>
    </article>
  `).join('');

  $('targetSelect').innerHTML = items.map((item, index) => `<option value="${index}">${item.name} — ${money(item.price)} ₽</option>`).join('');
  renderSelection();
}

function renderSelection() {
  const source = state.selectedIndex === null ? null : state.inventory[state.selectedIndex];
  $('selectedStrip').textContent = source ? `${source.name} · ${money(source.price)} ₽` : 'Выбранные предметы появятся здесь';
  $('sourceSlot').textContent = source ? `${source.icon} ${source.name} · ${money(source.price)} ₽` : 'Выберите предмет из инвентаря';
  updateChance();
}

function updateChance() {
  const source = state.selectedIndex === null ? null : state.inventory[state.selectedIndex];
  const target = items[$('targetSelect').value || 0];
  const chance = source ? Math.min(75, Math.max(1, (source.price / target.price) * 70)) : 0;
  $('chanceValue').textContent = `${chance.toFixed(1)}%`;
  document.querySelector('.chance-ring').style.setProperty('--deg', `${chance * 3.6}deg`);
  return chance;
}

function openCase() {
  const roll = Math.random();
  const pool = roll > .97 ? items.slice(5) : roll > .78 ? items.slice(1, 4) : items.slice(3);
  const drop = { ...pool[Math.floor(Math.random() * pool.length)] };
  state.inventory.push(drop);
  state.balance = Math.max(0, state.balance - 50);
  save(); render();
  $('upgradeResult').innerHTML = `<span class="win">Выпал предмет: ${drop.icon} ${drop.name}</span>`;
}

function claimDaily() {
  const now = Date.now();
  if (now - state.lastReward < 30_000) {
    $('upgradeResult').innerHTML = '<span class="lose">Демо-награда уже получена. Подождите 30 секунд.</span>';
    return;
  }
  state.balance += 150;
  state.lastReward = now;
  save(); render();
  $('upgradeResult').innerHTML = '<span class="win">Начислена ежедневная награда: 150 ₽</span>';
}

$('inventoryGrid').addEventListener('click', (event) => {
  const card = event.target.closest('.item');
  if (!card) return;
  state.selectedIndex = Number(card.dataset.index);
  save(); render();
});
$('targetSelect').addEventListener('change', updateChance);
$('openCaseBtn').addEventListener('click', openCase);
$('dailyBtn').addEventListener('click', claimDaily);
$('loginBtn').addEventListener('click', () => { state.loggedIn = !state.loggedIn; save(); render(); });
$('upgradeBtn').addEventListener('click', () => {
  if (state.selectedIndex === null) {
    $('upgradeResult').innerHTML = '<span class="lose">Сначала выберите предмет для апгрейда.</span>';
    return;
  }
  const chance = updateChance();
  const target = { ...items[$('targetSelect').value] };
  const source = state.inventory[state.selectedIndex];
  state.inventory.splice(state.selectedIndex, 1);
  state.selectedIndex = null;
  state.upgrades += 1;
  if (Math.random() * 100 <= chance) {
    state.inventory.push(target);
    $('upgradeResult').innerHTML = `<span class="win">Успех! ${source.name} улучшен до ${target.name}</span>`;
  } else {
    $('upgradeResult').innerHTML = `<span class="lose">Неудача. ${source.name} сгорел — попробуйте ещё раз.</span>`;
  }
  save(); render();
});

render();
setInterval(render, 12000);
