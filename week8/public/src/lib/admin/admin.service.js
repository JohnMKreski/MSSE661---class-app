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

  _renderAdminUserModal = (user) => {
    const adminUpdateModal = document.getElementById('adminUpdateModal');

    // Populate the modal with user information
    const adminUsernameInput = document.getElementById('adminUsername');
    const adminEmailInput = document.getElementById('adminEmail');
    const adminOldPasswordInput = document.getElementById('adminOldPassword');
    const adminNewPasswordInput = document.getElementById('adminNewPassword');


    // console.log(user.password);

    // usernameInput.value = user.username;
    // emailInput.value = user.email;

    adminUsernameInput.placeholder = `Current Username: ${user.username}`;
    adminEmailInput.placeholder = `Current Email: ${user.email}`;

    const changePasswordButton = document.getElementById('changePasswordButton');
    changePasswordButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Show the change password modal
        $('#passwordUpdateModal').modal('show');
    });

    const submitButton = document.getElementById('adminSubmitButton');
    submitButton.addEventListener('click', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Check if the input fields are empty
        if (!adminUsernameInput.value 
          || !adminEmailInput.value 
          || !adminOldPasswordInput.value 
          || !adminNewPasswordInput.value) 
          {
            alert('Please fill out all fields.');
            return;
          }

        // If all input fields are filled, proceed with form submission
        console.log('Updated Admin User //No Func');
    });


    // Show the modal
    $(adminUpdateModal).modal('show');
  };

  _renderAdminUserTableRowItem = (user) => {

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
    updateUserButton.addEventListener('click', () => this._renderAdminUserModal(user)); // Pass user info to modal renderer
    updateUserButtonCell.appendChild(updateUserButton);
    tableRow.appendChild(updateUserButtonCell);

    return tableRow;
  };

  _renderAdminUserTable = () => {
    // get the "Loading..." text node from parent element
    const usersTbody = document.getElementById('admin-user');
    const loadingRow = document.getElementById('loading-row');

    loadingRow.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.users.forEach((user) => {
      const tableRow = this._renderAdminUserTableRowItem(user); // Call the _renderTableRowItem method
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
    const user_ReqsTbody = document.getElementById('user-reqs');
    const loadingRow = document.getElementById('loading-row');
    const msgDiv = this._createMsgElement('Request some new songs!');

    if (user_ReqsTbody) {
      user_ReqsTbody.replaceChild(msgDiv, loadingRow);
    } else {
      user_ReqsTbody.replaceChild(msgDiv, user_ReqsTbody);
    }
  };

  render = async () => {
    const users = await this.usersService.getUser();
    // const user_req = await this.usersService.getUserReqs();

    try {
      if (users.length) {
        this.users = users;
        this._renderAdminUserTable();
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


// (async () => {
//   const user = await getUser();
//   console.log(user);
 



//   // x.length needs to be positive number
//   if (user.length) {
//     const table = document.getElementById('user');
//     const loadingDiv = table.childNodes[1];

//     const tr = document.createElement('tr');
//     tr.className = 'table';
//     // ul.style.listStyle = 'cambodian';
//     // ul.style.float = 'none';
 
//     table.replaceChild(tr, loadingDiv); // <- order is important here! (parent, child)

//     // create the list
//     user.map((me) => {
//       // building blocks
//       // const block = document.createElement('ul');
//       // block.className = 'user-ul';


//       //   content
//       const idLi = document.createElement('td');
//       idLi.className = 'user-id';
//       idLi.innerText = me.user_id;
//       // console.log (idString, idLi.innerText);
//       // idLi.outerText = me.username;


//       const nameLi = document.createElement('td');
//       nameLi.className = 'user-name';
//       nameLi.innerText = me.username;

//       const emailLi = document.createElement('td');
//       emailLi.className = 'user-email';
//       emailLi.innerText = me.email;

//       const roleLi = document.createElement('td');
//       roleLi.className = 'user-role';
//       roleLi.innerText = me.role_type;

//       const updateUserButtonCell = document.createElement('td');
//       const updateUserButton = document.createElement('button');
//       updateUserButton.textContent = 'Update User Info';
//       updateUserButton.type = 'button';
//       updateUserButton.toggleAttribute = 'updateUserModalLabel';
//       updateUserButton.formTarget = 'updateUserModal';
//       // updateUserButton.addEventListener('click', () => console.log("Clicked on Update User!"));
//       updateUserButtonCell.appendChild(updateUserButton);
//       // tableRow.appendChild(deleteButtonCell);

//       //style
//       idLi.style.float = 'none';
//       nameLi.style.float = 'none';
//       emailLi.style.float = 'none';
//       roleLi.style.float = 'none';




//       // add list item in the way we want them to show up
//       //parent.children
//       tr.appendChild(idLi);
//       tr.appendChild(nameLi);
//       tr.appendChild(emailLi);
//       tr.appendChild(roleLi);
//       tr.appendChild(updateUserButtonCell);


//       //parentitem.child
//       // ul.appendChild(block);
//     });
//   }
// })();



