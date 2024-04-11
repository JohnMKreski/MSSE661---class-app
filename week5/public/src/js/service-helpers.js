// "_"fetch/function is the best way tocall functions 

const access_token = storageHasData() ? getStorage('access_token') : ''; //saving things at 'access-token'
const token = `Bearer ${access_token}`; //authorizeToken need Bearer to be set or else fail

const _get = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

const _post = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

const _put = async (url, data) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};