import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

function PayPalBtn(props){
  return(
    <div>
      <PayPalButton
      currency="ILS"
        amount={props.total}
        
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          console.log("Transaction completed by ", details);
          console.log("data ", data);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.orderID
            })
          });
        }}

        onCancel={(err) => {
          // אם המשתמש ביטל
          console.log(err);
        }}

        options={{
         
          clientId: "ATEBdkrqMVXj65AczPrXBZbvNgUecBBNkoH0sB4OnzTYJPIGrkTIsG4ev_Z4mCumVd3dN_YBhQGEH3PW"
        }}
      />
      {/* 
      חובה להכניס את הקוד הבא בעמוד בית כמובן לשנות את הקליינט איי די בהתאם
       <script src="https://www.paypal.com/sdk/js?client-id=ATEBdkrqMVXj65AczPrXBZbvNgUecBBNkoH0sB4OnzTYJPIGrkTIsG4ev_Z4mCumVd3dN_YBhQGEH3PW&currency=ILS" ></script>
      */}
    </div> 
  )
}

export default PayPalBtn