import { trigger, release } from '../../soundEngine'

import { NOTE_ON, NOTE_OFF } from '../actionTypes/notes'

export interface Action {
  type: string
  payload: {
    midiNote: number
  }
}

export default function createActionEffect () {
  return (action: Action) => {
    if (action.type === NOTE_ON) {
      trigger(action.payload.midiNote)
    } else if (action.type === NOTE_OFF) {
      console.log(action)
      release(action.payload.midiNote)
    }
  }
}
