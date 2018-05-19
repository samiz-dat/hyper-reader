export function isKey (value) {
  console.log(value.length)
  if (value.length !== 64) return false
  return value.match(/[a-fA-F0-9]{64}/)
}

export function isSimpleText (value) {
  return value.trim().length > 0
}
