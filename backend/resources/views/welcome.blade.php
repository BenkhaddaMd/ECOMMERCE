<div id="paypal-button"></div>
<script src="https://www.paypalobjects.com/api/checkout.js"></script>
<script>
  paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'Ac-Yyy9bzD_LPiKoN70zmDMlDouprM_ZGDuETME1G4g11EFaxGCcprPtwpclm-17c9Jz7NvkEgg1OG2l',
      production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
      size: 'large',
      color: 'gold',
      shape: 'pill',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,

    // Set up a payment
    payment: function(data, actions) {
      return actions.payment.create({
        redirect_urls:{
            return_url:'http://localhost:8000/api/execute-payment'
        },
        transactions: [{
          amount: {
            total: '0.01',
            currency: 'USD'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize: function(data, actions) {
      return actions.redirect();
    }
  }, '#paypal-button');

</script>