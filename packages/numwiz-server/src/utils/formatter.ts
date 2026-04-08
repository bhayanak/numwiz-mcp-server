import { NumbersApiResponse, BatchApiResponse } from '../client/numbers-client.js';

const TYPE_EMOJI: Record<string, string> = {
  trivia: '🎲',
  math: '🔢',
  date: '📅',
  year: '📜',
};

export function formatSingleFact(response: NumbersApiResponse): string {
  const emoji = TYPE_EMOJI[response.type] || '✨';
  const typeLabel = response.type.charAt(0).toUpperCase() + response.type.slice(1);
  const lines = [
    `${emoji} Number ${typeLabel}: ${response.number}`,
    '',
    response.text,
    '',
    `Type: ${response.type}`,
    `Source: numbersapi.com`,
  ];
  return lines.join('\n');
}

export function formatBatchFacts(results: BatchApiResponse, type: 'trivia' | 'math'): string {
  const emoji = TYPE_EMOJI[type] || '✨';
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  const header = `${emoji} Batch ${typeLabel} Facts\n`;

  const entries = Object.entries(results)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([num, text]) => `• ${num}: ${text}`)
    .join('\n');

  return `${header}\n${entries}\n\nType: ${type}\nSource: numbersapi.com`;
}

export function formatInteresting(
  number: number,
  trivia: NumbersApiResponse,
  math: NumbersApiResponse
): string {
  const props: string[] = [];

  if (isPrime(number)) props.push('Prime number');
  if (isPerfectSquare(number)) props.push(`Perfect square (√${number} = ${Math.sqrt(number)})`);
  if (isFibonacci(number)) props.push('Fibonacci number');
  if (isPalindrome(number)) props.push('Palindrome');
  if (number > 0 && isPowerOfTwo(number)) props.push('Power of 2');

  const lines = [
    `🔍 Number Analysis: ${number}`,
    '',
    '**Mathematical Properties**:',
    ...(props.length > 0 ? props.map((p) => `• ${p}`) : ['• No special properties detected']),
    '',
    '**Trivia**: ' + trivia.text,
    '**Math**: ' + math.text,
    '',
    'Source: numbersapi.com',
  ];
  return lines.join('\n');
}

function isPrime(n: number): boolean {
  if (n < 2 || !Number.isInteger(n)) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPerfectSquare(n: number): boolean {
  if (n < 0) return false;
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

function isFibonacci(n: number): boolean {
  if (n < 0) return false;
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
}

function isPalindrome(n: number): boolean {
  const s = String(Math.abs(n));
  return s === s.split('').reverse().join('');
}

function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
