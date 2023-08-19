import { renderHook } from '@testing-library/react'
import { useBeeper } from '../../../src/hooks/useBeeper'

describe('useBeeper', () => {
  beforeEach(() => {
    vi.spyOn(Audio.prototype, 'play').mockResolvedValue(undefined)
  })

  it('should not beep if action is undefined', () => {
    renderHook(() => useBeeper())
    expect(Audio.prototype.play).not.toHaveBeenCalled()
  })

  it('should not beep if action is not a beep action', () => {
    renderHook(() => useBeeper({ index: 0, value: 0, beep: false }))
    expect(Audio.prototype.play).not.toHaveBeenCalled()
  })

  it('should beep if action is a beep action', () => {
    renderHook(() => useBeeper({ index: 0, value: 0, beep: true }))
    expect(Audio.prototype.play).toHaveBeenCalled()
  })
})
