import { rarities } from '../data/items.js';
import { formatMoney } from '../services/random.js';

export function itemCard(item, selected = false) {
  const rarity = rarities[item.rarity];
  return `
    <article class="item-card ${selected ? 'selected' : ''}" data-uid="${item.uid || item.id}">
      <div class="skin-preview" style="--rarity:${rarity.color}">${item.icon}</div>
      <div>
        <h3>${item.name}</h3>
        <p>${rarity.label}</p>
        <strong>${formatMoney(item.price)} ₽</strong>
      </div>
    </article>`;
}

export function emptyState(title, text) {
  return `<div class="empty"><strong>${title}</strong><span>${text}</span></div>`;
}
