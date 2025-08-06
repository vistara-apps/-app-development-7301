import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Twitter, 
  Bell, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Plus,
  ArrowRight
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { trackedAccounts, alerts, analytics } = useData()
  const { user } = useAuth()

  const stats = [
    {
      label: 'Tracked Accounts',
      value: trackedAccounts.length,
      icon: Twitter,
      color: 'blue'
    },
    {
      label: 'Active Alerts',
      value: alerts.filter(alert => alert.status === 'active').length,
      icon: Bell,
      color: 'green'
    },
    {
      label: 'Total Followers',
      value: trackedAccounts.reduce((sum, acc) => sum + acc.follower_count, 0).toLocaleString(),
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Total Mentions',
      value: trackedAccounts.reduce((sum, acc) => sum + acc.mention_count, 0).toLocaleString(),
      icon: MessageSquare,
      color: 'orange'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your Twitter monitoring
          </p>
        </div>
        <Link to="/accounts" className="btn btn-primary">
          <Plus className="h-4 w-4" />
          Add Account
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Recent Activity</h2>
              <Link to="/alerts" className="text-sm text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New tweet from @elonmusk</p>
                  <p className="text-sm text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Follower milestone reached</p>
                  <p className="text-sm text-gray-600">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New mention detected</p>
                  <p className="text-sm text-gray-600">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              <Link
                to="/accounts"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Add Twitter Account</p>
                    <p className="text-sm text-gray-600">Start tracking a new account</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/alerts"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Create Alert</p>
                    <p className="text-sm text-gray-600">Set up notifications</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/analytics"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-600">Analyze your performance</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tracked Accounts Overview */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Tracked Accounts</h2>
            <Link to="/accounts" className="text-sm text-blue-600 hover:text-blue-500">
              Manage all
            </Link>
          </div>
        </div>
        <div className="card-content">
          {trackedAccounts.length === 0 ? (
            <div className="text-center py-8">
              <Twitter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts tracked yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first Twitter account to monitor</p>
              <Link to="/accounts" className="btn btn-primary">
                Add Account
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {trackedAccounts.slice(0, 3).map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Twitter className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{account.twitter_handle}</p>
                      <p className="text-sm text-gray-600">
                        {account.follower_count.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <span className={`status-badge status-${account.status}`}>
                    {account.status}
                  </span>
                </div>
              ))}
              {trackedAccounts.length > 3 && (
                <div className="text-center pt-2">
                  <Link to="/accounts" className="text-sm text-blue-600 hover:text-blue-500">
                    View {trackedAccounts.length - 3} more accounts
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard