import React, { useState } from 'react'
import { Twitter, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { useData } from '../context/DataContext'

function TrackedAccounts() {
  const { trackedAccounts, addTrackedAccount, removeTrackedAccount } = useData()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newHandle, setNewHandle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddAccount = async (e) => {
    e.preventDefault()
    if (!newHandle.trim()) return

    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const handle = newHandle.startsWith('@') ? newHandle : `@${newHandle}`
      addTrackedAccount(handle)
      setNewHandle('')
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding account:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveAccount = (id) => {
    if (window.confirm('Are you sure you want to remove this account?')) {
      removeTrackedAccount(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tracked Accounts</h1>
          <p className="text-gray-600 mt-1">
            Manage the Twitter accounts you're monitoring
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4" />
          Add Account
        </button>
      </div>

      {/* Add Account Form */}
      {showAddForm && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Add New Twitter Account</h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Twitter Handle</label>
                <input
                  type="text"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  placeholder="@username or username"
                  className="form-input"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Adding...' : 'Add Account'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewHandle('')
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accounts List */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            Your Tracked Accounts ({trackedAccounts.length})
          </h2>
        </div>
        <div className="card-content">
          {trackedAccounts.length === 0 ? (
            <div className="text-center py-12">
              <Twitter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No accounts tracked yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start monitoring Twitter accounts to get real-time alerts and analytics
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                Add Your First Account
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {trackedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Twitter className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {account.twitter_handle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{account.follower_count.toLocaleString()} followers</span>
                        <span>{account.mention_count} mentions</span>
                        <span>Added {account.added_date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`status-badge status-${account.status}`}>
                      {account.status}
                    </span>
                    
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      title={account.status === 'active' ? 'Pause monitoring' : 'Resume monitoring'}
                    >
                      {account.status === 'active' ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleRemoveAccount(account.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      title="Remove account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Account Limits Info */}
      <div className="card">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Account Limits</h3>
              <p className="text-sm text-gray-600 mt-1">
                You're using {trackedAccounts.length} of 10 available account slots
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(trackedAccounts.length / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {trackedAccounts.length}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackedAccounts