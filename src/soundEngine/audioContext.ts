let audioContext:AudioContext

document.addEventListener('click', () => {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
})

export default function getAudioContext () {
  return audioContext
}
