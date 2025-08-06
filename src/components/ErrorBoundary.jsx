import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-md w-full text-center">
            <div className="card">
              <div className="card-content">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>
                
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Something went wrong
                </h1>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We're sorry, but something unexpected happened. Please try refreshing the page or go back to the dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh Page
                  </button>
                  
                  <Link to="/" className="btn btn-outline">
                    <Home className="h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-6 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Error Details (Development)
                    </summary>
                    <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-red-600 dark:text-red-400 overflow-auto">
                      <div className="mb-2">
                        <strong>Error:</strong> {this.state.error.toString()}
                      </div>
                      <div>
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Error state components for specific scenarios
export function ErrorState({ 
  title = "Something went wrong", 
  message = "Please try again later.", 
  onRetry,
  showRetry = true 
}) {
  return (
    <div className="text-center py-12">
      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {message}
      </p>
      {showRetry && onRetry && (
        <button onClick={onRetry} className="btn btn-outline">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  )
}

export function NetworkError({ onRetry }) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

export function NotFoundError() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Page Not Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home className="h-4 w-4" />
        Go to Dashboard
      </Link>
    </div>
  )
}

export default ErrorBoundary

