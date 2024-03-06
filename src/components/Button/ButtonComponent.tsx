import { css, cx } from '@emotion/css'
import { useCallback } from 'react'
import { type NotesContainerConnectorProps } from '../../containers/Notes/NotesContainer'

export interface ButtonProps extends NotesContainerConnectorProps {
}

export default function ButtonComponent (props: ButtonProps) {
  const { isOn, triggerNote, releaseNote, midiNote, midiNotes } = props

  const isChord = !!midiNotes
  const isMiddleC = midiNote === 48

  const trigger = useCallback(() => {
    if (isChord) {
      midiNotes.forEach(note => triggerNote(note))
    } else {
      triggerNote(midiNote!)
    }
  }, [isChord, midiNote, midiNotes, triggerNote])

  const release = useCallback(() => {
    if (isChord) {
      midiNotes.forEach(note => releaseNote(note))
    } else {
      releaseNote(midiNote!)
    }
  }, [isChord, midiNote, midiNotes, releaseNote])

  const styleWrapper = css`
    width: 1em;
    height: 1em;
    border-radius: 1em;
    border: 1px solid rgb(109, 109, 109);
    transition: backgroun-color 0.5s, transform 0.1s;
    margin: 0 0.5em;
    cursor: pointer;
    box-shadow: 1px 3px 5px black;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;

    &.isOn,&.isOn:hover {
      transform: scale(0.95) translateY(4px);
    }
  `

  const styleInner = css`
    width: 100%;
    height: 100%;
    border-radius: 1em;
    background-color: white;
    box-shadow: inset 0 0 1em #000000;

    &.middleC {
      background-color: black;
      box-shadow: inset 0 0 1em #ffffff;
    }
  `

  return (
    <div
      className={cx(styleWrapper, { isOn })}
      onPointerDown={trigger}
      onPointerUp={release}
      onPointerLeave={release}
    >
      <div
        className={cx(styleInner, {
          middleC: isMiddleC
        })}
      />
    </div>
  )
}
