const doLogin = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  const res = await login({ username, password }).catch((err) => {
    alert('Failed to login. Please try again later.');
  });

  const { auth, access_token, refresh_token } = res;

  setStorage('isAuth', auth);
  setStorage('access_token', access_token);
  setStorage('refresh_token', refresh_token);

  window.location.href = 'home.html';
};

const doRegister = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  const res = await register({
    username,
    email,
    password,
  });

  if (res) {
    window.location.href = '/';
  }
};

const doLogout = (e) => {
  e.preventDefault();
  logout();
  window.location.href = '/';
};

(() => {
  if (storageHasData()) {
    const isAuth = getStorage('isAuth');

    const loginItem = document.getElementById('loginItem');
    const logoutItem = document.getElementById('logoutItem');

    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');

    if (isAuth === null) {
      // No data found in storage
      // Handle the case when there's no data
      logoutItem.style.display = 'none';
      loginItem.style.display = 'block';

      logoutLink.ariaDisabled = 'true';
      logoutLink.tabIndex = '-1';
      logoutLink.className = 'nav-link disabled';


      loginLink.ariaDisabled = 'false';

    } else if (isAuth) {
      // User is authenticated, show logout item and hide login item
      logoutItem.style.display = 'block';
      loginItem.style.display = 'none';

      logoutLink.ariaDisabled = 'false';


      loginLink.ariaDisabled = 'true';
      loginLink.tabIndex = '-1';
      loginLink.className = 'nav-link disabled';

    } else {
      // User is not authenticated, show login item and hide logout item
      logoutItem.style.display = 'none';
      loginItem.style.display = 'block';
  
      logoutLink.ariaDisabled = 'true';
      // Reset any other attributes or styles as needed
  
      loginLink.ariaDisabled = 'false';
      // Reset any other attributes or styles as needed
    }
  }
})();

