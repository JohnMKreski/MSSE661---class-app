const setStorage = (key, data) => {
    const dataAsString = JSON.stringify(data); // data = new Object()
    const encodedData = btoa(dataAsString); // {} btoa = regular string to encoded
    localStorage.setItem(key, encodedData);
  };
  
  const getStorage = (key) => {
    const encodedData = localStorage.getItem(key);
    const decodedData = atob(encodedData);
    return JSON.parse(decodedData); // {} parse is opposite function of stringify
  };
  
  const clearStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  const storageHasData = () => localStorage.length > 0; //method to "control" when to control storage