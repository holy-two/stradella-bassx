import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useRef } from 'react'
import createActionEffect from './middleware/actionEffect'
import { NOTE_OFF, NOTE_ON } from './actionTypes/notes'

export const allNotes = atom([] as boolean[])

export function useAllNotesActions () {
  const setNotes = useSetAtom(allNotes)
  const actionEffect = useRef(createActionEffect())

  const noteOn = (midiNote: number) => {
    setNotes(notes => {
      notes[midiNote] = true
      return notes
    })
    actionEffect.current({
      type: NOTE_ON,
      payload: {
        midiNote
      }
    })
  }

  const noteOff = (midiNote: number) => {
    setNotes(notes => {
      notes[midiNote] = false
      return notes
    })
    actionEffect.current({
      type: NOTE_OFF,
      payload: {
        midiNote
      }
    })
  }

  return {
    noteOn, noteOff
  }
}

export function useAllNoteSelector () {
  const notes = useAtomValue(allNotes)

  const isNoteOn = useCallback((noteNumber:number) => {
    return !!notes[noteNumber]
  }, [notes])

  return {
    isNoteOn
  }
}
