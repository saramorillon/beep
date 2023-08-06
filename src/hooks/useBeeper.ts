import { useEffect } from 'react'
import { IAction } from '../models/IAction'

const beep = new Audio('./beep.aac')

export function useBeeper(action?: IAction) {
  useEffect(() => {
    if (action && action.beep) {
      void beep.play()
    }
  }, [action])
}
