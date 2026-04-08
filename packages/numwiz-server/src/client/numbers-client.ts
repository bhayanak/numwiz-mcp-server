import { triviaFacts } from '../data/trivia-data.js';
import { mathFacts } from '../data/math-data.js';
import { dateFacts } from '../data/date-data.js';
import { yearFacts } from '../data/year-data.js';

export interface NumbersApiResponse {
  text: string;
  number: number;
  found: boolean;
  type: string;
}

export interface BatchApiResponse {
  [key: string]: string;
}

type FactDataset = Record<string, string[]>;

export class NumbersClient {
  getTrivia(number: number, notfound?: 'default' | 'floor' | 'ceil'): NumbersApiResponse {
    return this.lookupFact(triviaFacts, 'trivia', number, notfound);
  }

  getMath(number: number): NumbersApiResponse {
    return this.lookupFact(mathFacts, 'math', number);
  }

  getDate(month: number, day: number): NumbersApiResponse {
    const key = `${month}/${day}`;
    const facts = dateFacts[key];
    if (facts?.length) {
      return { text: this.pick(facts), number: day, found: true, type: 'date' };
    }
    return {
      text: `${month}/${day} is a date for which we don't have facts yet.`,
      number: day,
      found: false,
      type: 'date',
    };
  }

  getYear(year: number): NumbersApiResponse {
    return this.lookupFact(yearFacts, 'year', year);
  }

  getRandom(type: 'trivia' | 'math' | 'date' | 'year' = 'trivia'): NumbersApiResponse {
    const data = this.datasetFor(type);
    const keys = Object.keys(data);
    if (!keys.length) {
      return { text: 'No facts available.', number: 0, found: false, type };
    }
    const key = this.pick(keys);
    const facts = data[key];
    return {
      text: this.pick(facts),
      number: type === 'date' ? parseInt(key.split('/')[1]) : parseInt(key),
      found: true,
      type,
    };
  }

  getBatch(numbers: number[], type: 'trivia' | 'math' = 'trivia'): BatchApiResponse {
    const data = type === 'trivia' ? triviaFacts : mathFacts;
    const result: BatchApiResponse = {};
    for (const num of numbers) {
      const facts = data[String(num)];
      result[String(num)] = facts?.length
        ? this.pick(facts)
        : `${num} is a number for which we don't have ${type} facts yet.`;
    }
    return result;
  }

  getRange(start: number, end: number, type: 'trivia' | 'math' = 'trivia'): BatchApiResponse {
    const numbers: number[] = [];
    for (let i = start; i <= end; i++) numbers.push(i);
    return this.getBatch(numbers, type);
  }

  private lookupFact(
    data: FactDataset,
    type: string,
    number: number,
    notfound?: 'default' | 'floor' | 'ceil'
  ): NumbersApiResponse {
    const facts = data[String(number)];
    if (facts?.length) {
      return { text: this.pick(facts), number, found: true, type };
    }

    if (notfound === 'floor' || notfound === 'ceil') {
      const sorted = Object.keys(data)
        .map(Number)
        .sort((a, b) => a - b);
      let fallback: number | undefined;
      if (notfound === 'floor') {
        for (const k of sorted) {
          if (k <= number) fallback = k;
          else break;
        }
      } else {
        for (const k of sorted) {
          if (k >= number) {
            fallback = k;
            break;
          }
        }
      }
      if (fallback !== undefined) {
        const ff = data[String(fallback)];
        return { text: this.pick(ff), number: fallback, found: true, type };
      }
    }

    return {
      text: `${number} is a number for which we don't have ${type} facts yet.`,
      number,
      found: false,
      type,
    };
  }

  private datasetFor(type: string): FactDataset {
    switch (type) {
      case 'math':
        return mathFacts;
      case 'date':
        return dateFacts;
      case 'year':
        return yearFacts;
      default:
        return triviaFacts;
    }
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
