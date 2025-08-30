# Fitness App Implementation Tasks

## Task 1: Database Schema Setup & Supabase Configuration
**Objective**: Set up all required database tables and configure Supabase types

**Implementation Details:**
- Create database tables: users, classes, bookings, posts, comments, likes
- Set up RLS (Row Level Security) policies for all tables
- Generate TypeScript types from Supabase schema
- Update supabase/types.ts with new schema
- Test database connections and basic CRUD operations

**Acceptance Criteria:**
- All 6 tables exist in Supabase with proper relationships
- RLS policies prevent unauthorized access
- TypeScript types are generated and imported
- Can create/read basic records from all tables
- Authentication still works after schema changes

**Files to Create/Modify:**
- SQL migration files for database schema
- `src/integrations/supabase/types.ts` (regenerate)
- Basic API functions in `src/lib/` for each table

---

## Task 2: Mobile-First Layout Transformation
**Objective**: Convert desktop dashboard to mobile-optimized fitness app layout

**Implementation Details:**
- Redesign DashboardLayout to be mobile-first
- Update bottom navigation to match fitness app (Home, Schedule, Social, Settings)
- Remove desktop sidebar for mobile view
- Update CSS classes and responsive breakpoints
- Implement proper mobile touch interactions
- Add proper mobile viewport meta tags

**Acceptance Criteria:**
- App is fully responsive and mobile-optimized
- Bottom navigation shows 4 tabs: Home, Schedule, Social, Settings
- No desktop sidebar on mobile
- Touch-friendly button sizes (44px minimum)
- Proper viewport scaling on mobile devices

**Files to Create/Modify:**
- `src/components/DashboardLayout.tsx` - mobile-first redesign
- `src/components/DashboardNavigation.tsx` - new tab structure
- `src/index.css` - mobile-first CSS updates
- `index.html` - viewport meta tags

---

## Task 3: Home Screen with User Dashboard
**Objective**: Implement personalized home screen with greeting, stats, and today's class

**Implementation Details:**
- Create personalized greeting component with time-based messages
- Build today's class card showing user's booked class for today
- Create stats cards component (classes attended, streak, total classes)
- Implement weekly activity calendar showing completed/upcoming classes
- Add proper loading states and error handling
- Mock data initially, then connect to real APIs

**Acceptance Criteria:**
- Greeting shows "Good morning/afternoon/evening [Name]" based on time
- Today's class card shows class details if user has booking today
- Stats cards display user's fitness metrics
- Weekly calendar shows visual indicators for completed/upcoming classes
- Smooth loading states and error handling

**Files to Create/Modify:**
- `src/pages/Home.tsx` (rename from Index.tsx)
- `src/components/GreetingCard.tsx`
- `src/components/TodaysClassCard.tsx`
- `src/components/StatsGrid.tsx`
- `src/components/WeeklyActivity.tsx`
- `src/hooks/useUserStats.ts`
- `src/lib/api/users.ts`

---

## Task 4: Authentication & User Profile System
**Objective**: Complete authentication flow and user profile management

**Implementation Details:**
- Update existing auth system for fitness app needs
- Create user profile form with name, avatar, fitness goals
- Implement profile photo upload to Supabase Storage
- Add signup flow for new users
- Create onboarding flow for first-time users
- Update user store with profile data

**Acceptance Criteria:**
- New users can sign up and complete profile setup
- Users can upload and update profile photos
- Profile information is stored in users table
- Onboarding flow guides new users through setup
- All auth flows work seamlessly on mobile

**Files to Create/Modify:**
- `src/pages/Signup.tsx`
- `src/pages/Onboarding.tsx`
- `src/components/ProfileForm.tsx`
- `src/components/AvatarUpload.tsx`
- `src/lib/api/auth.ts`
- Update `src/context/AuthContext.tsx`

---

## Task 5: Schedule/Calendar System
**Objective**: Implement class schedule view with booking functionality

**Implementation Details:**
- Create calendar component showing available classes
- Build class card component with time, instructor, availability
- Implement class filtering by type, instructor, date
- Add class detail modal/page with full information
- Create booking system (book, cancel, waitlist)
- Handle booking conflicts and capacity limits
- Add loading states and error handling for all booking actions

**Acceptance Criteria:**
- Calendar shows all available classes for selected date
- Users can navigate between months/weeks
- Class cards show essential info (time, instructor, spots available)
- Class detail modal shows complete information
- Booking system works with proper validation
- Users get confirmation for all booking actions

