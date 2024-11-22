import { Carousel } from "flowbite-react";
import React, { useState } from "react";
import { ModalYesNo } from "./ModalYesNo";
import { Details } from "./Details";

export default function CarruselCard({ info }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalContent(null);
  };

  return (
    <div className="w-full mx-auto h-96">
      <Carousel
        indicators={false}
        autoPlay={true}
        interval={5000}
        className="w-full h-96"
      >
        {info.map((item, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => {
                if (item.link) {
                  window.open(item.link, "_blank");
                } else {
                  openModal(item);
                }
              }}
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 rounded-b-xl w-full">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold hover:underline"
                >
                  {item.title}
                </a>
              ) : (
                <button
                  className="text-2xl font-bold hover:underline"
                  onClick={() => openModal(item)}
                >
                  {item.title}
                </button>
              )}
            </div>
          </div>
        ))}
      </Carousel>

      {/* Modal que se muestra cuando se abre */}
      {isOpenModal && (
        <ModalYesNo
          text={modalContent && <Details item={modalContent} />}
          size="7xl"
          textno="CANCEL"
          isOpen={isOpenModal}
          disableButtonConfirm={true}
          closeModal={closeModal}
          onCancel={closeModal}
          disableButtonCancel={true}
          className="md:w-full"
        />
      )}
    </div>
  );
}
