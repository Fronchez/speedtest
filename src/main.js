import { routes, currentRoute } from './router.js';
import { getState, subscribe } from './state.js';
import { bindCases } from './components/cases.js';
import { bindInventory } from './components/inventory.js';
import { bindUpgrade } from './components/upgrade.js';
import { bindContracts } from './components/contracts.js';
import { bindRewards } from './components/rewards.js';
import { bindProfile } from './components/profile.js';
import { formatMoney } from './services/random.js';

const app = document.querySelector('#app');
const binders = { cases: bindCases, inventory: bindInventory, upgrade: bindUpgrade, contracts: bindContracts, rewards: bindRewards, profile: bindProfile };

function layout(routeName, content) {
  const state = getState();
  return `
    <header class="topbar">
      <a class="brand" href="#/home"><span>FC</span><strong>Free Case</strong></a>
      <nav>${Object.entries(routes).map(([key, route]) => `<a href="#/${key}" class="${key === routeName ? 'active' : ''}">${route.label}</a>`).join('')}</nav>
      <div class="wallet"><span>${state.user.avatar}</span><strong>${formatMoney(state.balance)} ₽</strong></div>
    </header>
    <main>${content}</main>
    <footer>Free Case Simulator · Только виртуальные предметы · Не аффилировано с Valve, Steam или сторонними сайтами</footer>`;
}

export function render() {
  const routeName = routes[currentRoute()] ? currentRoute() : 'home';
  app.innerHTML = layout(routeName, routes[routeName].render());
  binders[routeName]?.(app);
}

window.addEventListener('hashchange', render);
subscribe(render);
render();
