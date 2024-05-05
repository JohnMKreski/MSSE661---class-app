const getFormValues = () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const currentPassword = document.getElementById('currentPassword')
      .value;
    const currentPasswordCheck = document.getElementById('currentPasswordCheck').value;

    return { username, email, currentPassword, currentPasswordCheck };
  };
  
  const validate = () => {
    const { username, email, currentPassword, currentPasswordCheck } = getFormValues();
  
    if (username && !currentPassword) {
      alert('A password required to update username.');
      return;
    } else if (email && !currentPassword) {
      alert('A password required to update email.');
      return;
    } else if (!currentPassword && currentPasswordCheck) {
      alert('A current password check is required.');
      return;
    } else if (!currentPasswordCheck && currentPassword) {
      alert('Your current password is required.');
      return;
    }
  
    return { username, email, currentPassword };
  };
  
  const resetFields = () => {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('currentPassword').value = '';
    document.getElementById('currentPasswordCheck').value = '';
    
  };
  
  const saveUserChanges = async (e) => {
    e.preventDefault();
  
    const { username, email, currentPassword: password } = validate();
  
    try {
      if ((username && password) || (email && password)) {
        const response = await usersApiService.updateMe({
          username,
          email,
          password,
        });
        if (response.msg) {
          alert(response.msg);
          resetFields();
          $('#userUpdateModal').modal('hide');
          location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      alert('Cannot process your request at this time.');
    }
  };

  const getPasswordFormValues = () => {
    const currentPasswordUpdate = document.getElementById('currentPasswordUpdate').value;
    const currentPasswordUpdateCheck = document.getElementById('currentPasswordUpdateCheck').value;

    const newPasswordUpdate = document.getElementById('newPasswordUpdate').value;
    const newPasswordUpdateCheck = document.getElementById('newPasswordUpdateCheck').value;

    return { 
      currentPasswordUpdate, 
      currentPasswordUpdateCheck, 
      newPasswordUpdate, 
      newPasswordUpdateCheck 
    };
  };
  
  const validatePass = () => {
    const { 
      currentPasswordUpdate, 
      currentPasswordUpdateCheck, 
      newPasswordUpdate, 
      newPasswordUpdateCheck 
    } = getPasswordFormValues();
  
    if (currentPasswordUpdate && !newPasswordUpdate) {
      alert('A current password is required to update new password.');
      return;
    } else if (!newPasswordUpdate && currentPasswordUpdate) {
      alert('A new password is required to change password.');
      return;
    } else if (currentPasswordUpdate && !currentPasswordUpdateCheck) {
      alert('A current password check is required to change password.');
      return;
    } else if (newPasswordUpdate && !newPasswordUpdateCheck) {
      alert('A new password check is required to change password.');
      return;
    } 

  
    return { currentPasswordUpdate, newPasswordUpdate };
  };
  
  const resetPassFields = () => {
    document.getElementById('currentPasswordUpdate').value = '';
    document.getElementById('currentPasswordUpdateCheck').value = '';
    document.getElementById('newPasswordUpdate').value = '';
    document.getElementById('newPasswordUpdateCheck').value = '';
    
  };
  
  const savePasswordChanges = async (e) => {
    e.preventDefault();
  
    const { currentPasswordUpdate: currentPassword, newPasswordUpdate: newPassword } = validatePass();
  
    try {
      if (currentPassword && newPassword) {
        const response = await usersApiService.updatePass({
          currentPassword,
          newPassword,
        });
        if (response.msg) {
          alert(response.msg);
          resetFields();
          $('#passwordUpdateModal').modal('hide');
          location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      alert('Cannot process your request at this time.');
    }
  };