import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

function PayPalBtn(props) {
  return (
    <div>
      <PayPalButton
        currency="USD"
        amount={props.total}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          console.log('Transaction completed by ', details)
          console.log('data ', data)
          props.successFunc(data.orderID)
        }}
        onCancel={(err) => {
          // אם המשתמש ביטל
          console.log(err)
        }}
        options={{
          clientId: props.clientId,
        }}
      />
    </div>
  )
}

export default PayPalBtn
