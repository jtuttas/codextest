/**
 * Tic Tac Toe Game Component
 */

import { el, qs, on, addClass, removeClass, hasClass, nextFrame } from '../dom.js';
import * as storage from '../../storage.js';

/**
 * Game state management
 */
class TicTacToeGame {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
    this.winningCells = [];
    this.stats = this.loadStats();
  }

  /**
   * Load game statistics from storage
   */
  loadStats() {
    return storage.get('stats', {
      gamesPlayed: 0,
      xWins: 0,
      oWins: 0,
      draws: 0
    });
  }

  /**
   * Save game statistics to storage
   */
  saveStats() {
    storage.set('stats', this.stats);
  }

  /**
   * Make a move at the specified position
   * @param {number} position - Board position (0-8)
   * @returns {boolean} Success status
   */
  makeMove(position) {
    if (this.board[position] || this.gameOver) {
      return false;
    }

    this.board[position] = this.currentPlayer;
    
    // Check for win or draw
    const result = this.checkGameEnd();
    
    if (result.winner) {
      this.gameOver = true;
      this.winner = result.winner;
      this.winningCells = result.winningCells;
      this.updateStats(result.winner);
    } else if (result.draw) {
      this.gameOver = true;
      this.updateStats('draw');
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    return true;
  }

  /**
   * Check if game has ended
   * @returns {Object} Game end result
   */
  checkGameEnd() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check for winner
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return {
          winner: this.board[a],
          winningCells: pattern,
          draw: false
        };
      }
    }

    // Check for draw
    const draw = this.board.every(cell => cell !== null);
    
    return { winner: null, winningCells: [], draw };
  }

  /**
   * Update game statistics
   * @param {string} result - Game result ('X', 'O', or 'draw')
   */
  updateStats(result) {
    this.stats.gamesPlayed++;
    
    if (result === 'X') {
      this.stats.xWins++;
    } else if (result === 'O') {
      this.stats.oWins++;
    } else if (result === 'draw') {
      this.stats.draws++;
    }
    
    this.saveStats();
  }

  /**
   * Reset the game
   */
  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
    this.winningCells = [];
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      gamesPlayed: 0,
      xWins: 0,
      oWins: 0,
      draws: 0
    };
    this.saveStats();
  }

  /**
   * Get current game status message
   * @returns {string}
   */
  getStatusMessage() {
    if (this.winner) {
      return `Spieler ${this.winner} hat gewonnen! 🎉`;
    } else if (this.gameOver) {
      return `Unentschieden! 🤝`;
    } else {
      return `Spieler ${this.currentPlayer} ist am Zug`;
    }
  }
}

/**
 * Create Tic Tac Toe game component
 * @returns {HTMLElement}
 */
