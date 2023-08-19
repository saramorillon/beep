import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Exercise } from '../../../src/views/Exercise'

describe('Exercise', () => {
  it('should render exercise', () => {
    render(<Exercise exercise={{ name: 'Exercise 1', values: [5, 20, 5, 20, 5, 20, 5] }} onRun={vi.fn()} />)
    expect(screen.getByText('Exercise 1')).toBeInTheDocument()
    expect(screen.getByText('5 20 5 20 5 20 5')).toBeInTheDocument()
    expect(screen.getByText('01m20s')).toBeInTheDocument()
  })

  it('should run exercise when clicking on run button', () => {
    const onRun = vi.fn()
    render(<Exercise exercise={{ name: 'Exercise 1', values: [] }} onRun={onRun} />)
    fireEvent.click(screen.getByText('Run'))
    expect(onRun).toHaveBeenCalledWith({ name: 'Exercise 1', values: [] })
  })

  it('should render exercise form if no exercise', () => {
    render(<Exercise onRun={vi.fn()} />)
    expect(screen.getByPlaceholderText('Serie')).toBeInTheDocument()
  })

  it('should run new exercise when clicking on run', () => {
    const onRun = vi.fn()
    render(<Exercise onRun={onRun} />)
    fireEvent.change(screen.getByPlaceholderText('Serie'), { target: { value: '1 2 3' } })
    fireEvent.click(screen.getByText('Run'))
    expect(onRun).toHaveBeenCalledWith({ values: [1, 2, 3] })
  })
})
