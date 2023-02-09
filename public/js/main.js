var url = "https://uselessfacts.jsph.pl/random.json?language=en";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		var data = xhr.responseText;
		var jsonResponse = JSON.parse(data);
		console.log(jsonResponse.text)
		document.getElementById('ff').innerHTML = jsonResponse.text
	}
};
xhr.send();


import { show, hide, getRoom } from './global.js'
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app-check.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

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

// Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
let uid = ''

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider('6Lc1nNYhAAAAANpmKTlx8z97UZW5SI8mHhAuJliT'),

	// Optional argument. If true, the SDK automatically refreshes App Check
	// tokens as needed.
	isTokenAutoRefreshEnabled: true
});

function removeLoader() {
	var fadeTarget = document.querySelector(".load");
	var fadeEffect = setInterval(function() {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;
		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;
		} else {
			fadeTarget.remove()
			clearInterval(fadeEffect);
		}
	}, 100);

}

async function load() {


	onAuthStateChanged(auth, async (user) => {

		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			uid = user.uid;
			console.log('[Accounts]: User uid retreived')
			let userData = ''
			const unsub = onSnapshot(doc(db, "users", `${uid}`), async (dadocument) => {
				console.log("[Firestore]: User data retreived");
				userData = dadocument.data()
				readyTheRoomss(userData, uid)

				if (!userData.avatar) {
					const ref = doc(db, "users", `${uid}`);
					await updateDoc(ref, {
						avatar: 'https://roomss.tk/img/account_placeholder.svg'
					});
					console.log('[Firestore]: Updated "avatar" in user\'s data')
				}


				if (!userData.color) {
					const ref = doc(db, "users", `${uid}`);
					await updateDoc(ref, {
						color: '#' + Math.floor(Math.random() * 16777215).toString(16)
					});
					console.log('[Firestore]: Updated "color" in user\'s data')

				}


				if (userData.name === "Dinnerbone") {
					const ref = doc(db, "users", `${uid}`);
					await updateDoc(ref, {
						name: 'ǝuoqɹǝuuᴉᗡ'
					});
					console.log('[Firestore]: We\'ve got a ǝuoqɹǝuuᴉᗡ in da house 🥳')

				}
				var names = document.querySelectorAll('.account-settings-button-main .name');
				var emails = document.querySelectorAll('.account-settings-button-main .email')
				
				for (let i = 0; i < names.length; i++) {
					document.querySelectorAll('.account-settings-button-main .name')[i].innerText = userData.name;
				}
				
				for (let i = 0; i < emails.length; i++) {
					document.querySelectorAll('.account-settings-button-main .email')[i].innerText = user.email || '';
				}
				document.querySelector('#name_greet').innerText = userData.name
				document.querySelector('.account-settings-button-main #avatarButton').src = userData.avatar
				document.querySelector('.account-settings-button-main .status-setter').innerText = userData.status || 'Set status'
				document.querySelector('.account-settings-button-main .status-setter-indicator').classList.remove()


				let time = ''
				setInterval(findthetime, 100)
				function findthetime() {
					var today = new Date()
					var curHr = today.getHours()
					if (curHr < 12) {
						time = 'morning'
					} else if (curHr < 18) {
						time = 'afternoon'
					} else {
						time = 'evening'
					}
					document.querySelector('#timeofday').innerText = time

				}
			});

		} else {
			window.location.href = '/login'
		}
	});



	removeLoader()

}

load()

//varaiables
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');
var urlthing = document.querySelector('.url')
var settings_modal = document.querySelector("#settings-modal");
var settings_modal_close = document.querySelector("#settings-modal .close");
var settings_modal_opener = document.querySelector("#settings");
var list = document.querySelector('.card-grid')
var newmodal = document.querySelector('.modal.new-modal')
var newmodal_close = document.querySelector('.modal.new-modal .close')
var newmodalframe = document.querySelector('.new-frame')

function inviteem(codel) {


	shareDialog.classList.add('is-open');

	closeButton.addEventListener('click', event => {
		shareDialog.classList.remove('is-open');
	});
	if (!codel) {
		var active_chat = 'join=true&id=' + active_chatl[0] + '&name=' + active_chatl[1]

	} else {
		var active_chat = 'join=true&id=' + codel[0] + '&name=' + codel[1]

	}
	var url = "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=" + key;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url);

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			var datalol = JSON.parse(xhr.responseText);

			urlthing.textContent = datalol.shortLink
			document.querySelector('#twit-btn').onclick = 'window.open("http://twitter.com/share?text=Join my very super awesome Room!!!&url=' + datalol.shortLink + '&hashtags=Roomss", "blank")'

		}
	};

	var data = `{
   "suffix": {
     "option": "UNGUESSABLE"
   },
    "dynamicLinkInfo": {
    "link": 'https://roomss.tk/app?${active_chat}',
    "domainUriPrefix": "https://invite.roomss.tk/join"

  }
}`;

	console.log(active_chatl)

	xhr.send(data);
}


// When the user clicks on <span> (x), close the modal
settings_modal_close.onclick = function() {
	settings_modal.style.opacity = 0;
	settings_modal.style.visibility = 'hidden';

	if (sessionStorage.getItem('active-chat')) {
		summon(sessionStorage.getItem('active-chat'))
	}
}

newmodal_close.onclick = function() {
	newmodal.style.opacity = 0;
	newmodal.style.visibility = 'hidden';
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
	if (event.target == settings_modal) {
		settings_modal.style.opacity = 0;
		settings_modal.style.visibility = 'hidden';
	}
});

//close new dialoag
window.onmessage = function(e) {
	if (e.data == '[Create Dialog]: Close house/room frame plz athanks bye') {
		newmodal.style.opacity = 0;
		newmodal.style.visibility = 'hidden';
	}
};

// When the user clicks on the button, open the modal
settings_modal_opener.onclick = function() {
	settings_modal.style.opacity = 1;
	settings_modal.style.visibility = 'visible';
	document.body.classList.remove('active')

}


