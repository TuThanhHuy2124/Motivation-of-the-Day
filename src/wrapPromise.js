
const wrapPromise = (promise) => {
    let status = 'pending'
    let response
    console.log("wrapped")
    console.log(promise)
    const suspender = promise.then(
      (res) => {
        if(res.ok) {
            status = 'success'
            console.log("suceeded")
        } else {
            status = 'error'
            console.log("error")
        }
        res.json().then(data => {response = data})
      }
    );
  
    const read = () => {
      switch (status) {
        case 'pending':
            console.log("throwing suspender")
            throw suspender
        case 'error':
            console.log("throwing response")
            throw response
        default:
            console.log("returning response")
            return response
      }
    }
  
    return { read };
}

export default wrapPromise;