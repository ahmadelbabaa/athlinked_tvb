// This script forces the color scheme by manipulating the DOM directly
const applyColorScheme = () => {
  // Set CSS variables
  document.documentElement.style.setProperty('--primary-blue', '#1a3b8f', 'important');
  document.documentElement.style.setProperty('--secondary-blue', '#1e54b7', 'important');
  document.documentElement.style.setProperty('--accent-pink', '#e94b8a', 'important');
  document.documentElement.style.setProperty('--accent-purple', '#8c52ff', 'important');
  document.documentElement.style.setProperty('--tonsser-dark', '#1a3b8f', 'important');
  document.documentElement.style.setProperty('--tonsser-green', '#e94b8a', 'important');
  document.documentElement.style.setProperty('--tonsser-text', '#ffffff', 'important');
  document.documentElement.style.setProperty('--tonsser-light-gray', '#d0d5e9', 'important');
  document.documentElement.style.setProperty('--tonsser-dark-gray', '#183075', 'important');

  // Apply styles to body and root elements
  document.body.style.backgroundColor = '#1a3b8f';
  document.body.style.color = '#ffffff';

  // Select and style all necessary elements
  const styleElements = () => {
    // Navbar elements
    document.querySelectorAll('.navbar').forEach(el => {
      el.style.backgroundColor = '#1a3b8f';
      el.style.color = '#ffffff';
    });

    document.querySelectorAll('.navbar-links a').forEach(el => {
      el.style.color = '#ffffff';
    });

    document.querySelectorAll('.navbar-brand-badge, .tonsser-united-badge').forEach(el => {
      el.style.backgroundColor = '#e94b8a';
      el.style.color = '#1a3b8f';
    });

    // Buttons
    document.querySelectorAll('.login-button, .tonsser-cta-button, .card-button, .register-button').forEach(el => {
      el.style.backgroundColor = '#e94b8a';
      el.style.color = '#1a3b8f';
    });

    document.querySelectorAll('.logout-button').forEach(el => {
      el.style.backgroundColor = 'transparent';
      el.style.color = '#d0d5e9';
      el.style.border = '1px solid #d0d5e9';
    });

    // Footer
    document.querySelectorAll('.footer').forEach(el => {
      el.style.backgroundColor = '#183075';
      el.style.color = '#d0d5e9';
    });

    // Cards
    document.querySelectorAll('.card, .event-card').forEach(el => {
      el.style.backgroundColor = '#1e54b7';
      el.style.color = '#ffffff';
    });

    // Hero sections
    document.querySelectorAll('.tonsser-hero, .page-hero').forEach(el => {
      el.style.backgroundColor = '#1a3b8f';
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
    });

    // Text elements
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
      el.style.color = '#ffffff';
    });

    document.querySelectorAll('p').forEach(el => {
      el.style.color = '#d0d5e9';
    });

    // Feature sections
    document.querySelectorAll('.tonsser-features-section, .event-details, .requirements-section').forEach(el => {
      el.style.backgroundColor = '#183075';
    });

    document.querySelectorAll('.tonsser-feature').forEach(el => {
      el.style.backgroundColor = '#1a3b8f';
    });

    // Form controls
    document.querySelectorAll('input, select, textarea').forEach(el => {
      el.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      el.style.color = '#ffffff';
      el.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    });

    // Stats
    document.querySelectorAll('.stat-number').forEach(el => {
      el.style.color = '#ffffff';
      el.style.fontWeight = '800';
    });

    document.querySelectorAll('.stat-description').forEach(el => {
      el.style.color = '#d0d5e9';
    });
  };

  // Apply styles immediately
  styleElements();

  // Set up a MutationObserver to handle dynamically added elements
  const observer = new MutationObserver(mutations => {
    styleElements();
  });

  // Start observing the document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Export the function
export default applyColorScheme; 