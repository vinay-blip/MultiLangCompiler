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
const API_BASE_URL = 'http://localhost:6000';

// Utility function to show error message
function showError(element, message) {
    const errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
    } else {
        const newErrorDiv = document.createElement('div');
        newErrorDiv.className = 'error-message text-red-500 text-sm mt-1';
        newErrorDiv.textContent = message;
        newErrorDiv.style.display = message ? 'block' : 'none';
        element.parentNode.insertBefore(newErrorDiv, element.nextSibling);
    }
}

// Clear error messages when user starts typing
function setupInputValidation(input) {
    input.addEventListener('input', () => {
        showError(input, '');
    });
}

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Basic validation
    let isValid = true;
    if (!email) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    }
    
    if (!isValid) return;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Important for cookies/sessions if using them
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store the JWT token in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            // Show success message
            alert('Login successful!');
            // Redirect to dashboard or home page
            window.location.href = '/dashboard.html';
        } else {
            // Show error message from server or default message
            const errorMessage = data.message || 'Login failed. Please check your credentials.';
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again later.');
    }
});

// Set up input validation for signup form
const nameInput = signupForm.querySelector('input[type="text"]');
const signupEmailInput = signupForm.querySelector('input[type="email"]');
const passwordInputs = signupForm.querySelectorAll('input[type="password"]');

// Add input validation for all fields
[nameInput, signupEmailInput, ...passwordInputs].forEach(input => {
    setupInputValidation(input);
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: nameInput.value.trim(),
        email: signupEmailInput.value.trim(),
        password: passwordInputs[0].value,
        confirmPassword: passwordInputs[1].value
    };

    // Client-side validation
    let isValid = true;
    
    if (!formData.name) {
        showError(nameInput, 'Name is required');
        isValid = false;
    }
    
    if (!formData.email) {
        showError(signupEmailInput, 'Email is required');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        showError(signupEmailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (!formData.password) {
        showError(passwordInputs[0], 'Password is required');
        isValid = false;
    } else if (formData.password.length < 6) {
        showError(passwordInputs[0], 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showError(passwordInputs[1], 'Passwords do not match');
        isValid = false;
    }
    
    if (!isValid) return;

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
            }),
            credentials: 'include' // Important for cookies/sessions if using them
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
            alert('Registration successful! Please login.');
            // Clear form
            signupForm.reset();
            // Switch to login tab
            loginTab.click();
        } else {
            // Show error message from server or default message
            const errorMessage = data.message || 'Registration failed. Please try again.';
            alert(errorMessage);
            
            // Highlight problematic fields if server provides field-specific errors
            if (data.field) {
                const fieldMap = {
                    'email': signupEmailInput,
                    'name': nameInput,
                    'password': passwordInputs[0]
                };
                if (fieldMap[data.field]) {
                    showError(fieldMap[data.field], errorMessage);
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
    }
});