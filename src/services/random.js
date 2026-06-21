import { items } from '../data/items.js';

export function byId(id) {
  return items.find((item) => item.id === id);
}

export function createInventoryItem(item) {
  return { ...item, uid: crypto.randomUUID(), obtainedAt: new Date().toISOString() };
}

export function weightedDrop(caseConfig) {
  const pool = caseConfig.dropIds.map(byId);
  const weighted = pool.flatMap((item) => {
    const weight = Math.max(1, Math.round(1000 / Math.sqrt(item.price)));
    return Array.from({ length: weight }, () => item);
  });
  return createInventoryItem(weighted[Math.floor(Math.random() * weighted.length)]);
}

export function formatMoney(value) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value));
}
