// assets/js/auth.js
class Auth {
  static baseURL = 'http://localhost:8000/api'; // Change to your Laravel URL
  
  static async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, data };
      } else {
        return { success: false, errors: data.errors };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async logout() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    }
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.reload();
  }

  static isAuthenticated() {
    return localStorage.getItem('auth_token') !== null;
  }

  static getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static getToken() {
    return localStorage.getItem('auth_token');
  }

  static showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
  }

  static hideLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
  }

  static showRegisterModal() {
    Auth.hideLoginModal();
    document.getElementById('registerModal').style.display = 'block';
  }

  static hideRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
  }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      const result = await Auth.login(email, password);
      
      if (result.success) {
        Auth.hideLoginModal();
        location.reload(); // Refresh to show authenticated state
      } else {
        alert('Login failed: ' + (result.message || 'Unknown error'));
      }
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const userData = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        password_confirmation: document.getElementById('registerPasswordConfirm').value,
        phone: document.getElementById('registerPhone').value,
        grade: document.getElementById('registerGrade').value
      };
      
      const result = await Auth.register(userData);
      
      if (result.success) {
        Auth.hideRegisterModal();
        location.reload();
      } else {
        alert('Registration failed: ' + JSON.stringify(result.errors));
      }
    });
  }
});

window.Auth = Auth;
