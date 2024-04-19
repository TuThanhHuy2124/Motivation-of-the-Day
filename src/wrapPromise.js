
const wrapPromise = (promise) => {
    let status = 'pending';
    let response;
    console.log("wrapped");
    console.log(promise);
    const suspender = promise.then(
      (res) => {
        if(res.ok) {
            res.json().then(data => {
              status = 'success'; 
              response = data; 
              console.log("suceeded");
              console.log(data); 
              console.log(status);
            });
        } else {
            res.json().then(data => {
              status = 'error'
              response = data; 
              console.log("error")
              console.log(data); 
              console.log(status);
            });
        }
      }
    );
  
    const read = () => {
      switch (status) {
        case 'pending':
            console.log("throwing suspender");
            throw suspender;
        case 'error':
            console.log("throwing response", response);
            throw response;
        default:
            console.log("returning response", response);
            return response;
      }
    }
  
    return { read };
}

export default wrapPromise;