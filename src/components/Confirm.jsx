import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Confirm = ({ toggleConfirmWindow }) => {

  const clickToCloseConfirmWindow = (e) => {
    if (e.target.classList.contains('confirm-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleConfirmWindow());
      e.target.children[0].classList.remove('animate__zoomIn');
      e.target.children[0].classList.add('animate__zoomOut');
      e.target.children[0].removeEventListener('animationend', () => toggleConfirmWindow());
    }
  }

  return (
    <div className="confirm-pane" onClick={clickToCloseConfirmWindow}>
      <div className="confirm-window animate__animated animate__zoomIn">
        <h3>Confirmation</h3>
        <div className="confirm-display">
          <FontAwesomeIcon icon={faCircleCheck} className="confirm-window-check-mark-icon" />
          <h4>Congratulations.<br />Your order is accepted.</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, ex molestiae sint, delectus quod beatae necessitatibus corrupti porro similique magnam minus sit quaerat quasi itaque doloribus quos et eius? Nostrum.</p>
        </div>
        <button>Track Order</button>
      </div>
    </div>
  )
}

export default Confirm;