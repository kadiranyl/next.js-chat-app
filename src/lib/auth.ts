import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { showAlert } from "./Toast";


export async function createUser(e: any, displayName: any, email: string, password: string) {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        setDoc(doc(collection(db, 'accounts'), userCredential.user.uid), {
            uid: userCredential.user.uid,
            displayName,
            email: userCredential.user.email,
            timestamp: serverTimestamp(),
            imageUrl: '/img/defaultUser.jpg',
            biography: null,
            online: false,
        })

        updateProfile(auth.currentUser, { photoURL: '/img/defaultUser.jpg', displayName })

        showAlert("Successfully signed up!", "success")
    })
    .catch((error) => {
        console.log(error);
        showAlert(error, "error")
    });
}

export async function getFireUser(setFireUser: Function) {
    if (auth.currentUser !== null) {
        const docRef = doc(db, "accounts", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        setFireUser(docSnap.data())
    }
}


export async function loginUser(e: any, email: string, password: string) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...

        showAlert("Giriş başarılı!", "success")
    })
    .catch((error) => {
        console.log(error);
        showAlert(error, "error")
    });
}


export async function signOutHandler() {
    signOut(auth).then(() => {
        showAlert("You've signed out.", "error")
    }).catch((error) => {
        console.log(error);
    });
}