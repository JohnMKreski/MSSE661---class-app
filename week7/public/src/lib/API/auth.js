const doLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  try {
    const res = await authService.login({ username, password });
    const { auth, expires_in, access_token, refresh_token, userRole } = res;
    const expiryDate = authService.setExpiration(expires_in);

    

    setStorage('userRoleType', userRole);

    setStorage('isAuth', auth);
    setStorage('expires_in', expiryDate);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);

    if (res) {
      if (userRole === 'Admin') {
        window.location.href = 'src/lib/admin/admin_dashboard.html';
      } else {
        window.location.href = 'src/lib/song_req/song_req.html';
      }
    }
  } catch (err) {
    alert('Failed to login. Please try again later.');
  }
};

const doRegister = async (e) => {
  e.preventDefault();

  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  try {
    const res = await authService.register({
      username,
      email,
      password
    });

    console.log(res);

    if (res) {
      window.location.href = '/index.html';
    }
  } catch (err) {
    alert('Failed to register. Please try again later.');
  }
};

const doLogout = (e) => {
  e.preventDefault();
  authService.logout();
};


(() => {
  // Elements for regular users
  const loginLink = document.getElementById('loginLink');
  const logoutLink = document.getElementById('logoutLink');
  const loginItem = document.getElementById('loginItem');
  const logoutItem = document.getElementById('logoutItem');
  const userItem = document.getElementById('userItem');
  const homeItem = document.getElementById('homeItem');
  const aboutItem = document.getElementById('aboutItem');
  const globalItem = document.getElementById('globalItem');

  // Elements for admin users
  const admin_loginItem = document.getElementById('admin_loginItem');
  const admin_logoutItem = document.getElementById('admin_logoutItem');
  const admin_loginLink = document.getElementById('admin_loginLink');
  const admin_logoutLink = document.getElementById('admin_logoutLink');
  const admin_userItem = document.getElementById('admin_userItem');
  const admin_globalItem = document.getElementById('admin_globalItem');

  // Obtain the user role from storage
  const userRole = getStorage('userRoleType');

  // Function to toggle element display
  const toggleDisplay = (element, display) => {
    if (element) {
      element.style.display = display;
    }
  };

  // Function to set display for regular users
  const setRegularUserDisplay = () => {
    toggleDisplay(loginItem, 'block');
    toggleDisplay(aboutItem, 'block');
    toggleDisplay(globalItem, 'block');
    toggleDisplay(homeItem, 'block');
    toggleDisplay(logoutItem, 'none');
    toggleDisplay(userItem, 'none');
  };

  // Function to set display for authenticated users
  const setAuthenticatedUserDisplay = () => {
    toggleDisplay(loginItem, 'none');
    toggleDisplay(logoutItem, 'block');
    toggleDisplay(userItem, 'block');
    toggleDisplay(aboutItem, 'block');
    toggleDisplay(globalItem, 'block');
    toggleDisplay(homeItem, 'block');
  };

  // Function to set display for admin users
  const setAdminUserDisplay = () => {
    toggleDisplay(admin_loginItem, 'none');
    toggleDisplay(admin_globalItem, 'block');
    toggleDisplay(admin_logoutItem, 'block');
    toggleDisplay(admin_userItem, 'block');
  };

  // Function to set display for regular users when user role is not defined
  const setRegularUserDisplayWithUndefinedRole = () => {
    toggleDisplay(loginItem, 'block');
    toggleDisplay(aboutItem, 'block');
    toggleDisplay(globalItem, 'block');
    toggleDisplay(homeItem, 'block');
    toggleDisplay(logoutItem, 'none');
    toggleDisplay(userItem, 'none');
  };

  // Main logic
  if (!authService.isAuth() || !userRole) {
    setRegularUserDisplay();
  } else {
    setAuthenticatedUserDisplay();
    if (userRole === 'Admin') {
      setAdminUserDisplay();
    } else {
      toggleDisplay(admin_loginItem, 'none');
      toggleDisplay(admin_logoutItem, 'block');
      toggleDisplay(admin_userItem, 'block');
      toggleDisplay(aboutItem, 'block');
      toggleDisplay(admin_globalItem, 'block');
    }
  }
})();

// (() => {

//   const loginLink = document.getElementById('loginLink');
//   const logoutLink = document.getElementById('logoutLink');

//   const loginItem = document.getElementById('loginItem');
//   const logoutItem = document.getElementById('logoutItem');

