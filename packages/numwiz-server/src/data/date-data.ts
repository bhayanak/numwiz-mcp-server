import { janFacts } from './dates/jan.js';
import { febFacts } from './dates/feb.js';
import { marFacts } from './dates/mar.js';
import { aprFacts } from './dates/apr.js';
import { mayFacts } from './dates/may.js';
import { junFacts } from './dates/jun.js';
import { julFacts } from './dates/jul.js';
import { augFacts } from './dates/aug.js';
import { sepFacts } from './dates/sep.js';
import { octFacts } from './dates/oct.js';
import { novFacts } from './dates/nov.js';
import { decFacts } from './dates/dec.js';

export const dateFacts: Record<string, string[]> = {
  ...janFacts,
  ...febFacts,
  ...marFacts,
  ...aprFacts,
  ...mayFacts,
  ...junFacts,
  ...julFacts,
  ...augFacts,
  ...sepFacts,
  ...octFacts,
  ...novFacts,
  ...decFacts,
};
