import random from 'random';

export function generateRandomCode(): string {
  return random.int(1000, 9999).toString();
}
