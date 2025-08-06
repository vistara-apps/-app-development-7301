import React from 'react'
import { Loader2 } from 'lucide-react'

// Skeleton loading components
export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="card-content">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div className="card animate-pulse">
      <div className="card-content">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Loading spinner components
export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

export function LoadingButton({ loading, children, ...props }) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
}

// Page loading states
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

export function ContentLoading({ message = "Loading content..." }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-primary-600 mb-3" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  )
}

// Inline loading states
export function InlineLoading({ message }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <LoadingSpinner size="sm" />
      {message}
    </div>
  )
}

