export const rarities = {
  consumer: { label: 'Consumer', color: '#9ca3af', multiplier: 1 },
  industrial: { label: 'Industrial', color: '#60a5fa', multiplier: 1.4 },
  milspec: { label: 'Mil-Spec', color: '#2563eb', multiplier: 2.2 },
  restricted: { label: 'Restricted', color: '#7c3aed', multiplier: 3.4 },
  classified: { label: 'Classified', color: '#d946ef', multiplier: 5.2 },
  covert: { label: 'Covert', color: '#ef4444', multiplier: 8 },
  rare: { label: 'Rare Special', color: '#f59e0b', multiplier: 20 }
};

export const items = [
  { id: 'p250-sand', name: 'P250 | Sand Dune', price: 18, rarity: 'consumer', icon: '🔸' },
  { id: 'mp9-feather', name: 'MP9 | Featherweight', price: 42, rarity: 'industrial', icon: '🪽' },
  { id: 'usp-cortex', name: 'USP-S | Cortex', price: 180, rarity: 'restricted', icon: '🧠' },
  { id: 'glock-vogue', name: 'Glock-18 | Vogue', price: 140, rarity: 'restricted', icon: '💎' },
  { id: 'ak-neon', name: 'AK-47 | Neon Rider', price: 420, rarity: 'classified', icon: '🔫' },
  { id: 'm4-printstream', name: 'M4A1-S | Printstream', price: 780, rarity: 'covert', icon: '⚡' },
  { id: 'awp-asiimov', name: 'AWP | Asiimov', price: 920, rarity: 'covert', icon: '🎯' },
  { id: 'deagle-blaze', name: 'Desert Eagle | Blaze', price: 2600, rarity: 'covert', icon: '🔥' },
  { id: 'karambit-doppler', name: 'Karambit | Doppler', price: 4200, rarity: 'rare', icon: '🔪' },
  { id: 'butterfly-fade', name: 'Butterfly Knife | Fade', price: 6800, rarity: 'rare', icon: '🦋' }
];

export const cases = [
  {
    id: 'starter',
    name: 'Starter Case',
    price: 0,
    cover: '🎁',
    description: 'Бесплатный кейс для старта: дешёвые скины и небольшой шанс на хороший дроп.',
    dropIds: ['p250-sand', 'mp9-feather', 'usp-cortex', 'glock-vogue', 'ak-neon']
  },
  {
    id: 'neon',
    name: 'Neon Upgrade Case',
    price: 95,
    cover: '🌈',
    description: 'Средний кейс для фарма апгрейдов и контрактов.',
    dropIds: ['mp9-feather', 'usp-cortex', 'glock-vogue', 'ak-neon', 'm4-printstream', 'awp-asiimov']
  },
  {
    id: 'premium',
    name: 'Premium Dream Case',
    price: 350,
    cover: '💠',
    description: 'Дорогой виртуальный кейс с шансом на ножи и топовые предметы.',
    dropIds: ['ak-neon', 'm4-printstream', 'awp-asiimov', 'deagle-blaze', 'karambit-doppler', 'butterfly-fade']
  }
];
