/**
 * YouTube utility functions for the pianist showcase website
 */

/**
 * Extracts the video ID from various YouTube URL formats
 * @param url - YouTube URL in various formats
 * @returns Clean video ID or null if invalid
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    // Standard YouTube URLs
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // YouTube shorts
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    // YouTube mobile URLs
    /m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    // Already clean video ID (11 characters)
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validates if a string is a valid YouTube video ID
 * @param videoId - String to validate
 * @returns Boolean indicating if it's a valid video ID
 */
export function isValidYouTubeVideoId(videoId: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
}

/**
 * Generates a YouTube embed URL with optimal settings for the pianist showcase
 * @param videoId - Clean YouTube video ID
 * @param options - Optional embed parameters
 * @returns Complete embed URL
 */
export function generateYouTubeEmbedUrl(
  videoId: string,
  options: {
    autoplay?: boolean;
    controls?: boolean;
    modestbranding?: boolean;
    rel?: boolean;
    showinfo?: boolean;
    cc_load_policy?: 0 | 1;
    fs?: boolean;
    iv_load_policy?: 1 | 3;
  } = {}
): string {
  const defaultOptions = {
    autoplay: false,
    controls: true,
    modestbranding: true,
    rel: false,
    showinfo: false,
    cc_load_policy: 0,
    fs: true,
    iv_load_policy: 3,
    ...options
  };

  const params = new URLSearchParams({
    rel: defaultOptions.rel ? '1' : '0',
    showinfo: defaultOptions.showinfo ? '1' : '0',
    modestbranding: defaultOptions.modestbranding ? '1' : '0',
    autoplay: defaultOptions.autoplay ? '1' : '0',
    controls: defaultOptions.controls ? '1' : '0',
    cc_load_policy: defaultOptions.cc_load_policy.toString(),
    fs: defaultOptions.fs ? '1' : '0',
    iv_load_policy: defaultOptions.iv_load_policy.toString()
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}