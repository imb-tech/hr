import { addToast } from "@heroui/toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onError(err: any) {
  const arrayErrors = Object.entries(err?.response?.data || {});

  if (arrayErrors.length > 0) {
    addToast(
      {
        title: "Xatolik",
        description: arrayErrors.map(([key, value]) => key + ": " + value + "; ").join(', '),
        color: "danger"
      },
    );
  } else {
    addToast({
      title: "Xatolik",
      description: err?.message || err?.detail,
      color: "danger",
    });
  }
}
