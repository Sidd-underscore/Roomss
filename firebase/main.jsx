import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, onSnapshot, updateDoc, doc, addDoc, collection, arrayUnion, query, orderBy, limit, getDocs } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let App;
let Analytics;
let Auth;
let Db;
let GetUserInfo;
let UpdateUserInfo;
let GetUser;
let CreateHouse;
let UploadFile;
let Storage;
let GetHouseInfo;
let CreateRoom;
let GetDocsWithQuery;

if (typeof window !== "undefined") {

	App = initializeApp(firebaseConfig);
	Analytics = getAnalytics(App);
	Auth = getAuth();
	Db = getFirestore(App);
	Storage = getStorage();

	const appCheck = initializeAppCheck(App, {
		provider: new ReCaptchaV3Provider('6Lc1nNYhAAAAANpmKTlx8z97UZW5SI8mHhAuJliT'),

		// Optional argument. If true, the SDK automatically refreshes App Check
		// tokens as needed.
		isTokenAutoRefreshEnabled: true
	});

	GetUserInfo = (uid) => {
		return new Promise((resolve, reject) => {
			const unsub = onSnapshot(doc(Db, "users", `${uid}`), (doc) => {
				if (doc) {
					resolve(doc)
				} else {
					// doc.data() will be undefined in this case
					alert("No such document!");
				}
			});

		})

	}


	UpdateUserInfo = (uid, data) => {
		return new Promise((resolve, reject) => {
			updateDoc(doc(Db, "users", `${uid}`), data).then(() => {
				resolve()
			})

		})

	}

	GetUser = () => {
		return new Promise((resolve, reject) => {
			onAuthStateChanged(Auth, (user) => {
				resolve(user)
			});
		})
	}

	CreateHouse = (data) => {
		return new Promise(async (resolve, reject) => {
			const docRef = await addDoc(collection(db, "houses"), { data });
			resolve(docRef)
		})
	}

	UploadFile = (blob, path, type) => {
		return new Promise((resolve, reject) => {
			const storageRef = ref(storage, path);
			const task = uploadBytesResumable(storageRef, blob, { contentType: type });

			task.on('state_changed',
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(task.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL)
					});
				}
			);


		})
	}

	GetHouseInfo = (id, uid) => {
		return new Promise((resolve, reject) => {
			const unsub = onSnapshot(doc(Db, "houses", `${id}`), (doc) => {
				if (doc) {
					if (doc.data() && doc.data().data.users.includes(uid)) {
						resolve(doc)
					} else {
						reject('>:(')
					}
				} else {
					// doc.data() will be undefined in this case
					reject("No such document!");
				}
			});
		})
	}

	CreateRoom = (data, id) => {
		return new Promise(async (resolve, reject) => {
			updateDoc(doc(db, "houses", id), { roomss: arrayUnion(data) }).then(() => {
				resolve()
			})
		})
	}

	GetDocsWithQuery = (thequery) => {
		return new Promise(async(resolve, reject) => {
			const querySnapshot = await getDocs(query(collection(Db, thequery.query), orderBy(thequery.orderBy, thequery.sort), limit(thequery.limit)));
			let docs = []
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				docs.push(doc.data())
			});
			resolve(docs)
		})
	}
}


export const app = App;
export const storage = Storage;
export const analytics = Analytics;
export const auth = Auth;
export const db = Db;
export const getUserInfo = GetUserInfo;
export const updateUserInfo = UpdateUserInfo;
export const getUser = GetUser;
export const createHouse = CreateHouse;
export const uploadFile = UploadFile;
export const getHouseInfo = GetHouseInfo;
export const createRoom = CreateRoom;
export const getDocsWithQuery = GetDocsWithQuery;