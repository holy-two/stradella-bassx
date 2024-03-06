export function isBlackNote (midiNote: number) {
  return [1, 3, 6, 8, 10].indexOf(midiNote % 12) >= 0
}
