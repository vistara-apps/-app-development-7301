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
import StatCard from '../components/StatCard'
import { EmptyAccounts } from '../components/EmptyStates'
import { SkeletonStat } from '../components/LoadingStates'

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
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
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={index === 0 ? 'up' : index === 1 ? 'down' : undefined}
            trendValue={index === 0 ? '+12%' : index === 1 ? '-5%' : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Recent Activity</h2>
              <Link to="/alerts" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                View all
              </Link>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900 rounded-lg">
                <Bell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">New tweet from @elonmusk</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Follower milestone reached</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">New mention detected</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">3 hours ago</p>
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
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Add Twitter Account</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start tracking a new account</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </Link>

              <Link
                to="/alerts"
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Create Alert</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Set up notifications</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </Link>

              <Link
                to="/analytics"
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">View Analytics</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Analyze your performance</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
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
            <Link to="/accounts" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Manage all
            </Link>
          </div>
        </div>
        <div className="card-content">
          {trackedAccounts.length === 0 ? (
            <EmptyAccounts />
          
          ) : (
            <div className="space-y-4">
              {trackedAccounts.slice(0, 3).map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <Twitter className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{account.twitter_handle}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
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
                  <Link to="/accounts" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
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