async function readyTheRoomss(userDataOg, uid) {


	const ref = doc(db, "users", `${uid}`);
	const userData = userDataOg
	console.log('Readying the Roomss!')

	function newRoom(target) {
		newmodalframe.src = "/create?action=room"
		newmodal.style.opacity = 1;
		newmodal.style.visibility = 'visible';
		console.log('[Chats]: newRoom() called!')

	}

	function newHouse() {
		newmodalframe.src = "/create?action=house"
		newmodal.style.opacity = 1;
		newmodal.style.visibility = 'visible';
		console.log('[Houses]: newHouse() called!')

	}


	refrsh('houses')
	async function refrsh(target) {
		if (document.querySelector('[data-frame="true"')) {
			document.querySelector('[data-frame="true"]').remove()
			document.querySelector('.chats-div').style.display = 'none';
			document.querySelector('.cards').style.display = 'grid';
		}
		if (target === 'houses') {

			if (userData.housesJoined) {

				if (!userData.housesJoined === '[]') {

					list.innerHTML = `<div class="temp">                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="31.6 127.33 302.09 299.7">                     <g id="freepik--Bookshelf--inject-8">                        <g id="freepik--bookshelf--inject-8">                           <path d="M319.9,165.09,264.29,133a3,3,0,0,0-3-.29l-4,2.31a3,3,0,0,0-1.27,2.77V290a9.45,9.45,0,0,0,4.28,7.4l55.6,32.05a3,3,0,0,0,3,.3l4-2.32a3,3,0,0,0,1.25-2.76V172.49A9.44,9.44,0,0,0,319.9,165.09Z" style="fill:#263238"></path>                           <path d="M268,292.61l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.8,3.8,0,0,0,1.47-1.79l3.61-10.4Z" style="fill:#263238"></path>                           <path d="M264,307.58a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55L272,299.55l-8-4.63Z" style="fill:#37474f"></path>                           <path d="M308.12,315.7l-4,2.32v12.65a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.8,3.8,0,0,0,1.47-1.79l3.6-10.41Z" style="fill:#263238"></path>                           <path d="M304.12,330.67a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                           <path d="M260.56,135.43l55.6,32a9.47,9.47,0,0,1,4.28,7.41V327.05a2.61,2.61,0,0,1-4.28,2.47l-55.6-32.06a9.44,9.44,0,0,1-4.27-7.4V137.89a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                           <g id="freepik--Bottom--inject-8">                              <polygon points="179.82 343.48 239.96 378.2 324.16 329.59 320.15 327.27 260.01 292.55 179.82 338.85 179.82 343.48" style="fill:#455a64"></polygon>                              <polygon points="239.96 378.2 239.96 373.57 324.16 324.96 324.16 329.59 239.96 378.2" style="fill:#263238"></polygon>                           </g>                           <path d="M240.34,371.46l-.61-.41C250.4,354.9,250.33,327,249.46,320c-.07-.47-.12-.76-.13-.87l.73-.12c0,.22.08.48.12.79.78,4.95,5.19,31.84,10.41,40l-.62.4c-4.13-6.41-7.66-23.71-9.43-33.69C250.65,337.84,249,358.43,240.34,371.46Z" style="fill:#fafafa"></path>                           <path d="M275.46,346.8c-.91-.27-22.17-6.71-24.13-16.09l.73-.15c1.86,8.95,23.39,15.47,23.61,15.54Z" style="fill:#fafafa"></path>                           <path d="M254,343l-.54-2.29a1.89,1.89,0,0,0-1.76-1.56,1.74,1.74,0,0,0-1.78.89l-.69-.29a2.48,2.48,0,0,1,2.53-1.34,2.6,2.6,0,0,1,1.89,1A3.68,3.68,0,0,1,255,337a1.85,1.85,0,0,1,1.82.06l-.33.66a1.16,1.16,0,0,0-1.13-.07c-.85.48-1.18,2.33-1.23,3Z" style="fill:#fafafa"></path>                           <path d="M256.09,350.63l-.66-2.08c-.75-2.35-2-3.7-3.48-3.79a3.18,3.18,0,0,0-2.95,1.85l-.67-.32A3.89,3.89,0,0,1,252,344c.89.05,2.42.53,3.56,2.85.25-1.83,1-4.77,2.93-6a4.6,4.6,0,0,1,4.51.05l-.31.67a3.89,3.89,0,0,0-3.8-.09c-2.57,1.6-2.74,6.89-2.74,6.95Z" style="fill:#fafafa"></path>                           <path d="M247.06,355.71l-.66-.34c1.48-2.85,4.73-4.9,7.55-4.76a4,4,0,0,1,3.1,1.53,10.85,10.85,0,0,1,4.74-7.08,9.21,9.21,0,0,1,9-.67l-.29.67a8.53,8.53,0,0,0-8.28.62,9.91,9.91,0,0,0-4.5,7.68l0,1.89-.7-1.76a3.28,3.28,0,0,0-3.06-2.14C251.37,351.22,248.42,353.1,247.06,355.71Z" style="fill:#fafafa"></path>                           <path d="M243,366.75l-.65-.36c.9-1.64,5.69-9.88,11.36-11.37a5.89,5.89,0,0,1,4.78.69l-.38.63a5.22,5.22,0,0,0-4.21-.61C249.74,356.83,245.44,362.35,243,366.75Z" style="fill:#fafafa"></path>                           <polygon points="316.14 278.66 316.14 283.29 239.96 327.27 179.82 292.55 179.82 287.92 256 243.94 316.14 278.66" style="fill:#263238"></polygon>                           <polygon points="316.14 278.66 239.96 322.64 179.82 287.92 256 243.94 316.14 278.66" style="fill:#455a64"></polygon>                           <polygon points="316.14 227.74 316.14 232.36 239.96 276.35 179.82 241.62 179.82 237 256 193.01 316.14 227.74" style="fill:#263238"></polygon>                           <polygon points="316.14 227.74 239.96 271.72 179.82 237 256 193.01 316.14 227.74" style="fill:#455a64"></polygon>                           <g id="freepik--Side--inject-8">                              <path d="M239.7,211.33l-55.6-32.05a3,3,0,0,0-3-.3c-.72.41-3.28,1.9-4,2.31a3,3,0,0,0-1.26,2.77V336.23a9.45,9.45,0,0,0,4.28,7.4l55.6,32.06a3,3,0,0,0,3,.3c.72-.42,3.3-1.9,4-2.33A3,3,0,0,0,244,370.9V218.74A9.45,9.45,0,0,0,239.7,211.33Z" style="fill:#263238"></path>                              <polygon points="239.96 234.69 243.98 232.37 243.98 218.47 239.95 220.79 239.96 234.69" style="opacity:0.2"></polygon>                              <polygon points="320.16 188.39 324.18 186.08 324.18 172.18 320.15 174.5 320.16 188.39" style="opacity:0.2"></polygon>                              <path d="M187.84,338.85l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.82,3.82,0,0,0,1.47-1.78l3.61-10.41Z" style="fill:#263238"></path>                              <path d="M183.83,353.82a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M227.93,362l-4,2.31v12.66a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.88,3.88,0,0,0,1.47-1.78l3.6-10.41Z" style="fill:#263238"></path>                              <path d="M223.93,376.92a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a1,1,0,0,0,1.47-.55l3.6-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M180.08,181.6l55.61,32.05a9.46,9.46,0,0,1,4.27,7.41V378.2s-3.09-1.83-4.27-2.51l-55.6-32.06a9.45,9.45,0,0,1-4.28-7.4V184.06a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                              <path d="M235.69,213.65,180.08,181.6a2.6,2.6,0,0,0-4.27,2.46v13.59l64.15,37V221.06A9.46,9.46,0,0,0,235.69,213.65Z" style="opacity:0.2"></path>                           </g>                           <path d="M312.13,228.11a.38.38,0,0,1-.37-.37V182.08l-43.55,25.14a.35.35,0,0,1-.5-.13.37.37,0,0,1,.13-.51L312,181.12a.35.35,0,0,1,.37,0,.37.37,0,0,1,.18.32v46.3A.37.37,0,0,1,312.13,228.11Z" style="fill:#fafafa"></path>                           <path d="M304.11,216.53H304a.37.37,0,0,1-.28-.44l7.46-32.31-14.8,25.63a.36.36,0,0,1-.5.14.37.37,0,0,1-.14-.51l16-27.78a.38.38,0,0,1,.46-.16.37.37,0,0,1,.22.43l-8,34.73A.36.36,0,0,1,304.11,216.53Z" style="fill:#fafafa"></path>                           <path d="M288.08,205a.36.36,0,0,1-.27-.12.37.37,0,0,1,0-.52l24.06-23.15a.37.37,0,0,1,.52,0,.38.38,0,0,1,0,.53l-24.06,23.14A.36.36,0,0,1,288.08,205Z" style="fill:#fafafa"></path>                           <path d="M312.13,220.72h0a.38.38,0,0,1-.37-.37c0-6.06-6.76-6.47-7.05-6.48a.39.39,0,0,1-.28-.15.36.36,0,0,1-.06-.3,7.19,7.19,0,0,0-2.31-6.81,3.45,3.45,0,0,0-2.66-1,1.85,1.85,0,0,0-1.27.86.37.37,0,0,1-.43.17.37.37,0,0,1-.26-.38c0-.23.41-5.62-4.33-6.15a.38.38,0,0,1-.29-.2.37.37,0,0,1,0-.34s2.1-3.93,1.29-5.86a1.56,1.56,0,0,0-1.07-.92.36.36,0,0,1-.25-.46.38.38,0,0,1,.46-.25,2.27,2.27,0,0,1,1.54,1.35c.77,1.83-.53,4.86-1.09,6,3.68.71,4.36,4.18,4.46,5.9a2.82,2.82,0,0,1,1.1-.47,4,4,0,0,1,3.27,1.21,8,8,0,0,1,2.63,7.12c1.62.21,7.34,1.34,7.33,7.18A.37.37,0,0,1,312.13,220.72Z" style="fill:#fafafa"></path>                           <path d="M312.13,210.74a.37.37,0,0,1-.37-.34c-.16-2.12-1.39-4.86-2.94-5.54a1.73,1.73,0,0,0-1.87.3.38.38,0,0,1-.41,0,.37.37,0,0,1-.19-.36s.33-3.75-1.36-5.3a3,3,0,0,0-2.68-.6.36.36,0,0,1-.35-.12.38.38,0,0,1-.07-.37c.34-.93,1-3.54.11-4.47-.42-.43-1.19-.47-2.3-.11a.37.37,0,0,1-.42-.14.38.38,0,0,1,0-.44c.62-.78,2.15-3.06,1.77-4.15a.92.92,0,0,0-.74-.56.37.37,0,0,1-.27-.45.35.35,0,0,1,.44-.27,1.62,1.62,0,0,1,1.27,1c.41,1.19-.59,3-1.29,4a2.28,2.28,0,0,1,2.06.53c1.1,1.14.57,3.55.24,4.68a3.48,3.48,0,0,1,2.72.85c1.49,1.36,1.65,4,1.63,5.21a2.35,2.35,0,0,1,2,0c1.89.83,3.2,3.78,3.39,6.17a.36.36,0,0,1-.34.39Z" style="fill:#fafafa"></path>                           <g id="freepik--Top--inject-8">                              <path d="M333.67,165.24a3,3,0,0,0-1.76-2.47L272.3,128.35a9.47,9.47,0,0,0-8.55,0l-91.68,52.94a3,3,0,0,0-1.76,2.47v4.63a3,3,0,0,0,1.76,2.47l59.61,34.41a9.41,9.41,0,0,0,8.55,0l91.68-52.93a3,3,0,0,0,1.76-2.47Z" style="fill:#37474f"></path>                              <path d="M231.68,220.64l-59.61-34.41c-2.36-1.37-2.36-3.58,0-4.94l91.68-52.94a9.47,9.47,0,0,1,8.55,0l59.61,34.42c2.37,1.37,2.37,3.57,0,4.94l-91.68,52.93A9.41,9.41,0,0,1,231.68,220.64Z" style="fill:#455a64"></path>                           </g>                           <g id="freepik--Shadows--inject-8">                              <polygon points="320.15 179.12 292.09 213.85 243.98 241.63 243.97 223.11 320.15 179.12" style="opacity:0.1"></polygon>                              <polygon points="316.14 232.36 292.09 264.77 243.98 292.56 243.98 274.03 316.14 232.36" style="opacity:0.1"></polygon>                              <polygon points="316.14 283.29 292.09 315.7 243.98 343.49 243.98 324.96 316.14 283.29" style="opacity:0.1"></polygon>                           </g>                        </g>                     </g>                     <g id="freepik--Box--inject-8">                        <g id="freepik--box--inject-8">                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="opacity:0.5"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="opacity:0.23"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="opacity:0.38"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="opacity:0.4"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="opacity:0.23"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="opacity:0.2"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="opacity:0.30000000000000004"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="opacity:0.1"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="opacity:0.45"></polygon>                           <g style="opacity:0.7000000000000001">                              <path d="M153.74,409.86a.46.46,0,0,1-.46-.45V399.25a.47.47,0,0,1,.46-.46.46.46,0,0,1,.45.46v10.16A.45.45,0,0,1,153.74,409.86Z" style="fill:#fff"></path>                              <path d="M152.41,402.77a.58.58,0,0,1-.18,0,.47.47,0,0,1-.24-.6l1.62-3.73,1.8,2.08a.46.46,0,0,1-.69.6l-.85-1-1,2.4A.47.47,0,0,1,152.41,402.77Z" style="fill:#fff"></path>                              <path d="M157.93,407.47a.46.46,0,0,1-.45-.46V396.86a.45.45,0,1,1,.9,0V407A.46.46,0,0,1,157.93,407.47Z" style="fill:#fff"></path>                              <path d="M156.6,400.38a.58.58,0,0,1-.18,0,.45.45,0,0,1-.23-.6L157.8,396l1.8,2.07a.46.46,0,0,1,0,.64.45.45,0,0,1-.64,0l-.85-1-1,2.4A.46.46,0,0,1,156.6,400.38Z" style="fill:#fff"></path>                           </g>                           <g style="opacity:0.7000000000000001">                              <path d="M141.65,416.75a1,1,0,0,1-.49-.12,1.2,1.2,0,0,1-.55-1.09v-1.25a.46.46,0,0,1,.46-.45.45.45,0,0,1,.45.45v1.25c0,.18,0,.28.09.3s.14,0,.29-.08a2.65,2.65,0,0,0,.85-2.05v-5.2a.45.45,0,1,1,.9,0v5.2a3.44,3.44,0,0,1-1.29,2.83A1.41,1.41,0,0,1,141.65,416.75Z" style="fill:#fff"></path>                              <path d="M136.88,412.56v-.78a12.87,12.87,0,0,1,5.79-10c1.64-.94,3.2-1.08,4.4-.38a4.33,4.33,0,0,1,1.86,4v.26Zm8.51-10.74a4.7,4.7,0,0,0-2.26.7,12,12,0,0,0-5.3,8.45L148,405.09a3.37,3.37,0,0,0-1.41-3A2.38,2.38,0,0,0,145.39,401.82Z" style="fill:#fff"></path>                           </g>                           <polygon points="31.6 297.27 114.67 345.33 132.02 369.3 113.75 346.18 31.6 297.27" style="fill:#fff;opacity:0.7000000000000001"></polygon>                           <polygon points="205.78 326.71 132.02 369.3 132.02 427.03 133.4 370.46 205.78 326.71" style="fill:#fff;opacity:0.7000000000000001"></polygon>                        </g>                     </g>                     <g id="freepik--Moth--inject-8">                        <g id="freepik--moth--inject-8">                           <path d="M97.54,303.62c7.61-1.1,14.56-6,19-12.16a29,29,0,0,0,4.5-9.54,20.43,20.43,0,0,0,.46-9.88c-1.37-5.49-6.45-8.74-11.82-9.42a18,18,0,0,0-8.1.79,13.68,13.68,0,0,0-6.7,5A8.28,8.28,0,0,0,93,272.77a2.5,2.5,0,0,0,2.24,2.55,7.22,7.22,0,0,0,4.57-1.16,14.49,14.49,0,0,0,4.27-3.64,30.56,30.56,0,0,0,5.54-10.5,21.09,21.09,0,0,0,0-10,18.46,18.46,0,0,0-4.53-9.21,16.76,16.76,0,0,0-9.74-4.29,23.72,23.72,0,0,0-10.74,1,11.49,11.49,0,0,0-4.13,2.26c-.86.8-1.84,2.12-1.49,3.42s2.25,1.88,3.54,1.71a9.28,9.28,0,0,0,5-2.71,21.35,21.35,0,0,0,3.77-5,8.78,8.78,0,0,0,1.13-4.34c-.13-6.34-7.14-10.44-12.63-11.6a16.25,16.25,0,0,0-4.51-.3c-.51,0-.2.84.21.81A16.48,16.48,0,0,1,84,223.69a14.22,14.22,0,0,1,6.21,5.53,7.61,7.61,0,0,1-.24,7.74,20.53,20.53,0,0,1-3.62,4.62c-1.19,1.08-3,2.33-4.67,2.21a1.47,1.47,0,0,1-1.32-.83,2.13,2.13,0,0,1,.59-1.82A8.37,8.37,0,0,1,84.14,239a21,21,0,0,1,9.49-1.56,17,17,0,0,1,9.34,3,14.69,14.69,0,0,1,4.86,7.71,22.64,22.64,0,0,1,.88,9.5,24.35,24.35,0,0,1-3.63,9c-1.85,3.06-4.17,6-7.65,7.2-.86.31-2.66.76-3-.49s.64-2.79,1.27-3.76a12.72,12.72,0,0,1,5.82-4.91,16.07,16.07,0,0,1,7.29-1.1c4.71.35,9.49,2.81,11.13,7.49a17,17,0,0,1,.26,8.6,27.64,27.64,0,0,1-3.31,8.84A31.58,31.58,0,0,1,102,301.51c-1.48.64-3,1.18-4.55,1.68-.16.06-.09.46.09.43Z" style="fill:#e0e0e0"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#2F80EC"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#fff;opacity:0.65"></path>                           <path d="M69.47,218.5a8,8,0,0,0-.7-.61c-.35-.27-.72-.53-1.07-.79a9.12,9.12,0,0,0-1.07-.67,6.65,6.65,0,0,0-.66-.32,1.83,1.83,0,0,0-1-.16.5.5,0,0,0-.4.78,2.5,2.5,0,0,0,1,.66l.54.29c.37.22.7.47,1,.72s.7.49,1,.74a6.53,6.53,0,0,0,1.71,1,.19.19,0,0,0,.18,0C70.51,219.74,69.76,218.79,69.47,218.5Z" style="fill:#455a64"></path>                        </g>                     </g>                  </svg>                  <br>                  <p><strong>Your adventure starts here...</strong><br><button class="newhousebtn" style="margin-top: 10px; display: inline-block;"> Create a house?</button> </p>                  <br>                  <br>               </div>`

				} else {



					var houses = JSON.parse(userData.housesJoined);

					list.innerHTML = ''
					houses.forEach(element => {
						let logo;
						if (element[3]) {
							logo = "<img src='" + element[3] + "'></img>";
						} else {
							logo = "<img src='/img/house-placeholder.svg'></img>";
						}
						var name = element[1].replaceAll("\\", "");
						const house = `<div class="card house cursor-pointer select-none bg-dark-darker transition duration-200 ease hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg  text-center rounded-md" data-type="tooltip" data-tooltip="${name}"  data-name="${element[1]}" data-id="${element[0]}" >
	  									<div class="header h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover" style="background-image: url(/img/splash_1.png)"></div>
					 					  <div class="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4">${logo}</div>

											<div class="content p-4">
		   										<div class="title">${element[1]}</div>
			   								</div>
			 						</div>`

						list.innerHTML += house


					});
					list.innerHTML += `<div class="card newhousebtn thiscardisnotanormalone cursor-pointer select-none bg-dark-darker transition duration-200 ease hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg  text-center bg-center bg-splash-1 bg-no-repeat bg-cover rounded-md flex items-center justify-center">
	  											<div class="h-full w-full rounded-md text-center bg-black-low-opacity backdrop-blur-sm">
			  										<div class="logo left-px p-1 left-1 mt-8 mb-1">
			   											<i class="fi fi-sr-plus text-6xl"></i>
				 									</div>
			  										<div class="content p-16">
			  											<div class="title text-xl">Create a room?</div>
			  										</div>
			  									</div>
			  								</div>`				
				}

			} else {
				list.innerHTML = `<div class="temp">                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="31.6 127.33 302.09 299.7">                     <g id="freepik--Bookshelf--inject-8">                        <g id="freepik--bookshelf--inject-8">                           <path d="M319.9,165.09,264.29,133a3,3,0,0,0-3-.29l-4,2.31a3,3,0,0,0-1.27,2.77V290a9.45,9.45,0,0,0,4.28,7.4l55.6,32.05a3,3,0,0,0,3,.3l4-2.32a3,3,0,0,0,1.25-2.76V172.49A9.44,9.44,0,0,0,319.9,165.09Z" style="fill:#263238"></path>                           <path d="M268,292.61l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.8,3.8,0,0,0,1.47-1.79l3.61-10.4Z" style="fill:#263238"></path>                           <path d="M264,307.58a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55L272,299.55l-8-4.63Z" style="fill:#37474f"></path>                           <path d="M308.12,315.7l-4,2.32v12.65a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.8,3.8,0,0,0,1.47-1.79l3.6-10.41Z" style="fill:#263238"></path>                           <path d="M304.12,330.67a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                           <path d="M260.56,135.43l55.6,32a9.47,9.47,0,0,1,4.28,7.41V327.05a2.61,2.61,0,0,1-4.28,2.47l-55.6-32.06a9.44,9.44,0,0,1-4.27-7.4V137.89a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                           <g id="freepik--Bottom--inject-8">                              <polygon points="179.82 343.48 239.96 378.2 324.16 329.59 320.15 327.27 260.01 292.55 179.82 338.85 179.82 343.48" style="fill:#455a64"></polygon>                              <polygon points="239.96 378.2 239.96 373.57 324.16 324.96 324.16 329.59 239.96 378.2" style="fill:#263238"></polygon>                           </g>                           <path d="M240.34,371.46l-.61-.41C250.4,354.9,250.33,327,249.46,320c-.07-.47-.12-.76-.13-.87l.73-.12c0,.22.08.48.12.79.78,4.95,5.19,31.84,10.41,40l-.62.4c-4.13-6.41-7.66-23.71-9.43-33.69C250.65,337.84,249,358.43,240.34,371.46Z" style="fill:#fafafa"></path>                           <path d="M275.46,346.8c-.91-.27-22.17-6.71-24.13-16.09l.73-.15c1.86,8.95,23.39,15.47,23.61,15.54Z" style="fill:#fafafa"></path>                           <path d="M254,343l-.54-2.29a1.89,1.89,0,0,0-1.76-1.56,1.74,1.74,0,0,0-1.78.89l-.69-.29a2.48,2.48,0,0,1,2.53-1.34,2.6,2.6,0,0,1,1.89,1A3.68,3.68,0,0,1,255,337a1.85,1.85,0,0,1,1.82.06l-.33.66a1.16,1.16,0,0,0-1.13-.07c-.85.48-1.18,2.33-1.23,3Z" style="fill:#fafafa"></path>                           <path d="M256.09,350.63l-.66-2.08c-.75-2.35-2-3.7-3.48-3.79a3.18,3.18,0,0,0-2.95,1.85l-.67-.32A3.89,3.89,0,0,1,252,344c.89.05,2.42.53,3.56,2.85.25-1.83,1-4.77,2.93-6a4.6,4.6,0,0,1,4.51.05l-.31.67a3.89,3.89,0,0,0-3.8-.09c-2.57,1.6-2.74,6.89-2.74,6.95Z" style="fill:#fafafa"></path>                           <path d="M247.06,355.71l-.66-.34c1.48-2.85,4.73-4.9,7.55-4.76a4,4,0,0,1,3.1,1.53,10.85,10.85,0,0,1,4.74-7.08,9.21,9.21,0,0,1,9-.67l-.29.67a8.53,8.53,0,0,0-8.28.62,9.91,9.91,0,0,0-4.5,7.68l0,1.89-.7-1.76a3.28,3.28,0,0,0-3.06-2.14C251.37,351.22,248.42,353.1,247.06,355.71Z" style="fill:#fafafa"></path>                           <path d="M243,366.75l-.65-.36c.9-1.64,5.69-9.88,11.36-11.37a5.89,5.89,0,0,1,4.78.69l-.38.63a5.22,5.22,0,0,0-4.21-.61C249.74,356.83,245.44,362.35,243,366.75Z" style="fill:#fafafa"></path>                           <polygon points="316.14 278.66 316.14 283.29 239.96 327.27 179.82 292.55 179.82 287.92 256 243.94 316.14 278.66" style="fill:#263238"></polygon>                           <polygon points="316.14 278.66 239.96 322.64 179.82 287.92 256 243.94 316.14 278.66" style="fill:#455a64"></polygon>                           <polygon points="316.14 227.74 316.14 232.36 239.96 276.35 179.82 241.62 179.82 237 256 193.01 316.14 227.74" style="fill:#263238"></polygon>                           <polygon points="316.14 227.74 239.96 271.72 179.82 237 256 193.01 316.14 227.74" style="fill:#455a64"></polygon>                           <g id="freepik--Side--inject-8">                              <path d="M239.7,211.33l-55.6-32.05a3,3,0,0,0-3-.3c-.72.41-3.28,1.9-4,2.31a3,3,0,0,0-1.26,2.77V336.23a9.45,9.45,0,0,0,4.28,7.4l55.6,32.06a3,3,0,0,0,3,.3c.72-.42,3.3-1.9,4-2.33A3,3,0,0,0,244,370.9V218.74A9.45,9.45,0,0,0,239.7,211.33Z" style="fill:#263238"></path>                              <polygon points="239.96 234.69 243.98 232.37 243.98 218.47 239.95 220.79 239.96 234.69" style="opacity:0.2"></polygon>                              <polygon points="320.16 188.39 324.18 186.08 324.18 172.18 320.15 174.5 320.16 188.39" style="opacity:0.2"></polygon>                              <path d="M187.84,338.85l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.82,3.82,0,0,0,1.47-1.78l3.61-10.41Z" style="fill:#263238"></path>                              <path d="M183.83,353.82a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M227.93,362l-4,2.31v12.66a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.88,3.88,0,0,0,1.47-1.78l3.6-10.41Z" style="fill:#263238"></path>                              <path d="M223.93,376.92a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a1,1,0,0,0,1.47-.55l3.6-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M180.08,181.6l55.61,32.05a9.46,9.46,0,0,1,4.27,7.41V378.2s-3.09-1.83-4.27-2.51l-55.6-32.06a9.45,9.45,0,0,1-4.28-7.4V184.06a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                              <path d="M235.69,213.65,180.08,181.6a2.6,2.6,0,0,0-4.27,2.46v13.59l64.15,37V221.06A9.46,9.46,0,0,0,235.69,213.65Z" style="opacity:0.2"></path>                           </g>                           <path d="M312.13,228.11a.38.38,0,0,1-.37-.37V182.08l-43.55,25.14a.35.35,0,0,1-.5-.13.37.37,0,0,1,.13-.51L312,181.12a.35.35,0,0,1,.37,0,.37.37,0,0,1,.18.32v46.3A.37.37,0,0,1,312.13,228.11Z" style="fill:#fafafa"></path>                           <path d="M304.11,216.53H304a.37.37,0,0,1-.28-.44l7.46-32.31-14.8,25.63a.36.36,0,0,1-.5.14.37.37,0,0,1-.14-.51l16-27.78a.38.38,0,0,1,.46-.16.37.37,0,0,1,.22.43l-8,34.73A.36.36,0,0,1,304.11,216.53Z" style="fill:#fafafa"></path>                           <path d="M288.08,205a.36.36,0,0,1-.27-.12.37.37,0,0,1,0-.52l24.06-23.15a.37.37,0,0,1,.52,0,.38.38,0,0,1,0,.53l-24.06,23.14A.36.36,0,0,1,288.08,205Z" style="fill:#fafafa"></path>                           <path d="M312.13,220.72h0a.38.38,0,0,1-.37-.37c0-6.06-6.76-6.47-7.05-6.48a.39.39,0,0,1-.28-.15.36.36,0,0,1-.06-.3,7.19,7.19,0,0,0-2.31-6.81,3.45,3.45,0,0,0-2.66-1,1.85,1.85,0,0,0-1.27.86.37.37,0,0,1-.43.17.37.37,0,0,1-.26-.38c0-.23.41-5.62-4.33-6.15a.38.38,0,0,1-.29-.2.37.37,0,0,1,0-.34s2.1-3.93,1.29-5.86a1.56,1.56,0,0,0-1.07-.92.36.36,0,0,1-.25-.46.38.38,0,0,1,.46-.25,2.27,2.27,0,0,1,1.54,1.35c.77,1.83-.53,4.86-1.09,6,3.68.71,4.36,4.18,4.46,5.9a2.82,2.82,0,0,1,1.1-.47,4,4,0,0,1,3.27,1.21,8,8,0,0,1,2.63,7.12c1.62.21,7.34,1.34,7.33,7.18A.37.37,0,0,1,312.13,220.72Z" style="fill:#fafafa"></path>                           <path d="M312.13,210.74a.37.37,0,0,1-.37-.34c-.16-2.12-1.39-4.86-2.94-5.54a1.73,1.73,0,0,0-1.87.3.38.38,0,0,1-.41,0,.37.37,0,0,1-.19-.36s.33-3.75-1.36-5.3a3,3,0,0,0-2.68-.6.36.36,0,0,1-.35-.12.38.38,0,0,1-.07-.37c.34-.93,1-3.54.11-4.47-.42-.43-1.19-.47-2.3-.11a.37.37,0,0,1-.42-.14.38.38,0,0,1,0-.44c.62-.78,2.15-3.06,1.77-4.15a.92.92,0,0,0-.74-.56.37.37,0,0,1-.27-.45.35.35,0,0,1,.44-.27,1.62,1.62,0,0,1,1.27,1c.41,1.19-.59,3-1.29,4a2.28,2.28,0,0,1,2.06.53c1.1,1.14.57,3.55.24,4.68a3.48,3.48,0,0,1,2.72.85c1.49,1.36,1.65,4,1.63,5.21a2.35,2.35,0,0,1,2,0c1.89.83,3.2,3.78,3.39,6.17a.36.36,0,0,1-.34.39Z" style="fill:#fafafa"></path>                           <g id="freepik--Top--inject-8">                              <path d="M333.67,165.24a3,3,0,0,0-1.76-2.47L272.3,128.35a9.47,9.47,0,0,0-8.55,0l-91.68,52.94a3,3,0,0,0-1.76,2.47v4.63a3,3,0,0,0,1.76,2.47l59.61,34.41a9.41,9.41,0,0,0,8.55,0l91.68-52.93a3,3,0,0,0,1.76-2.47Z" style="fill:#37474f"></path>                              <path d="M231.68,220.64l-59.61-34.41c-2.36-1.37-2.36-3.58,0-4.94l91.68-52.94a9.47,9.47,0,0,1,8.55,0l59.61,34.42c2.37,1.37,2.37,3.57,0,4.94l-91.68,52.93A9.41,9.41,0,0,1,231.68,220.64Z" style="fill:#455a64"></path>                           </g>                           <g id="freepik--Shadows--inject-8">                              <polygon points="320.15 179.12 292.09 213.85 243.98 241.63 243.97 223.11 320.15 179.12" style="opacity:0.1"></polygon>                              <polygon points="316.14 232.36 292.09 264.77 243.98 292.56 243.98 274.03 316.14 232.36" style="opacity:0.1"></polygon>                              <polygon points="316.14 283.29 292.09 315.7 243.98 343.49 243.98 324.96 316.14 283.29" style="opacity:0.1"></polygon>                           </g>                        </g>                     </g>                     <g id="freepik--Box--inject-8">                        <g id="freepik--box--inject-8">                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="opacity:0.5"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="opacity:0.23"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="opacity:0.38"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="opacity:0.4"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="opacity:0.23"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="opacity:0.2"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="opacity:0.30000000000000004"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="opacity:0.1"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="opacity:0.45"></polygon>                           <g style="opacity:0.7000000000000001">                              <path d="M153.74,409.86a.46.46,0,0,1-.46-.45V399.25a.47.47,0,0,1,.46-.46.46.46,0,0,1,.45.46v10.16A.45.45,0,0,1,153.74,409.86Z" style="fill:#fff"></path>                              <path d="M152.41,402.77a.58.58,0,0,1-.18,0,.47.47,0,0,1-.24-.6l1.62-3.73,1.8,2.08a.46.46,0,0,1-.69.6l-.85-1-1,2.4A.47.47,0,0,1,152.41,402.77Z" style="fill:#fff"></path>                              <path d="M157.93,407.47a.46.46,0,0,1-.45-.46V396.86a.45.45,0,1,1,.9,0V407A.46.46,0,0,1,157.93,407.47Z" style="fill:#fff"></path>                              <path d="M156.6,400.38a.58.58,0,0,1-.18,0,.45.45,0,0,1-.23-.6L157.8,396l1.8,2.07a.46.46,0,0,1,0,.64.45.45,0,0,1-.64,0l-.85-1-1,2.4A.46.46,0,0,1,156.6,400.38Z" style="fill:#fff"></path>                           </g>                           <g style="opacity:0.7000000000000001">                              <path d="M141.65,416.75a1,1,0,0,1-.49-.12,1.2,1.2,0,0,1-.55-1.09v-1.25a.46.46,0,0,1,.46-.45.45.45,0,0,1,.45.45v1.25c0,.18,0,.28.09.3s.14,0,.29-.08a2.65,2.65,0,0,0,.85-2.05v-5.2a.45.45,0,1,1,.9,0v5.2a3.44,3.44,0,0,1-1.29,2.83A1.41,1.41,0,0,1,141.65,416.75Z" style="fill:#fff"></path>                              <path d="M136.88,412.56v-.78a12.87,12.87,0,0,1,5.79-10c1.64-.94,3.2-1.08,4.4-.38a4.33,4.33,0,0,1,1.86,4v.26Zm8.51-10.74a4.7,4.7,0,0,0-2.26.7,12,12,0,0,0-5.3,8.45L148,405.09a3.37,3.37,0,0,0-1.41-3A2.38,2.38,0,0,0,145.39,401.82Z" style="fill:#fff"></path>                           </g>                           <polygon points="31.6 297.27 114.67 345.33 132.02 369.3 113.75 346.18 31.6 297.27" style="fill:#fff;opacity:0.7000000000000001"></polygon>                           <polygon points="205.78 326.71 132.02 369.3 132.02 427.03 133.4 370.46 205.78 326.71" style="fill:#fff;opacity:0.7000000000000001"></polygon>                        </g>                     </g>                     <g id="freepik--Moth--inject-8">                        <g id="freepik--moth--inject-8">                           <path d="M97.54,303.62c7.61-1.1,14.56-6,19-12.16a29,29,0,0,0,4.5-9.54,20.43,20.43,0,0,0,.46-9.88c-1.37-5.49-6.45-8.74-11.82-9.42a18,18,0,0,0-8.1.79,13.68,13.68,0,0,0-6.7,5A8.28,8.28,0,0,0,93,272.77a2.5,2.5,0,0,0,2.24,2.55,7.22,7.22,0,0,0,4.57-1.16,14.49,14.49,0,0,0,4.27-3.64,30.56,30.56,0,0,0,5.54-10.5,21.09,21.09,0,0,0,0-10,18.46,18.46,0,0,0-4.53-9.21,16.76,16.76,0,0,0-9.74-4.29,23.72,23.72,0,0,0-10.74,1,11.49,11.49,0,0,0-4.13,2.26c-.86.8-1.84,2.12-1.49,3.42s2.25,1.88,3.54,1.71a9.28,9.28,0,0,0,5-2.71,21.35,21.35,0,0,0,3.77-5,8.78,8.78,0,0,0,1.13-4.34c-.13-6.34-7.14-10.44-12.63-11.6a16.25,16.25,0,0,0-4.51-.3c-.51,0-.2.84.21.81A16.48,16.48,0,0,1,84,223.69a14.22,14.22,0,0,1,6.21,5.53,7.61,7.61,0,0,1-.24,7.74,20.53,20.53,0,0,1-3.62,4.62c-1.19,1.08-3,2.33-4.67,2.21a1.47,1.47,0,0,1-1.32-.83,2.13,2.13,0,0,1,.59-1.82A8.37,8.37,0,0,1,84.14,239a21,21,0,0,1,9.49-1.56,17,17,0,0,1,9.34,3,14.69,14.69,0,0,1,4.86,7.71,22.64,22.64,0,0,1,.88,9.5,24.35,24.35,0,0,1-3.63,9c-1.85,3.06-4.17,6-7.65,7.2-.86.31-2.66.76-3-.49s.64-2.79,1.27-3.76a12.72,12.72,0,0,1,5.82-4.91,16.07,16.07,0,0,1,7.29-1.1c4.71.35,9.49,2.81,11.13,7.49a17,17,0,0,1,.26,8.6,27.64,27.64,0,0,1-3.31,8.84A31.58,31.58,0,0,1,102,301.51c-1.48.64-3,1.18-4.55,1.68-.16.06-.09.46.09.43Z" style="fill:#e0e0e0"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#2F80EC"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#fff;opacity:0.65"></path>                           <path d="M69.47,218.5a8,8,0,0,0-.7-.61c-.35-.27-.72-.53-1.07-.79a9.12,9.12,0,0,0-1.07-.67,6.65,6.65,0,0,0-.66-.32,1.83,1.83,0,0,0-1-.16.5.5,0,0,0-.4.78,2.5,2.5,0,0,0,1,.66l.54.29c.37.22.7.47,1,.72s.7.49,1,.74a6.53,6.53,0,0,0,1.71,1,.19.19,0,0,0,.18,0C70.51,219.74,69.76,218.79,69.47,218.5Z" style="fill:#455a64"></path>                        </g>                     </g>                  </svg>                  <br>                  <p><strong>Your adventure starts here...</strong><br><button class="newhousebtn" style="margin-top: 10px; display: inline-block;"> Create a house?</button> </p>                  <br>                  <br>               </div>`
			}
			loadTooltips()
			newHouseListener()
			newRoomListener()
			houseClickListener()
			roomListener()
		} else {
			console.log(`[Refrsh]: getting roomss in house "${target}"`)
			const unsub = onSnapshot(doc(db, "houses", `${JSON.parse(target)[0]}`), (doc) => {
				let data = doc.data()
				console.log('[Refrsh]: got data: ', data)

				if (doc.exists()) {
					data = doc.data().roomss
					if (doc.data().roomss.length > 0) {
						console.log(`[Refrsh]: There are Roomss found in said house 🎉`)

						list.innerHTML = ''
						data.forEach(element => {
							var name = element.name.replaceAll("\\", "");
							let logo = '';
							if (element.icon) {
								logo = "<img src='" + element.icon + "' class='rounded-full h-60 w-60 inline-block transition-colors transition-transform ease duration-250'/>";
							} else {
								if (element.id.startsWith('text/')) {
									logo = "<i class=\"fi fi-rr-comments text-6xl \" ></i>";
								} else if (element.id.startsWith('video/')) {
									logo = "<i class=\"fi fi-rr-video-camera-alt text-6xl \"></i>";
								} else if (element.id.startsWith('todo/')) {
									logo = "<i class=\"fi fi-sr-list-check text-6xl\"></i>";
								} else if (element.id.startsWith('doc/')) {
									logo = "<i class=\"fi fi-rr-document text-6xl\"></i>";
								} else {
									logo = "<i class=\"fi fi-rr-question-square text-6xl\"></i>";
								}
							}
							list.innerHTML += `<div class="card cursor-pointer select-none bg-dark-darker transition duration-200 ease hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg  room text-center bg-center bg-no-repeat bg-cover rounded-md flex items-center justify-center" data-room="true" data-type="tooltip" data-tooltip="${name}"  data-name="${element.name}" data-id="${element.id}" >
	   										   		<div class="h-full w-full rounded-md text-center bg-black-low-opacity backdrop-blur-sm">
			   								   			<div class="logo left-px p-1 left-1 mt-4 mb-1">${logo}</div>
															<div class="content p-16"><div class="title text-xl">${name}</div>
			  											</div>
			   										</div>
												</div>`



						});
						list.innerHTML += `<div class="card newroombtn thiscardisnotanormalone cursor-pointer select-none bg-dark-darker transition duration-200 ease hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg  text-center bg-center bg-splash-1 bg-no-repeat bg-cover rounded-md flex items-center justify-center">
	  											<div class="h-full w-full rounded-md text-center bg-black-low-opacity backdrop-blur-sm">
			  										<div class="logo left-px p-1 left-1 mt-8 mb-1">
			   											<i class="fi fi-sr-plus text-6xl"></i>
				 									</div>
			  										<div class="content p-16">
			  											<div class="title text-xl">Create a room?</div>
			  										</div>
			  									</div>
			  								</div>`
						loadTooltips()
						newHouseListener()
						newRoomListener(target)
						houseClickListener()
						roomListener()
						hide('.tooltip')
						document.querySelector('.welcome-heading').style.display = 'none';
						document.querySelector('.goback').style.display = 'block';
						document.querySelector('.goback').setAttribute('action', `'refrsh("houses")'`);

					} else {
						console.log(`[Refrsh]: There are *no* Roomss found in said house, displaying temp`)

						list.innerHTML = `<div class="temp">                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="31.6 127.33 302.09 299.7">                     <g id="freepik--Bookshelf--inject-8">                        <g id="freepik--bookshelf--inject-8">                           <path d="M319.9,165.09,264.29,133a3,3,0,0,0-3-.29l-4,2.31a3,3,0,0,0-1.27,2.77V290a9.45,9.45,0,0,0,4.28,7.4l55.6,32.05a3,3,0,0,0,3,.3l4-2.32a3,3,0,0,0,1.25-2.76V172.49A9.44,9.44,0,0,0,319.9,165.09Z" style="fill:#263238"></path>                           <path d="M268,292.61l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.8,3.8,0,0,0,1.47-1.79l3.61-10.4Z" style="fill:#263238"></path>                           <path d="M264,307.58a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55L272,299.55l-8-4.63Z" style="fill:#37474f"></path>                           <path d="M308.12,315.7l-4,2.32v12.65a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.8,3.8,0,0,0,1.47-1.79l3.6-10.41Z" style="fill:#263238"></path>                           <path d="M304.12,330.67a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                           <path d="M260.56,135.43l55.6,32a9.47,9.47,0,0,1,4.28,7.41V327.05a2.61,2.61,0,0,1-4.28,2.47l-55.6-32.06a9.44,9.44,0,0,1-4.27-7.4V137.89a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                           <g id="freepik--Bottom--inject-8">                              <polygon points="179.82 343.48 239.96 378.2 324.16 329.59 320.15 327.27 260.01 292.55 179.82 338.85 179.82 343.48" style="fill:#455a64"></polygon>                              <polygon points="239.96 378.2 239.96 373.57 324.16 324.96 324.16 329.59 239.96 378.2" style="fill:#263238"></polygon>                           </g>                           <path d="M240.34,371.46l-.61-.41C250.4,354.9,250.33,327,249.46,320c-.07-.47-.12-.76-.13-.87l.73-.12c0,.22.08.48.12.79.78,4.95,5.19,31.84,10.41,40l-.62.4c-4.13-6.41-7.66-23.71-9.43-33.69C250.65,337.84,249,358.43,240.34,371.46Z" style="fill:#fafafa"></path>                           <path d="M275.46,346.8c-.91-.27-22.17-6.71-24.13-16.09l.73-.15c1.86,8.95,23.39,15.47,23.61,15.54Z" style="fill:#fafafa"></path>                           <path d="M254,343l-.54-2.29a1.89,1.89,0,0,0-1.76-1.56,1.74,1.74,0,0,0-1.78.89l-.69-.29a2.48,2.48,0,0,1,2.53-1.34,2.6,2.6,0,0,1,1.89,1A3.68,3.68,0,0,1,255,337a1.85,1.85,0,0,1,1.82.06l-.33.66a1.16,1.16,0,0,0-1.13-.07c-.85.48-1.18,2.33-1.23,3Z" style="fill:#fafafa"></path>                           <path d="M256.09,350.63l-.66-2.08c-.75-2.35-2-3.7-3.48-3.79a3.18,3.18,0,0,0-2.95,1.85l-.67-.32A3.89,3.89,0,0,1,252,344c.89.05,2.42.53,3.56,2.85.25-1.83,1-4.77,2.93-6a4.6,4.6,0,0,1,4.51.05l-.31.67a3.89,3.89,0,0,0-3.8-.09c-2.57,1.6-2.74,6.89-2.74,6.95Z" style="fill:#fafafa"></path>                           <path d="M247.06,355.71l-.66-.34c1.48-2.85,4.73-4.9,7.55-4.76a4,4,0,0,1,3.1,1.53,10.85,10.85,0,0,1,4.74-7.08,9.21,9.21,0,0,1,9-.67l-.29.67a8.53,8.53,0,0,0-8.28.62,9.91,9.91,0,0,0-4.5,7.68l0,1.89-.7-1.76a3.28,3.28,0,0,0-3.06-2.14C251.37,351.22,248.42,353.1,247.06,355.71Z" style="fill:#fafafa"></path>                           <path d="M243,366.75l-.65-.36c.9-1.64,5.69-9.88,11.36-11.37a5.89,5.89,0,0,1,4.78.69l-.38.63a5.22,5.22,0,0,0-4.21-.61C249.74,356.83,245.44,362.35,243,366.75Z" style="fill:#fafafa"></path>                           <polygon points="316.14 278.66 316.14 283.29 239.96 327.27 179.82 292.55 179.82 287.92 256 243.94 316.14 278.66" style="fill:#263238"></polygon>                           <polygon points="316.14 278.66 239.96 322.64 179.82 287.92 256 243.94 316.14 278.66" style="fill:#455a64"></polygon>                           <polygon points="316.14 227.74 316.14 232.36 239.96 276.35 179.82 241.62 179.82 237 256 193.01 316.14 227.74" style="fill:#263238"></polygon>                           <polygon points="316.14 227.74 239.96 271.72 179.82 237 256 193.01 316.14 227.74" style="fill:#455a64"></polygon>                           <g id="freepik--Side--inject-8">                              <path d="M239.7,211.33l-55.6-32.05a3,3,0,0,0-3-.3c-.72.41-3.28,1.9-4,2.31a3,3,0,0,0-1.26,2.77V336.23a9.45,9.45,0,0,0,4.28,7.4l55.6,32.06a3,3,0,0,0,3,.3c.72-.42,3.3-1.9,4-2.33A3,3,0,0,0,244,370.9V218.74A9.45,9.45,0,0,0,239.7,211.33Z" style="fill:#263238"></path>                              <polygon points="239.96 234.69 243.98 232.37 243.98 218.47 239.95 220.79 239.96 234.69" style="opacity:0.2"></polygon>                              <polygon points="320.16 188.39 324.18 186.08 324.18 172.18 320.15 174.5 320.16 188.39" style="opacity:0.2"></polygon>                              <path d="M187.84,338.85l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.82,3.82,0,0,0,1.47-1.78l3.61-10.41Z" style="fill:#263238"></path>                              <path d="M183.83,353.82a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M227.93,362l-4,2.31v12.66a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.88,3.88,0,0,0,1.47-1.78l3.6-10.41Z" style="fill:#263238"></path>                              <path d="M223.93,376.92a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a1,1,0,0,0,1.47-.55l3.6-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M180.08,181.6l55.61,32.05a9.46,9.46,0,0,1,4.27,7.41V378.2s-3.09-1.83-4.27-2.51l-55.6-32.06a9.45,9.45,0,0,1-4.28-7.4V184.06a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                              <path d="M235.69,213.65,180.08,181.6a2.6,2.6,0,0,0-4.27,2.46v13.59l64.15,37V221.06A9.46,9.46,0,0,0,235.69,213.65Z" style="opacity:0.2"></path>                           </g>                           <path d="M312.13,228.11a.38.38,0,0,1-.37-.37V182.08l-43.55,25.14a.35.35,0,0,1-.5-.13.37.37,0,0,1,.13-.51L312,181.12a.35.35,0,0,1,.37,0,.37.37,0,0,1,.18.32v46.3A.37.37,0,0,1,312.13,228.11Z" style="fill:#fafafa"></path>                           <path d="M304.11,216.53H304a.37.37,0,0,1-.28-.44l7.46-32.31-14.8,25.63a.36.36,0,0,1-.5.14.37.37,0,0,1-.14-.51l16-27.78a.38.38,0,0,1,.46-.16.37.37,0,0,1,.22.43l-8,34.73A.36.36,0,0,1,304.11,216.53Z" style="fill:#fafafa"></path>                           <path d="M288.08,205a.36.36,0,0,1-.27-.12.37.37,0,0,1,0-.52l24.06-23.15a.37.37,0,0,1,.52,0,.38.38,0,0,1,0,.53l-24.06,23.14A.36.36,0,0,1,288.08,205Z" style="fill:#fafafa"></path>                           <path d="M312.13,220.72h0a.38.38,0,0,1-.37-.37c0-6.06-6.76-6.47-7.05-6.48a.39.39,0,0,1-.28-.15.36.36,0,0,1-.06-.3,7.19,7.19,0,0,0-2.31-6.81,3.45,3.45,0,0,0-2.66-1,1.85,1.85,0,0,0-1.27.86.37.37,0,0,1-.43.17.37.37,0,0,1-.26-.38c0-.23.41-5.62-4.33-6.15a.38.38,0,0,1-.29-.2.37.37,0,0,1,0-.34s2.1-3.93,1.29-5.86a1.56,1.56,0,0,0-1.07-.92.36.36,0,0,1-.25-.46.38.38,0,0,1,.46-.25,2.27,2.27,0,0,1,1.54,1.35c.77,1.83-.53,4.86-1.09,6,3.68.71,4.36,4.18,4.46,5.9a2.82,2.82,0,0,1,1.1-.47,4,4,0,0,1,3.27,1.21,8,8,0,0,1,2.63,7.12c1.62.21,7.34,1.34,7.33,7.18A.37.37,0,0,1,312.13,220.72Z" style="fill:#fafafa"></path>                           <path d="M312.13,210.74a.37.37,0,0,1-.37-.34c-.16-2.12-1.39-4.86-2.94-5.54a1.73,1.73,0,0,0-1.87.3.38.38,0,0,1-.41,0,.37.37,0,0,1-.19-.36s.33-3.75-1.36-5.3a3,3,0,0,0-2.68-.6.36.36,0,0,1-.35-.12.38.38,0,0,1-.07-.37c.34-.93,1-3.54.11-4.47-.42-.43-1.19-.47-2.3-.11a.37.37,0,0,1-.42-.14.38.38,0,0,1,0-.44c.62-.78,2.15-3.06,1.77-4.15a.92.92,0,0,0-.74-.56.37.37,0,0,1-.27-.45.35.35,0,0,1,.44-.27,1.62,1.62,0,0,1,1.27,1c.41,1.19-.59,3-1.29,4a2.28,2.28,0,0,1,2.06.53c1.1,1.14.57,3.55.24,4.68a3.48,3.48,0,0,1,2.72.85c1.49,1.36,1.65,4,1.63,5.21a2.35,2.35,0,0,1,2,0c1.89.83,3.2,3.78,3.39,6.17a.36.36,0,0,1-.34.39Z" style="fill:#fafafa"></path>                           <g id="freepik--Top--inject-8">                              <path d="M333.67,165.24a3,3,0,0,0-1.76-2.47L272.3,128.35a9.47,9.47,0,0,0-8.55,0l-91.68,52.94a3,3,0,0,0-1.76,2.47v4.63a3,3,0,0,0,1.76,2.47l59.61,34.41a9.41,9.41,0,0,0,8.55,0l91.68-52.93a3,3,0,0,0,1.76-2.47Z" style="fill:#37474f"></path>                              <path d="M231.68,220.64l-59.61-34.41c-2.36-1.37-2.36-3.58,0-4.94l91.68-52.94a9.47,9.47,0,0,1,8.55,0l59.61,34.42c2.37,1.37,2.37,3.57,0,4.94l-91.68,52.93A9.41,9.41,0,0,1,231.68,220.64Z" style="fill:#455a64"></path>                           </g>                           <g id="freepik--Shadows--inject-8">                              <polygon points="320.15 179.12 292.09 213.85 243.98 241.63 243.97 223.11 320.15 179.12" style="opacity:0.1"></polygon>                              <polygon points="316.14 232.36 292.09 264.77 243.98 292.56 243.98 274.03 316.14 232.36" style="opacity:0.1"></polygon>                              <polygon points="316.14 283.29 292.09 315.7 243.98 343.49 243.98 324.96 316.14 283.29" style="opacity:0.1"></polygon>                           </g>                        </g>                     </g>                     <g id="freepik--Box--inject-8">                        <g id="freepik--box--inject-8">                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="opacity:0.5"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="opacity:0.23"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="opacity:0.38"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="opacity:0.4"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="opacity:0.23"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="opacity:0.2"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="opacity:0.30000000000000004"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="opacity:0.1"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="opacity:0.45"></polygon>                           <g style="opacity:0.7000000000000001">                              <path d="M153.74,409.86a.46.46,0,0,1-.46-.45V399.25a.47.47,0,0,1,.46-.46.46.46,0,0,1,.45.46v10.16A.45.45,0,0,1,153.74,409.86Z" style="fill:#fff"></path>                              <path d="M152.41,402.77a.58.58,0,0,1-.18,0,.47.47,0,0,1-.24-.6l1.62-3.73,1.8,2.08a.46.46,0,0,1-.69.6l-.85-1-1,2.4A.47.47,0,0,1,152.41,402.77Z" style="fill:#fff"></path>                              <path d="M157.93,407.47a.46.46,0,0,1-.45-.46V396.86a.45.45,0,1,1,.9,0V407A.46.46,0,0,1,157.93,407.47Z" style="fill:#fff"></path>                              <path d="M156.6,400.38a.58.58,0,0,1-.18,0,.45.45,0,0,1-.23-.6L157.8,396l1.8,2.07a.46.46,0,0,1,0,.64.45.45,0,0,1-.64,0l-.85-1-1,2.4A.46.46,0,0,1,156.6,400.38Z" style="fill:#fff"></path>                           </g>                           <g style="opacity:0.7000000000000001">                              <path d="M141.65,416.75a1,1,0,0,1-.49-.12,1.2,1.2,0,0,1-.55-1.09v-1.25a.46.46,0,0,1,.46-.45.45.45,0,0,1,.45.45v1.25c0,.18,0,.28.09.3s.14,0,.29-.08a2.65,2.65,0,0,0,.85-2.05v-5.2a.45.45,0,1,1,.9,0v5.2a3.44,3.44,0,0,1-1.29,2.83A1.41,1.41,0,0,1,141.65,416.75Z" style="fill:#fff"></path>                              <path d="M136.88,412.56v-.78a12.87,12.87,0,0,1,5.79-10c1.64-.94,3.2-1.08,4.4-.38a4.33,4.33,0,0,1,1.86,4v.26Zm8.51-10.74a4.7,4.7,0,0,0-2.26.7,12,12,0,0,0-5.3,8.45L148,405.09a3.37,3.37,0,0,0-1.41-3A2.38,2.38,0,0,0,145.39,401.82Z" style="fill:#fff"></path>                           </g>                           <polygon points="31.6 297.27 114.67 345.33 132.02 369.3 113.75 346.18 31.6 297.27" style="fill:#fff;opacity:0.7000000000000001"></polygon>                           <polygon points="205.78 326.71 132.02 369.3 132.02 427.03 133.4 370.46 205.78 326.71" style="fill:#fff;opacity:0.7000000000000001"></polygon>                        </g>                     </g>                     <g id="freepik--Moth--inject-8">                        <g id="freepik--moth--inject-8">                           <path d="M97.54,303.62c7.61-1.1,14.56-6,19-12.16a29,29,0,0,0,4.5-9.54,20.43,20.43,0,0,0,.46-9.88c-1.37-5.49-6.45-8.74-11.82-9.42a18,18,0,0,0-8.1.79,13.68,13.68,0,0,0-6.7,5A8.28,8.28,0,0,0,93,272.77a2.5,2.5,0,0,0,2.24,2.55,7.22,7.22,0,0,0,4.57-1.16,14.49,14.49,0,0,0,4.27-3.64,30.56,30.56,0,0,0,5.54-10.5,21.09,21.09,0,0,0,0-10,18.46,18.46,0,0,0-4.53-9.21,16.76,16.76,0,0,0-9.74-4.29,23.72,23.72,0,0,0-10.74,1,11.49,11.49,0,0,0-4.13,2.26c-.86.8-1.84,2.12-1.49,3.42s2.25,1.88,3.54,1.71a9.28,9.28,0,0,0,5-2.71,21.35,21.35,0,0,0,3.77-5,8.78,8.78,0,0,0,1.13-4.34c-.13-6.34-7.14-10.44-12.63-11.6a16.25,16.25,0,0,0-4.51-.3c-.51,0-.2.84.21.81A16.48,16.48,0,0,1,84,223.69a14.22,14.22,0,0,1,6.21,5.53,7.61,7.61,0,0,1-.24,7.74,20.53,20.53,0,0,1-3.62,4.62c-1.19,1.08-3,2.33-4.67,2.21a1.47,1.47,0,0,1-1.32-.83,2.13,2.13,0,0,1,.59-1.82A8.37,8.37,0,0,1,84.14,239a21,21,0,0,1,9.49-1.56,17,17,0,0,1,9.34,3,14.69,14.69,0,0,1,4.86,7.71,22.64,22.64,0,0,1,.88,9.5,24.35,24.35,0,0,1-3.63,9c-1.85,3.06-4.17,6-7.65,7.2-.86.31-2.66.76-3-.49s.64-2.79,1.27-3.76a12.72,12.72,0,0,1,5.82-4.91,16.07,16.07,0,0,1,7.29-1.1c4.71.35,9.49,2.81,11.13,7.49a17,17,0,0,1,.26,8.6,27.64,27.64,0,0,1-3.31,8.84A31.58,31.58,0,0,1,102,301.51c-1.48.64-3,1.18-4.55,1.68-.16.06-.09.46.09.43Z" style="fill:#e0e0e0"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#2F80EC"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#fff;opacity:0.65"></path>                           <path d="M69.47,218.5a8,8,0,0,0-.7-.61c-.35-.27-.72-.53-1.07-.79a9.12,9.12,0,0,0-1.07-.67,6.65,6.65,0,0,0-.66-.32,1.83,1.83,0,0,0-1-.16.5.5,0,0,0-.4.78,2.5,2.5,0,0,0,1,.66l.54.29c.37.22.7.47,1,.72s.7.49,1,.74a6.53,6.53,0,0,0,1.71,1,.19.19,0,0,0,.18,0C70.51,219.74,69.76,218.79,69.47,218.5Z" style="fill:#455a64"></path>                        </g>                     </g>                  </svg>                  <br>                  <p><strong>This house is a little empty...</strong><br><button class="newroombtn" style="margin-top: 10px; display: inline-block;"> Create a room?</button> </p>                  <br>                  <br>               </div>`
						loadTooltips()
						newHouseListener()
						newRoomListener(target)
						houseClickListener()
						roomListener()

						hide('.tooltip')
						document.querySelector('.welcome-heading').style.display = 'none';
						document.querySelector('.goback').style.display = 'block';
						document.querySelector('.goback').setAttribute('action', `'refrsh("houses")'`);

					}

				} else {
					console.log(`[Refrsh]: There are *no* Roomss found in said house, displaying temp`)

					list.innerHTML = `<div class="temp">                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="31.6 127.33 302.09 299.7">                     <g id="freepik--Bookshelf--inject-8">                        <g id="freepik--bookshelf--inject-8">                           <path d="M319.9,165.09,264.29,133a3,3,0,0,0-3-.29l-4,2.31a3,3,0,0,0-1.27,2.77V290a9.45,9.45,0,0,0,4.28,7.4l55.6,32.05a3,3,0,0,0,3,.3l4-2.32a3,3,0,0,0,1.25-2.76V172.49A9.44,9.44,0,0,0,319.9,165.09Z" style="fill:#263238"></path>                           <path d="M268,292.61l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.8,3.8,0,0,0,1.47-1.79l3.61-10.4Z" style="fill:#263238"></path>                           <path d="M264,307.58a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55L272,299.55l-8-4.63Z" style="fill:#37474f"></path>                           <path d="M308.12,315.7l-4,2.32v12.65a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.8,3.8,0,0,0,1.47-1.79l3.6-10.41Z" style="fill:#263238"></path>                           <path d="M304.12,330.67a2.37,2.37,0,0,0,1.06,1.86l1.88,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                           <path d="M260.56,135.43l55.6,32a9.47,9.47,0,0,1,4.28,7.41V327.05a2.61,2.61,0,0,1-4.28,2.47l-55.6-32.06a9.44,9.44,0,0,1-4.27-7.4V137.89a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                           <g id="freepik--Bottom--inject-8">                              <polygon points="179.82 343.48 239.96 378.2 324.16 329.59 320.15 327.27 260.01 292.55 179.82 338.85 179.82 343.48" style="fill:#455a64"></polygon>                              <polygon points="239.96 378.2 239.96 373.57 324.16 324.96 324.16 329.59 239.96 378.2" style="fill:#263238"></polygon>                           </g>                           <path d="M240.34,371.46l-.61-.41C250.4,354.9,250.33,327,249.46,320c-.07-.47-.12-.76-.13-.87l.73-.12c0,.22.08.48.12.79.78,4.95,5.19,31.84,10.41,40l-.62.4c-4.13-6.41-7.66-23.71-9.43-33.69C250.65,337.84,249,358.43,240.34,371.46Z" style="fill:#fafafa"></path>                           <path d="M275.46,346.8c-.91-.27-22.17-6.71-24.13-16.09l.73-.15c1.86,8.95,23.39,15.47,23.61,15.54Z" style="fill:#fafafa"></path>                           <path d="M254,343l-.54-2.29a1.89,1.89,0,0,0-1.76-1.56,1.74,1.74,0,0,0-1.78.89l-.69-.29a2.48,2.48,0,0,1,2.53-1.34,2.6,2.6,0,0,1,1.89,1A3.68,3.68,0,0,1,255,337a1.85,1.85,0,0,1,1.82.06l-.33.66a1.16,1.16,0,0,0-1.13-.07c-.85.48-1.18,2.33-1.23,3Z" style="fill:#fafafa"></path>                           <path d="M256.09,350.63l-.66-2.08c-.75-2.35-2-3.7-3.48-3.79a3.18,3.18,0,0,0-2.95,1.85l-.67-.32A3.89,3.89,0,0,1,252,344c.89.05,2.42.53,3.56,2.85.25-1.83,1-4.77,2.93-6a4.6,4.6,0,0,1,4.51.05l-.31.67a3.89,3.89,0,0,0-3.8-.09c-2.57,1.6-2.74,6.89-2.74,6.95Z" style="fill:#fafafa"></path>                           <path d="M247.06,355.71l-.66-.34c1.48-2.85,4.73-4.9,7.55-4.76a4,4,0,0,1,3.1,1.53,10.85,10.85,0,0,1,4.74-7.08,9.21,9.21,0,0,1,9-.67l-.29.67a8.53,8.53,0,0,0-8.28.62,9.91,9.91,0,0,0-4.5,7.68l0,1.89-.7-1.76a3.28,3.28,0,0,0-3.06-2.14C251.37,351.22,248.42,353.1,247.06,355.71Z" style="fill:#fafafa"></path>                           <path d="M243,366.75l-.65-.36c.9-1.64,5.69-9.88,11.36-11.37a5.89,5.89,0,0,1,4.78.69l-.38.63a5.22,5.22,0,0,0-4.21-.61C249.74,356.83,245.44,362.35,243,366.75Z" style="fill:#fafafa"></path>                           <polygon points="316.14 278.66 316.14 283.29 239.96 327.27 179.82 292.55 179.82 287.92 256 243.94 316.14 278.66" style="fill:#263238"></polygon>                           <polygon points="316.14 278.66 239.96 322.64 179.82 287.92 256 243.94 316.14 278.66" style="fill:#455a64"></polygon>                           <polygon points="316.14 227.74 316.14 232.36 239.96 276.35 179.82 241.62 179.82 237 256 193.01 316.14 227.74" style="fill:#263238"></polygon>                           <polygon points="316.14 227.74 239.96 271.72 179.82 237 256 193.01 316.14 227.74" style="fill:#455a64"></polygon>                           <g id="freepik--Side--inject-8">                              <path d="M239.7,211.33l-55.6-32.05a3,3,0,0,0-3-.3c-.72.41-3.28,1.9-4,2.31a3,3,0,0,0-1.26,2.77V336.23a9.45,9.45,0,0,0,4.28,7.4l55.6,32.06a3,3,0,0,0,3,.3c.72-.42,3.3-1.9,4-2.33A3,3,0,0,0,244,370.9V218.74A9.45,9.45,0,0,0,239.7,211.33Z" style="fill:#263238"></path>                              <polygon points="239.96 234.69 243.98 232.37 243.98 218.47 239.95 220.79 239.96 234.69" style="opacity:0.2"></polygon>                              <polygon points="320.16 188.39 324.18 186.08 324.18 172.18 320.15 174.5 320.16 188.39" style="opacity:0.2"></polygon>                              <path d="M187.84,338.85l-4,2.31v12.66a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a2.37,2.37,0,0,0,2.14,0l1.87-1.08a3.82,3.82,0,0,0,1.47-1.78l3.61-10.41Z" style="fill:#263238"></path>                              <path d="M183.83,353.82a2.36,2.36,0,0,0,1.07,1.85l1.87,1.08a1,1,0,0,0,1.47-.55l3.61-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M227.93,362l-4,2.31v12.66a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a2.35,2.35,0,0,0,2.13,0l1.88-1.08a3.88,3.88,0,0,0,1.47-1.78l3.6-10.41Z" style="fill:#263238"></path>                              <path d="M223.93,376.92a2.35,2.35,0,0,0,1.06,1.85l1.88,1.08a1,1,0,0,0,1.47-.55l3.6-10.41-8-4.63Z" style="fill:#37474f"></path>                              <path d="M180.08,181.6l55.61,32.05a9.46,9.46,0,0,1,4.27,7.41V378.2s-3.09-1.83-4.27-2.51l-55.6-32.06a9.45,9.45,0,0,1-4.28-7.4V184.06a2.6,2.6,0,0,1,4.27-2.46Z" style="fill:#37474f"></path>                              <path d="M235.69,213.65,180.08,181.6a2.6,2.6,0,0,0-4.27,2.46v13.59l64.15,37V221.06A9.46,9.46,0,0,0,235.69,213.65Z" style="opacity:0.2"></path>                           </g>                           <path d="M312.13,228.11a.38.38,0,0,1-.37-.37V182.08l-43.55,25.14a.35.35,0,0,1-.5-.13.37.37,0,0,1,.13-.51L312,181.12a.35.35,0,0,1,.37,0,.37.37,0,0,1,.18.32v46.3A.37.37,0,0,1,312.13,228.11Z" style="fill:#fafafa"></path>                           <path d="M304.11,216.53H304a.37.37,0,0,1-.28-.44l7.46-32.31-14.8,25.63a.36.36,0,0,1-.5.14.37.37,0,0,1-.14-.51l16-27.78a.38.38,0,0,1,.46-.16.37.37,0,0,1,.22.43l-8,34.73A.36.36,0,0,1,304.11,216.53Z" style="fill:#fafafa"></path>                           <path d="M288.08,205a.36.36,0,0,1-.27-.12.37.37,0,0,1,0-.52l24.06-23.15a.37.37,0,0,1,.52,0,.38.38,0,0,1,0,.53l-24.06,23.14A.36.36,0,0,1,288.08,205Z" style="fill:#fafafa"></path>                           <path d="M312.13,220.72h0a.38.38,0,0,1-.37-.37c0-6.06-6.76-6.47-7.05-6.48a.39.39,0,0,1-.28-.15.36.36,0,0,1-.06-.3,7.19,7.19,0,0,0-2.31-6.81,3.45,3.45,0,0,0-2.66-1,1.85,1.85,0,0,0-1.27.86.37.37,0,0,1-.43.17.37.37,0,0,1-.26-.38c0-.23.41-5.62-4.33-6.15a.38.38,0,0,1-.29-.2.37.37,0,0,1,0-.34s2.1-3.93,1.29-5.86a1.56,1.56,0,0,0-1.07-.92.36.36,0,0,1-.25-.46.38.38,0,0,1,.46-.25,2.27,2.27,0,0,1,1.54,1.35c.77,1.83-.53,4.86-1.09,6,3.68.71,4.36,4.18,4.46,5.9a2.82,2.82,0,0,1,1.1-.47,4,4,0,0,1,3.27,1.21,8,8,0,0,1,2.63,7.12c1.62.21,7.34,1.34,7.33,7.18A.37.37,0,0,1,312.13,220.72Z" style="fill:#fafafa"></path>                           <path d="M312.13,210.74a.37.37,0,0,1-.37-.34c-.16-2.12-1.39-4.86-2.94-5.54a1.73,1.73,0,0,0-1.87.3.38.38,0,0,1-.41,0,.37.37,0,0,1-.19-.36s.33-3.75-1.36-5.3a3,3,0,0,0-2.68-.6.36.36,0,0,1-.35-.12.38.38,0,0,1-.07-.37c.34-.93,1-3.54.11-4.47-.42-.43-1.19-.47-2.3-.11a.37.37,0,0,1-.42-.14.38.38,0,0,1,0-.44c.62-.78,2.15-3.06,1.77-4.15a.92.92,0,0,0-.74-.56.37.37,0,0,1-.27-.45.35.35,0,0,1,.44-.27,1.62,1.62,0,0,1,1.27,1c.41,1.19-.59,3-1.29,4a2.28,2.28,0,0,1,2.06.53c1.1,1.14.57,3.55.24,4.68a3.48,3.48,0,0,1,2.72.85c1.49,1.36,1.65,4,1.63,5.21a2.35,2.35,0,0,1,2,0c1.89.83,3.2,3.78,3.39,6.17a.36.36,0,0,1-.34.39Z" style="fill:#fafafa"></path>                           <g id="freepik--Top--inject-8">                              <path d="M333.67,165.24a3,3,0,0,0-1.76-2.47L272.3,128.35a9.47,9.47,0,0,0-8.55,0l-91.68,52.94a3,3,0,0,0-1.76,2.47v4.63a3,3,0,0,0,1.76,2.47l59.61,34.41a9.41,9.41,0,0,0,8.55,0l91.68-52.93a3,3,0,0,0,1.76-2.47Z" style="fill:#37474f"></path>                              <path d="M231.68,220.64l-59.61-34.41c-2.36-1.37-2.36-3.58,0-4.94l91.68-52.94a9.47,9.47,0,0,1,8.55,0l59.61,34.42c2.37,1.37,2.37,3.57,0,4.94l-91.68,52.93A9.41,9.41,0,0,1,231.68,220.64Z" style="fill:#455a64"></path>                           </g>                           <g id="freepik--Shadows--inject-8">                              <polygon points="320.15 179.12 292.09 213.85 243.98 241.63 243.97 223.11 320.15 179.12" style="opacity:0.1"></polygon>                              <polygon points="316.14 232.36 292.09 264.77 243.98 292.56 243.98 274.03 316.14 232.36" style="opacity:0.1"></polygon>                              <polygon points="316.14 283.29 292.09 315.7 243.98 343.49 243.98 324.96 316.14 283.29" style="opacity:0.1"></polygon>                           </g>                        </g>                     </g>                     <g id="freepik--Box--inject-8">                        <g id="freepik--box--inject-8">                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 132.02 427.03 48.96 378.96 122.72 336.38 205.78 384.44" style="opacity:0.5"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.72 336.38 48.96 378.96 48.96 321.24 122.72 278.65" style="opacity:0.23"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 132.02 427.03 48.96 378.96 48.96 321.24 132.02 369.3" style="opacity:0.38"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 326.71 205.78 384.44 122.72 336.38 122.72 278.65 205.78 326.71" style="opacity:0.4"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="fill:#2F80EC"></polygon>                           <polygon points="205.78 384.44 205.78 326.71 132.02 369.3 132.02 427.03 205.78 384.44" style="opacity:0.23"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="fill:#2F80EC"></polygon>                           <polygon points="122.72 278.65 122.82 246.69 205.68 294.81 205.78 326.71 122.72 278.65" style="opacity:0.2"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="fill:#2F80EC"></polygon>                           <polygon points="132.02 369.3 138.94 341.34 212.03 299.14 205.78 326.71 132.02 369.3" style="opacity:0.30000000000000004"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 40.16 292.24 113.92 249.66 122.72 278.65 48.96 321.24" style="opacity:0.1"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="fill:#2F80EC"></polygon>                           <polygon points="48.96 321.24 31.6 297.27 114.67 345.33 132.02 369.3 48.96 321.24" style="opacity:0.45"></polygon>                           <g style="opacity:0.7000000000000001">                              <path d="M153.74,409.86a.46.46,0,0,1-.46-.45V399.25a.47.47,0,0,1,.46-.46.46.46,0,0,1,.45.46v10.16A.45.45,0,0,1,153.74,409.86Z" style="fill:#fff"></path>                              <path d="M152.41,402.77a.58.58,0,0,1-.18,0,.47.47,0,0,1-.24-.6l1.62-3.73,1.8,2.08a.46.46,0,0,1-.69.6l-.85-1-1,2.4A.47.47,0,0,1,152.41,402.77Z" style="fill:#fff"></path>                              <path d="M157.93,407.47a.46.46,0,0,1-.45-.46V396.86a.45.45,0,1,1,.9,0V407A.46.46,0,0,1,157.93,407.47Z" style="fill:#fff"></path>                              <path d="M156.6,400.38a.58.58,0,0,1-.18,0,.45.45,0,0,1-.23-.6L157.8,396l1.8,2.07a.46.46,0,0,1,0,.64.45.45,0,0,1-.64,0l-.85-1-1,2.4A.46.46,0,0,1,156.6,400.38Z" style="fill:#fff"></path>                           </g>                           <g style="opacity:0.7000000000000001">                              <path d="M141.65,416.75a1,1,0,0,1-.49-.12,1.2,1.2,0,0,1-.55-1.09v-1.25a.46.46,0,0,1,.46-.45.45.45,0,0,1,.45.45v1.25c0,.18,0,.28.09.3s.14,0,.29-.08a2.65,2.65,0,0,0,.85-2.05v-5.2a.45.45,0,1,1,.9,0v5.2a3.44,3.44,0,0,1-1.29,2.83A1.41,1.41,0,0,1,141.65,416.75Z" style="fill:#fff"></path>                              <path d="M136.88,412.56v-.78a12.87,12.87,0,0,1,5.79-10c1.64-.94,3.2-1.08,4.4-.38a4.33,4.33,0,0,1,1.86,4v.26Zm8.51-10.74a4.7,4.7,0,0,0-2.26.7,12,12,0,0,0-5.3,8.45L148,405.09a3.37,3.37,0,0,0-1.41-3A2.38,2.38,0,0,0,145.39,401.82Z" style="fill:#fff"></path>                           </g>                           <polygon points="31.6 297.27 114.67 345.33 132.02 369.3 113.75 346.18 31.6 297.27" style="fill:#fff;opacity:0.7000000000000001"></polygon>                           <polygon points="205.78 326.71 132.02 369.3 132.02 427.03 133.4 370.46 205.78 326.71" style="fill:#fff;opacity:0.7000000000000001"></polygon>                        </g>                     </g>                     <g id="freepik--Moth--inject-8">                        <g id="freepik--moth--inject-8">                           <path d="M97.54,303.62c7.61-1.1,14.56-6,19-12.16a29,29,0,0,0,4.5-9.54,20.43,20.43,0,0,0,.46-9.88c-1.37-5.49-6.45-8.74-11.82-9.42a18,18,0,0,0-8.1.79,13.68,13.68,0,0,0-6.7,5A8.28,8.28,0,0,0,93,272.77a2.5,2.5,0,0,0,2.24,2.55,7.22,7.22,0,0,0,4.57-1.16,14.49,14.49,0,0,0,4.27-3.64,30.56,30.56,0,0,0,5.54-10.5,21.09,21.09,0,0,0,0-10,18.46,18.46,0,0,0-4.53-9.21,16.76,16.76,0,0,0-9.74-4.29,23.72,23.72,0,0,0-10.74,1,11.49,11.49,0,0,0-4.13,2.26c-.86.8-1.84,2.12-1.49,3.42s2.25,1.88,3.54,1.71a9.28,9.28,0,0,0,5-2.71,21.35,21.35,0,0,0,3.77-5,8.78,8.78,0,0,0,1.13-4.34c-.13-6.34-7.14-10.44-12.63-11.6a16.25,16.25,0,0,0-4.51-.3c-.51,0-.2.84.21.81A16.48,16.48,0,0,1,84,223.69a14.22,14.22,0,0,1,6.21,5.53,7.61,7.61,0,0,1-.24,7.74,20.53,20.53,0,0,1-3.62,4.62c-1.19,1.08-3,2.33-4.67,2.21a1.47,1.47,0,0,1-1.32-.83,2.13,2.13,0,0,1,.59-1.82A8.37,8.37,0,0,1,84.14,239a21,21,0,0,1,9.49-1.56,17,17,0,0,1,9.34,3,14.69,14.69,0,0,1,4.86,7.71,22.64,22.64,0,0,1,.88,9.5,24.35,24.35,0,0,1-3.63,9c-1.85,3.06-4.17,6-7.65,7.2-.86.31-2.66.76-3-.49s.64-2.79,1.27-3.76a12.72,12.72,0,0,1,5.82-4.91,16.07,16.07,0,0,1,7.29-1.1c4.71.35,9.49,2.81,11.13,7.49a17,17,0,0,1,.26,8.6,27.64,27.64,0,0,1-3.31,8.84A31.58,31.58,0,0,1,102,301.51c-1.48.64-3,1.18-4.55,1.68-.16.06-.09.46.09.43Z" style="fill:#e0e0e0"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#2F80EC"></path>                           <path d="M65.75,216.8c-4-.29-9.51,2.86-7.55,5.16s7.16-1.42,7.16-1.42-.49,4.65,1.21,5.18,4-3.91,2.3-6.75a5.23,5.23,0,0,0,5-.64c2.42-1.78-.14-3.46-3.55-3.16,0,0,2.44-8-2.49-6.47C65.36,209.45,64.49,212.34,65.75,216.8Z" style="fill:#fff;opacity:0.65"></path>                           <path d="M69.47,218.5a8,8,0,0,0-.7-.61c-.35-.27-.72-.53-1.07-.79a9.12,9.12,0,0,0-1.07-.67,6.65,6.65,0,0,0-.66-.32,1.83,1.83,0,0,0-1-.16.5.5,0,0,0-.4.78,2.5,2.5,0,0,0,1,.66l.54.29c.37.22.7.47,1,.72s.7.49,1,.74a6.53,6.53,0,0,0,1.71,1,.19.19,0,0,0,.18,0C70.51,219.74,69.76,218.79,69.47,218.5Z" style="fill:#455a64"></path>                        </g>                     </g>                  </svg>                  <br>                  <p><strong>This house is a little empty...</strong><br><button class="newroombtn" style="margin-top: 10px; display: inline-block;"> Create a room?</button> </p>                  <br>                  <br>               </div>`
					loadTooltips()
					newHouseListener()
					newRoomListener(target)
					houseClickListener()
					roomListener()

					hide('.tooltip')
					document.querySelector('.welcome-heading').style.display = 'none';
					document.querySelector('.goback').style.display = 'block';
					document.querySelector('.goback').setAttribute('action', `'refrsh("houses")'`);

				}



			});
			loadTooltips()
			newRoomListener(target)
			houseClickListener()
			roomListener()
			hide('.tooltip')



		}
	}




	loadTooltips()
	newHouseListener()
	newRoomListener()
	houseClickListener()
	roomListener()



	function newHouseListener() {
		var newhousebtn = document.querySelectorAll('.newhousebtn')

		if (newhousebtn) {
			for (let i = 0; i < newhousebtn.length; i++) {
				newhousebtn[i].addEventListener("click", function() {

					newHouse()
				});
			}

		}


	}

	function houseClickListener() {
		var housecard = document.querySelectorAll('.card.house')

		if (housecard) {
			for (let i = 0; i < housecard.length; i++) {
				housecard[i].addEventListener("click", function() {
					var data = JSON.stringify([housecard[i].dataset.id, housecard[i].dataset.name])
					refrsh(data)
				});
			}

		}


	}

	function newRoomListener(target) {
		var newroombtn = document.querySelectorAll('.newroombtn')

		if (newroombtn) {
			for (let i = 0; i < newroombtn.length; i++) {
				newroombtn[i].addEventListener("click", function() {

					newRoom(target)
				});
			}

		}


	}

	function roomListener() {
		var room = document.querySelectorAll('[data-room="true"]')

		if (room) {
			for (let i = 0; i < room.length; i++) {
				room[i].addEventListener("click", function() {

					summon([room[i].dataset.id, room[i].dataset.name])
				});
			}
		}

	}

	document.querySelector('.goback').addEventListener('click', function(e) {
		refrsh('houses')
		document.querySelector('.welcome-heading').style.display = 'block';
		document.querySelector('.goback').style.display = 'none';

	});

	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;
	var yDown = null;

	function getTouches(evt) {
		return evt.touches
	}

	function handleTouchStart(evt) {
		const firstTouch = getTouches(evt)[0];
		xDown = firstTouch.clientX;
		yDown = firstTouch.clientY;
	};

	function handleTouchMove(evt) {
		if (!xDown || !yDown) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
			if (xDiff > 0) {
				/* right swipe */
			} else {
				/* left swipe */
				refrsh('houses')
			}
		} else {
			if (yDiff < 0) {
				/* up swipe */
			}
		}
		/* reset values */
		xDown = null;
		yDown = null;
	};

}





