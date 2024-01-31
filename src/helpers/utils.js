export const transformId = id => {
  const words = id.split('-')
  const transformedWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  })
  return transformedWords.join('')
}

export function getAdjacentElements(arr, index) {
  const len = arr.length
  let newPrev, newNext

  if (index < 0 || len <= 0) return

  index - 1 >= 0 ? (newPrev = index - 1) : (newPrev = index + len - 1)
  index + 1 >= len ? (newNext = index + 1 - len) : (newNext = index + 1)

  return {
    newPrev,
    newNext
  }
}
