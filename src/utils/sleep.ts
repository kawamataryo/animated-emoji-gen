export const wait = async (ms: number) =>
  await new Promise((r) => setTimeout(r, ms));
