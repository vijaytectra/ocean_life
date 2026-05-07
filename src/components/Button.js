import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import styles from "./Button.module.css"; // Import CSS Module

const Button = ({
  text = "Learn More", // Default text
  textColor = "var(--color-white)", // Default text color
  bgColor = "transparent", // Default button background color
  borderColor = "var(--color-white)", // Default border color
  hoverBgColor = "var(--color-white)", // Default :before background color
  hoverTextColor = "var(--color-dark-blue)", // Default hover text color
}) => {
  return (
    <button
      className={styles.customButton}
      style={{
        "--button-text-color": textColor,
        "--button-bg-color": bgColor,
        "--button-border-color": borderColor,
        "--hover-bg-color": hoverBgColor,
        "--hover-text-color": hoverTextColor,
      }}
    >
      <span>
        {text} <BsArrowUpRight />
      </span>
    </button>
  );
};

export default Button;
