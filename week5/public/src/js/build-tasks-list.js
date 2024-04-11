/**
 * html structure
 *
 * @example
 * <ul class="tasks-list">
 *  <li class="task-item">
 *    <div class="task-item-block">
 *      <span class="task-checkbox"><input type="checkbox"></span>
 *      <span class="task-name">Task name</span>
 *      <span class="task-status">pending</span>
 *      <span class="task-date">date create</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression). Launch Right Away
// What it does is in the name.
(async () => {
    const tasks = await getTasks();
    console.log(tasks);

    // tasks.length needs to be positive number
    if (tasks.length) {
      const div = document.getElementById('tasks');
      const loadingDiv = div.childNodes[1];
  
      const ul = document.createElement('ul'); 
  
      // replace 'loading...' with list
      //replacing loadingDiv
      div.replaceChild(ul, loadingDiv); // <- order is important here! (parent, child)
  
      // create the list
      tasks.map((task) => {
        // building blocks
        const li = document.createElement('li');
        li.className = 'task-item';
        const block = document.createElement('div');//block is for consistency when using divs 
        block.className = 'task-item-block';

        /**
         * 
         * NODES
         * 
         */
  
        //   content
        const checkboxSpan = document.createElement('span');//spans help with styling
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'task-checkbox';
        checkboxSpan.appendChild(checkbox); //created child of parent
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'task-name';
        nameSpan.innerText = task.name;
  
        const statusSpan = document.createElement('span');
        statusSpan.className = 'task-status';
        statusSpan.innerText = task.status;
  
        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        dateSpan.innerText = task.created_date;

        /**
         * 
         * NODES END
         * 
         */
  
        // add list item in the way we want them to show up
        //parent.children
        block.appendChild(checkboxSpan);
        block.appendChild(nameSpan);
        block.appendChild(statusSpan);
        block.appendChild(dateSpan);

        //parentitem.child
        li.appendChild(block);
        ul.appendChild(li);
      });
    }
  })();