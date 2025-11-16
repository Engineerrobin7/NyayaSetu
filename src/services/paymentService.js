const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentSession = async (lawyerId, amount) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Legal Consultation' },
                    unit_amount: amount * 100
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url: 'https://yourfrontend.com/success',
            cancel_url: 'https://yourfrontend.com/cancel'
        });

        return session.url;
    } catch (error) {
        throw new Error(error.message);
    }
};
