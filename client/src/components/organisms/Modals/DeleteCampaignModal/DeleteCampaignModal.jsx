import styles from "./DeleteCampaignModal.module.scss";
import { Modal } from "@/components/atoms/Modal/Modal";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { useState } from "react";
import { Message } from "@/components/atoms/Message/Message";
import { FaTrash } from "react-icons/fa";

export const DeleteCampaignModal = ({ onDelete, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)} danger>
        <FaTrash />
        <span>Delete Campaign</span>
      </PrimaryButton>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modal_wrapper}>
          <Message
            message="Are you sure you'd like to delete your campaign?"
            danger
          />
          <PrimaryButton onClick={onDelete} danger>
            <FaTrash />
            <span>Delete Campaign</span>
          </PrimaryButton>
        </div>
      </Modal>
    </>
  );
};
