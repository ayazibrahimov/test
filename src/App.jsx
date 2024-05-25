import { useState,useEffect } from 'react'
import './App.css'
import Item from './component/Item/Items'
import WishList from './component/WishList/WishList'
import useStore  from '../src/global/store'

function App() {

  const [products,setProducts] = useState([])
  const { id, openModal,items } = useStore()

  useEffect(()=>{
    
    async function getData(){

      const res = await fetch('https://flow.az/api/v1/products ')
      const data = await res.json()
      setProducts(data) 


    }


    getData()
  },[])


  return (
    <div className='container mx-auto px-14'>
      <Item products={products} />
      {openModal && items.length>0 && <WishList id={id} />}
    </div>
  )
}

export default App
