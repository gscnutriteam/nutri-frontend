// Define base URL and route configurations
const baseURL = '/app';

// Define route groups
const authRoutesPaths = ['/token'];
const memberUserRoutesPaths = ['/scan', '/info-kesehatan'];
const guestRoutesPaths = ['/login', '/register', '/forgot-password'];

// Full route paths with baseURL
export const authRoutes = authRoutesPaths.map(route => `${baseURL}${route}`);
export const guestRoutes = guestRoutesPaths.map(route => `${baseURL}${route}`);
export const memberUserRoutes = memberUserRoutesPaths.map(route => `${baseURL}${route}`);

// Define feature-protected routes with the required feature for each route
export const featureRoutes: Record<string, string> = {
  [`${baseURL}/scan`]: 'scan_ai',
  [`${baseURL}/info-kesehatan`]: 'health_info',
  [`${baseURL}/resep-makanan`]: 'health_info',
  [`${baseURL}/statistic`]: 'weight_tracking',
  [`${baseURL}/chat-nubo`]: 'chatbot',
};

// Matcher configuration for Next.js
export const middlewareConfig = {
  matcher: [
    // Match routes without spread operator
    '/app/token/:path*',
    '/app/login/:path*',
    '/app/register/:path*',
    '/app/forgot-password/:path*',
    '/app/scan/:path*',
    '/app/info-kesehatan/:path*',
    '/app/token',
    '/app/login',
    '/app/register',
    '/app/forgot-password',
    '/app/scan',
    '/app/info-kesehatan',
    '/app/resep-makanan/:path*',
    '/app/bmi/:path*',
    '/app/bmi',
    '/app/tracking/:path*',
    '/app/tracking',
    '/app/chat-nubo',
    '/app',
    '/debug/:path*'
  ]
}; 