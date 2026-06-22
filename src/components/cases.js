import { cases } from '../data/items.js';
import { getState, update, addHistory } from '../state.js';
import { weightedDrop, formatMoney } from '../services/random.js';

export function renderCases() {
  const state = getState();
  return `
    <section class="panel page-head"><p class="eyebrow">Кейсы</p><h1>Открытие кейсов</h1><p>Выберите кейс. Предмет попадёт в инвентарь, а событие появится в истории.</p></section>
    <section class="case-grid">${cases.map((caseItem) => `
      <article class="case-card panel">
        <div class="case-cover">${caseItem.cover}</div>
        <h2>${caseItem.name}</h2>
        <p>${caseItem.description}</p>
        <strong>${caseItem.price ? `${formatMoney(caseItem.price)} ₽` : 'Бесплатно'}</strong>
        <button class="button primary" data-open-case="${caseItem.id}" ${state.balance < caseItem.price ? 'disabled' : ''}>Открыть</button>
      </article>`).join('')}</section>`;
}

export function bindCases(root) {
  root.querySelectorAll('[data-open-case]').forEach((button) => {
    button.addEventListener('click', () => {
      const caseConfig = cases.find((item) => item.id === button.dataset.openCase);
      const drop = weightedDrop(caseConfig);
      update((draft) => {
        draft.balance -= caseConfig.price;
        draft.inventory.push(drop);
        draft.stats.casesOpened += 1;
      });
      addHistory('case', `Открыт ${caseConfig.name}: выпал ${drop.name}`, { drop });
    });
  });
}
