import { renderHome } from './components/home.js';
import { renderCases } from './components/cases.js';
import { renderInventory } from './components/inventory.js';
import { renderUpgrade } from './components/upgrade.js';
import { renderContracts } from './components/contracts.js';
import { renderRewards } from './components/rewards.js';
import { renderProfile } from './components/profile.js';

export const routes = {
  home: { label: 'Главная', render: renderHome },
  cases: { label: 'Кейсы', render: renderCases },
  inventory: { label: 'Инвентарь', render: renderInventory },
  upgrade: { label: 'Апгрейд', render: renderUpgrade },
  contracts: { label: 'Контракты', render: renderContracts },
  rewards: { label: 'Бонусы', render: renderRewards },
  profile: { label: 'Профиль', render: renderProfile }
};

export function currentRoute() {
  return location.hash.replace('#/', '') || 'home';
}

export function navigate(route) {
  location.hash = `#/${route}`;
}
