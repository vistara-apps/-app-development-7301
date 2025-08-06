import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  color = 'blue',
  trend,
  trendValue,
  loading = false 
}) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900',
      icon: 'text-blue-600 dark:text-blue-400',
      accent: 'border-blue-200 dark:border-blue-700'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900',
      icon: 'text-green-600 dark:text-green-400',
      accent: 'border-green-200 dark:border-green-700'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900',
      icon: 'text-purple-600 dark:text-purple-400',
      accent: 'border-purple-200 dark:border-purple-700'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900',
      icon: 'text-orange-600 dark:text-orange-400',
      accent: 'border-orange-200 dark:border-orange-700'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900',
      icon: 'text-red-600 dark:text-red-400',
      accent: 'border-red-200 dark:border-red-700'
    }
  }

  const colors = colorClasses[color] || colorClasses.blue

  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp
    if (trend === 'down') return TrendingDown
    return Minus
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400'
    if (trend === 'down') return 'text-red-600 dark:text-red-400'
    return 'text-gray-500 dark:text-gray-400'
  }

  const TrendIcon = getTrendIcon()

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
              {trendValue && (
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${colors.bg}`}>
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`card hover:shadow-lg transition-all duration-200 border-l-4 ${colors.accent}`}>
      <div className="card-content">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trendValue && (
              <div className="flex items-center gap-1">
                <TrendIcon className={`h-3 w-3 ${getTrendColor()}`} />
                <span className={`text-xs font-medium ${getTrendColor()}`}>
                  {trendValue}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs last period
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colors.bg}`}>
            <Icon className={`h-6 w-6 ${colors.icon}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MiniStatCard({ label, value, icon: Icon, color = 'gray' }) {
  const colorClasses = {
    gray: 'text-gray-600 dark:text-gray-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    yellow: 'text-yellow-600 dark:text-yellow-400'
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Icon className={`h-5 w-5 ${colorClasses[color]}`} />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  )
}

export default StatCard

