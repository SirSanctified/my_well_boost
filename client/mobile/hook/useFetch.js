import { useEffect, useState } from 'react'
import axios from 'axios'


const useFetch = (url) => {
  const [data, setData] = useState(null)
  useEffect(async () => {
   setData((await axios.get(url)))
  }, [url])
  return [data]
}

export default useFetch