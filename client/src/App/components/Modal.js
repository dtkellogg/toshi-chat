// react
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from 'react-icons/fa'

// actions
import { modalToggleOpen, toggleTheme } from "../actions/modalActions";


export default function Modal() {
  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const { isOpen } = modalIsOpen;
  const theme = useSelector((state) => state.theme);
  const { darkMode } = theme;
  const [animation, setAnimation] = useState(isOpen);

  const dispatch = useDispatch();
  const node = useRef()

  const handleCloseModal = e => {
    e.preventDefault();
    setAnimation(false)
    window.setTimeout(() => {
      dispatch(modalToggleOpen(false));
    }, 900);
  };

  const handleThemeChange = (e) => {
    e.preventDefault();
    dispatch(toggleTheme(!darkMode))
  }

  useEffect(() => {
    // Accessing scss variables
    const root = document.documentElement;
    root?.style.setProperty("--color-primary", darkMode ? "#080808" : "#F0F0F0");
    root?.style.setProperty("--color-secondary", darkMode ? "#282828" : "#989898");
    root?.style.setProperty("--color-tertiary", darkMode ? "#989898" : "#282828");
    root?.style.setProperty("--color-quaternary", darkMode ? "#F0F0F0" : "#080808");
    root?.style.setProperty("--color-quinary", darkMode ? "#989898ad" : "#080808");
    root?.style.setProperty("--color-senary", darkMode ? "#787878" : "rgb(211, 210, 210)");
    root?.style.setProperty("--blue", darkMode ? "#1c89ff" : "#99d6ff");
  }, [darkMode]);

  
  return (
    <section
      className="modal"
      style={{ animation: `${animation ? "fadeIn" : "fadeOut"} 1s` }}
    >
      <div className="modal__container" ref={node}>
        <button className="modal__btn--close" onClick={(e) => handleCloseModal(e)}>
          X
        </button>
        <div className="modal__header">Settings</div>
        <section className="modal__container--options">
          <div className="modal__option--1">
            Theme:
          </div>
          <button onClick={(e) => handleThemeChange(e)} className="modal__btn--theme">
            {darkMode ? <FaMoon className="icon__moon" size={35} /> : <FaSun className="icon__sun" size={35} />}
          </button>
          {/* <div className="modal__option--2">Show Clock:</div>
          <input className="modal__input--1" type="checkbox" checked></input>
          <div className="modal__option--3">Icon Spinning:</div>
          <input className="modal__input--2" type="checkbox" checked></input> */}
        </section>
      </div>
    </section>
  )
}