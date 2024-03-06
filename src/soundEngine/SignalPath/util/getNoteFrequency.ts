export default function getNoteFrequency(midiNote: number) {
  return Math.pow(2, (midiNote - 69) / 12) * 440
}
