export default class Envelope {
  attack
  decay
  sustain
  release
  amount

  constructor (
    scale: number
  ) {
    this.attack = 0
    this.decay = 2
    this.sustain = 0
    this.release = 0
    this.amount = scale
  }

  setEnvelopeNoteOnAutomation (parameter: AudioParam, base: number, currentTime: number) {
    parameter.cancelScheduledValues(currentTime)
    parameter.setValueAtTime(base, currentTime)
    parameter.linearRampToValueAtTime(
      base + this.amount,
      currentTime + this.attack
    )
    parameter.linearRampToValueAtTime(
      base + this.sustain * this.amount,
      currentTime + this.attack + this.decay
    )
  }

  setEnvelopeNoteOffAutomation (parameter: AudioParam, base: number, currentTime: number) {
    parameter.cancelScheduledValues(currentTime)
    parameter.setValueAtTime(parameter.value, currentTime)
    parameter.linearRampToValueAtTime(base, currentTime + this.release)
  }
}
