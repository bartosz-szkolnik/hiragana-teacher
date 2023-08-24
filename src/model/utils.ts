export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

export function shuffle<T extends any[]>(array: T): T {
  let currentIndex = array.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