//   const userItem = document.getElementById('userItem');
//   // const requestItem = document.getElementById('requestItem');

//   const homeItem = document.getElementById('homeItem');
//   const aboutItem = document.getElementById('aboutItem');
//   const globalItem = document.getElementById('globalItem');

//   const userRole = getStorage('userRoleType'); // Obtain the user role from storage

//   const admin_loginItem = document.getElementById('admin_loginItem');
//   const admin_logoutItem = document.getElementById('admin_logoutItem');

//   const admin_loginLink = document.getElementById('admin_loginLink');
//   const admin_logoutLink = document.getElementById('admin_logoutLink');

//   const admin_userItem = document.getElementById('admin_userItem');
//   const admin_globalItem = document.getElementById('admin_globalItem');



//   console.log(userRole);

//   if (authService.isAuth() === null || userRole === null) {
//     if (loginLink) {
//       loginItem.style.display = 'block';
//       aboutItem.style.display = 'block';
//       globalItem.style.display = 'block';
//       homeItem.style.display = 'block';
//     } else {

//       loginItem.style.display = 'block';
//       aboutItem.style.display = 'block';
//       globalItem.style.display = 'block';
//       homeItem.style.display = 'block';
      
//       logoutItem.style.display = 'none';
//       userItem.style.display = 'none';
//       // requestItem.style.display = 'none';
//     }
//   } else {

//     if (logoutLink) {
//       loginItem.style.display = 'none';

//       logoutItem.style.display = 'block';
//       userItem.style.display = 'block';
//       // requestItem.style.display = 'block';
//       aboutItem.style.display = 'block';
//       globalItem.style.display = 'block';
//       homeItem.style.display = 'block';
//     } else {
//       logoutItem.style.display = 'block';
//       userItem.style.display = 'block';
//       // requestItem.style.display = 'block';
//       aboutItem.style.display = 'block';
//       globalItem.style.display = 'block';
//       homeItem.style.display = 'block';
//     }
//   } else {
  
//     if (userRole === 'Admin') {
    
//     if (admin_loginLink) {
//       admin_loginItem.style.display = 'block';
//       admin_globalItem.style.display = 'block';
//     } else {

//       admin_loginItem.style.display = 'block';
//       admin_globalItem.style.display = 'block';
      
//       admin_logoutItem.style.display = 'none';
//       admin_userItem.style.display = 'none';
//       // requestItem.style.display = 'none';
//     }
// } else {

//     if (admin_logoutLink) {
//       admin_loginItem.style.display = 'none';

//       admin_logoutItem.style.display = 'block';
//       admin_userItem.style.display = 'block';
//       // requestItem.style.display = 'block';
//       aboutItem.style.display = 'block';
//       admin_globalItem.style.display = 'block';
//     } else {
//       admin_logoutItem.style.display = 'block';
//       admin_userItem.style.display = 'block';
//       // requestItem.style.display = 'block';
//       admin_globalItem.style.display = 'block';
//     }
// }
//   }


// })();

// (() => {
//   if (storageHasData()) {
//     const isAuth = getStorage('isAuth');

//     const loginItem = document.getElementById('loginItem');
//     const logoutItem = document.getElementById('logoutItem');

//     const loginLink = document.getElementById('loginLink');
//     const logoutLink = document.getElementById('logoutLink');

//     if (isAuth === null) {
//       // No data found in storage
//       // Handle the case when there's no data
//       logoutItem.style.display = 'none';
//       loginItem.style.display = 'block';

//       logoutLink.ariaDisabled = 'true';
//       logoutLink.tabIndex = '-1';
//       logoutLink.className = 'nav-link disabled';


//       loginLink.ariaDisabled = 'false';

//     } else if (isAuth) {
//       // User is authenticated, show logout item and hide login item
//       logoutItem.style.display = 'block';
//       loginItem.style.display = 'none';

//       logoutLink.ariaDisabled = 'false';


//       loginLink.ariaDisabled = 'true';
//       loginLink.tabIndex = '-1';
//       loginLink.className = 'nav-link disabled';

//     } else {
//       // User is not authenticated, show login item and hide logout item
//       logoutItem.style.display = 'none';
//       loginItem.style.display = 'block';
  
//       logoutLink.ariaDisabled = 'true';
//       // Reset any other attributes or styles as needed
  
//       loginLink.ariaDisabled = 'false';
//       // Reset any other attributes or styles as needed
//     }
//   }
// })();

