// lib/useAllPhotos.js
'use client'
import useSWR from 'swr'

export const useAllPhotos = () => {
  const fetcher = async () => {
    const response = await fetch('/api/photos')
    if (!response.ok) {
      throw new Error('Failed to fetch photos')
    }
    return response.json()
  }

  const { data, error } = useSWR('/api/photos', fetcher)
  
  return {
    data,
    isLoading: !error && !data,
    error
  }
}
