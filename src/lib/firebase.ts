import { initializeApp } from "firebase/app";
import { getFirestore, collection, serverTimestamp, updateDoc, orderBy, query, doc, addDoc, getDoc, onSnapshot, arrayUnion, getDocs, where, limit, setDoc, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const { DateTime } = require("luxon");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth: any = getAuth(app)


export async function sendMessage(e: any, uid: String, selectedChat: any, message: String, setMessage: Function) {
  e.preventDefault()
  setMessage("")

  if (message.length>0) {
    try {
      const docRef = await updateDoc(doc(db, 'messages', selectedChat), {
        msgs: arrayUnion(
          {
            uid,
            message,
            created_at: DateTime.now().toUnixInteger()
          }
        )
      });
  
  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}



export async function getMessages(setMessages: Function, selectedChat: any) {

  console.log();
  
    
  try {
    const res = await onSnapshot(doc(db, "messages", selectedChat), (doc) => {
        const msgs = doc.data()?.msgs
        setMessages(msgs.reverse())
    })
    
  } catch (e) {
    console.log(e);
  }


}


export async function getFireUser(setUser: Function, uid: any) {  
    
  try {
    const res = await onSnapshot(doc(db, "accounts", uid), (doc) => {
      setUser(doc.data())
    })
  } catch (e) {
    console.log(e);
  }


}



export async function getFireUsers(setSearchResult: Function, search: String) {
    
  try {
    const res = await getDocs(query(collection(db, 'accounts'), where("displayName", "==", search), orderBy("timestamp", "desc"), limit(5)))
    
    setSearchResult(res.docs.map((item) => {

      return { ...item.data(), id: item.id }

    }));
  } catch (e) {
    console.log(e);
  }


}



export async function getChats(uid: String, setChats: Function) {
  try {
    const res = await getDocs(query(collection(db, 'chats'), where("uid2", "array-contains-any", uid)))
    setChats(res.docs.map((item) => {

      return { ...item.data(), id: item.id }

    }));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getChat(setChat: Function, selectedChat: any) {
  try {
    const res = await onSnapshot(doc(db, "chats", selectedChat), (doc) => {
        setChat(doc.data())
    })
  } catch (e) {
    console.log(e);
  }
}

export async function changeTypingStatus(selectedChat: any, chat: any, value: boolean, whichUid: any) {  
    
  try {
    const res = await updateDoc(doc(collection(db, "chats"), selectedChat), {
      [whichUid]: value,
    })
    
  } catch (e) {
    console.log(e);
  }

}




export async function openChat(setSearch : Function, uid: String, uid2: String, setSelectedChat: Function) {
  setSearch("")
  const chatId = uid>uid2 ? `${uid}-${uid2}` : `${uid2}-${uid}`

  try {
    const hasChat = await getDoc(doc(db, 'messages', chatId))

    if (!hasChat.data()) {
      const docRef = await setDoc(doc(collection(db, "messages"), chatId), {
        msgs: [],
        timestamp: serverTimestamp()
      });


      const docRef2 = await setDoc(doc(collection(db, "chats"), chatId), {
        uid,
        uid2,
        timestamp: serverTimestamp(),
        typing_uid: false,
        typing_uid2: false,
      });
    }

    setSelectedChat(chatId)

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}