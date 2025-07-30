import type { Tier } from '@/types/gamification'

/**
 * Maps tier IDs to reusable Tailwind CSS classes
 */
export function getTierClasses(tier: Tier) {
  const tierMap = {
    bronze: {
      // Text colors
      text: 'text-tier-bronze-text',
      textLight: 'text-tier-bronze-light',
      accent: 'text-tier-bronze-accent',
      
      // Background colors
      bg: 'bg-tier-bronze-primary',
      bgLight: 'bg-tier-bronze-light',
      bgDark: 'bg-tier-bronze-dark',
      gradient: 'bg-tier-bronze',
      
      // Border colors
      border: 'border-tier-bronze-primary',
      borderLight: 'border-tier-bronze-light',
      
      // Button classes
      button: 'bg-tier-bronze text-white hover:opacity-90 focus:ring-tier-bronze-light',
      buttonOutline: 'border-2 border-tier-bronze-primary text-tier-bronze-text hover:bg-tier-bronze-primary hover:text-white',
      
      // Input classes
      input: 'border-2 border-tier-bronze-primary bg-black/30 text-tier-bronze-text placeholder-tier-bronze-light/70 focus:border-tier-bronze-light focus:ring-tier-bronze-light',
      
      // Card classes
      card: 'backdrop-blur-md bg-black/20 border-2 border-tier-bronze-primary/30 shadow-xl shadow-tier-bronze-primary/20',
    },
    silver: {
      text: 'text-tier-silver-text',
      textLight: 'text-tier-silver-light',
      accent: 'text-tier-silver-accent',
      
      bg: 'bg-tier-silver-primary',
      bgLight: 'bg-tier-silver-light',
      bgDark: 'bg-tier-silver-dark',
      gradient: 'bg-tier-silver',
      
      border: 'border-tier-silver-primary',
      borderLight: 'border-tier-silver-light',
      
      button: 'bg-tier-silver text-white hover:opacity-90 focus:ring-tier-silver-light',
      buttonOutline: 'border-2 border-tier-silver-primary text-tier-silver-text hover:bg-tier-silver-primary hover:text-white',
      
      input: 'border-2 border-tier-silver-primary bg-black/30 text-tier-silver-text placeholder-tier-silver-light/70 focus:border-tier-silver-light focus:ring-tier-silver-light',
      
      card: 'backdrop-blur-md bg-black/30 border-2 border-tier-silver-primary/30 shadow-xl shadow-tier-silver-primary/20',
    },
    gold: {
      text: 'text-tier-gold-text',
      textLight: 'text-tier-gold-light',
      accent: 'text-tier-gold-accent',
      
      bg: 'bg-tier-gold-primary',
      bgLight: 'bg-tier-gold-light',
      bgDark: 'bg-tier-gold-dark',
      gradient: 'bg-tier-gold',
      
      border: 'border-tier-gold-primary',
      borderLight: 'border-tier-gold-light',
      
      button: 'bg-tier-gold text-white hover:opacity-90 focus:ring-tier-gold-light',
      buttonOutline: 'border-2 border-tier-gold-primary text-tier-gold-text hover:bg-tier-gold-primary hover:text-white',
      
      input: 'border-2 border-tier-gold-primary bg-black/30 text-tier-gold-text placeholder-tier-gold-light/70 focus:border-tier-gold-light focus:ring-tier-gold-light',
      
      card: 'backdrop-blur-md bg-black/30 border-2 border-tier-gold-primary/30 shadow-xl shadow-tier-gold-primary/20',
    },
    platinum: {
      text: 'text-tier-platinum-text',
      textLight: 'text-tier-platinum-light',
      accent: 'text-tier-platinum-accent',
      
      bg: 'bg-tier-platinum-primary',
      bgLight: 'bg-tier-platinum-light',
      bgDark: 'bg-tier-platinum-dark',
      gradient: 'bg-tier-platinum',
      
      border: 'border-tier-platinum-primary',
      borderLight: 'border-tier-platinum-light',
      
      button: 'bg-tier-platinum text-white hover:opacity-90 focus:ring-tier-platinum-light',
      buttonOutline: 'border-2 border-tier-platinum-primary text-tier-platinum-text hover:bg-tier-platinum-primary hover:text-white',
      
      input: 'border-2 border-tier-platinum-primary bg-black/30 text-tier-platinum-text placeholder-tier-platinum-light/70 focus:border-tier-platinum-light focus:ring-tier-platinum-light',
      
      card: 'backdrop-blur-md bg-black/30 border-2 border-tier-platinum-primary/30 shadow-xl shadow-tier-platinum-primary/20',
    },
    diamond: {
      text: 'text-tier-diamond-text',
      textLight: 'text-tier-diamond-light',
      accent: 'text-tier-diamond-accent',
      
      bg: 'bg-tier-diamond-primary',
      bgLight: 'bg-tier-diamond-light',
      bgDark: 'bg-tier-diamond-dark',
      gradient: 'bg-tier-diamond',
      
      border: 'border-tier-diamond-primary',
      borderLight: 'border-tier-diamond-light',
      
      button: 'bg-tier-diamond text-white hover:opacity-90 focus:ring-tier-diamond-light',
      buttonOutline: 'border-2 border-tier-diamond-primary text-tier-diamond-text hover:bg-tier-diamond-primary hover:text-white',
      
      input: 'border-2 border-tier-diamond-primary bg-black/30 text-tier-diamond-text placeholder-tier-diamond-light/70 focus:border-tier-diamond-light focus:ring-tier-diamond-light',
      
      card: 'backdrop-blur-md bg-black/30 border-2 border-tier-diamond-primary/30 shadow-xl shadow-tier-diamond-primary/20',
    },
    legendary: {
      text: 'text-tier-legendary-text',
      textLight: 'text-tier-legendary-light',
      accent: 'text-tier-legendary-accent',
      
      bg: 'bg-tier-legendary-primary',
      bgLight: 'bg-tier-legendary-light',
      bgDark: 'bg-tier-legendary-dark',
      gradient: 'bg-tier-legendary',
      
      border: 'border-tier-legendary-primary',
      borderLight: 'border-tier-legendary-light',
      
      button: 'bg-tier-legendary text-white hover:opacity-90 focus:ring-tier-legendary-light',
      buttonOutline: 'border-2 border-tier-legendary-primary text-tier-legendary-text hover:bg-tier-legendary-primary hover:text-white',
      
      input: 'border-2 border-tier-legendary-primary bg-black/30 text-tier-legendary-text placeholder-tier-legendary-light/70 focus:border-tier-legendary-light focus:ring-tier-legendary-light',
      
      card: 'backdrop-blur-md bg-black/30 border-2 border-tier-legendary-primary/30 shadow-xl shadow-tier-legendary-primary/20',
    },
  }

  return tierMap[tier.id as keyof typeof tierMap] || tierMap.bronze
}

/**
 * Quick helper to get tier-specific button classes
 */
export function getTierButtonClasses(tier: Tier, variant: 'solid' | 'outline' = 'solid') {
  const classes = getTierClasses(tier)
  return variant === 'outline' ? classes.buttonOutline : classes.button
}

/**
 * Quick helper to get tier-specific text classes
 */
export function getTierTextClasses(tier: Tier, variant: 'text' | 'accent' | 'light' = 'text') {
  const classes = getTierClasses(tier)
  switch (variant) {
    case 'accent': return classes.accent
    case 'light': return classes.textLight
    default: return classes.text
  }
}

/**
 * Quick helper to get tier-specific input classes
 */
export function getTierInputClasses(tier: Tier) {
  const classes = getTierClasses(tier)
  return classes.input
}