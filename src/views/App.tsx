import React, { useState } from 'react'
import { IExercise } from '../models/IExercise'
import { Exercise } from './Exercise'
import { Timeline } from './Timeline'

const exercises = [
  { name: 'Exercice 1', values: [5, 20, 5, 20, 5, 20, 5, 20, 5, 20, 5, 20, 1] },
  {
    name: 'Exercice complet',
    values: [
      5, 20, 5, 20, 5, 20, 5, 20, 5, 20, 5, 20, 1, 20, 5, 30, 5, 30, 5, 30, 5, 30, 5, 30, 5, 30, 1, 20, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
    ],
  },
]

export function App(): JSX.Element | null {
  const [exercise, setExercise] = useState<IExercise>()

  return (
    <main>
      <Exercise onRun={setExercise} />

      {exercises.map((exercise) => (
        <Exercise key={exercise.name} exercise={exercise} onRun={setExercise} />
      ))}

      <Timeline exercise={exercise} onStop={() => setExercise(undefined)} />
    </main>
  )
}
