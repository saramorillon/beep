import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAction } from '../../../src/hooks/useAction'
import { App } from '../../../src/views/App'

vi.mock('../../../src/hooks/useAction')
vi.mock('../../../src/hooks/useBeeper')

describe('App', () => {
  beforeEach(() => {
    vi.mocked(useAction).mockReturnValue({ index: 0, value: 1, beep: false })
  })

  it('should render exercise form', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Serie')).toBeInTheDocument()
  })

  it('should render exercises', () => {
    render(<App />)
    expect(screen.getByText('Exercice 1')).toBeInTheDocument()
  })

  it('should render timeline when running exercise', () => {
    render(<App />)
    fireEvent.click(screen.getAllByText('Run')[1])
    expect(screen.getByText('Stop')).toBeInTheDocument()
  })

  it('should erase exercise when stopping timeline', () => {
    render(<App />)
    fireEvent.click(screen.getAllByText('Run')[1])
    expect(screen.getAllByText('Exercice 1')).toHaveLength(2)
    fireEvent.click(screen.getByText('Stop'))
    expect(screen.getAllByText('Exercice 1')).toHaveLength(1)
  })
})
