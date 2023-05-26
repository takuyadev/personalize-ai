"use client";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { Modal } from "@/components/atoms/Modal/Modal";

export const Popup = ({ label, children, setIsOpen, isOpen, ...props }) => {
  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>{label}</PrimaryButton>
      <Modal onClose={() => setIsOpen(false)} open={isOpen} {...props}>
        {children}
      </Modal>
    </>
  );
};
