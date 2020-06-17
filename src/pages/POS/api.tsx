export const doPayment = async (): Promise<string> => {
  return await fetch(`http://localhost:3001/payments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: "true",
    }),
  })
    .then(() => "success")
    .catch(() => "failed");
};
