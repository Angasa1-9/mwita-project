document.addEventListener('DOMContentLoaded', function() {
    // Check for session errors
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error) {
        showError(decodeURIComponent(error));
    }
    
    // Check for session success
    const success = urlParams.get('success');
    if (success) {
        showSuccess(decodeURIComponent(success));
    }
});

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.textContent = message;
    document.querySelector('.signin-signup').prepend(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.textContent = message;
    document.querySelector('.signin-signup').prepend(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => successDiv.remove(), 5000);
} 