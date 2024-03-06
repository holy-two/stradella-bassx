import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import createActionEffect from './middleware/actionEffect'
import { NOTE_ON } from './actionTypes/notes'

export const allNotes = atom([] as boolean[])

export function useAllNotesActions () {
  const [notes, setNotes] = useAtom(allNotes)
  const [action, setAction] = useState('init')
  const [actionPayload, setActionPayload] = useState({
    midiNote: -1
  })
  const actionEffect = createActionEffect()

  useEffect(() => {
    actionEffect({ type: action, payload: actionPayload })
    const newNotes = notes.slice()
    if (action === NOTE_ON) {
      newNotes[actionPayload.midiNote] = true // 此步骤存疑
    } else {
      newNotes[actionPayload.midiNote] = false // 此步骤存疑
    }
    setNotes(newNotes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, actionEffect, actionPayload])

  const noteOn = (midiNote: number) => {
    setAction(NOTE_ON)
    setActionPayload({ midiNote })
  }

  const noteOff = (midiNote: number) => {
    setAction(NOTE_ON)
    setActionPayload({ midiNote })
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
