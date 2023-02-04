import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

type ModalCallback = (state: boolean) => void;

interface ModalProps {
  handleShowModal: ModalCallback;
  description: string;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  handleShowModal,
  description,
  title,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal modal-open modal-bottom sm:modal-middle"
      onClick={() => handleShowModal(false)}
    >
      <motion.div
        className="modal-box"
        variants={dropIn}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <label
            htmlFor="my-modal-6"
            className="btn"
            onClick={() => handleShowModal(false)}
          >
            Yay!
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
};
