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

          // OPTIONAL: Call your server to save the transaction
          return fetch('/paypal-transaction-complete', {
            method: 'post',
            body: JSON.stringify({
              orderId: data.orderID,
            }),
          })
        }}
        onCancel={(err) => {
          // אם המשתמש ביטל
          console.log(err)
        }}
        options={{
          clientId:
            'AdN9Nw8APc7nOYkqZA0mpCJt0I-ADKNqwYne-MJL4VDsHgFsGsLr4yeQM5BaGdX9vNg14Yk1AuhxX_To',
        }}
      />
    </div>
  )
}

export default PayPalBtn
