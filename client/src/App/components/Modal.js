// react
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { modalToggleOpen } from "../actions/modalActions";


export default function Modal() {
  const dispatch = useDispatch();
  const node = useRef()

  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const { isOpen } = modalIsOpen;

  const [animation, setAnimation] = useState(isOpen);

  const handleClick = e => {

    if(node.contains === undefined) {

      if (node.current.contains(e.target)) {
        // inside modal
        return;
      }
    }

    // outside modal 
    if (isOpen) {
      setAnimation(false)
      window.setTimeout(() => {
        dispatch(modalToggleOpen());
      }, 900);
    }
  };

  useEffect(() => {     
    window.setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 100);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  

  return (
    <section
      className="modal"
      style={{ animation: `${animation ? "fadeIn" : "fadeOut"} 1s` }}
      // onAnimationEnd={onAnimationEnd}
    >
      <div className="modal__container" ref={node}>
        <button className="modal__btn--close" onClick={(e) => handleClick(e)}>
          X
        </button>
        <div className="modal__header">Settings</div>
          <div className="modal__subheader--1">Name Color:</div>
          <div className="modal__paragraph--1">Light Mode:</div>
          <div className="modal__subheader--2">Color pattern:</div>
          <div className="modal__paragraph--2">Light Mode:</div>
      </div>
    </section>
  )
}