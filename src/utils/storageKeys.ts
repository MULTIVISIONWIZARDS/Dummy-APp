export const STORAGE_KEYS = {
  /* ================= AUTH ================= */
  AUTH_TOKEN: 'authToken',
  LEGACY_TOKEN: 'token', // ⚠️ remove later when fully migrated
  USER_ID: 'userId',
  USER_INFO: 'userInfo',
  IS_LOGGED_IN: 'isLoggedIn',

  /* ================= ONBOARDING & APP ================= */
  HAS_ONBOARDED: 'hasOnboarded',
  THEME_MODE: 'themeMode', // dark | light (if used)
  LANGUAGE: 'language', // en | hi etc (if used)

  /* ================= SUBSCRIPTION & PAYMENT ================= */
  SUBSCRIPTION_DETAILS: 'subscriptionDetails',
  SUBSCRIPTION_BY_USER: (userId: string) => `subscription_${userId}`,
  LAST_EXPANDED_TIER: 'last_expanded_tier',
  EXTRA_FEE: 'extraFee',
  MEETING: 'meeting',

  /* ================= CHAT ================= */
  ACTIVE_CHAT_ID: 'activeChatId',
  USER_CHAT_MESSAGES: 'user_chat_messages',

  /* ================= USER CONTENT ================= */
  JOURNAL_ENTRIES: 'journalEntries',

  /* ================= WELLNESS / SCORES ================= */
  BOX_BREATHING_SCORES: 'boxBreathingScores',
  TAP_HAPPY_SCORES: 'tapHappyScores',

  /* ================= CACHE ================= */
  LAST_PROFILE_FETCH: 'lastProfileFetch',
};