var mainthinglol = document.querySelector('.chats-div')
var cards = document.querySelector('.cards')

function summon(url) {
	var element = url;
	sessionStorage.setItem("active_chat", JSON.stringify(url))
	document.title = getRoom() + ' - Roomss';
	let room_name = url[1]

	mainthinglol.style.display = 'block';
	cards.style.display = 'none';

	var html = '<div   style="display: block; height: 94%; width: 100%;"  data-frame="true" data-frame-id="' + element[0] + '" style="display: none;"><span class="close-room close">×</span><iframe   src="/' + element[0] + '"/></div>'
	mainthinglol.innerHTML = html
	window.scrollBy({
		top: window.innerHeight,
		left: 0,
		behavior: 'smooth'
	});
	document.querySelector('.close-room').addEventListener('click', function() {
		deSummon(element[0])
	});
}

function deSummon(url) {
	reallyRevertTitle()
	document.querySelector('[data-frame-id="' + url + '"]').remove();
	document.querySelector('.chats-div').style.display = 'none';
	document.querySelector('.cards').style.display = 'grid';
}

let ctrl = 'Control'
if (navigator.userAgent.indexOf('Mac OS X') != -1) {
	ctrl = 'Meta'
} else {
	ctrl = 'Control'
}

// Keep track of clicked keys
var isKeyPressed = {
	'Control': false,
	'Shift': false, // ASCII code for 'a'
	'b': false, // ASCII code for 'b'
	// ... Other keys to check for custom key combinations
};

