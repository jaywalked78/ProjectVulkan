// Utility to reset corrupted gamification data
export function resetGamificationData() {
  const STORAGE_KEY = 'vulcan-gamification-progress'
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('Gamification data reset successfully')
    // Reload the page to reinitialize with clean state
    window.location.reload()
  } catch (error) {
    console.error('Failed to reset gamification data:', error)
  }
}