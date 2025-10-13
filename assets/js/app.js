// Update your app.js
class App {
  static showSection(section) {
     if (['ch1', 'ch2', 'ch3'].includes(section) && !Auth.isAuthenticated()) {
    showLoginModal();
    return;
  }
  
    ['home', 'ch1', 'ch2', 'ch3'].forEach(id =>
      document.getElementById(id + '-section').style.display = (id === section) ? 'block' : 'none'
    );
    window.scrollTo(0,0);
  }
  
  static updateAuthUI() {
    const isAuthenticated = Auth.isAuthenticated();
    const guestButtons = document.getElementById('guestButtons');
    const userButtons = document.getElementById('userButtons');
    const userWelcome = document.getElementById('userWelcome');
    
    if (isAuthenticated) {
      const user = Auth.getUser();
      guestButtons.style.display = 'none';
      userButtons.style.display = 'block';
      userWelcome.textContent = `Welcome, ${user.name}!`;
    } else {
      guestButtons.style.display = 'block';
      userButtons.style.display = 'none';
    }
  }
  
  static init() {
    this.showSection('home');
    this.updateAuthUI();
  }
}

document.addEventListener('DOMContentLoaded', () => App.init());
