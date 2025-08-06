import React, { useState } from 'react'
import { Bell, Plus, Edit, Trash2, Pause, Play } from 'lucide-react'
import { useData } from '../context/DataContext'

function Alerts() {
  const { alerts, trackedAccounts, addAlert, updateAlert, removeAlert } = useData()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAlert, setEditingAlert] = useState(null)
  const [formData, setFormData] = useState({
    type: 'new_tweet',
    trigger_condition: '',
    notification_channel: 'email',
    notification_frequency: 'immediate',
    account_id: ''
  })

  const alertTypes = [
    { value: 'new_tweet', label: 'New Tweet' },
    { value: 'mention', label: 'Mention' },
    { value: 'follower_change', label: 'Follower Change' },
    { value: 'retweet', label: 'Retweet' },
    { value: 'like', label: 'Like' }
  ]

  const notificationChannels = [
    { value: 'email', label: 'Email' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'webhook', label: 'Webhook' }
  ]

  const frequencies = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingAlert) {
      updateAlert(editingAlert.id, formData)
      setEditingAlert(null)
    } else {
      addAlert(formData)
      setShowAddForm(false)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      type: 'new_tweet',
      trigger_condition: '',
      notification_channel: 'email',
      notification_frequency: 'immediate',
      account_id: ''
    })
  }

  const handleEdit = (alert) => {
    setEditingAlert(alert)
    setFormData({
      type: alert.type,
      trigger_condition: alert.trigger_condition,
      notification_channel: alert.notification_channel,
      notification_frequency: alert.notification_frequency,
      account_id: alert.account_id
    })
    setShowAddForm(true)
  }

  const handleToggleStatus = (alert) => {
    const newStatus = alert.status === 'active' ? 'paused' : 'active'
    updateAlert(alert.id, { status: newStatus })
  }

  const getAccountHandle = (accountId) => {
    const account = trackedAccounts.find(acc => acc.id === accountId)
    return account ? account.twitter_handle : 'Unknown'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alert Management</h1>
          <p className="text-gray-600 mt-1">
            Configure notifications for your tracked accounts
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4" />
          Create Alert
        </button>
      </div>

      {/* Add/Edit Alert Form */}
      {showAddForm && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingAlert ? 'Edit Alert' : 'Create New Alert'}
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Alert Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-select"
                    required
                  >
                    {alertTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Twitter Account</label>
                  <select
                    value={formData.account_id}
                    onChange={(e) => setFormData({ ...formData, account_id: parseInt(e.target.value) })}
                    className="form-select"
                    required
                  >
                    <option value="">Select account</option>
                    {trackedAccounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.twitter_handle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Notification Channel</label>
                  <select
                    value={formData.notification_channel}
                    onChange={(e) => setFormData({ ...formData, notification_channel: e.target.value })}
                    className="form-select"
                    required
                  >
                    {notificationChannels.map(channel => (
                      <option key={channel.value} value={channel.value}>
                        {channel.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <select
                    value={formData.notification_frequency}
                    onChange={(e) => setFormData({ ...formData, notification_frequency: e.target.value })}
                    className="form-select"
                    required
                  >
                    {frequencies.map(freq => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Trigger Condition</label>
                <input
                  type="text"
                  value={formData.trigger_condition}
                  onChange={(e) => setFormData({ ...formData, trigger_condition: e.target.value })}
                  placeholder="e.g., keyword: AI, increase > 1000, any"
                  className="form-input"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Optional: Specify conditions like keywords, thresholds, or leave empty for all events
                </p>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary">
                  {editingAlert ? 'Update Alert' : 'Create Alert'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingAlert(null)
                    resetForm()
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

      {/* Alerts List */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Your Alerts ({alerts.length})</h2>
        </div>
        <div className="card-content">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No alerts configured
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first alert to get notified about Twitter activity
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                Create Your First Alert
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {alertTypes.find(t => t.value === alert.type)?.label} - {getAccountHandle(alert.account_id)}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>Channel: {alert.notification_channel}</span>
                        <span>Frequency: {alert.notification_frequency}</span>
                        {alert.trigger_condition && (
                          <span>Condition: {alert.trigger_condition}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`status-badge status-${alert.status}`}>
                      {alert.status}
                    </span>

                    <button
                      onClick={() => handleToggleStatus(alert)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      title={alert.status === 'active' ? 'Pause alert' : 'Resume alert'}
                    >
                      {alert.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleEdit(alert)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      title="Edit alert"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this alert?')) {
                          removeAlert(alert.id)
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      title="Delete alert"
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

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {alerts.filter(a => a.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {alerts.filter(a => a.status === 'paused').length}
              </p>
              <p className="text-sm text-gray-600">Paused Alerts</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {alerts.filter(a => a.notification_frequency === 'immediate').length}
              </p>
              <p className="text-sm text-gray-600">Immediate Alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alerts