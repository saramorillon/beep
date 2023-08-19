import { IconCaretUp, IconPlayerStop } from '@tabler/icons-react'
import React from 'react'
import { useAction } from '../hooks/useAction'
import { useBeeper } from '../hooks/useBeeper'
import { IExercise } from '../models/IExercise'
import { formatDuration } from '../utils/duration'

interface ITimelineProps {
  exercise?: IExercise
  onStop: () => void
}

export function Timeline({ exercise, onStop }: ITimelineProps) {
  const action = useAction(exercise ? exercise.values : [])

  useBeeper(action)

  if (!action || !exercise) {
    return null
  }

  const maxWidth = Math.max(...exercise.values).toString().length * 3

  return (
    <>
      <h1 className="center relative">
        <button type="button" onClick={onStop} data-variant="outlined" className="absolute right-0">
          <IconPlayerStop /> Stop
        </button>
        {exercise.name || 'Serie'} <kbd>{formatDuration(exercise)}</kbd>
      </h1>
      <div
        className="timeline flex overflow-hidden"
        style={{ marginLeft: `calc(50% - ${maxWidth / 2}rem - ${action.index * maxWidth}rem)` }}
      >
        {exercise.values.map((value, index) => (
          <div
            key={index}
            className={`center timeline-item ${index === action.index ? 'active' : ''}`}
            style={{ width: `${maxWidth}rem` }}
          >
            {index === action.index ? action.value : index < action.index ? 0 : value}
          </div>
        ))}
      </div>
      <h1 className="center">
        <IconCaretUp />
      </h1>
    </>
  )
}
