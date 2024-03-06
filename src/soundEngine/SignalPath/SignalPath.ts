import getAudioContext from '../audioContext'
import createParameters from './createParameters'
import getNoteFrequency from './util/getNoteFrequency'

export type OscillatorType = OscillatorNode['type']

export type BiquadFilterType = BiquadFilterNode['type']

export default class SignalPath {
  oscA
  oscAAmp
  oscB
  oscBAmp
  amp
  filter
  note
  active
  parameters

  constructor (
    public audioContext = getAudioContext()
  ) {
    this.oscA = audioContext.createOscillator()
    this.oscAAmp = this.audioContext.createGain()
    this.oscB = this.audioContext.createOscillator()
    this.oscBAmp = this.audioContext.createGain()
    this.amp = this.audioContext.createGain()
    this.filter = this.audioContext.createBiquadFilter()
    this.note = -1
    this.active = false
    this.parameters = createParameters()
    this.oscA.start()
    this.oscA.connect(this.oscAAmp)
    this.oscAAmp.gain.value = 0.4
    this.oscAAmp.connect(this.filter)
    this.oscB.start()
    this.oscB.connect(this.oscBAmp)
    this.oscBAmp.gain.value = 0.4
    this.oscBAmp.connect(this.filter)
    this.filter.connect(this.amp)
    this.amp.gain.value = 0
    this.amp.connect(this.audioContext.destination)
  }

  midiNoteOn (midiNote: number) {
    const { currentTime } = this.audioContext
    this.note = midiNote
    this.active = true

    const noteFreq = this.note + this.parameters.bendAmount
    const oscAFreq = getNoteFrequency(noteFreq)
    const oscBFreq = getNoteFrequency(
      noteFreq + this.parameters.offset + this.parameters.detune
    )

    this.oscA.frequency.setValueAtTime(oscAFreq, currentTime)
    this.oscB.frequency.setValueAtTime(oscBFreq, currentTime)

    this.oscAAmp.gain.value = (1 - this.parameters.oscMix) * 0.5
    this.oscBAmp.gain.value = this.parameters.oscMix * 0.5

    this.oscA.type = this.parameters.oscAType as OscillatorType
    this.oscB.type = this.parameters.oscBType as OscillatorType

    this.filter.Q.setValueAtTime(
      this.parameters.filterResonance,
      currentTime
    )
    this.filter.type = this.parameters.filterType as BiquadFilterType

    this.parameters.filterEnvelope.setEnvelopeNoteOnAutomation(
      this.filter.frequency,
      this.parameters.filterCutoff,
      currentTime
    )
    this.parameters.amplitudeEnvelope.setEnvelopeNoteOnAutomation(
      this.amp.gain,
      0,
      currentTime
    )
  }

  midiNoteOff () {
    const { currentTime } = this.audioContext
    this.active = false

    this.parameters.filterEnvelope.setEnvelopeNoteOffAutomation(
      this.filter.frequency,
      this.parameters.filterCutoff,
      currentTime
    )
    this.parameters.amplitudeEnvelope.setEnvelopeNoteOffAutomation(
      this.amp.gain,
      0,
      currentTime
    )
  }

  isCurrentlyPlaying () {
    return this.amp.gain.value > 0 || this.active
  }
}
