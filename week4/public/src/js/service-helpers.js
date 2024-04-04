// "_"fetch/function is the best way tocall functions 

function _get(url) {
    return fetch(url, {
      method: 'GET'
    });
  }
  
function _post(url, data) {
    //fetch is basically the same as get
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // '{ "username": "admin", "password": "admin"}' == string with stringify
    });
}
  
function _put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}