document.onkeydown = (keyDownEvent) => {


	// Track down key click
	isKeyPressed[keyDownEvent.key] = true;
	//console.log(keyDownEvent.key)
	// Check described custom shortcut
	if (isKeyPressed["Control"] && isKeyPressed["Shift"]) {
	} else if (isKeyPressed["Control"] && isKeyPressed["r"]) {
		window.location.reload()
	}
};

document.onkeyup = (keyUpEvent) => {


	// Track down key release
	isKeyPressed[keyUpEvent.key] = false;
};

const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const join = parameters.get('join')
if (join) {
	var namelol = JSON.stringify(parameters.get('name').replaceAll(/``+/g, '').replaceAll('[', '').replaceAll(']', '').replaceAll(/``+/g, ''))
	var id = JSON.stringify(parameters.get('id')).replaceAll(/``+/g, '').replaceAll('[', '').replaceAll(']', '').replaceAll(/``+/g, '')
}
if (join) {
	var chats = localStorage.getItem('chats');

	if (localStorage.getItem('chats') == null) {
		localStorage.setItem('chats', '[]');
	}
	var dta = `[${id}, ${namelol}]`;
	var data = JSON.parse(dta);

	if (!data.some(datal => datal === data)) {

		inviteModal(data)


	} else {
		summon(data)
	}
	var newURL = location.href.split("?")[0];
	window.history.pushState('object', document.title, newURL);
}