export function createTicTacToe() {
  const game = new TicTacToeGame();
  let gameContainer;
  let statusElement;
  let boardElement;
  let statsElements = {};

  /**
   * Handle cell click
   * @param {Event} event
   */
  const handleCellClick = (event) => {
    const cell = event.target;
    const position = parseInt(cell.dataset.position);
    
    if (!game.makeMove(position)) {
      return;
    }

    updateUI();
  };

  /**
   * Handle new game
   */
  const handleNewGame = () => {
    game.reset();
    updateUI();
  };

  /**
   * Handle reset statistics
   */
  const handleResetStats = () => {
    if (confirm('Möchten Sie wirklich alle Statistiken zurücksetzen?')) {
      game.resetStats();
      updateStats();
    }
  };

  /**
   * Update the game UI
   */
  const updateUI = () => {
    // Update status
    statusElement.textContent = game.getStatusMessage();
    
    // Update board
    const cells = qs('.board', gameContainer).children;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const value = game.board[i];
      
      // Clear previous classes
      removeClass(cell, 'board__cell--x', 'board__cell--o', 'board__cell--filled', 'board__cell--winning');
      
      if (value) {
        cell.textContent = value;
        addClass(cell, 'board__cell--filled', `board__cell--${value.toLowerCase()}`);
      } else {
        cell.textContent = '';
      }
      
      // Highlight winning cells
      if (game.winningCells.includes(i)) {
        addClass(cell, 'board__cell--winning');
      }
    }
    
    // Update current player score display
    updateCurrentPlayerDisplay();
    
    // Update statistics
    updateStats();
  };

  /**
   * Update current player display
   */
  const updateCurrentPlayerDisplay = () => {
    const xScore = qs('.score--x', gameContainer);
    const oScore = qs('.score--o', gameContainer);
    
    removeClass(xScore, 'score--active');
    removeClass(oScore, 'score--active');
    
    if (!game.gameOver) {
      if (game.currentPlayer === 'X') {
        addClass(xScore, 'score--active');
      } else {
        addClass(oScore, 'score--active');
      }
    }
  };

  /**
   * Update statistics display
   */
  const updateStats = () => {
    statsElements.gamesPlayed.textContent = game.stats.gamesPlayed;
    statsElements.xWins.textContent = game.stats.xWins;
    statsElements.oWins.textContent = game.stats.oWins;
    statsElements.draws.textContent = game.stats.draws;
  };

  /**
   * Create game board
   * @returns {HTMLElement}
   */
  const createBoard = () => {
    const board = el('div', { 
      className: 'board',
      role: 'grid',
      'aria-label': 'Tic Tac Toe Spielfeld'
    });

    for (let i = 0; i < 9; i++) {
      const cell = el('button', {
        className: 'board__cell',
        dataset: { position: i },
        role: 'gridcell',
        'aria-label': `Zelle ${i + 1}`,
        tabIndex: 0
      });
      
      on(cell, 'click', handleCellClick);
      board.appendChild(cell);
    }

    return board;
  };

  // Create main game container
  gameContainer = el('div', { className: 'game' },
    el('div', { className: 'game__header' },
      statusElement = el('div', { 
        className: 'game__status',
        role: 'status',
        'aria-live': 'polite'
      }, game.getStatusMessage()),
      
      el('div', { className: 'game__score' },
        el('div', { className: 'score__item score--x' },
          el('span', { className: 'score__label' }, 'Spieler X'),
          el('span', { className: 'score__value' }, game.stats.xWins)
        ),
        el('div', { className: 'score__item' },
          el('span', { className: 'score__label' }, 'Unentschieden'),
          el('span', { className: 'score__value' }, game.stats.draws)
        ),
        el('div', { className: 'score__item score--o' },
          el('span', { className: 'score__label' }, 'Spieler O'),
          el('span', { className: 'score__value' }, game.stats.oWins)
        )
      )
    ),

    boardElement = createBoard(),

    el('div', { className: 'game__controls' },
      el('button', { 
        className: 'btn',
        onclick: handleNewGame
      }, '🔄 Neues Spiel'),
      
      el('button', { 
        className: 'btn btn--secondary',
        onclick: handleResetStats
      }, '📊 Statistiken zurücksetzen')
    )
  );

  // Create statistics section
  const statsContainer = el('div', { className: 'stats' },
    el('h2', { className: 'stats__title' }, 'Spielstatistiken'),
    el('div', { className: 'stats__grid' },
      el('div', { className: 'stats__item' },
        el('span', { className: 'stats__label' }, 'Gespielte Spiele'),
        statsElements.gamesPlayed = el('span', { className: 'stats__value' }, game.stats.gamesPlayed)
      ),
      el('div', { className: 'stats__item' },
        el('span', { className: 'stats__label' }, 'X Siege'),
        statsElements.xWins = el('span', { className: 'stats__value' }, game.stats.xWins)
      ),
      el('div', { className: 'stats__item' },
        el('span', { className: 'stats__label' }, 'O Siege'),
        statsElements.oWins = el('span', { className: 'stats__value' }, game.stats.oWins)
      ),
      el('div', { className: 'stats__item' },
        el('span', { className: 'stats__label' }, 'Unentschieden'),
        statsElements.draws = el('span', { className: 'stats__value' }, game.stats.draws)
      )
    )
  );

  // Initialize UI
  updateCurrentPlayerDisplay();

  return el('div', {},
    gameContainer,
    statsContainer
  );
}