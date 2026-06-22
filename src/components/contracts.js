import { items } from '../data/items.js';
import { getState, update, addHistory, clearSelection } from '../state.js';
import { createInventoryItem, formatMoney } from '../services/random.js';
import { itemCard } from './shared.js';

export function renderContracts() {
  const state = getState();
  const selected = state.inventory.filter((item) => state.selected.includes(item.uid));
  const value = selected.reduce((sum, item) => sum + item.price, 0);
  return `
    <section class="panel page-head"><p class="eyebrow">Контракты</p><h1>Контракт обмена</h1><p>Выберите от 3 до 10 предметов. Симулятор выдаст один предмет примерно на 110–170% от суммы контракта.</p><div class="toolbar"><strong>Выбрано: ${selected.length}/10</strong><strong>Сумма: ${formatMoney(value)} ₽</strong></div></section>
    <section class="item-grid compact">${selected.map((item) => itemCard(item, true)).join('')}</section>
    <button class="button primary floating" data-contract ${selected.length < 3 || selected.length > 10 ? 'disabled' : ''}>Собрать контракт</button>`;
}

export function bindContracts(root) {
  root.querySelector('[data-contract]')?.addEventListener('click', () => {
    const state = getState();
    const selected = state.inventory.filter((item) => state.selected.includes(item.uid));
    if (selected.length < 3 || selected.length > 10) return;
    const targetValue = selected.reduce((sum, item) => sum + item.price, 0) * (1.1 + Math.random() * 0.6);
    const prize = items.reduce((best, item) => Math.abs(item.price - targetValue) < Math.abs(best.price - targetValue) ? item : best, items[0]);
    update((draft) => {
      draft.inventory = draft.inventory.filter((item) => !draft.selected.includes(item.uid));
      draft.inventory.push(createInventoryItem(prize));
      draft.stats.contracts += 1;
      draft.selected = [];
    });
    addHistory('contract', `Контракт собран: получен ${prize.name}`);
    clearSelection();
  });
}
