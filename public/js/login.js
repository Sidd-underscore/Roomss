var loginBtn = document.getElementById("loginBtn");
var login = document.getElementById("login");
var container = document.getElementById("container");
var registerBtn = document.getElementById("registerBtn");
// var register = document.getElementById("register");
var loginform = document.getElementById("loginform");
var login_form = document.getElementById("login_form");
var login_email = document.getElementById("email");
var login_password = document.getElementById("password");
var registerform = document.getElementById("registerform");
var register_form = document.getElementById("register_form");
var register_name = document.getElementById("register_name");
var register_email = document.getElementById("register_email");
var register_password = document.getElementById("register_password");
var register_password2 = document.getElementById("register_confirmpassword");
var github_register = document.getElementById("github-register")
var google_register = document.getElementById("google-register")
var github_login = document.getElementById("github-login")
var google_login = document.getElementById("google-login")

login.addEventListener("click", signIn);

registerBtn.onclick = function() {
	registerform.classList.toggle('hidden');
	registerform.style.opacity = '1';
	loginform.style.opacity = '0';
	loginform.classList.toggle('hidden');
}

loginBtn.onclick = function() {
	registerform.classList.toggle('hidden');
	registerform.style.opacity = '0';
	loginform.style.opacity = '1';
	loginform.classList.toggle('hidden');
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDu2H3Vxf0ogYehGIq67HPzYDjyPzPd5A0",
	authDomain: "roomss-official.firebaseapp.com",
	projectId: "roomss-official",
	storageBucket: "roomss-official.appspot.com",
	messagingSenderId: "551499613609",
	appId: "1:551499613609:web:c0f8016f303e43b6a7f0b8",
	measurementId: "G-V56YJHX8QW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);


register_form.addEventListener("submit", createAccountDefault);
login_form.addEventListener("submit", signIn);


// Select your input element.
var inputs = document.querySelectorAll('input');

for (var i = 0, len = inputs.length; i < len; i++) {
	inputs[i].addEventListener("keypress", function() {
		this.style.border = "0px solid var(--main-darklg)"
		document.querySelector("label[for='" + this.id + "'] span").innerHTML = "";

	})
}

function clearErrors() {
	for (var i = 0, len = inputs.length; i < len; i++) {
		inputs[i].style.border = "0px solid var(--main-darklg)"
		document.querySelector("label[for='" + inputs[i].id + "'] span").innerHTML = "";

	}
}

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

async function firebaseUser(user) {
	var data = {
		name: register_name.value
	}
	await setDoc(doc(db, "users", `${user.user.uid}`), data)
		.then(() => {
			console.log("[Firestore]: Document successfully written!");
		})
		.catch((error) => {
			console.error("[Firestore]: Error writing document: ", error);
		});

	//   sendEmailVerification(auth.currentUser)
	//     .then(() => {
	//       console.log('[Accounts]: Email verification sent!')
	// ...
	//     });
	console.log('[Accounts]: Signed in! Redirecting...')


	window.location.href = "/app"
}




function createAccountDefault(e) {
	e.preventDefault();
	clearErrors()


	let readytoregister = true
	let user = ''

	console.log('[Accounts]: Creating account with username/email and password, please wait...')

	if (register_name.value === '') {
		console.log('[Accounts]: No username!!! >:(')
		register_name.style.border = '2px solid red'
		document.querySelector("label[for=\"register_name\"] .error").innerHTML += "<span style='color: red'> - Please enter a username</span>"
		readytoregister = false
	}

	if (validateEmail(register_email.value) === false) {
		console.log('[Accounts]: No email!!! >:(')
		register_email.style.border = '2px solid red'
		document.querySelector("label[for=\"register_email\"] .error").innerHTML += "<span style='color: red'> - Please enter a valid email address</span>"

		readytoregister = false

	}

	if (register_password.value === '') {
		console.log('[Accounts]: No password!!! >:(')
		register_password.style.border = '2px solid red'
		document.querySelector("label[for=\"register_password\"] .error").innerHTML += "<span style='color: red'> - Please enter a password</span>"

		readytoregister = false

	}

	if (register_password2.value === '') {
		console.log('[Accounts]: No password2!!! >:(')
		register_password2.style.border = '2px solid red'
		readytoregister = false
		document.querySelector("label[for=\"register_confirmpassword\"] .error").innerHTML += "<span style='color: red'> - Please enter a password</span>"



	}

	if (register_password.value != register_password2.value) {
		console.log('[Accounts]: No match in passwords!!! >:(')
		if (readytoregister === true) {
			register_password2.style.border = '2px solid red'
			register_password.style.border = '2px solid red'
			document.querySelector("label[for=\"register_password\"] .error").innerHTML += "<span style='color: red'> - Passwords don't match</span>"
			document.querySelector("label[for=\"register_confirmpassword\"] .error").innerHTML += "<span style='color: red'> - Passwords don't match</span>"
		}

		readytoregister = false

	}

	if (readytoregister === true) {
		console.log('[Accounts]: All checks successful')


		createUserWithEmailAndPassword(auth, register_email.value, register_password.value).then((userCredential) => {

			firebaseUser(userCredential)

		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error('[Accounts]: ERROR: ' + errorCode + ': ' + errorMessage)
			if (errorCode === 'auth/email-already-in-use') {
				register_email.style.border = '2px solid red'

				document.querySelector("label[for=\"register_email\"] .error").innerHTML += "<span style='color: red'> - Email is already taken 😞</span>"

			} else if (errorCode === 'auth/internal-error') {

				document.querySelector('#create').innerHTML = "<span style='color: red'> An unexpected error has occured on the server side of things. Please try again later.</span>"
				setTimeout(function() {
					document.querySelector('#create').innerHTML = "Register"
				}, 5000);

			} else if (errorCode === 'auth/invalid-argument') {
				document.querySelector('#create').innerHTML = "<span style='color: red'> " + errorMessage + "</span>"
				setTimeout(function() {
					document.querySelector('#create').innerHTML = "Register"
				}, 5000);

			} else if (errorCode === 'auth/invalid-display-name') {
				register_name.style.border = '2px solid red'
				document.querySelector("label[for=\"register_username\"] .error").innerHTML += "<span style='color: red'> - Please enter a username</span>"

			} else if (errorCode === 'auth/invalid-email') {
				register_email.style.border = '2px solid red'
				document.querySelector("label[for=\"register_email\"] .error").innerHTML += "<span style='color: red'> - Please enter a valid email address</span>"

			} else if (errorCode === 'auth/session-cookie-revoked	' || 'auth/session-cookie-expired') {
				document.querySelector('#create').innerHTML = "<span style='color: red'> Please reload the page to continue.</span>"
				setTimeout(function() {
					document.querySelector('#create').innerHTML = "Register"
				}, 5000);

			} else {
				document.querySelector('#create').innerHTML = "<span style='color: red'> An unexpected error has occured. Please try again later.</span>"
				setTimeout(function() {
					document.querySelector('#create').innerHTML = "Register"
				}, 5000);
			}
		});



	}

}


function signIn(e) {

	clearErrors()
	let readytologin = true

	e.preventDefault();
	console.log('[Accounts]: Signing in with email and password, please wait...')

	if (validateEmail(email.value) === false) {
		console.log('[Accounts]: No email!!! >:(')
		login_email.style.border = '2px solid red'
		document.querySelector("label[for=\"email\"] .error").innerHTML += "<span style='color: red'> - Please enter an email</span>"

		readytologin = false
	}

	if (login_password.value === '') {
		console.log('[Accounts]: No password!!! >:(')
		login_password.style.border = '2px solid red'
		document.querySelector("label[for=\"password\"] .error").innerHTML += "<span style='color: red'> - Please enter a password</span>"

		readytologin = false

	}

	if (readytologin === true) {
		signInWithEmailAndPassword(auth, login_email.value, login_password.value)
			.then((userCredential) => {
				console.log('[Accounts]: Signed in! Redirecting...')


				window.location.href = "/app"
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error('[Accounts]: ERROR: ' + errorCode + ': ' + errorMessage)
				if (errorCode === 'auth/user-not-found') {
					email.style.border = '2px solid red'
					password.style.border = '2px solid red'

					document.querySelector("label[for=\"email\"] .error").innerHTML += "<span style='color: red'> - Email not found. Click register above to create an account</span>"

				} else if (errorCode === 'auth/wrong-password') {
					password.style.border = '2px solid red'

					document.querySelector("label[for=\"password\"] .error").innerHTML += "<span style='color: red'> - Incorrect password. Try again.</span>"

				} else if (errorCode === 'auth/too-many-requests') {
					document.querySelector('#login').style.border = '2px solid red'


					document.querySelector('#login').innerHTML = "<span style='color: red'> Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.</span>"
					setTimeout(function() {
						document.querySelector('#login').innerHTML = "Login"
					}, 5000);

				} else {
					document.querySelector('#login').innerHTML = "<span style='color: red'> An unexpected error has occured. Please try again later.</span>"
					setTimeout(function() {
						document.querySelector('#login').innerHTML = "Login"
					}, 5000);
				}
			});
	}
}

github_register.addEventListener("click", withGithub);
github_login.addEventListener("click", withGithub);

function withGithub() {
	console.log('[Accounts]: withGitHub called')

	const gitprovider = new GithubAuthProvider();
	signInWithPopup(auth, gitprovider)
		.then((result) => {
			console.log('[Accounts]: Github user signed in!')

			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			const credential = GithubAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;

			// The signed-in user info.
			const user = result.user;
			alert(JSON.stringify(user))
			window.location.href = "/app"
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GithubAuthProvider.credentialFromError(error);
			console.error('[Accounts]: ERROR: ' + errorCode + ': ' + errorMessage)
			if (errorCode === 'auth/account-exists-with-different-credential') {

				document.querySelector("#github-login span").innerHTML = "<span style='color: red'> This account exists, however you must log in the same way as you created it. (i.e.: if you registered with Google, log in with Google)</span>"
				setTimeout(function() {
					document.querySelector('#github-login span').innerHTML = "Log in with GitHub"
				}, 5000);
			}

			// ...
		});
}

google_register.addEventListener("click", withGoogle);
google_login.addEventListener("click", withGoogle);

function withGoogle() {
	console.log('[Accounts]: withGoogle called')

	const googleprovider = new GoogleAuthProvider();
	signInWithPopup(auth, googleprovider).then((result) => {
		console.log('[Accounts]: Google user signed in!')
		window.location.href = "/app"

		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;
		// ...
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		console.error('[Accounts]: ERROR: ' + errorCode + ': ' + errorMessage)
		if (errorCode === 'auth/account-exists-with-different-credential') {

			document.querySelector("#google-login span").innerHTML = "<span style='color: red'> This account exists, however you must log in the same way as you created it. (i.e.: if you registered with Google, log in with Google)</span>"
			setTimeout(function() {
				document.querySelector('#google-login span').innerHTML = "Log in with Google"
			}, 5000);
		}

		// ...
	});
}