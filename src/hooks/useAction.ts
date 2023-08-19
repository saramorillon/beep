import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IAction } from '../models/IAction'

function toActions(values: number[]) {
  return values.reduce((acc: IAction[], curr: number, index) => {
    for (let value = curr; value > 0; value--) {
      acc.push({ index, value, beep: false })
    }
    acc.push({ index, value: 0, beep: true })
    return acc
  }, [])
}

export function useAction(values: number[]) {
  const [action, setAction] = useState<IAction>()
  const timeoutId = useRef<NodeJS.Timeout>()
  const actions = useMemo(() => toActions(values), [values])

  const update = useCallback(() => {
    setAction(actions.shift())
  }, [actions])

  useEffect(() => {
    update()
  }, [update])

  useEffect(() => {
    clearTimeout(timeoutId.current)
    if (action) {
      timeoutId.current = setTimeout(update, 1000)
    } else {
      timeoutId.current = undefined
    }
  }, [action, update])

  return action
}
