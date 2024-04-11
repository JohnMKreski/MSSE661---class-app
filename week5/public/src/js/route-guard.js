(() => {
    if (storageHasData() && !getStorage('isAuth')) {
      logout();
      window.location.href = '/login.html';
    }
})();

//this is for use without authorization 
//not working right now

//wrapper syntax IIFE Immediatly Invoking Express Function
//{{{{}}}}