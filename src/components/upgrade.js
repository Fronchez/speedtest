import { items } from '../data/items.js';
import { getState, update, addHistory, clearSelection } from '../state.js';
import { createInventoryItem, formatMoney } from '../services/random.js';
import { itemCard, emptyState } from './shared.js';

function chance(sourcePrice, targetPrice) {
  return Math.min(80, Math.max(1, (sourcePrice / targetPrice) * 72));
}

export function renderUpgrade() {
  const state = getState();
  const selected = state.inventory.find((item) => state.selected.includes(item.uid));
  const source = selected ? itemCard(selected, true) : emptyState('Предмет не выбран', 'Выберите один предмет в инвентаре.');
  return `
    <section class="panel page-head"><p class="eyebrow">Апгрейд</p><h1>Улучшение предмета</h1><p>Выберите один предмет, затем цель. При проигрыше исходный предмет исчезает.</p></section>
    <section class="panel upgrader"><div>${source}</div><div class="chance-box"><strong data-chance>0%</strong><span>шанс успеха</span></div><div><select data-target>${items.map((item) => `<option value="${item.id}">${item.name} — ${formatMoney(item.price)} ₽</option>`).join('')}</select><button class="button primary wide" data-upgrade>Запустить апгрейд</button></div></section>`;
}

export function bindUpgrade(root) {
  const target = root.querySelector('[data-target]');
  const chanceNode = root.querySelector('[data-chance]');
  const recalc = () => {
    const state = getState();
    const selected = state.inventory.find((item) => state.selected.includes(item.uid));
    const targetItem = items.find((item) => item.id === target.value);
    chanceNode.textContent = selected ? `${chance(selected.price, targetItem.price).toFixed(1)}%` : '0%';
  };
  target?.addEventListener('change', recalc);
  recalc();
  root.querySelector('[data-upgrade]')?.addEventListener('click', () => {
    const state = getState();
    const selected = state.inventory.find((item) => state.selected.includes(item.uid));
    if (!selected) return addHistory('error', 'Апгрейд не запущен: предмет не выбран');
    const targetItem = items.find((item) => item.id === target.value);
    const win = Math.random() * 100 <= chance(selected.price, targetItem.price);
    update((draft) => {
      draft.inventory = draft.inventory.filter((item) => item.uid !== selected.uid);
      draft.selected = [];
      draft.stats.upgrades += 1;
      if (win) { draft.inventory.push(createInventoryItem(targetItem)); draft.stats.wins += 1; } else { draft.stats.losses += 1; }
    });
    addHistory(win ? 'win' : 'loss', win ? `Апгрейд успешен: ${targetItem.name}` : `Апгрейд не удался: ${selected.name}`);
    clearSelection();
  });
}
