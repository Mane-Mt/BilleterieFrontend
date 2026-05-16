// src/app/models/concert-emoji.constants.ts

export const CONCERT_EMOJI_GROUPS = [
  {
    label: '🎵 Styles Musicaux',
    options: [
      { value: 'pop', emoji: '🎤', label: 'Pop' },
      { value: 'rock', emoji: '🎸', label: 'Rock' },
      { value: 'electro', emoji: '⚡', label: 'Électro / Techno' },
      { value: 'hiphop', emoji: '🧢', label: 'Rap / Hip-Hop' },
      { value: 'jazz', emoji: '🎷', label: 'Jazz / Blues' },
      { value: 'classique', emoji: '🎻', label: 'Classique & Opéra' }
    ]
  },
  {
    label: '🎪 Formats de Scène',
    options: [
      { value: 'festival', emoji: '🎪', label: 'Festival' },
      { value: 'openair', emoji: '🌳', label: 'Open Air' },
      { value: 'clubbing', emoji: '🪩', label: 'Soirée / Clubbing' },
      { value: 'djset', emoji: '💿', label: 'DJ Set / Live' }
    ]
  },
  {
    label: '🏖️ Ambiances & Lieux',
    options: [
      { value: 'stade', emoji: '🏟️', label: 'Stade / Grande Aréna' },
      { value: 'bar', emoji: '🍻', label: 'Bar / Concert Intimiste' },
      { value: 'beachparty', emoji: '🏖️', label: 'Plage / Rooftop' },
      { value: 'acoustique', emoji: '🕯️', label: 'Session Acoustique' }
    ]
  }
];

// On génère le dictionnaire plat et on l'EXPORTE
export const flatEmojiMap: Record<string, string> = {};

for (const group of CONCERT_EMOJI_GROUPS) {
  for (const opt of group.options) {
    flatEmojiMap[opt.value] = opt.emoji;
  }
}