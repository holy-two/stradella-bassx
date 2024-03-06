import SignalPath from './SignalPath'

const POLYPHONY_LIMIT = 12

let started = false
const availableNotes: SignalPath[] = []
const activeNotes: Record<string, SignalPath> = {}

// we need to lazily initialise our signal paths due to autoplay policies in place for browsers
// read more: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#Autoplay_policy
function initialiseWebAudioIfUninitialised<T> (fn: (props: T) => void) {
  return (props: T) => {
    if (!started) {
      for (let i = 0; i < POLYPHONY_LIMIT; i++) {
        availableNotes.push(new SignalPath())
      }
      started = true
    }
    fn(props)
  }
}

export const trigger = initialiseWebAudioIfUninitialised(function trigger (
  midiNote: number
) {
  const freeSignalPath = availableNotes.find(
    signalPath => !signalPath.isCurrentlyPlaying()
  )
  if (freeSignalPath) {
    activeNotes[midiNote] = freeSignalPath
    freeSignalPath.midiNoteOn(midiNote)
  }
})

export const release = initialiseWebAudioIfUninitialised(
  function release (
    midiNote: number
  ) {
    const usedSignalPath = activeNotes[midiNote]
    if (usedSignalPath) {
      usedSignalPath.midiNoteOff()
      delete activeNotes[midiNote]
    }
  })