**Files to Create/Modify:**
- `src/pages/Schedule.tsx`
- `src/components/Calendar.tsx`
- `src/components/ClassCard.tsx`
- `src/components/ClassDetailModal.tsx`
- `src/components/ClassFilter.tsx`
- `src/hooks/useClasses.ts`
- `src/hooks/useBookings.ts`
- `src/lib/api/classes.ts`
- `src/lib/api/bookings.ts`

---

## Task 6: Social Feed Implementation
**Objective**: Build community social feed with posts, comments, and interactions

**Implementation Details:**
- Create social feed with infinite scroll pagination
- Build post creation form with text and image support
- Implement image upload to Supabase Storage
- Add like/unlike functionality with optimistic updates
- Create comment system with nested replies
- Add user mentions and basic hashtag support
- Implement basic content moderation (user can delete own posts)

**Acceptance Criteria:**
- Users can create text and image posts
- Feed loads with smooth infinite scroll
- Like/unlike works with real-time count updates
- Comment system allows threaded conversations
- Image uploads work reliably with progress indicators
- Users can delete their own posts and comments

**Files to Create/Modify:**
- `src/pages/Social.tsx`
- `src/components/SocialFeed.tsx`
- `src/components/PostCard.tsx`
- `src/components/CreatePost.tsx`
- `src/components/CommentSection.tsx`
- `src/hooks/usePosts.ts`
- `src/hooks/useComments.ts`
- `src/lib/api/posts.ts`
- `src/lib/api/comments.ts`

---

## Task 7: Settings & Profile Management
**Objective**: Complete settings screens and user account management

**Implementation Details:**
- Update settings page to match fitness app needs
- Implement profile editing with form validation
- Add account settings (email, password change)
- Create payment/credits display (read-only)
- Add document management for waivers
- Implement preferences (notifications, units)
- Add help & support section
- Create logout functionality

**Acceptance Criteria:**
- Users can update profile information and photo
- Account settings allow email/password changes
- Payment section shows credits and history (read-only)
- Document section displays signed waivers
- Preferences are saved and applied throughout app
- Help section provides useful information

**Files to Create/Modify:**
- Update `src/pages/Settings.tsx`
- `src/components/ProfileSettings.tsx`
- `src/components/AccountSettings.tsx`
- `src/components/PaymentInfo.tsx`
- `src/components/DocumentsSection.tsx`
- `src/components/PreferencesForm.tsx`

---

## Task 8: Real-time Features & Polish
**Objective**: Add real-time updates, PWA features, and final polish

**Implementation Details:**
- Implement real-time updates for class availability using Supabase Realtime
- Add push notifications for class reminders
- Configure PWA manifest and service worker
- Add offline support for viewing schedule
- Implement proper error boundaries and loading states
- Add haptic feedback for mobile interactions
- Performance optimization (lazy loading, image optimization)
- Add proper SEO meta tags

**Acceptance Criteria:**
- Class availability updates in real-time across all clients
- PWA installs properly on mobile devices
- App works offline for viewing cached data
- Smooth animations and transitions throughout
- Proper error handling with user-friendly messages
- Performance score >90 on Lighthouse

**Files to Create/Modify:**
- `public/manifest.json` - PWA manifest
- `public/sw.js` - Service worker
- `src/components/ErrorBoundary.tsx`
- `src/components/LoadingSpinner.tsx`
- `src/hooks/useOfflineStatus.ts`
- `src/lib/notifications.ts`
- Update all API functions with real-time subscriptions

---

## Task 9: Testing & Bug Fixes
**Objective**: Comprehensive testing and bug resolution

**Implementation Details:**
- Test all user flows on mobile devices
- Fix any responsive design issues
- Test booking conflicts and edge cases
- Validate form inputs and error handling
- Test image uploads with various file sizes
- Performance testing and optimization
- Cross-browser compatibility testing
- Accessibility testing and fixes

**Acceptance Criteria:**
- All features work reliably on iOS and Android browsers
- No critical bugs or UX issues
- Forms validate properly with helpful error messages
- Image uploads handle edge cases gracefully
- App meets WCAG 2.1 AA accessibility standards
- Performance is optimized for mobile networks

**Files to Modify:**
- Various components for bug fixes
- CSS updates for responsive design
- API functions for error handling
- Form validation improvements

---

## Notes for Implementation:

**Development Approach:**
- Start each task with the data/API layer first
- Then build components from the inside out
- Test on mobile devices frequently throughout development
- Use mock data initially, then connect to real APIs
- Focus on core functionality first, then add polish

**Testing Strategy:**
- Test each feature immediately after implementation
- Use both iOS Safari and Android Chrome for testing
- Test with slow network connections
- Validate all form inputs and error states

**Performance Considerations:**
- Lazy load images and components
- Implement proper caching strategies
- Minimize bundle size with code splitting
- Use React.memo for expensive components