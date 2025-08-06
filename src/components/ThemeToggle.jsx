import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}

export function ThemeSelector() {
  const { theme, setLightTheme, setDarkTheme, setSystemTheme } = useTheme()

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
  ]

  return (
    <div className="form-group">
      <label className="form-label">Theme</label>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (id === 'light') setLightTheme()
              else if (id === 'dark') setDarkTheme()
              else setSystemTheme()
            }}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
              theme === id
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeToggle

