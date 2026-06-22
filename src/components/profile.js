import { getState, toggleSteam, resetDemo } from '../state.js';
import { formatMoney } from '../services/random.js';

export function renderProfile() {
  const state = getState();
  const inventoryValue = state.inventory.reduce((sum, item) => sum + item.price, 0);
  return `
    <section class="panel page-head"><p class="eyebrow">Профиль</p><h1>${state.user.avatar} ${state.user.nickname}</h1><p>${state.user.steamLinked ? 'Демо Steam подключён' : 'Демо Steam не подключён'}</p><div class="actions"><button class="button secondary" data-steam>${state.user.steamLinked ? 'Отключить Steam' : 'Подключить Steam'}</button><button class="button danger" data-reset>Сбросить демо</button></div></section>
    <section class="metric-grid profile-metrics"><article><strong>${formatMoney(state.balance)} ₽</strong><span>баланс</span></article><article><strong>${formatMoney(inventoryValue)} ₽</strong><span>инвентарь</span></article><article><strong>${state.stats.wins}/${state.stats.losses}</strong><span>win/loss</span></article><article><strong>${state.stats.contracts}</strong><span>контракты</span></article></section>
    <section class="panel"><h2>История</h2><div class="history">${state.history.length ? state.history.map((item) => `<article><span>${new Date(item.createdAt).toLocaleString('ru-RU')}</span><strong>${item.message}</strong></article>`).join('') : '<p>История пока пустая.</p>'}</div></section>`;
}

export function bindProfile(root) {
  root.querySelector('[data-steam]')?.addEventListener('click', toggleSteam);
  root.querySelector('[data-reset]')?.addEventListener('click', resetDemo);
}
