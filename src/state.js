import { items } from './data/items.js';
import { tasks, promoCodes } from './data/tasks.js';
import { createInventoryItem } from './services/random.js';

const STORAGE_KEY = 'free-case-simulator:v2';
const defaultState = {
  user: { nickname: 'Demo Player', avatar: '🧑‍🚀', steamLinked: false },
  balance: 1000,
  inventory: [createInventoryItem(items[2]), createInventoryItem(items[3]), createInventoryItem(items[4])],
  selected: [],
  history: [],
  claimedTasks: [],
  usedPromos: [],
  stats: { casesOpened: 0, upgrades: 0, contracts: 0, wins: 0, losses: 0 }
};

let state = load();
let subscribers = [];

function load() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return defaultState;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  subscribers.forEach((callback) => callback(state));
}

export function getState() {
  return state;
}

export function subscribe(callback) {
  subscribers.push(callback);
  return () => { subscribers = subscribers.filter((item) => item !== callback); };
}

export function update(mutator) {
  state = structuredClone(state);
  mutator(state);
  persist();
}

export function addHistory(type, message, payload = {}) {
  update((draft) => {
    draft.history.unshift({ id: crypto.randomUUID(), type, message, payload, createdAt: new Date().toISOString() });
    draft.history = draft.history.slice(0, 60);
  });
}

export function toggleSteam() {
  update((draft) => { draft.user.steamLinked = !draft.user.steamLinked; });
}

export function toggleSelect(uid) {
  update((draft) => {
    draft.selected = draft.selected.includes(uid) ? draft.selected.filter((id) => id !== uid) : [...draft.selected, uid];
  });
}

export function clearSelection() {
  update((draft) => { draft.selected = []; });
}

export function claimTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task || state.claimedTasks.includes(taskId) || state.stats[task.type] < task.goal) return false;
  update((draft) => {
    draft.claimedTasks.push(taskId);
    draft.balance += task.reward;
  });
  addHistory('reward', `Задание выполнено: ${task.title}. +${task.reward} ₽`);
  return true;
}

export function usePromo(code) {
  const normalized = code.trim().toUpperCase();
  if (!promoCodes[normalized] || state.usedPromos.includes(normalized)) return false;
  update((draft) => {
    draft.usedPromos.push(normalized);
    draft.balance += promoCodes[normalized];
  });
  addHistory('promo', `Промокод ${normalized} активирован. +${promoCodes[normalized]} ₽`);
  return true;
}

export function resetDemo() {
  state = structuredClone(defaultState);
  persist();
}
