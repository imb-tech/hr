import PaymentSummary from "./payment-summary";

export default function PaymentPage() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <p className="opacity-0"> e</p>
      <PaymentSummary />
      {/* <PaymentForm /> */}
    </div>
  );
}
