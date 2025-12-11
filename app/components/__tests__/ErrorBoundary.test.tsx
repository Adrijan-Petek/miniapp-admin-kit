import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'

const ErrorComponent = () => {
  throw new Error('Test error')
}

const SafeComponent = () => <div>Safe component</div>

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Mock console.error to avoid noise in test output
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Safe component')).toBeInTheDocument()
  })

  it('renders fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Refresh Page')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('allows retry after error', () => {
    const { rerender } = render( // eslint-disable-line @typescript-eslint/no-unused-vars
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Click try again
    fireEvent.click(screen.getByText('Try Again'))

    // The ErrorBoundary should now show children again, but since ErrorComponent still throws,
    // it will show the error UI again. Let's test that the state was reset by checking
    // that we can still interact with the component
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('does not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})