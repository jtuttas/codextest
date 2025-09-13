/**
 * DOM Hilfsfunktionen für die Tic Tac Toe App
 */

/** Query single element */
export const qs = (sel, ctx = document) => ctx.querySelector(sel);

/** Query all elements */
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/**
 * Create element with optional props/children
 * @param {string} tag - HTML tag name
 * @param {Object} props - Element properties and attributes
 * @param {...(Node|string)} children - Child nodes or text
 * @returns {HTMLElement}
 */
export const el = (tag, props = {}, ...children) => {
  const node = document.createElement(tag);
  
  // Set properties and attributes
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      node.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        node.dataset[dataKey] = dataValue;
      });
    } else if (key.startsWith('aria-') || key.startsWith('data-')) {
      node.setAttribute(key, value);
    } else {
      node[key] = value;
    }
  });
  
  // Append children
  for (const child of children.flat()) {
    if (child?.nodeType) {
      node.appendChild(child);
    } else if (child != null) {
      node.appendChild(document.createTextNode(String(child)));
    }
  }
  
  return node;
};

/** Event helper */
export const on = (target, type, handler, opts) => {
  target.addEventListener(type, handler, opts);
  return () => target.removeEventListener(type, handler, opts);
};

/** Remove event listener */
export const off = (target, type, handler, opts) => 
  target.removeEventListener(type, handler, opts);

/**
 * Render content into a container, replacing existing content
 * @param {HTMLElement} container - Target container
 * @param {...(Node|string)} content - Content to render
 */
export const render = (container, ...content) => {
  container.innerHTML = '';
  for (const item of content.flat()) {
    if (item?.nodeType) {
      container.appendChild(item);
    } else if (item != null) {
      container.appendChild(document.createTextNode(String(item)));
    }
  }
};

/**
 * Add CSS classes to an element
 * @param {HTMLElement} element - Target element
 * @param {...string} classes - Classes to add
 */
export const addClass = (element, ...classes) => {
  element.classList.add(...classes);
};

/**
 * Remove CSS classes from an element
 * @param {HTMLElement} element - Target element
 * @param {...string} classes - Classes to remove
 */
export const removeClass = (element, ...classes) => {
  element.classList.remove(...classes);
};

/**
 * Toggle CSS classes on an element
 * @param {HTMLElement} element - Target element
 * @param {...string} classes - Classes to toggle
 */
export const toggleClass = (element, ...classes) => {
  classes.forEach(cls => element.classList.toggle(cls));
};

/**
 * Check if element has CSS class
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class to check
 * @returns {boolean}
 */
export const hasClass = (element, className) => {
  return element.classList.contains(className);
};

/**
 * Wait for next animation frame
 * @returns {Promise<number>}
 */
export const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};