/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float-up': 'floatUp 1.5s ease-out forwards',
        'float-up-left': 'floatUpLeft 1.3s ease-out forwards',
        'float-up-right': 'floatUpRight 1.4s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fill-progress': 'fillProgress 5s ease-out forwards',
        'ring-pulse': 'ringPulse 2s infinite',
        'achievement-glow': 'achievementGlow 2s ease-in-out infinite alternate',
        // Performance-optimized background animations
        'bronze-dither': 'bronzeDither 4s ease-in-out infinite',
        'silver-silk': 'silverSilk 6s ease-in-out infinite',
        'gold-beams': 'goldBeams 3s linear infinite',
        'platinum-iridescence': 'platinumIridescence 8s ease-in-out infinite',
        'diamond-ripple': 'diamondRipple 5s ease-in-out infinite',
        'legendary-hyperspeed': 'legendaryHyperspeed 2s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateY(-20px)', 
            opacity: '0' 
          },
        },
        slideInRight: {
          '0%': { 
            transform: 'translateX(100%)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateX(0)', 
            opacity: '1' 
          },
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.8)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
        },
        floatUp: {
          '0%': { 
            transform: 'translateY(0) translateX(0) scale(1) rotate(0deg)', 
            opacity: '1' 
          },
          '25%': {
            transform: 'translateY(-25px) translateX(10px) scale(1.1) rotate(90deg)',
            opacity: '0.9'
          },
          '50%': {
            transform: 'translateY(-50px) translateX(-5px) scale(1.2) rotate(180deg)',
            opacity: '0.7'
          },
          '75%': {
            transform: 'translateY(-75px) translateX(15px) scale(1.1) rotate(270deg)',
            opacity: '0.4'
          },
          '100%': { 
            transform: 'translateY(-120px) translateX(-10px) scale(0.8) rotate(360deg)', 
            opacity: '0' 
          },
        },
        floatUpLeft: {
          '0%': { 
            transform: 'translateY(0) translateX(0) scale(1)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateY(-100px) translateX(-30px) scale(0.6)', 
            opacity: '0' 
          },
        },
        floatUpRight: {
          '0%': { 
            transform: 'translateY(0) translateX(0) scale(1)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateY(-110px) translateX(25px) scale(0.7)', 
            opacity: '0' 
          },
        },
        shimmer: {
          '0%': { 
            transform: 'translateX(-100%)' 
          },
          '100%': { 
            transform: 'translateX(100%)' 
          },
        },
        fillProgress: {
          '0%': { 
            width: '0%' 
          },
          '100%': { 
            width: '100%' 
          },
        },
        ringPulse: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0'
          },
        },
        achievementGlow: {
          '0%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)',
          },
        },
        // Performance-optimized background keyframes
        bronzeDither: {
          '0%': { 
            backgroundPosition: '0% 0%', 
            filter: 'hue-rotate(0deg) contrast(1)' 
          },
          '25%': { 
            backgroundPosition: '25% 25%', 
            filter: 'hue-rotate(5deg) contrast(1.1)' 
          },
          '50%': { 
            backgroundPosition: '50% 50%', 
            filter: 'hue-rotate(10deg) contrast(1.2)' 
          },
          '75%': { 
            backgroundPosition: '75% 75%', 
            filter: 'hue-rotate(5deg) contrast(1.1)' 
          },
          '100%': { 
            backgroundPosition: '100% 100%', 
            filter: 'hue-rotate(0deg) contrast(1)' 
          },
        },
        silverSilk: {
          '0%': { 
            backgroundPosition: '0% 50%', 
            opacity: '0.3' 
          },
          '50%': { 
            backgroundPosition: '100% 50%', 
            opacity: '0.6' 
          },
          '100%': { 
            backgroundPosition: '200% 50%', 
            opacity: '0.3' 
          },
        },
        goldBeams: {
          '0%': { 
            transform: 'translateX(-100%) rotate(45deg)' 
          },
          '100%': { 
            transform: 'translateX(200%) rotate(45deg)' 
          },
        },
        platinumIridescence: {
          '0%': { 
            backgroundPosition: '0% 50%' 
          },
          '50%': { 
            backgroundPosition: '100% 50%' 
          },
          '100%': { 
            backgroundPosition: '200% 50%' 
          },
        },
        diamondRipple: {
          '0%': { 
            transform: 'scale(1) rotate(0deg)', 
            opacity: '0.8' 
          },
          '50%': { 
            transform: 'scale(1.05) rotate(180deg)', 
            opacity: '0.6' 
          },
          '100%': { 
            transform: 'scale(1) rotate(360deg)', 
            opacity: '0.8' 
          },
        },
        legendaryHyperspeed: {
          '0%': { 
            backgroundPosition: '0% 0%',
            filter: 'brightness(1) hue-rotate(0deg)'
          },
          '25%': {
            backgroundPosition: '25% 25%',
            filter: 'brightness(1.2) hue-rotate(90deg)'
          },
          '50%': { 
            backgroundPosition: '50% 50%',
            filter: 'brightness(1.4) hue-rotate(180deg)'
          },
          '75%': {
            backgroundPosition: '75% 75%',
            filter: 'brightness(1.2) hue-rotate(270deg)'
          },
          '100%': { 
            backgroundPosition: '100% 100%',
            filter: 'brightness(1) hue-rotate(360deg)'
          },
        },
      },
      backgroundImage: {
        // Current tier system gradients
        'tier-bronze': 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
        'tier-silver': 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
        'tier-gold': 'linear-gradient(135deg, #eab308 0%, #d97706 100%)',
        'tier-platinum': 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
        'tier-diamond': 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
        'tier-legendary': 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        // Performance-optimized background patterns
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Custom dark grey for Bronze and Gold tier text
        'dark-grey': '#090909',
        // Tier color system
        tier: {
          bronze: {
            primary: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
            text: '#fef3c7',
            accent: '#fbbf24',
          },
          silver: {
            primary: '#64748b',
            light: '#94a3b8',
            dark: '#475569',
            text: '#f1f5f9',
            accent: '#94a3b8',
          },
          gold: {
            primary: '#eab308',
            light: '#facc15',
            dark: '#d97706',
            text: '#fefce8',
            accent: '#facc15',
          },
          platinum: {
            primary: '#6b7280',
            light: '#9ca3af',
            dark: '#4b5563',
            text: '#f9fafb',
            accent: '#9ca3af',
          },
          diamond: {
            primary: '#06b6d4',
            light: '#22d3ee',
            dark: '#0284c7',
            text: '#cffafe',
            accent: '#22d3ee',
          },
          legendary: {
            primary: '#a855f7',
            light: '#c084fc',
            dark: '#7c3aed',
            text: '#f3e8ff',
            accent: '#c084fc',
          },
        },
      },
    },
  },
  plugins: [],
}