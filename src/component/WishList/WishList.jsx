import React, { useState, useRef, useEffect,useCallback } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./styles.module.css";
import useStore from "../../global/store";

const WishList = () => {
  const [deleteConfirm, setDeleteConfirm] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [numErr, setNumErr] = useState(false);
  const [emailAt, setEmailAt] = useState(false);
  const [messageSend, setMessageSend] = useState(false);
  const [stopInterval, setStopInterval] = useState(null);
  const inputRef = useRef(null);
  const inputNum = useRef(null);
  const [checkError, setCheckError] = useState(false);
  const deleteTimeouts = useRef({});
  
  const { setIsOpen, items, inc, dec, deleteItem, total, totalCalc, setBakerOpen, isOpen,changeStatus,setBackMyCount } = useStore();

  function decreaseCount(id, price,callBack) {
    dec(id, price);

    callBack(id)

  }

  function increaseCount(id, price) {
    inc(id, price);
  }


  function handleZeroCount(id) {
    const item = items.find(item => item.id === id);
    if (item.myCount === 1) {
      handleDelete(id);
    }
  }
  



 
  function handleStopDelete(id) {
    changeStatus(id);
    
    clearTimeout(stopInterval);
  }


  
  const handleDelete = useCallback((id) => {
    changeStatus(id);
    const interval = setTimeout(() => {
      deleteItem(id);
    }, 4000);
    setStopInterval(interval);
  }, [changeStatus, deleteItem, setStopInterval]); // useCallback bağımlılıkları



  useEffect(() => {
    console.log(items);
    totalCalc()
  },[items]);


  useEffect(() => {
    if (!isOpen) {
      // Modal kapandığında tüm silme işlemlerini durdur ve durumları sıfırla
      Object.keys(deleteTimeouts.current).forEach((id) => clearTimeout(deleteTimeouts.current[id]));
      deleteTimeouts.current = {};
      setDeleteConfirm({});
    }
  }, [isOpen]);

  function formatPrice(price) {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    if (name.length === 0) {
      setNameErr(true);
      hasError = true;
    } else {
      setNameErr(false);
    }

    if (email.length === 0) {
      setEmailErr(true);
      hasError = true;
    } else {
      setEmailErr(false);
    }

    if (number.length === 0) {
      setNumErr(true);
      hasError = true;
    } else {
      setNumErr(false);
    }

    if (name && email && number) {
      if (!email.includes("@")) {
        setEmailAt(true);
        hasError = true;
      } else {
        setEmailAt(false);
      }
    }

    setCheckError(hasError);
    if (!hasError) {
      setMessageSend(true);
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.modal} onClick={() => {
        setBakerOpen(true);
        setIsOpen(false);
      }}>
        <span className={styles.cancelModal}>&#10540;</span>
      </div>
      <div className={styles.cardData}>
        <h4 className="text-[22px] font-bold text-[#ff9027] pb-[30px]">
          Your order:
        </h4>
        {messageSend && <div className={styles.success}>Thank you! Your data has been submitted.</div>}
        {!messageSend && (
          <div>
            <div className={styles.container}>
              {items.map((item) => (
                <div key={item.id} className={styles.wishBox}>
                  {!item.status ? (
                    <>
                      <div className="w-[70px] h-[70px]">
                        <img
                          src={item.img}
                          alt="image_1"
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "7px",
                          }}
                        />
                      </div>
                      <p className="text-base font-bold text-[#000] w-[170px]">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseCount(item.id, item.price,handleZeroCount)}
                          className={styles.increase}
                        >
                          &#45;
                        </button>
                        <span className="text-[#636563]">{item.count}</span>
                        <button
                          onClick={() => increaseCount(item.id, item.price)}
                          className={styles.decrease}
                        >
                          &#43;
                        </button>
                      </div>
                      <div className={styles.price}>${formatPrice(item.price)}</div>
                      <div>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={styles.decrease}
                        >
                          &#10540;
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <CountdownCircleTimer
                          isPlaying
                          duration={4}
                          colors={["#ff0000"]}
                          className="custom-countdown-timer"
                          size={30}
                          strokeWidth={5}
                          colorsTime={[1]}
                        >
                          {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                        <p className="text-xs text-[#7b7b7b]">
                          You remove &quot;{item.title}&quot;
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleStopDelete(item.id)}
                          className="text-xs text-[#7b7b7b]"
                        >
                          Undo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end my-4 text-[#000] font-bold">
              TOTAL: $ {formatPrice(total)}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formBox}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  style={!nameErr ? {} : { border: "1px solid #ff0000" }}
                />
                {nameErr && (
                  <span className="text-[13px]" style={{ color: "#ff0000" }}>
                    Please fill out all required fields
                  </span>
                )}
              </div>
              <div className={styles.formBox}>
                <label htmlFor="email">Your Email</label>
                <input
                  type="text"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={!emailErr && !emailAt ? {} : { border: "1px solid #ff0000" }}
                />
                {emailErr && (
                  <span className="text-[13px]" style={{ color: "#ff0000" }}>
                    Please fill out all required fields
                  </span>
                )}
                {emailAt && (
                  <span className="text-[13px]" style={{ color: "#ff0000" }}>
                    Please enter a valid email address
                  </span>
                )}
              </div>
              <div className={styles.formBox}>
                <label htmlFor="number">Your Phone</label>
                <input
                  type="number"
                  id="number"
                  onChange={(e) => setNumber(e.target.value)}
                  style={!numErr ? {} : { border: "1px solid #ff0000" }}
                />
                {numErr && (
                  <span className="text-[13px]" style={{ color: "#ff0000" }}>
                    Please fill out all required fields
                  </span>
                )}
              </div>
              <div className="flex justify-end text-[#000] font-bold my-4">
                TOTAL: $ {formatPrice(total)}
              </div>

              {(nameErr || emailErr || numErr || emailAt) && (
                <div className={styles.error}>
                  {(!name || !email || !number) && (
                    <span>Please fill out all required fields</span>
                  )}
                  {!emailAt && <span>Please enter a valid email address</span>}
                </div>
              )}
              <button className={styles.btn}>Checkout</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
