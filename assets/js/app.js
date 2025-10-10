class App {
  static showSection(section) {
    ['home', 'ch1', 'ch2', 'ch3'].forEach(id =>
      document.getElementById(id + '-section').style.display = (id === section) ? 'block' : 'none'
    );
    window.scrollTo(0,0);
  }
  static init() {
    this.showSection('home');
  }
}
document.addEventListener('DOMContentLoaded', () => App.init());
