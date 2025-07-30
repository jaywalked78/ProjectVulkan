# Phase 1.5: Gamification & Achievement System PRD
## Adding Points, Streaks, and Achievements to Project Vulcan

### Executive Summary
This phase enhances the existing MVP by adding a comprehensive gamification layer including points, streak bonuses, achievements, and visual rewards. All styling will leverage Tailwind CSS extensively, creating an engaging and visually appealing experience that motivates continued learning.

### Table of Contents
1. [Gamification System Design](#gamification-system-design)
2. [Achievement Tiers & Unlocks](#achievement-tiers--unlocks)
3. [UI/UX Enhancements](#uiux-enhancements)
4. [State Management Updates](#state-management-updates)
5. [Component Specifications](#component-specifications)
6. [Visual Design System](#visual-design-system)
7. [Implementation Timeline](#implementation-timeline)

---

## Gamification System Design

### Points System

#### Base Points
- **Correct Answer**: +5 points
- **Incorrect Answer**: -1 point (never go below 0)
- **Skip Question**: 0 points

#### Streak Multipliers
Consecutive correct answers trigger multipliers:
- **3 in a row**: 1.5x multiplier (+7 points per correct)
- **5 in a row**: 2x multiplier (+10 points per correct)
- **10 in a row**: 3x multiplier (+15 points per correct)
- **15+ in a row**: 4x multiplier (+20 points per correct)

#### Bonus Events
- **Perfect Session** (100% accuracy, min 10 questions): +50 bonus points
- **Speed Bonus** (answer < 5 seconds): +2 points
- **Daily Streak** (study every day): 10 points × day streak

### Achievement Categories

1. **Points Milestones**
   - First Steps: 50 points
   - Rising Star: 250 points
   - Knowledge Seeker: 1,000 points
   - Scholar: 5,000 points
   - Master: 10,000 points
   - Grandmaster: 25,000 points

2. **Streak Achievements**
   - Hot Streak: 5 correct in a row
   - On Fire: 10 correct in a row
   - Unstoppable: 25 correct in a row
   - Legendary: 50 correct in a row

3. **Session Achievements**
   - Perfect 10: Complete 10 questions with 100% accuracy
   - Marathon: Answer 50 questions in one session
   - Speed Demon: 10 correct answers under 5 seconds each
   - Comeback Kid: Recover from 3 wrong to 5 right

4. **Special Achievements**
   - Night Owl: Study after midnight
   - Early Bird: Study before 6 AM
   - Dedicated: Study 7 days in a row
   - Completionist: Finish entire deck perfectly

---

## Achievement Tiers & Unlocks

### Tier System

#### Novice (0-250 points)
- **Theme**: Default light theme
- **Badge**: Bronze star
- **Perks**: Basic stats tracking

#### Apprentice (251-1,000 points)
- **Theme Unlock**: Ocean Blue theme
- **Badge**: Silver star
- **Perks**: Detailed statistics
- **UI Effects**: Subtle animations

#### Scholar (1,001-5,000 points)
- **Theme Unlock**: Forest Green theme
- **Badge**: Gold star
- **Perks**: Session history
- **UI Effects**: Particle effects on correct answers

#### Expert (5,001-10,000 points)
- **Theme Unlock**: Sunset Orange theme
- **Badge**: Platinum star
- **Perks**: Advanced statistics dashboard
- **UI Effects**: Streak fire animations

#### Master (10,001-25,000 points)
- **Theme Unlock**: Royal Purple theme
- **Badge**: Diamond star
- **Perks**: Custom card backgrounds
- **UI Effects**: Confetti celebrations

#### Grandmaster (25,000+ points)
- **Theme Unlock**: Dark Mode + Custom colors
- **Badge**: Rainbow star
- **Perks**: All themes, custom sounds
- **UI Effects**: Epic animations package

---

## UI/UX Enhancements

### New UI Components

#### 1. Points Display Widget
```jsx
// Top-right corner of quiz screen
<div className="fixed top-4 right-4 z-50">
  <div className="bg-white rounded-2xl shadow-xl p-4 min-w-[200px] border-2 border-gray-100">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-600">Total Points</span>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {points}
        </span>
        {pointsChange && (
          <span className={`text-sm font-bold animate-slide-up ${
            pointsChange > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {pointsChange > 0 ? '+' : ''}{pointsChange}
          </span>
        )}
      </div>
    </div>
    {streak > 2 && (
      <div className="mt-2 flex items-center gap-2">
        <div className="text-orange-500 animate-pulse">🔥</div>
        <span className="text-sm font-medium text-gray-700">
          {streak} streak! ({getMultiplier(streak)}x)
        </span>
      </div>
    )}
  </div>
</div>
```

#### 2. Achievement Toast Notifications
```jsx
// Animated achievement popup
<div className="fixed top-20 right-4 z-50 animate-slide-in-right">
  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-2xl p-6 min-w-[300px]">
    <div className="flex items-center gap-4">
      <div className="text-4xl animate-bounce">🏆</div>
      <div>
        <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
        <p className="text-sm opacity-90">{achievement.name}</p>
      </div>
    </div>
    <div className="mt-3 bg-white/20 rounded-full overflow-hidden">
      <div 
        className="h-2 bg-white transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
</div>
```

#### 3. Enhanced Answer Feedback
```jsx
// Correct answer with effects
<div className="relative">
  {/* Particle effect container */}
  <div className="absolute inset-0 pointer-events-none">
    {particles.map((particle, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-green-400 rounded-full animate-float-up"
        style={{
          left: `${particle.x}%`,
          animationDelay: `${particle.delay}ms`
        }}
      />
    ))}
  </div>
  
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6 shadow-lg animate-scale-in">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-3xl animate-spin-slow">✨</div>
        <div>
          <h3 className="text-xl font-bold text-green-700">Correct!</h3>
          <p className="text-sm text-green-600">+{calculatePoints()} points</p>
        </div>
      </div>
      {streak > 1 && (
        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          🔥 {streak} streak!
        </div>
      )}
    </div>
  </div>
</div>
```

### Updated Home Screen
```jsx
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  {/* Tier Badge */}
  <div className="absolute top-4 left-4">
    <div className="bg-white rounded-full shadow-lg p-3 flex items-center gap-3">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTierGradient(tier)} flex items-center justify-center`}>
        <span className="text-2xl">{getTierEmoji(tier)}</span>
      </div>
      <div>
        <p className="text-xs text-gray-500">Current Tier</p>
        <p className="font-bold text-gray-800">{tier.name}</p>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="max-w-md w-full">
      {/* Enhanced Card with gradient border */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
        <div className="relative bg-white rounded-2xl shadow-2xl p-8">
          {/* Stats Summary */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{totalPoints}</p>
              <p className="text-xs text-gray-500">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{bestStreak}</p>
              <p className="text-xs text-gray-500">Best Streak</p>
            </div>
          </div>

          {/* Rest of existing home content */}
        </div>
      </div>

      {/* Quick Achievements Preview */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Recent Achievements</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
              title={achievement.name}
            >
              <span className="text-2xl">{achievement.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
```

### Enhanced Quiz Screen
```jsx
{/* Progress Bar with Points */}
<div className="bg-white rounded-xl shadow-lg p-4 mb-6">
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm font-medium text-gray-600">
      Question {currentQuestion} of {totalQuestions}
    </span>
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-green-600">
        ✓ {correct}
      </span>
      <span className="text-sm font-medium text-red-600">
        ✗ {incorrect}
      </span>
    </div>
  </div>
  
  {/* Enhanced progress bar */}
  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    >
      <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
    </div>
  </div>
  
  {/* Points earned this session */}
  <div className="mt-2 text-center">
    <span className="text-sm text-gray-600">
      Session Points: <span className="font-bold text-blue-600">+{sessionPoints}</span>
    </span>
  </div>
</div>
```

---

## State Management Updates

### Extended Store Types
```typescript
interface GamificationState {
  // Points
  totalPoints: number;
  sessionPoints: number;
  pointsHistory: PointEvent[];
  
  // Streaks
  currentStreak: number;
  bestStreak: number;
  dailyStreak: number;
  lastStudyDate: string | null;
  
  // Achievements
  unlockedAchievements: Achievement[];
  achievementProgress: Map<string, number>;
  recentAchievements: Achievement[];
  
  // Tier
  currentTier: Tier;
  nextTierProgress: number;
  
  // Stats
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageResponseTime: number;
  fastestResponseTime: number;
  
  // UI State
  showAchievementToast: boolean;
  currentAchievementToast: Achievement | null;
  activeTheme: Theme;
  unlockedThemes: string[];
}

interface PointEvent {
  timestamp: number;
  points: number;
  reason: 'correct' | 'incorrect' | 'streak' | 'bonus' | 'achievement';
  details?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'points' | 'streak' | 'session' | 'special';
  requirement: number;
  unlockedAt?: number;
}

interface Tier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  theme: string;
  perks: string[];
  gradient: string;
}
```

### Updated Actions
```typescript
interface GamificationActions {
  // Points
  addPoints: (points: number, reason: PointEvent['reason']) => void;
  calculateStreakMultiplier: () => number;
  
  // Achievements
  checkAchievements: () => void;
  unlockAchievement: (achievementId: string) => void;
  dismissAchievementToast: () => void;
  
  // Tier
  checkTierProgress: () => void;
  unlockTheme: (themeId: string) => void;
  
  // Stats
  updateStats: (responseTime: number, isCorrect: boolean) => void;
  updateDailyStreak: () => void;
  
  // Persistence
  saveProgress: () => void;
  loadProgress: () => void;
}
```

---

## Component Specifications

### AchievementToast Component
```typescript
export function AchievementToast({ achievement, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="relative animate-slide-in-right">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl opacity-50"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-2xl">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                <div className="relative text-5xl animate-bounce-slow">
                  {achievement.emoji}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  Achievement Unlocked!
                </h3>
                <p className="text-lg text-yellow-300 font-medium">
                  {achievement.name}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  {achievement.description}
                </p>
              </div>
              
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-fill-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### StreakIndicator Component
```typescript
export function StreakIndicator({ streak, multiplier }: Props) {
  if (streak < 3) return null;

  const getStreakColor = () => {
    if (streak >= 15) return 'from-purple-500 to-pink-500';
    if (streak >= 10) return 'from-red-500 to-orange-500';
    if (streak >= 5) return 'from-orange-500 to-yellow-500';
    return 'from-yellow-500 to-amber-500';
  };

  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r ${getStreakColor()} text-white px-4 py-2 rounded-full shadow-lg">
      <div className="relative">
        <span className="text-2xl animate-pulse-slow">🔥</span>
        {streak >= 10 && (
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        )}
      </div>
      <div>
        <p className="font-bold text-sm">{streak} Streak!</p>
        <p className="text-xs opacity-90">{multiplier}x points</p>
      </div>
    </div>
  );
}
```

### TierBadge Component
```typescript
export function TierBadge({ tier, points, compact = false }: Props) {
  const nextTier = getNextTier(tier);
  const progress = nextTier 
    ? ((points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100
    : 100;

  if (compact) {
    return (
      <div className="relative group cursor-pointer">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110`}>
          <span className="text-2xl">{getTierEmoji(tier)}</span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
            <p className="font-bold">{tier.name}</p>
            <p>{points.toLocaleString()} points</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-4xl">{getTierEmoji(tier)}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{tier.name}</h3>
          <p className="text-sm text-gray-600">{points.toLocaleString()} points</p>
        </div>
      </div>
      
      {nextTier && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to {nextTier.name}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${tier.gradient} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {(nextTier.minPoints - points).toLocaleString()} points to go
          </p>
        </div>
      )}
    </div>
  );
}
```

---

## Visual Design System

### Tailwind Configuration Extensions
```javascript
// tailwind.config.js additions
module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float-up': 'floatUp 1s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fill-progress': 'fillProgress 5s ease-out forwards',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fillProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      backgroundImage: {
        'tier-novice': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'tier-apprentice': 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
        'tier-scholar': 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
        'tier-expert': 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
        'tier-master': 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
        'tier-grandmaster': 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
      },
    },
  },
}
```

### Theme Definitions
```typescript
const themes = {
  default: {
    primary: 'blue',
    background: 'gray-50',
    card: 'white',
    text: 'gray-900',
  },
  ocean: {
    primary: 'cyan',
    background: 'blue-50',
    card: 'blue-100',
    text: 'blue-900',
  },
  forest: {
    primary: 'green',
    background: 'green-50',
    card: 'green-100',
    text: 'green-900',
  },
  sunset: {
    primary: 'orange',
    background: 'orange-50',
    card: 'orange-100',
    text: 'orange-900',
  },
  royal: {
    primary: 'purple',
    background: 'purple-50',
    card: 'purple-100',
    text: 'purple-900',
  },
  dark: {
    primary: 'indigo',
    background: 'gray-900',
    card: 'gray-800',
    text: 'gray-100',
  },
};
```

---

## Implementation Timeline

### Week 1: Core Gamification
**Days 1-2: Points System**
- Implement points calculation logic
- Add streak tracking
- Create points display widget
- Integrate with answer submission

**Days 3-4: Achievement System**
- Define achievement data structure
- Implement achievement checking logic
- Create achievement toast component
- Add achievement storage to localStorage

**Day 5: Testing & Polish**
- Test all point calculations
- Verify achievement unlocks
- Fix edge cases

### Week 2: UI Enhancements
**Days 1-2: Visual Components**
- Build all new components (TierBadge, StreakIndicator, etc.)
- Add animations and transitions
- Implement particle effects

**Days 3-4: Theme System**
- Create theme switching logic
- Build theme picker UI
- Implement tier-based unlocks

**Day 5: Integration**
- Connect all components
- Polish animations
- Performance optimization

### Testing Checklist
- [ ] Points calculate correctly for all scenarios
- [ ] Streak multipliers apply properly
- [ ] Achievements unlock at correct thresholds
- [ ] Themes switch smoothly
- [ ] Animations perform well on all devices
- [ ] LocalStorage persists all data
- [ ] No memory leaks from animations
- [ ] Accessibility maintained with new features

---

## Migration Guide

### From Current MVP to Gamified Version

1. **Update Store Structure**
```typescript
// Add to existing store
const gameStore = create((set, get) => ({
  ...existingState,
  ...gamificationState,
  
  // Wrap existing submitAnswer
  submitAnswer: () => {
    const oldSubmit = get().submitAnswer;
    oldSubmit();
    
    // Add gamification logic
    const isCorrect = get().lastAnswerCorrect;
    if (isCorrect) {
      const streak = get().currentStreak + 1;
      const multiplier = calculateMultiplier(streak);
      const points = 5 * multiplier;
      
      set({
        currentStreak: streak,
        totalPoints: get().totalPoints + points,
        sessionPoints: get().sessionPoints + points,
      });
      
      // Check achievements
      get().checkAchievements();
    } else {
      set({
        currentStreak: 0,
        totalPoints: Math.max(0, get().totalPoints - 1),
      });
    }
  },
}));
```

2. **Update Components**
- Wrap existing components with gamification UI
- Add point displays to quiz screen
- Enhance feedback components with effects

3. **Add Persistence**
```typescript
// Save on state change
subscribe(
  (state) => ({
    totalPoints: state.totalPoints,
    achievements: state.unlockedAchievements,
    currentTier: state.currentTier,
  }),
  (slice) => {
    localStorage.setItem('vulcan-progress', JSON.stringify(slice));
  }
);
```

This PRD provides a complete gamification layer that can be implemented on top of your existing Phase 1 MVP, preparing it for the mobile port in Phase 2 while significantly enhancing user engagement.