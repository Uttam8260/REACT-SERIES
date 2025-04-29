import React, {  } from 'react'
import { useLoaderData } from 'react-router-dom'
function Github() {
    const data = useLoaderData()
    // const [data,setData] =useState([])
    // useEffect(() => {
    //     fetch('https://github.com/Uttam8260')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data);
    //     })
    // },[])
  return (
    <div className='text-center m-4 bg-grey-600 text-white p-4 text-3xl'>Github follpwers: {data.followers}
    <img src={data.avator_url} alt="Git picture" width={300}></img></div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Uttam8280')
     return response.json()
}