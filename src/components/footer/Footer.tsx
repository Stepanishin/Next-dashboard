import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";

const SocialIcon = ({ src, alt }) => (
  <Image src={src} width={15} height={15} className={styles.icon} alt={alt} />
);

const Footer = () => {
  const socialMedia = [
    { src: "/1.png", alt: "Evgenii Dev Facebook" },
    { src: "/2.png", alt: "Evgenii Dev Instagram" },
    { src: "/3.png", alt: "Evgenii Dev Twitter" },
    { src: "/4.png", alt: "Evgenii Dev Youtube" },
  ];

  return (
    <div className={styles.container}>
      <div>2023 Evgenii</div>
      <div className={styles.social}>
        {socialMedia.map((media, idx) => (
          <SocialIcon key={idx} src={media.src} alt={media.alt} />
        ))}
      </div>
    </div>
  );
};

export default Footer;
