// Toggle between login and signup forms
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('text-blue-600', 'border-blue-600');
    loginTab.classList.remove('text-gray-500');
    signupTab.classList.remove('text-blue-600', 'border-blue-600');
    signupTab.classList.add('text-gray-500');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('text-blue-600', 'border-blue-600');
    signupTab.classList.remove('text-gray-500');
    loginTab.classList.remove('text-blue-600', 'border-blue-600');
    loginTab.classList.add('text-gray-500');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store the JWT token in localStorage
            localStorage.setItem('token', data.token);
            // Redirect to dashboard or home page
            window.location.href = '/dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: signupForm.querySelector('input[type="text"]').value,
        email: signupForm.querySelector('input[type="email"]').value,
        password: signupForm.querySelectorAll('input[type="password"]')[0].value,
        confirmPassword: signupForm.querySelectorAll('input[type="password"]')[1].value
    };

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            // Switch to login tab
            loginTab.click();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});