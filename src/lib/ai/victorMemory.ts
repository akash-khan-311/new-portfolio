const memoryChunks: string[] = [];

export function addMemory(text: string) {
  memoryChunks.push(text);
}

export function searchMemory(query: string) {
  return memoryChunks.filter((m) =>
    m.toLowerCase().includes(query.toLowerCase())
  );
}