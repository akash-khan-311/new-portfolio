import React from "react";
type Props = {
  text: string;
  colorText?: string;
};
export default function SectionTitle({ text, colorText }: Props) {
  return (
    <h2
      data-aos="fade"
      data-aos-offset="0"
      data-aos-duration="300"
      data-aos-easing="ease-in-out-sine"
      data-aos-delay="200"
      data-aos-once="true"
      className=" dark:text-white text-4xl md:text-5xl lg:text-6xl font-semibold lg:leading-20 md:leading-18 leading-14 "
    >
      {text}
      <span className="text-[#87e63b]">{colorText}</span>
    </h2>
  );
}
