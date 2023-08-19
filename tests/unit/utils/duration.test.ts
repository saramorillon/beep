import { describe, expect, it } from 'vitest'
import { formatDuration } from '../../../src/utils/duration'

describe('formatDuration', () => {
  it('should return hour, minutes and seconds', () => {
    expect(formatDuration({ values: [12589] })).toBe('03h29m49s')
  })

  it('should return minutes and seconds if duration is less than 1h', () => {
    expect(formatDuration({ values: [1258] })).toBe('20m58s')
  })

  it('should return seconds if duration is less than 1m', () => {
    expect(formatDuration({ values: [12] })).toBe('12s')
  })
})
