import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Twitter, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Twitter className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Sign in to Twitter Monitor
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Stay on top of your Twitter activity
          </p>
        </div>

        <div className="card">
          <div className="card-content">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-200">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-lg">
              <p className="text-sm text-primary-700 dark:text-primary-200">
                <strong>Demo credentials:</strong><br />
                Email: demo@example.com<br />
                Password: password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
