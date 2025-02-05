import { Dimensions, Platform, ScaledSize } from "react-native";

// Get initial dimensions
const { width, height } = Dimensions.get("window");
let [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// Device type detection
const isSmallDevice = shortDimension < 375; // iPhone 5/SE
const isMediumDevice = shortDimension >= 375 && shortDimension < 414; // iPhone 6-8
const isLargeDevice = shortDimension >= 414; // iPhone X/Plus/Modern Android

// Guideline sizes (based on iPhone 11 Pro Max screen size)
const GUIDELINE_BASE_WIDTH = 414;
const GUIDELINE_BASE_HEIGHT = 896;

// Scaling factors
const scale = (size: number) => (shortDimension / GUIDELINE_BASE_WIDTH) * size;
const verticalScale = (size: number) => (longDimension / GUIDELINE_BASE_HEIGHT) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;

// Responsive font sizing with device breakpoints
export const fs = {
  small: moderateScale(isSmallDevice ? 12 : 14),
  body: moderateScale(isSmallDevice ? 14 : 16),
  subHeading: moderateScale(isSmallDevice ? 16 : 20),
  heading: moderateScale(isSmallDevice ? 20 : 24),
  largeTitle: moderateScale(isSmallDevice ? 24 : 32),
};

// Adaptive spacing system
export const s = {
  xxs: moderateScale(4),
  xs: moderateScale(8),
  s: moderateScale(12),
  m: moderateScale(16),
  l: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
};

// Responsive button sizes
export const bs = {
  small: moderateVerticalScale(40),
  default: moderateVerticalScale(48),
  large: moderateVerticalScale(56),
};

// Adaptive border radii
export const br = {
  small: moderateScale(4),
  medium: moderateScale(8),
  large: moderateScale(16),
  xLarge: moderateScale(24),
  circle: moderateScale(50),
};

// Listen for orientation changes
Dimensions.addEventListener("change", ({ window }) => {
  [shortDimension, longDimension] = window.width < window.height ? [window.width, window.height] : [window.height, window.width];
});

// Additional responsive helpers
export const responsive = {
  // Percentage-based sizing
  widthPercentage: (percentage: number) => (shortDimension * percentage) / 100,
  heightPercentage: (percentage: number) => (longDimension * percentage) / 100,

  // Aspect ratio scaling
  aspectRatioScale: (size: number, ratio = 16 / 9) => Math.sqrt((size * shortDimension * (size * longDimension)) / ratio),

  // Platform-specific scaling
  platformScale: (iosSize: number, androidSize: number) =>
    Platform.select({ ios: moderateScale(iosSize), android: moderateScale(androidSize) }),
};

// Usage examples:
// - responsive.widthPercentage(50) // 50% of screen width
// - responsive.aspectRatioScale(100) // Scale based on aspect ratio
