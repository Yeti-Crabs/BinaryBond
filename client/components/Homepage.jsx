import React from 'react'
import { useSelector, useDispatch } from 'react-redux'





const Homepage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  console.log(user)
  return (
    <h1>Homepage</h1>
  )
}

export default Homepage