function dismiss(identifier) {
	document.querySelector(identifier).style.display = 'none';
}

function getArray() {
	return JSON.parse(localStorage.getItem('chats'));
}

function deleteRoom(data) {
	let chats = getArray();
	vex.dialog.open({
		message: 'Are you sure?',
		input: [
			'Are you sure you want to delete <b>' + data[1] + '</b>?'
		].join(''),
		buttons: [
			$.extend({}, vex.dialog.buttons.NO, { text: 'NO!!!' }),
			$.extend({}, vex.dialog.buttons.YES, { text: 'Yes' })
		],
		callback: function(datalol) {
			if (!datalol) {
				return;
			} else {

				deSummon(data[0])
				let deleteitnow = chats.filter(room => room[0] !== data[0]);

				localStorage.setItem('chats', JSON.stringify(deleteitnow));
				refrsh()
				reallyRevertTitle()
			}

		}
	})

}
var list_items = document.querySelector('.chat')
var io = document.getElementById("menu");

var i = document.getElementById("menu").style;
if (list.addEventListener) {
	list.addEventListener('contextmenu', function(e) {
		console.log(e.path)
		var path = e.path;
		let javascript_freelancers = path.filter(function(pathl) {
			return pathl.classList.includes("chatslist-list-item");
		});

		console.log(javascript_freelancers);


		var posX = e.clientX;
		var posY = e.clientY;
		var roomidthing = id
		var roomnamething = name
		var room = `[${JSON.stringify(roomidthing)}, ${JSON.stringify(roomnamething)}]`;
		document.getElementById('menu-invite').setAttribute("onclick", `invite(${room})`);
		document.getElementById('menu-delete').setAttribute("onclick", `deleteRoom(${room})`);
		menu(posX, posY);
		e.preventDefault();
	}, false);
	document.addEventListener('click', function(e) {
		i.opacity = "0";
		setTimeout(function() {
			i.visibility = "hidden";
		}, 501);
	}, false);

} else {
	document.attachEvent('oncontextmenu', function(e) {
		var posX = e.clientX;
		var roomidthing = id

		var roomnamething = name
		var room = `[${JSON.stringify(roomidthing)}, ${JSON.stringify(roomnamething)}]`;
		document.getElementById('menu-invite').setAttribute("onclick", `invite(${room})`);
		document.getElementById('menu-delete').setAttribute("onclick", `deleteRoom(${room})`);
		var posY = e.clientY;
		menu(posX, posY);
		e.preventDefault();
	});
	document.attachEvent('onclick', function(e) {
		i.opacity = "0";
		setTimeout(function() {
			i.visibility = "hidden";
		}, 501);
	});
}

