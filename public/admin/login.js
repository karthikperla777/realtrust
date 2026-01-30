const API_URL = '/api/auth';

// Tab switching
function switchTab(tab) {
  const tabs = document.querySelectorAll('.form-content');
  const buttons = document.querySelectorAll('.tab-btn');

  tabs.forEach(t => t.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  if (tab === 'signin') {
    document.getElementById('signinForm').classList.add('active');
    buttons[0].classList.add('active');
  } else {
    document.getElementById('signupForm').classList.add('active');
    buttons[1].classList.add('active');
  }
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Verify token is still valid
    verifyToken(token);
  }
});

function verifyToken(token) {
  fetch(`${API_URL}/verify-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Token is valid, redirect to admin panel
        window.location.href = '/admin/index.html';
      }
    })
    .catch(() => {
      // Token is invalid, user can sign in again
    });
}

// Sign In
document.getElementById('signinForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;
  const errorDiv = document.getElementById('signinError');
  const successDiv = document.getElementById('signinSuccess');
  const loadingDiv = document.getElementById('signinLoading');
  const submitBtn = document.getElementById('signinBtn');

  // Reset messages
  errorDiv.classList.remove('show');
  successDiv.classList.remove('show');
  loadingDiv.classList.add('show');
  submitBtn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user info
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      successDiv.textContent = 'Login successful! Redirecting...';
      successDiv.classList.add('show');

      // Redirect to admin panel after 1 second
      setTimeout(() => {
        window.location.href = '/admin/index.html';
      }, 1000);
    } else {
      errorDiv.textContent = data.message || 'Sign in failed';
      errorDiv.classList.add('show');
      loadingDiv.classList.remove('show');
      submitBtn.disabled = false;
    }
  } catch (error) {
    errorDiv.textContent = 'An error occurred. Please try again.';
    errorDiv.classList.add('show');
    loadingDiv.classList.remove('show');
    submitBtn.disabled = false;
  }
});

// Sign Up
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  const errorDiv = document.getElementById('signupError');
  const successDiv = document.getElementById('signupSuccess');
  const loadingDiv = document.getElementById('signupLoading');
  const submitBtn = document.getElementById('signupBtn');
  const mismatchDiv = document.getElementById('passwordMismatch');

  // Reset messages
  errorDiv.classList.remove('show');
  successDiv.classList.remove('show');
  mismatchDiv.style.display = 'none';

  // Validate passwords match
  if (password !== confirmPassword) {
    mismatchDiv.style.display = 'block';
    return;
  }

  loadingDiv.classList.add('show');
  submitBtn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirmPassword })
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user info
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      successDiv.textContent = 'Account created successfully! Redirecting to admin panel...';
      successDiv.classList.add('show');

      // Redirect to admin panel after 1 second
      setTimeout(() => {
        window.location.href = '/admin/index.html';
      }, 1000);
    } else {
      errorDiv.textContent = data.message || 'Sign up failed';
      errorDiv.classList.add('show');
      loadingDiv.classList.remove('show');
      submitBtn.disabled = false;
    }
  } catch (error) {
    errorDiv.textContent = 'An error occurred. Please try again.';
    errorDiv.classList.add('show');
    loadingDiv.classList.remove('show');
    submitBtn.disabled = false;
  }
});

// Check password match on input
document.getElementById('signupConfirmPassword').addEventListener('input', () => {
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  const mismatchDiv = document.getElementById('passwordMismatch');

  if (confirmPassword && password !== confirmPassword) {
    mismatchDiv.style.display = 'block';
  } else {
    mismatchDiv.style.display = 'none';
  }
});
