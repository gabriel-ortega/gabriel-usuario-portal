import { Modal, Button } from "flowbite-react";

export function ModalYesNo({
  size = "sm",
  children,
  classmodal,
  text,
  textyes,
  textno,
  isOpen,
  closeModal,
  onConfirm,
  onCancel,
  icon,
  disableButtonConfirm = false,
  disableButtonCancel = false,
  colorCancel = "bg-gray-400",
}) {
  return (
    <>
      <Modal
        show={isOpen}
        size={size}
        onClose={closeModal}
        className={`${classmodal} fixed inset-0 flex items-center  justify-center z-50`}
        popup
      >
        <Modal.Header className="bg-gray-100" />
        <Modal.Body className="md:w-full bg-gray-100 ">
          <div>
            {icon}
            <h3 className="mb-5 text-center text-lg font-normal text-gray-500 dark:text-gray-400 pt-4">
              {text}
            </h3>
            {children}
            <div className="flex justify-center gap-4 pt-5">
              {disableButtonCancel == false ? (
                <>
                  <Button
                    className={`${colorCancel}`}
                    onClick={() => {
                      onCancel();
                      closeModal();
                    }}
                  >
                    {textno}
                  </Button>
                </>
              ) : (
                ""
              )}
              {disableButtonConfirm === false ? (
                <Button
                  className="bg-[#1976d2]"
                  onClick={() => {
                    onConfirm();
                    closeModal();
                  }}
                >
                  {textyes}
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
