# Animation Guide - Promptly v2

## Goals & Principles

### Core Animation Philosophy
- **Subtle & Elegant**: Animations should enhance, not distract from content
- **Zero Layout Shift**: Never cause cumulative layout shift (CLS) issues
- **GPU-Friendly**: Only animate properties that don't trigger reflow/repaint
- **Performance First**: Prioritize user experience over visual flair

### Allowed Properties
Only animate properties that utilize GPU acceleration and avoid layout thrashing:

✅ **Safe Properties**
- `opacity` - For fade in/out effects
- `transform` - For movement, scaling, rotation
  - `translateX/Y/Z`
  - `scale`
  - `rotate`
- `filter` - For blur, brightness effects (use sparingly)

❌ **Avoid These Properties**
- `width`, `height` - Causes layout recalculation
- `top`, `left`, `right`, `bottom` - Triggers reflow
- `margin`, `padding` - Forces layout shifts
- `font-size` - Can cause text reflow

## Accessibility & User Preferences

### Respect prefers-reduced-motion
All animations must respect the user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### User Toggle Implementation
Provide a user toggle in addition to system preferences:

```typescript
// AnimationContext for user preferences
const useReducedMotion = () => {
  const [userPreference, setUserPreference] = useState<boolean | null>(null)
  const systemPreference = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  return userPreference ?? systemPreference
}
```

## Performance Guidelines

### LCP Protection
- **Never block LCP assets** with animation delays
- Load critical content first, animate secondary elements
- Use `animation-delay` only for non-critical content

### GPU Optimization
- Use `transform3d()` or `will-change` to promote elements to GPU layer
- Remove `will-change` after animation completes
- Batch DOM reads and writes to avoid layout thrashing

### Animation Timing
- **Micro-interactions**: 150-300ms (buttons, hover states)
- **Page transitions**: 300-500ms maximum
- **Content reveals**: 200-400ms with staggered delays
- **Loading states**: Infinite with 1-2s cycles

## Component Animation Patterns

### 1. Fade In on Mount
```typescript
const FadeIn = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.3,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 2. Stagger List Animations
```typescript
const StaggerList = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="show"
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### 3. Hover Animations
```css
.interactive-element {
  transition: transform 0.2s ease-out;
}

.interactive-element:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .interactive-element {
    transition: none;
  }
  
  .interactive-element:hover {
    transform: none;
  }
}
```

## Implementation Strategy

### Phase 1: Foundation
1. Set up animation context and reduced motion detection
2. Implement base animation utilities
3. Add hover states to interactive elements

### Phase 2: Page Transitions
1. Hero section entrance animations
2. Testimonial cards stagger reveal
3. Trust badges subtle animation

### Phase 3: Micro-interactions
1. Button hover/focus states
2. Form field animations
3. Loading state indicators

### Phase 4: Advanced
1. Scroll-triggered animations (intersection observer)
2. Page transition animations
3. Success/error state animations

## Testing Checklist

### Performance
- [ ] No animations cause layout shift
- [ ] GPU usage stays reasonable
- [ ] No janky animations on mobile devices
- [ ] Animations don't block critical rendering path

### Accessibility
- [ ] `prefers-reduced-motion` respected
- [ ] User toggle works correctly
- [ ] Animations don't interfere with screen readers
- [ ] Keyboard navigation not affected

### Browser Compatibility
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Graceful degradation on older browsers
- [ ] Touch devices handle hover states properly

## Animation Library Choice

### Framer Motion (Recommended)
- Excellent performance with hardware acceleration
- Built-in accessibility features
- TypeScript support
- Small bundle size impact when tree-shaken

### Alternative: CSS Animations
- For simple animations that don't require JavaScript
- Better performance for basic transitions
- No additional bundle size

## Code Organization

```
src/
├── components/
│   ├── animations/
│   │   ├── FadeIn.tsx
│   │   ├── StaggerList.tsx
│   │   ├── SlideIn.tsx
│   │   └── AnimationWrapper.tsx
│   └── ui/
│       └── AnimatedButton.tsx
├── hooks/
│   ├── useReducedMotion.ts
│   └── useIntersectionObserver.ts
├── utils/
│   └── animation.ts
└── styles/
    └── animations.css
```

## Best Practices Summary

1. **Start Small**: Begin with simple fade-ins and hover states
2. **Measure Performance**: Use DevTools to monitor animation performance
3. **Test on Devices**: Verify smooth performance on mobile devices
4. **Respect Preferences**: Always honor user motion preferences
5. **Progressive Enhancement**: Ensure site works without animations
6. **Document Everything**: Keep this guide updated as patterns evolve

## Resources

- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Animation Performance](https://web.dev/animations/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Accessibility Guidelines for Animation](https://web.dev/prefers-reduced-motion/)
