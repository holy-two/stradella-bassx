import { css } from '@emotion/css'
import Key from '../Key'

const BASE_NOTE = 45
const KEYS = 33

export default function KeyboardComponent () {
  const styleWrapper = css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1em 0;
    perspective: 100px;
    perspective-origin: bottom;
    transform-style: preserve-3d;
    transform: rotateX(45deg);
  `

  return (
    <div className={styleWrapper}>
      {new Array(KEYS).fill(true).map((v, index) => (
        <Key key={index} midiNote={BASE_NOTE + index} />
      ))}
    </div>
  )
}
