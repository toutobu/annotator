import { Morpheme, UnitType } from '@/persister';

export const formatMorphemeTitle = (morphemes: Array<Morpheme>) => (
  morphemes.map((m: Morpheme) => (
    `${m.surface}, ${m.pos}, ${m.subpos1}, ${m.form}`
  )).join('\n')
);

export const trim = (x: string) => x.trim();
