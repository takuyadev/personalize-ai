import styles from "./MultistepForm.module.scss";
import { useState } from "react";
import { Card } from "@/components/atoms/Card/Card";
import { SubtleButton } from "@/components/atoms/Button/SubtleButton";
import { Divider } from "@/components/atoms/Divider/Divider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Message } from "@/components/atoms/Message/Message";

// @desc Takes in multiple form components, and allows you to transition between the pages
export const MultiStepForm = ({ steps, onComplete, redirect = "/" }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(null);
  const { push } = useRouter();

  // Redirect to desired place on complete
  const handleComplete = async () => {
    setError(null);
    const data = await onComplete(formData);

    // If data has error property, set that as error message
    if (data.error) {
      return setError(data.error);
    }

    push(redirect);
  };

  // Handle submit and updating form
  const onSubmit = (formData) => {
    setFormData((prev) => ({ ...prev, ...formData }));
    setDisable(false);
  };

  // Render out buttons based on if it's current step or not
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Add functions that allow people to move back and forth
  const nextStep = () => {
    setCurrentStep((step) => step + 1);
    setDisable(true);
  };

  const previousStep = () => setCurrentStep((step) => step - 1);

  // Render out currently selected using index
  const CurrentStepComponent = steps[currentStep];

  return (
    <Card>
      <div className={styles.card_wrapper}>
        {error && (
          <span className={styles.center}>
            <Message danger message={error} />
          </span>
        )}
        <CurrentStepComponent
          formData={formData}
          onSubmit={onSubmit}
          onEnd={nextStep}
          buttonLabel="Save"
        />
        <Divider />
        <footer className={styles.footer}>
          {!isFirstStep ? (
            <SubtleButton onClick={previousStep}>
              <FaArrowLeft />
            </SubtleButton>
          ) : (
            <div />
          )}
          {!isLastStep && (
            <SubtleButton disabled={disable} onClick={nextStep}>
              <FaArrowRight />
            </SubtleButton>
          )}
          {isLastStep && (
            <SubtleButton disabled={disable} onClick={handleComplete}>
              Complete
            </SubtleButton>
          )}
        </footer>
      </div>
    </Card>
  );
};
