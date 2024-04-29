
(async () => {
  const user = await getUser();
  console.log(user);
 



  // x.length needs to be positive number
  if (user.length) {
    const table = document.getElementById('user');
    const loadingDiv = table.childNodes[1];

    const tr = document.createElement('tr');
    tr.className = 'table';
    // ul.style.listStyle = 'cambodian';
    // ul.style.float = 'none';
 
    table.replaceChild(tr, loadingDiv); // <- order is important here! (parent, child)

    // create the list
    user.map((me) => {
      // building blocks
      // const block = document.createElement('ul');
      // block.className = 'user-ul';


      //   content
      const idLi = document.createElement('td');
      idLi.className = 'user-id';
      idLi.innerText = me.user_id;
      // console.log (idString, idLi.innerText);
      // idLi.outerText = me.username;


      const nameLi = document.createElement('td');
      nameLi.className = 'user-name';
      nameLi.innerText = me.username;

      const emailLi = document.createElement('td');
      emailLi.className = 'user-email';
      emailLi.innerText = me.email;

      const roleLi = document.createElement('td');
      roleLi.className = 'user-role';
      roleLi.innerText = me.role_type;

      //style
      idLi.style.float = 'none';
      nameLi.style.float = 'none';
      emailLi.style.float = 'none';
      roleLi.style.float = 'none';




      // add list item in the way we want them to show up
      //parent.children
      tr.appendChild(idLi);
      tr.appendChild(nameLi);
      tr.appendChild(emailLi);
      tr.appendChild(roleLi);


      //parentitem.child
      // ul.appendChild(block);
    });
  }
})();


