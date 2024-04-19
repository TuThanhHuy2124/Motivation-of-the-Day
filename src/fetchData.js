import wrapPromise from './wrapPromise'

function fetchData(url, header=null) {
  const promise = fetch(url,header)
    .then((res) => res.json())
    .then((res) => res.data)

  return wrapPromise(promise)
}

export default fetchData