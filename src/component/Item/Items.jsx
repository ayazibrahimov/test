import React from 'react'
import Card from '../Card/Card'
import PropTypes from 'prop-types';
import styles from './styles.module.css' // PropTypes'u import et
import { RiShoppingBasketLine } from "react-icons/ri";
import useStore from "../../global/store";



const Items = (props) => {

  const { totalCount,basketOpen,setIsOpen,setBakerOpen } = useStore();


  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      { basketOpen && <div onClick={()=>{
         setIsOpen(true)
         setBakerOpen(false)
        }} className={styles.basket}> 
        <div className={styles.box}> <RiShoppingBasketLine style={{fontSize:'45px'}} /> </div> 
        <div className={styles.redBox} > {totalCount} </div>
        {/* <div className={styles.bredCump}  >5</div> */}
      </div>}
      {
        props?.products?.map(product=>(
          <div key={product.id}>
            <Card product={product} />
          </div>
        ))
      }
    </div>
  )
}

Items.propTypes = {
  products: PropTypes.any.isRequired, // products prop'unun bir dizi olduğunu ve zorunlu olduğunu belirt
};

export default Items