function menu(x, y) {
	i.top = y + "px";
	i.left = x + "px";
	i.visibility = "visible";
	i.opacity = "1";
}


function inviteModal(data) {
	var invite_modal = document.getElementById("join-modal");
	window.onclick = function(event) {
		if (event.target == modal) {
			alert('Reloading window to apply changes...')
			window.location.reload()
		}
	}
	invite_modal.style.display = 'block';
	var name = document.getElementById('name')
	name.innerText = data[1]
	var push = document.getElementById("push");
	push.addEventListener("click", function(e) {
		invite_modal.style.display = 'none'
		var old_data = JSON.parse(localStorage.getItem('chats'));
		old_data.push(data);

		localStorage.setItem('chats', JSON.stringify(old_data));
		refrsh()
		summon(data)
		console.log('lol')
	})

}


var invite_modal = document.getElementById("join-modal");
window.onclick = function(event) {
	if (event.target == invite_modal) {
		invite_modal.style.opacity = 0;
	}
}


document.querySelector('.account-settings-button').addEventListener('click', function(e) {
	document.querySelector('.account-settings-button-expanded').classList.toggle('showing')
	if (document.querySelector('.account-settings-button-expanded').classList.contains('showing')) {
		document.querySelector('.account-settings-button img.expand').style.transform = 'rotate(180deg)';
	} else {
		document.querySelector('.account-settings-button img.expand').style.transform = 'rotate(0deg)';
	}
});




document.querySelector('div.logout').addEventListener('click', function(e) {
	signOut(auth).then(() => {
		console.log('[Auth]: User signed out, reloading to login')
		window.location.href = '/login'
	}).catch((error) => {
		console.log('[Auth]: User cant be signed out')
	});

});


