import React from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import Menu from '../../components/Menu/Menu'
import { useState } from 'react'
import Food from '../../components/Food/Food'
const home = () => {
  const [category,setcategory]=useState("All");
  return (
    <>
    <Header/>
    <Menu category={category} setcategory={setcategory}/>
    <Food category={category}/>
    </>
  )
}

export default home