import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps {
  label: string;
  url: string;
}

const Button: React.FC<ButtonProps> = ({ label, url }) => {
  return (
    <Link href={url}>
      <button className={styles.button}>{label}</button>
    </Link>
  );
};

export default Button;
