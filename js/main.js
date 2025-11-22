/**
 * Tic Tac Toe App - Main Entry Point
 */

import { qs, render } from './ui/dom.js';
import { createTicTacToe } from './ui/components/tic-tac-toe.js';
import { initTheme } from './theme.js';

/**
 * Initialize the application
 */
function init() {
  // Initialize theme system first (to prevent flash of wrong theme)
  const themeToggleButton = qs('#theme-toggle');
  initTheme(themeToggleButton);

  // Set current year in footer
  const yearEl = qs('#year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Get main app container
  const appContainer = qs('#app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  // Create and render the Tic Tac Toe game
  const gameComponent = createTicTacToe();
  render(appContainer, gameComponent);

  // Set focus to main container for accessibility
  appContainer.focus();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}