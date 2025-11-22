/**
 * Theme Management Module
 * Handles dark/light theme switching with localStorage persistence
 */

import * as storage from './storage.js';

const THEME_KEY = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_ATTR = 'data-theme';

/**
 * Get system color scheme preference
 * @returns {string} 'dark' or 'light'
 */
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEME_DARK;
  }
  return THEME_LIGHT;
}

/**
 * Get current theme from storage or system preference
 * @returns {string} Current theme
 */
function getCurrentTheme() {
  const savedTheme = storage.get(THEME_KEY);
  if (savedTheme && (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK)) {
    return savedTheme;
  }
  // On first visit, use system preference
  return getSystemTheme();
}

/**
 * Apply theme to the document
 * @param {string} theme - Theme to apply ('light' or 'dark')
 */
function applyTheme(theme) {
  document.documentElement.setAttribute(THEME_ATTR, theme);
  storage.set(THEME_KEY, theme);
}

/**
 * Toggle between light and dark theme
 * @returns {string} New theme
 */
function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
  applyTheme(newTheme);
  return newTheme;
}

/**
 * Update theme toggle button icon
 * @param {HTMLElement} button - Toggle button element
 * @param {string} theme - Current theme
 */
function updateToggleButton(button, theme) {
  if (!button) return;
  
  // Update button content with appropriate icon
  if (theme === THEME_DARK) {
    button.innerHTML = '☀️'; // Sun icon for switching to light
    button.setAttribute('aria-label', 'Zu hellem Modus wechseln');
    button.title = 'Zu hellem Modus wechseln';
  } else {
    button.innerHTML = '🌙'; // Moon icon for switching to dark
    button.setAttribute('aria-label', 'Zu dunklem Modus wechseln');
    button.title = 'Zu dunklem Modus wechseln';
  }
}

/**
 * Initialize theme system
 * Should be called as early as possible to prevent flash
 * @param {HTMLElement} toggleButton - Optional toggle button element
 * @returns {Object} Theme API
 */
export function initTheme(toggleButton = null) {
  // Apply saved/system theme immediately
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
  
  // Update toggle button if provided
  if (toggleButton) {
    updateToggleButton(toggleButton, currentTheme);
    
    // Add click handler
    toggleButton.addEventListener('click', () => {
      const newTheme = toggleTheme();
      updateToggleButton(toggleButton, newTheme);
    });
  }
  
  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Use modern API if available, fallback to deprecated one
    const listener = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = storage.get(THEME_KEY);
      if (!savedTheme) {
        const systemTheme = e.matches ? THEME_DARK : THEME_LIGHT;
        applyTheme(systemTheme);
        if (toggleButton) {
          updateToggleButton(toggleButton, systemTheme);
        }
      }
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }
  }
  
  return {
    getCurrentTheme,
    toggleTheme,
    applyTheme,
    THEME_LIGHT,
    THEME_DARK
  };
}
