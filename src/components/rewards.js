import { tasks, promoCodes } from '../data/tasks.js';
import { getState, claimTask, usePromo } from '../state.js';
import { formatMoney } from '../services/random.js';

export function renderRewards() {
  const state = getState();
  return `
    <section class="panel page-head"><p class="eyebrow">Бонусы</p><h1>Задания и промокоды</h1><p>Демо-награды нужны для тестирования экономики без доната.</p></section>
    <section class="reward-grid">${tasks.map((task) => {
      const progress = Math.min(state.stats[task.type], task.goal);
      const done = progress >= task.goal;
      const claimed = state.claimedTasks.includes(task.id);
      return `<article class="panel reward"><h2>${task.title}</h2><p>${progress}/${task.goal}</p><strong>+${formatMoney(task.reward)} ₽</strong><button class="button primary" data-task="${task.id}" ${!done || claimed ? 'disabled' : ''}>${claimed ? 'Получено' : 'Забрать'}</button></article>`;
    }).join('')}</section>
    <section class="panel promo"><h2>Промокоды</h2><p>Доступные демо-коды: ${Object.keys(promoCodes).join(', ')}</p><input data-promo placeholder="Введите промокод"><button class="button secondary" data-use-promo>Активировать</button></section>`;
}

export function bindRewards(root) {
  root.querySelectorAll('[data-task]').forEach((button) => button.addEventListener('click', () => claimTask(button.dataset.task)));
  root.querySelector('[data-use-promo]')?.addEventListener('click', () => usePromo(root.querySelector('[data-promo]').value));
}
