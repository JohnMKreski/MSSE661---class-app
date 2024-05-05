(() => {
    if (!authService.isAuth() || authService.isTokenExpired()) {
      alert('Log in to view your tasks.');
      authService.logout();
    }
  })();//isAuth is called in auth.service 

  //protecting all routes with this guard
  //if we want to add more guards, we need new files with the x.guard.js file extention