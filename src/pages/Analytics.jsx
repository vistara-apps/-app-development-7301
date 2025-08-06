import React, { useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { TrendingUp, Users, MessageSquare, Heart, Calendar } from 'lucide-react'
import { useData } from '../context/DataContext'
import { format, parseISO } from 'date-fns'

function Analytics() {
  const { analytics, trackedAccounts } = useData()
  const [selectedAccount, setSelectedAccount] = useState('all')
  const [timeRange, setTimeRange] = useState('7d')

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ]

  const formatXAxisDate = (dateStr) => {
    return format(parseISO(dateStr), 'MMM dd')
  }

  const formatTooltipDate = (dateStr) => {
    return format(parseISO(dateStr), 'MMM dd, yyyy')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Insights and performance metrics for your tracked accounts
          </p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="form-select"
          >
            <option value="all">All Accounts</option>
            {trackedAccounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.twitter_handle}
              </option>
            ))}
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tweets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.engagementMetrics?.totalTweets || 0}
                </p>
                <p className="text-sm text-green-600 mt-1">+12% from last week</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Mentions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.engagementMetrics?.totalMentions || 0}
                </p>
                <p className="text-sm text-green-600 mt-1">+8% from last week</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.engagementMetrics?.averageEngagement || 0}%
                </p>
                <p className="text-sm text-red-600 mt-1">-2% from last week</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trackedAccounts.reduce((sum, acc) => sum + acc.follower_count, 0).toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">+5% from last week</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tweet Volume Chart */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Tweet Volume Over Time</h2>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.tweetVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxisDate}
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  labelFormatter={formatTooltipDate}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tweets" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Follower Growth Chart */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Follower Growth</h2>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.followerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxisDate}
                  stroke="#6b7280"
                />
                <YAxis 
                  stroke="#6b7280"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  labelFormatter={formatTooltipDate}
                  formatter={(value) => [value.toLocaleString(), 'Followers']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Keywords and Account Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Top Keywords</h2>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {analytics.engagementMetrics?.topKeywords?.map((keyword, index) => (
                <div key={keyword} className="flex items-center justify-between">
                  <span className="text-gray-900">{keyword}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.max(20, 100 - index * 15)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {Math.max(50, 200 - index * 30)}
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No keyword data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Performance */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Account Performance</h2>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {trackedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{account.twitter_handle}</p>
                    <p className="text-sm text-gray-600">
                      {account.follower_count.toLocaleString()} followers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {account.mention_count} mentions
                    </p>
                    <p className="text-sm text-gray-600">
                      {Math.floor(Math.random() * 5) + 1}% engagement
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export and Download */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Export Data</h2>
        </div>
        <div className="card-content">
          <div className="flex flex-col md:flex-row gap-4">
            <button className="btn btn-outline">
              <Calendar className="h-4 w-4" />
              Export CSV
            </button>
            <button className="btn btn-outline">
              <TrendingUp className="h-4 w-4" />
              Download Report
            </button>
            <button className="btn btn-outline">
              Schedule Weekly Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics