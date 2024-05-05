class User_Req {
  
  users = [];
  // user_req = [];
  userService;

  constructor(usersService) {
    this.usersService = usersService;
  }

  init() {
    this.render(); //renders(displays) the dom
  }

  _renderUserModal = (user) => {
    const userUpdateModal = document.getElementById('userUpdateModal');

    // Populate the modal with user information
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const currentPasswordInput = document.getElementById('currentPassword');
    const currentPasswordCheckInput = document.getElementById('currentPasswordCheck');


    // console.log(user.password);

    // usernameInput.value = user.username;
    // emailInput.value = user.email;

    usernameInput.placeholder = `Current Username: ${user.username}`;
    emailInput.placeholder = `Current Email: ${user.email}`;

    const changePasswordButton = document.getElementById('changePasswordButton');
    changePasswordButton.addEventListener('click', () => this._renderUserPasswordModal(user));

    const updateUserButton = document.getElementById('updateUserButton');
    updateUserButton.addEventListener('click', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Check if either of the fields is empty
        if (!currentPasswordInput.value || !currentPasswordCheckInput.value) {
          alert('Please enter both password fields.');
          return;
        }

        // Check if the values of currentPassword and currentPasswordCheck match
        if (currentPasswordInput.value !== currentPasswordCheckInput.value) {
            alert('Passwords do not match.');
            return;
        }

        // If all input fields are filled, proceed with form submission
        saveUserChanges(event);
        // console.log("Updated!")
    });


    // Show the modal
    $(userUpdateModal).modal('show');
  };

  _renderUserPasswordModal = (user) => {
    const passwordUpdateModal = document.getElementById('passwordUpdateModal');

    const currentPasswordUpdate = document.getElementById('currentPasswordUpdate');
    const currentPasswordUpdateCheck = document.getElementById('currentPasswordUpdateCheck');
    const newPasswordUpdate = document.getElementById('newPasswordUpdate');
    const newPasswordUpdateCheck = document.getElementById('newPasswordUpdateCheck');

    const submitChangePasswordButton = document.getElementById('submitChangePasswordButton');
    submitChangePasswordButton.addEventListener('click', function(event) {
      // Prevent default form submission behavior
      event.preventDefault();

      //Current Password
      if (!currentPasswordUpdate.value || !currentPasswordUpdateCheck.value) {
        alert('Please enter current password fields.');
        return;
      }

      if (currentPasswordUpdate.value !== currentPasswordUpdateCheck.value) {
          alert('Current passwords do not match.');
          return;
      }

      //New Password
      if (!newPasswordUpdate.value || !newPasswordUpdateCheck.value) {
        alert('Please enter new password fields.');
        return;
      }

      if (newPasswordUpdate.value !== newPasswordUpdateCheck.value) {
          alert('New passwords do not match.');
          return;
      }

      // If all input fields are filled, proceed with form submission
      savePasswordChanges(event);
      // console.log("Updated Password!")
    });

    $(passwordUpdateModal).modal('show');

  };

  _renderUserTableRowItem = (user) => {

    const tableRow = document.createElement('tr');
    tableRow.id = `user-${user.user_id}`;
    tableRow.className = 'table-rows';

    const columnNames = ['user_id', 'username', 'email', 'role_type'];

    columnNames.forEach((columnName) => {
      const td = document.createElement('td');
      td.textContent = user[columnName]; // Access the corresponding property from the song object
      tableRow.appendChild(td);
    });

    const updateUserButtonCell = document.createElement('td');
    const updateUserButton = document.createElement('button');
    updateUserButton.textContent = 'Update User Information';
    updateUserButton.addEventListener('click', () => this._renderUserModal(user)); // Pass user info to modal renderer
    updateUserButtonCell.appendChild(updateUserButton);
    tableRow.appendChild(updateUserButtonCell);

    return tableRow;
  };

  _renderUserTable = () => {
    // get the "Loading..." text node from parent element
    const usersTbody = document.getElementById('user-info');
    const loadingRow = document.getElementById('loading-row');

    loadingRow.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.users.forEach((user) => {
      const tableRow = this._renderUserTableRowItem(user); // Call the _renderTableRowItem method
      fragment.appendChild(tableRow); // Append the table row to the fragment
    });

    // Append the generated rows to the tbody
    usersTbody.appendChild(fragment);

    // Remove the "Loading..." cell
    if (loadingRow) loadingRow.parentNode.removeChild(loadingRow);
  };

  // _renderUserReqsTableRowItem = () => {
  //   const tableRow = document.createElement('tr');
  //   tableRow.id = `song-${song.song_id}`;
  //   tableRow.className = 'table-rows';

  //   const columnNames = ['user_id', 'song_id', 'artist_name', 'song_title', 'status', 'created_date'];

  //   columnNames.forEach((columnName) => {
  //     const td = document.createElement('td');
  //     td.textContent = song[columnName]; // Access the corresponding property from the song object
  //     tableRow.appendChild(td);
  //   });

  //   const deleteButtonCell = document.createElement('td');
  //   const deleteButton = document.createElement('button');
  //   deleteButton.textContent = 'Update Song Request';
  //   deleteButton.addEventListener('click', () => console.log("Clicked Update User Song"));
  //   deleteButtonCell.appendChild(deleteButton);
  //   tableRow.appendChild(deleteButtonCell);

  //   return tableRow;
  // };

  // _renderUserReqsTable = () => {
  //   // get the "Loading..." text node from parent element
  //   const songsTbody = document.getElementById('user-songs');
  //   const loadingRow = document.getElementById('loading-row');

  //   loadingRow.innerHTML = '';

  //   const fragment = document.createDocumentFragment();

  //   this.songs.forEach((song) => {
  //     const tableRow = this._renderUserReqsTableRowItem(song); // Call the _renderTableRowItem method
  //     fragment.appendChild(tableRow); // Append the table row to the fragment
  //   });

  //   // Append the generated rows to the tbody
  //   songsTbody.appendChild(fragment);

  //   // Remove the "Loading..." cell
  //   if (loadingRow) loadingRow.parentNode.removeChild(loadingRow);
  // };

  _renderMsg = () => {
    const user_ReqsTbody = document.getElementById('user-songs');
    const loadingRow = document.getElementById('loading-row');
    const msgDiv = this._createMsgElement('Request some new songs!');

    console.log(user_ReqsTbody);

    if (!user_ReqsTbody) {
      user_ReqsTbody.appendChild(msgDiv, loadingRow);
    } else {
      user_ReqsTbody.appendChild(msgDiv, user_ReqsTbody);
    }
    if (loadingRow) loadingRow.parentNode.removeChild(loadingRow);
  };

  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const users = await this.usersService.getUser();
    console.log(users);
    // const user_req = await this.usersService.getUserReqs();

    try {
      if (users.length) {
        this.users = users;
        this._renderUserTable();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }

  //   try {
  //     if (user_req.length) {
  //       this.user_req = user_req;
  //       this._renderUserReqsTable();
  //     } else {
  //       this._renderMsg();
  //     }
  //   } catch (err) {
  //     alert(`Error: ${err.message}`);
  //   }
  // };
  };
}


