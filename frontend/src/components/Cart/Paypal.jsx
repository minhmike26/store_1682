import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Paypal = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ATV361nkUEJ1lZUmIiTj3mmn54IikQgPKHEnitqb8PC7vYvakqGKiR55vqUK5YPO4BozFyYDbdzDClX8",
      }}
    >
      <PayPalButtons style={{ layout: "vertical" }}
       createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{amount: {value: amount}}]
        });
      }} 
      onApprove={(data, actions) => {
        return actions.order.capture().then(onSuccess);
      }}
        onError={(error) => onError(error)}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
