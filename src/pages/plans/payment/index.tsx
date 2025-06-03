import PaymentForm from "./payment-form";
import PaymentSummary from "./payment-summary";

export default function PaymentPage() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <PaymentSummary />
      <PaymentForm />
    </div>
  );
}
