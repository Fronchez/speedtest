import { getState, toggleSelect, clearSelection } from '../state.js';
import { itemCard, emptyState } from './shared.js';
import { formatMoney } from '../services/random.js';

export function renderInventory() {
  const state = getState();
  const selectedValue = state.inventory.filter((item) => state.selected.includes(item.uid)).reduce((sum, item) => sum + item.price, 0);
  return `
    <section class="panel page-head"><p class="eyebrow">Инвентарь</p><h1>Предметы игрока</h1><p>Кликайте по карточкам, чтобы выбрать предметы для апгрейда или контракта.</p><div class="toolbar"><strong>Выбрано: ${state.selected.length}</strong><strong>Сумма: ${formatMoney(selectedValue)} ₽</strong><button class="button secondary" data-clear-selection>Снять выбор</button></div></section>
    <section class="item-grid">${state.inventory.length ? state.inventory.map((item) => itemCard(item, state.selected.includes(item.uid))).join('') : emptyState('Инвентарь пуст', 'Откройте кейс или активируйте бонус.')}</section>`;
}

export function bindInventory(root) {
  root.querySelectorAll('.item-card').forEach((card) => card.addEventListener('click', () => toggleSelect(card.dataset.uid)));
  root.querySelector('[data-clear-selection]')?.addEventListener('click', clearSelection);
}
