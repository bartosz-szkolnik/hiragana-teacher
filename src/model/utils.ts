export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

export function shuffle<T extends any[]>(array: T): T {
  const arr = [...array] as T;
  let currentIndex = arr.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}
