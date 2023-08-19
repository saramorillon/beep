import { IExercise } from '../models/IExercise'

function pad(value: number, suffix: string) {
  if (value === 0) return ''
  return value.toString().padStart(2, '0') + suffix
}

export function formatDuration(exercise: IExercise) {
  const time = exercise.values.reduce((acc, curr) => acc + curr, 0)

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = time - hours * 3600 - minutes * 60

  return [pad(hours, 'h'), pad(minutes, 'm'), pad(seconds, 's')].join('')
}
