import React from 'react'
import { 
  Twitter, 
  Bell, 
  BarChart3, 
  Plus, 
  Search,
  Users,
  MessageSquare,
  Settings
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyAccounts() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-primary-50 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
        <Twitter className="h-12 w-12 text-primary-600 dark:text-primary-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No Twitter accounts tracked yet
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Start monitoring Twitter accounts to receive alerts about new tweets, mentions, and follower changes.
      </p>
      
      <Link to="/accounts" className="btn btn-primary">
        <Plus className="h-4 w-4" />
        Add Your First Account
      </Link>
    </div>
  )
}

export function EmptyAlerts() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-yellow-50 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-6">
        <Bell className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No alerts configured
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Set up custom alerts to get notified about specific Twitter activity that matters to you.
      </p>
      
      <Link to="/alerts" className="btn btn-primary">
        <Plus className="h-4 w-4" />
        Create Your First Alert
      </Link>
    </div>
  )
}

export function EmptyAnalytics() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-purple-50 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6">
        <BarChart3 className="h-12 w-12 text-purple-600 dark:text-purple-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No analytics data available
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Start tracking Twitter accounts to see detailed analytics and insights about their activity.
      </p>
      
      <Link to="/accounts" className="btn btn-primary">
        <Twitter className="h-4 w-4" />
        Add Accounts to Track
      </Link>
    </div>
  )
}

export function EmptySearch({ searchTerm }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No results found
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {searchTerm 
          ? `No results found for "${searchTerm}". Try adjusting your search terms.`
          : "Try searching for something else."
        }
      </p>
    </div>
  )
}

export function EmptyFollowers() {
  return (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">
        No follower data yet
      </h4>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Follower information will appear here once we start tracking this account.
      </p>
    </div>
  )
}

export function EmptyMentions() {
  return (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      
      <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">
        No mentions found
      </h4>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Recent mentions will appear here when they're detected.
      </p>
    </div>
  )
}

export function EmptySettings() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Settings className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Configure your preferences
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Customize your Twitter Monitor experience by adjusting notification settings and preferences.
      </p>
    </div>
  )
}

// Generic empty state component
export function EmptyState({ 
  icon: Icon = Search,
  title = "No data available",
  description = "There's nothing to show here yet.",
  action,
  actionLabel,
  iconColor = "text-gray-400",
  iconBg = "bg-gray-50 dark:bg-gray-800"
}) {
  return (
    <div className="text-center py-12">
      <div className={`mx-auto w-24 h-24 ${iconBg} rounded-full flex items-center justify-center mb-6`}>
        <Icon className={`h-12 w-12 ${iconColor}`} />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      
      {action && actionLabel && (
        <button onClick={action} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

