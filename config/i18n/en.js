module.exports = {
  "email": {
    "reset": {
      "subject": "1ClickTrips Password Reset",
      "body": ["You are receiving this email because you (or someone else) requested a password reset for your account.\n\n",
               "Please click on the following link or paste it into your browser to complete the process: %s\n\n ",
               "If you did not request this password reset, please ignore this email and your password will remain unchanged.\n\n"]
    },
    "confirmation": {
      "subject": "Your password has been changed",
      "body": "Hello,\n\nThis is a confirmation that the password for your account has just been changed.\n\n"
    },
    "booking_success": {
      "subject": "Your booking is success",
      "body": "This is the booking success email content"
    },
    "subscribe" : {
        "emptyResponse": 'Nothing was returned. Do you have a connection to Email Marketing server?',
        "apiError": "Sorry, there was a problem subscribing you to the mailing list.",
        "success": 'You have been successfully subscribed to the 1ClickTrips newsletter. Awesome!',
        "alreadySubscribe" : "You have been already subscribed to the newsletter. We love your eagerness!"
    }
  }
}

