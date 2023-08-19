import { renderHook } from '@testing-library/react'
import { useAction } from '../../../src/hooks/useAction'

const values = [5]

describe('useAction', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should return current action', () => {
    const { result } = renderHook(() => useAction(values))
    expect(result.current).toEqual({ index: 0, value: 5, beep: false })
  })

  it('should update action', () => {
    const { result, rerender } = renderHook(() => useAction(values))
    vi.advanceTimersByTime(1000)
    rerender()
    expect(result.current).toEqual({ index: 0, value: 4, beep: false })
  })
})
