import { css, cx } from '@emotion/css'
import { NotesContainerConnectorProps } from '../../containers/Notes/NotesContainer'
import { isBlackNote } from '../../utils/isBlackNote'

export interface KeyProps extends NotesContainerConnectorProps {
}
export default function KeyComponent (props: KeyProps) {
  const { midiNote, isOn, triggerNote, releaseNote } = props

  const styleWrapper = css`
    font-size: 2rem;
    height: 5em;
    border: 1px solid black;
    width: 1em;
    box-sizing: border-box;
    transition: background-color 0.2s, transform 0.2s;
    cursor: pointer;
    background-color: white;
    -webkit-tap-highlight-color: transparent;
    user-select: none;

    &:hover {
      background-color: red;
    }

    &.blackNote {
      background-color: black;
      margin-left: -0.3em;
      margin-right: -0.3em;
      height: 3.5em;
      width: 0.6em;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      transform: translateZ(3px);

      &.on {
        transform: translateZ(1px);
      }
    }

    &.on,&.on:hover {
      background-color: green;
      transform: translateZ(-2px);
    }
  `

  return (
    <div
      className={cx(styleWrapper, {
        blackNote: isBlackNote(midiNote!),
        on: isOn
      })}
      onPointerDown={() => triggerNote(midiNote!)}
      onPointerUp={() => releaseNote(midiNote!)}
      onPointerLeave={() => releaseNote(midiNote!)}
    />
  )
}
