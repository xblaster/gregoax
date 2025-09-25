# YouTube Video Integration Guide

## Overview

This guide explains how to use the YouTube video integration implemented for the pianist showcase website with the "Crystalline Planet Explosion" theme.

## Components Created

### 1. CrystallineVideoPlayer Component
**Location:** `/src/components/CrystallineVideoPlayer.tsx`

A visually stunning video player component that features:
- Crystalline borders with animated glow effects
- Cosmic background with floating particles
- Planet explosion ripple animations
- Fully responsive design for mobile and desktop
- Premium aesthetic matching the pianist showcase theme

#### Props:
- `videoId` (string): YouTube video ID or full YouTube URL
- `title` (optional string): Video title (default: "Performance Exceptionnelle")
- `description` (optional string): Video description

#### Example Usage:
```tsx
import CrystallineVideoPlayer from './components/CrystallineVideoPlayer';

```

### 2. YouTube Utility Functions
**Location:** `/src/utils/youtube.ts`

Utility functions for handling YouTube URLs and video IDs:

#### Functions:
- `extractYouTubeVideoId(url: string)`: Extracts clean video ID from various YouTube URL formats
- `isValidYouTubeVideoId(videoId: string)`: Validates YouTube video ID format
- `generateYouTubeEmbedUrl(videoId: string, options?)`: Generates optimized embed URL

#### Supported URL Formats:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`
- `https://www.youtube.com/embed/dQw4w9WgXcQ`
- `https://www.youtube.com/shorts/dQw4w9WgXcQ`
- `https://m.youtube.com/watch?v=dQw4w9WgXcQ`
- `dQw4w9WgXcQ` (clean video ID)

## Theme Enhancements

### Enhanced Dark Theme
The dark theme has been upgraded with crystalline planet explosion aesthetics:

- **Primary Colors**: BlueViolet (#8a2be2), MediumOrchid (#ba55d3), Indigo (#4b0082)
- **Secondary Colors**: MediumSlateBlue (#9370db), Plum (#dda0dd), DarkSlateBlue (#483d8b)
- **Background**: Deep space black with cosmic gradient overlays
- **Typography**: Inter font family with enhanced font weights and letter spacing

### Visual Effects
- **Crystalline Glow**: Animated borders with pulsating purple/violet glow
- **Cosmic Particles**: Floating particles with staggered animations
- **Planet Explosion**: Ripple effects in the background
- **Gradient Text**: Multi-colored text gradients for section headers

## Usage Instructions

### Adding New Videos

1. **Single Video:**
```tsx
<CrystallineVideoPlayer
  videoId="YOUR_VIDEO_ID_HERE"
  title="Titre de la Performance"
  description="Description de la performance"
/>
```

2. **Multiple Videos:**
```tsx
<Box sx={{ marginTop: '4rem' }}>
  <CrystallineVideoPlayer
    videoId="FIRST_VIDEO_ID"
    title="Premier Récital"
    description="Description du premier récital"
  />
</Box>

<Box sx={{ marginTop: '4rem' }}>
  <CrystallineVideoPlayer
    videoId="SECOND_VIDEO_ID"
    title="Deuxième Performance"
    description="Description de la deuxième performance"
  />
</Box>
```

### Customization Options

#### Video Embed Settings
The utility functions support customizable embed parameters:
```tsx
import { generateYouTubeEmbedUrl } from '../utils/youtube';

const customEmbedUrl = generateYouTubeEmbedUrl('VIDEO_ID', {
  autoplay: true,
  controls: false,
  modestbranding: false
});
```

#### Styling Customization
To modify the crystalline effects, edit the keyframe animations in `CrystallineVideoPlayer.tsx`:
- `crystallineGlow`: Controls the border glow animation
- `floatingParticles`: Controls particle movement
- `explosionRipple`: Controls background ripple effects

## Responsive Design

The component automatically adapts to different screen sizes:
- **Desktop**: Full-width video player with larger typography
- **Tablet**: Medium-sized player with adjusted spacing
- **Mobile**: Compact design with smaller typography

## Best Practices

1. **Video Quality**: Use high-quality videos (1080p or higher) for best visual impact
2. **Video Length**: Keep promotional videos concise (3-5 minutes) for better engagement
3. **Titles**: Use descriptive French titles that reflect the performance content
4. **Descriptions**: Provide engaging descriptions that highlight the pianist's skill
5. **Spacing**: Use consistent spacing (4rem margin-top) between multiple videos

## File Structure
```
src/
├── components/
│   └── CrystallineVideoPlayer.tsx
├── utils/
│   └── youtube.ts
└── App.tsx (updated with theme and video integration)
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Compatibility

The implementation uses modern CSS features and is compatible with:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance Notes

- Animations use CSS transforms and opacity for optimal performance
- Video embeds are lazy-loaded by YouTube
- Crystalline effects use hardware acceleration where available
- Minimal JavaScript for maximum performance

## Support

For any issues or customizations needed with the video integration, refer to:
1. The component source code comments
2. Material-UI documentation for styling options
3. YouTube Player API documentation for embed parameters