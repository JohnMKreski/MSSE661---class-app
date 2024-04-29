const checkAuthenticationBeforeModal = () => {
    // Check if the user is authenticated
    if (!authService.isAuth() || authService.isTokenExpired()) {
        alert('Log in to request songs.');
        location.reload();
    } else {
        // Open the modal if the user is authenticated
        $('#songRequestModal').modal('show');
    }
};

  