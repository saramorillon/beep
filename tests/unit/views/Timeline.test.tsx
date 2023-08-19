import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAction } from '../../../src/hooks/useAction'
import { Timeline } from '../../../src/views/Timeline'

vi.mock('../../../src/hooks/useAction')
vi.mock('../../../src/hooks/useBeeper')

describe('Timeline', () => {
  beforeEach(() => {
    vi.mocked(useAction).mockReturnValue({ index: 0, value: 1, beep: false })
  })

  it('should render nothing if exercise is undefined', () => {
    const { container } = render(<Timeline onStop={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render nothing if action is undefined', () => {
    vi.mocked(useAction).mockReturnValue(undefined)
    const { container } = render(<Timeline onStop={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should stop exercise when clicking on stop button', () => {
    const onStop = vi.fn()
    render(<Timeline exercise={{ name: 'Exercise 1', values: [] }} onStop={onStop} />)
    fireEvent.click(screen.getByText('Stop'))
    expect(onStop).toHaveBeenCalled()
  })

  it('should render exercise name', () => {
    render(<Timeline exercise={{ name: 'Exercise 1', values: [] }} onStop={vi.fn()} />)
    expect(screen.getByText('Exercise 1')).toBeInTheDocument()
  })

  it('should render "Serie" if exercise has no name"', () => {
    render(<Timeline exercise={{ values: [] }} onStop={vi.fn()} />)
    expect(screen.getByText('Serie')).toBeInTheDocument()
  })

  it('should render exercise duration', () => {
    render(<Timeline exercise={{ values: [5, 20, 5, 20, 5, 20, 5] }} onStop={vi.fn()} />)
    expect(screen.getByText('01m20s')).toBeInTheDocument()
  })

  it('should render each duration card', () => {
    render(<Timeline exercise={{ values: [1, 2, 3] }} onStop={vi.fn()} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should render 0 for already passed durations', () => {
    vi.mocked(useAction).mockReturnValue({ index: 2, value: 2, beep: false })
    render(<Timeline exercise={{ values: [1, 2, 3] }} onStop={vi.fn()} />)
    expect(screen.getAllByText('0')).toHaveLength(2)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('3')).not.toBeInTheDocument()
  })

  it('should add active class to current duration', () => {
    render(<Timeline exercise={{ values: [1, 2, 3] }} onStop={vi.fn()} />)
    expect(screen.getByText('1')).toHaveClass('active')
    expect(screen.getByText('2')).not.toHaveClass('active')
    expect(screen.getByText('3')).not.toHaveClass('active')
  })

  it('should set width of each duration card according to max duration', () => {
    render(<Timeline exercise={{ values: [1, 2, 30] }} onStop={vi.fn()} />)
    expect(screen.getByText('1')).toHaveStyle({ width: '6rem' })
    expect(screen.getByText('2')).toHaveStyle({ width: '6rem' })
    expect(screen.getByText('30')).toHaveStyle({ width: '6rem' })
  })

  it('should move cards according to max width', () => {
    vi.mocked(useAction).mockReturnValue({ index: 1, value: 1, beep: false })
    render(<Timeline exercise={{ values: [1, 2, 30] }} onStop={vi.fn()} />)
    expect(screen.getByText('1').parentNode).toHaveStyle({ marginLeft: `calc(50% - 3rem - 6rem)` })
  })
})
