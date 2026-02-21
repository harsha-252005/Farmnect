// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.onload = function() {
    // Initialize RecaptchaVerifier
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
            // Handle successful reCAPTCHA response
        }
    });

    // Handle phone number form submission
    document.getElementById('phone-form').addEventListener('submit', function(event) {
        event.preventDefault();
        submitPhoneNumberAuth();
    });

    // Handle OTP form submission
    document.getElementById('otp-form').addEventListener('submit', function(event) {
        event.preventDefault();
        submitPhoneNumberAuthCode();
    });
};

function submitPhoneNumberAuth() {
    var phoneNumber = document.getElementById('phone-number').value;
    var appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
            document.getElementById('phone-form').style.display = 'none';
            document.getElementById('otp-form').style.display = 'block';
        })
        .catch(function(error) {
            document.getElementById('verification-result').innerText = "Error during signInWithPhoneNumber: " + error.message;
        });
}

function submitPhoneNumberAuthCode() {
    var code = document.getElementById('otp-code').value;

    window.confirmationResult.confirm(code)
        .then(function(result) {
            var user = result.user;
            // Check if user is already registered
            var userRef = firebase.database().ref('users/' + user.uid);

            userRef.once('value').then(function(snapshot) {
                if (snapshot.exists()) {
                    document.getElementById('verification-result').innerText = "User is already registered!";
                } else {
                    userRef.set({
                        phoneNumber: user.phoneNumber,
                        uid: user.uid,
                        createdAt: new Date().toISOString()
                    });
                    document.getElementById('verification-result').innerText = "OTP Verification Successful";
                }
            });
        })
        .catch(function(error) {
            document.getElementById('verification-result').innerText = "Error during OTP verification: " + error.message;
        });
}
