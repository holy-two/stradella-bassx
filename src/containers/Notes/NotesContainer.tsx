import { PropsWithChildren, useCallback, useMemo } from 'react'
import { useAllNoteSelector, useAllNotesActions } from '../../store'
import type { JSX } from 'react/jsx-runtime'

export interface NotesContainerConnectorOwnProps {
  midiNote?: number
  midiNotes?: number[]
}

export interface NotesContainerComponentTrigger {
  (midiNote: number): void
}

export interface NotesContainerConnectorProvidProps {
  isOn: boolean
  triggerNote: NotesContainerComponentTrigger
  releaseNote: NotesContainerComponentTrigger
}

export interface NotesContainerConnectorProps extends NotesContainerConnectorOwnProps, NotesContainerConnectorProvidProps { }

export interface NotesContainerComponent {
  (
    props: NotesContainerConnectorProps
  ): JSX.Element
}

export default function NotesContainer (Comp: NotesContainerComponent) {
  return (props: PropsWithChildren<NotesContainerConnectorOwnProps>) => {
    const { midiNote, midiNotes } = props
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isNoteOn } = useAllNoteSelector()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isOn = useMemo(() => {
      if (Array.isArray(midiNotes)) {
        return midiNotes.every(midiNote => isNoteOn(midiNote))
      } else {
        return isNoteOn(midiNote!)
      }
    }, [midiNote, midiNotes, isNoteOn])

    const {
      noteOn, noteOff
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useAllNotesActions()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const triggerNote = useCallback((midiNote: number) => {
      noteOn(midiNote)
    }, [noteOn])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const releaseNote = useCallback((midiNote: number) => {
      noteOff(midiNote)
    }, [noteOff])

    const providProps = {
      isOn, triggerNote, releaseNote, midiNote, midiNotes
    }

    return (
      <Comp {...providProps}>
        {props.children}
      </Comp>
    )
  }
}
