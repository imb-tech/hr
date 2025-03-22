import RowSteps from "./row-steps";

export default function RegisterStepper() {
  return (
    <RowSteps
      defaultStep={0}
      orientation="vertical"
      steps={[
        {
          title: "Create an account",
          description: "Setting up your foundation",
        },
        {
          title: "Company Information",
          description: "Tell us about your business",
        },
        {
          title: "Choose Address",
          description: "Select your official location",
        },
        {
          title: "Payment",
          description: "Finalize your registration",
        },
      ]}
    />
  );
}
