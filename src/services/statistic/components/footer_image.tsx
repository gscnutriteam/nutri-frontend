import Image from "next/image";

export const FooterImage = () => {
  return (
      <div className="w-full h-[18vh] relative">
        <Image
          src={"/assets/img/modal_right.png"}
          className="absolute -right-16 top-0 "
          width={200}
          height={200}
          alt="modal_left"
        />
        <Image
          src={"/assets/img/modal_left.png"}
          className="absolute -left-24 -bottom-12 "
          width={250}
          height={200}
          alt="modal_left"
        />
      </div>
  );
};
