import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

afterEach(() => {
  cleanup()
})
