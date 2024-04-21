
(async () => {
  const user = await getUser();
  console.log(user);
 



  // x.length needs to be positive number
  if (user.length) {
    const div = document.getElementById('user');
    const loadingDiv = div.childNodes[1];

    const ul = document.createElement('ul');
    ul.className = 'user-ul';
    ul.style.listStyle = 'cambodian';
    ul.style.float = 'none';
 
    div.replaceChild(ul, loadingDiv); // <- order is important here! (parent, child)

    // create the list
    user.map((me) => {
      // building blocks
      // const block = document.createElement('ul');
      // block.className = 'user-ul';


      //   content
      const idLi = document.createElement('li');
      const idString = "ID:";
      idLi.className = 'user-id';
      idLi.innerText = idString + " " + me.user_id;
      // console.log (idString, idLi.innerText);
      // idLi.outerText = me.username;


      const nameLi = document.createElement('li');
      const nameString = "Username:";
      nameLi.className = 'user-name';
      nameLi.innerText = nameString + " " + me.username;

      const emailLi = document.createElement('li');
      const emailString = "Email:";
      emailLi.className = 'user-email';
      emailLi.innerText = emailString + " " + me.email;

      const roleLi = document.createElement('li');
      const roleString = "Role Type:";
      roleLi.className = 'user-role';
      roleLi.innerText = roleString + " " + me.role_type;

      //style
      idLi.style.float = 'none';
      nameLi.style.float = 'none';
      emailLi.style.float = 'none';
      roleLi.style.float = 'none';




      // add list item in the way we want them to show up
      //parent.children
      ul.appendChild(idLi);
      ul.appendChild(nameLi);
      ul.appendChild(emailLi);
      ul.appendChild(roleLi);


      //parentitem.child
      // ul.appendChild(block);
    });
  }
})();