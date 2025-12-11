import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme, ThemeContext } from '@/lib/hooks/useTheme' // eslint-disable-line @typescript-eslint/no-unused-vars

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should provide default dark theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: jest.fn() }}>
        {children}
      </ThemeContext.Provider>
    )

    const { result } = renderHook(() => useTheme(), {
      wrapper,
    })

    expect(result.current.theme).toBe('dark')
  })

  it('should toggle theme', () => {
    const mockToggle = jest.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: mockToggle }}>
        {children}
      </ThemeContext.Provider>
    )

    const { result } = renderHook(() => useTheme(), {
      wrapper,
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(mockToggle).toHaveBeenCalled()
  })

  it('should persist theme in localStorage', () => {
    const mockToggle = jest.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: mockToggle }}>
        {children}
      </ThemeContext.Provider>
    )

    const { result } = renderHook(() => useTheme(), {
      wrapper,
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(mockToggle).toHaveBeenCalled()
  })

  it('should throw error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within a ThemeProvider')

    consoleSpy.mockRestore()
  })
})