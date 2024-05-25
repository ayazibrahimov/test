import React from "react";
import styles from './styles.module.css'
import PropTypes from 'prop-types'; // PropTypes'u import et
import useStore  from '../../global/store'


const Card = ({product}) => {
  
  const { getElementId,addItem,setIsOpen,calculateTotalCount,setBakerOpen } = useStore()

  function handleData(id){
    getElementId(id);
    setIsOpen(true)
    addItem(product);
    calculateTotalCount()
    setBakerOpen(false)
  }




  return (
    <div className="flex flex-col">
   
          <div onClick={handleData.bind(null,product.id)} className="relative cursor-pointer">
           <img
          src={`${product.image}`}
          alt="image-1"
        />
         { product.sale ==1 && <div className={styles.sale}>SALE</div>}
          </div>
         <div onClick={handleData.bind(null,product.id)} className="flex flex-col gap-2 mt-5 cursor-pointer">
          <h4 className="text-xl font-bold text-[#ff9027]">{product.title}</h4>
            <p className="text-sm mt-1 text-[#9a9a9a]">
              {product.text}
            </p>
           <div>
            <span className="text-[#ff9027] font-semibold">${product.price} </span> 
            {product.old_price && <s className="font-normal text-base text-[#bdbdbd]">$ {product.old_price}</s>}
           </div>
         </div>
         <div className="flex items-center gap-2 mt-4">

          <button onClick={handleData.bind(null,product.id)} className={styles.button_1}>Learn more</button>
         { product.sale ==1 &&  <button onClick={handleData.bind(null,product.id)} className={styles.button_2}>Buy now</button>} 

         </div>
   
   </div>
  );
};


Card.propTypes = {
  product: PropTypes.array.isRequired, // products prop'unun bir dizi olduğunu ve zorunlu olduğunu belirt
};

export default Card;
