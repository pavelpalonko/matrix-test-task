let id = 0

export const uniqueId = (reset: boolean) => {
  if (reset) {
    id = 0
  }
  return id++
}