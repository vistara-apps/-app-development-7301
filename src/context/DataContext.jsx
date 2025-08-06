import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export function DataProvider({ children }) {
  const [trackedAccounts, setTrackedAccounts] = useState([])
  const [alerts, setAlerts] = useState([])
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    // Load initial demo data
    setTrackedAccounts([
      {
        id: 1,
        twitter_handle: '@elonmusk',
        last_tweet_id: '1234567890',
        follower_count: 150000000,
        mention_count: 5432,
        status: 'active',
        added_date: '2024-01-15'
      },
      {
        id: 2,
        twitter_handle: '@openai',
        last_tweet_id: '1234567891',
        follower_count: 2500000,
        mention_count: 1234,
        status: 'active',
        added_date: '2024-01-20'
      },
      {
        id: 3,
        twitter_handle: '@vercel',
        last_tweet_id: '1234567892',
        follower_count: 180000,
        mention_count: 567,
        status: 'inactive',
        added_date: '2024-01-25'
      }
    ])

    setAlerts([
      {
        id: 1,
        type: 'new_tweet',
        trigger_condition: 'any',
        notification_channel: 'email',
        notification_frequency: 'immediate',
        account_id: 1,
        status: 'active'
      },
      {
        id: 2,
        type: 'mention',
        trigger_condition: 'keyword: AI',
        notification_channel: 'telegram',
        notification_frequency: 'daily',
        account_id: 2,
        status: 'active'
      },
      {
        id: 3,
        type: 'follower_change',
        trigger_condition: 'increase > 1000',
        notification_channel: 'email',
        notification_frequency: 'weekly',
        account_id: 1,
        status: 'paused'
      }
    ])

    setAnalytics({
      tweetVolume: [
        { date: '2024-01-01', tweets: 45 },
        { date: '2024-01-02', tweets: 52 },
        { date: '2024-01-03', tweets: 38 },
        { date: '2024-01-04', tweets: 61 },
        { date: '2024-01-05', tweets: 42 },
        { date: '2024-01-06', tweets: 55 },
        { date: '2024-01-07', tweets: 48 }
      ],
      followerGrowth: [
        { date: '2024-01-01', followers: 149500000 },
        { date: '2024-01-02', followers: 149650000 },
        { date: '2024-01-03', followers: 149800000 },
        { date: '2024-01-04', followers: 149900000 },
        { date: '2024-01-05', followers: 149950000 },
        { date: '2024-01-06', followers: 150000000 },
        { date: '2024-01-07', followers: 150100000 }
      ],
      engagementMetrics: {
        totalTweets: 342,
        totalMentions: 7233,
        averageEngagement: 4.2,
        topKeywords: ['AI', 'technology', 'innovation', 'future', 'Tesla']
      }
    })
  }, [])

  const addTrackedAccount = (handle) => {
    const newAccount = {
      id: Date.now(),
      twitter_handle: handle,
      last_tweet_id: '',
      follower_count: 0,
      mention_count: 0,
      status: 'active',
      added_date: new Date().toISOString().split('T')[0]
    }
    setTrackedAccounts(prev => [...prev, newAccount])
    return newAccount
  }

  const removeTrackedAccount = (id) => {
    setTrackedAccounts(prev => prev.filter(account => account.id !== id))
    setAlerts(prev => prev.filter(alert => alert.account_id !== id))
  }

  const addAlert = (alertData) => {
    const newAlert = {
      id: Date.now(),
      ...alertData,
      status: 'active'
    }
    setAlerts(prev => [...prev, newAlert])
    return newAlert
  }

  const updateAlert = (id, updates) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, ...updates } : alert
    ))
  }

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const value = {
    trackedAccounts,
    alerts,
    analytics,
    addTrackedAccount,
    removeTrackedAccount,
    addAlert,
    updateAlert,
    removeAlert
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}