import { IconPlayerPlay } from '@tabler/icons-react'
import React, { FormEvent, useCallback, useRef } from 'react'
import { IExercise } from '../models/IExercise'
import { formatDuration } from '../utils/duration'

interface IExerciseProps {
  exercise?: IExercise
  onRun: (exercise: IExercise) => void
}

export function Exercise({ exercise, onRun }: IExerciseProps) {
  if (exercise) {
    return (
      <article className="mt1 flex items-center gap1">
        <kbd>{formatDuration(exercise)}</kbd>
        <span className="nowrap">{exercise.name}</span>
        <code>{exercise.values.join(' ')}</code>
        <button data-variant="primary" className="ml-auto nowrap" onClick={() => onRun(exercise)}>
          <IconPlayerPlay /> Run
        </button>
      </article>
    )
  }

  return <ExerciseForm onRun={onRun} />
}

function ExerciseForm({ onRun }: IExerciseProps) {
  const values = useRef<HTMLInputElement>(null)

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (values.current) {
        onRun({ values: values.current.value.split(/\s|\n/).map(Number) })
      }
    },
    [onRun],
  )

  return (
    <article>
      <form onSubmit={submit} className="mt1 flex items-center gap1">
        <input ref={values} placeholder="Serie" required className="flex-auto" />

        <button data-variant="primary" className="ml-auto">
          <IconPlayerPlay /> Run
        </button>
      </form>
    </article>
  )
}
