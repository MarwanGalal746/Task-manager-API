const sgMail = require('@sendgrid/mail')

sendGridAPIKey = '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'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

sgMail.send({
    to:'marwangalal84@gmail.com',
    from:'marwangalal84@gmail.com',
    subject:'hello',
    text:'I hope this email finds you'

})