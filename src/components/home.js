import { getState } from '../state.js';
import { formatMoney } from '../services/random.js';

export function renderHome() {
  const state = getState();
  const inventoryValue = state.inventory.reduce((sum, item) => sum + item.price, 0);
  return `
    <section class="hero panel">
      <div>
        <p class="eyebrow">Полноценный бесплатный симулятор</p>
        <h1>Кейсы, апгрейды, контракты, бонусы и профиль — без депозитов</h1>
        <p>Это самостоятельный демо-проект с виртуальным балансом и предметами. Он не копирует чужой бренд, но закрывает механику case/opening + upgrade-сервисов.</p>
        <div class="actions"><a class="button primary" href="#/cases">Открыть кейсы</a><a class="button secondary" href="#/upgrade">Апгрейднуть скин</a></div>
      </div>
      <div class="metric-grid">
        <article><strong>${formatMoney(state.balance)} ₽</strong><span>баланс</span></article>
        <article><strong>${state.inventory.length}</strong><span>предметов</span></article>
        <article><strong>${formatMoney(inventoryValue)} ₽</strong><span>стоимость инвентаря</span></article>
        <article><strong>${state.history.length}</strong><span>событий в ленте</span></article>
      </div>
    </section>
    <section class="panel split">
      <article><h2>Что реализовано</h2><ul class="feature-list"><li>Открытие нескольких кейсов с весами дропа</li><li>Инвентарь с выбором предметов</li><li>Апгрейд с расчётом шанса</li><li>Контракт из 3–10 предметов</li><li>Задания, промокоды, профиль и история</li></ul></article>
      <article><h2>Важно</h2><p>Все значения виртуальные. Нет реальных платежей, вывода, авторизации Steam или азартных ставок.</p></article>
    </section>`;
}
