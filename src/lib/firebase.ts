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


export async function sendMessage(e: any, uid: any, selectedChat: any, message: String, setMessage: Function) {
  e.preventDefault()
  setMessage("")

  var uid2

  selectedChat.split("-").map((uidd: any) => {
    if(uidd !== auth.currentUser.uid) {
      uid2 = uidd
    }
  })
  

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


      const last_message = message.length<30 ? message : message.slice(0, 25) + "..."

      const hasChat = await getDoc(doc(db, `accounts/${uid2}/chats`, uid))      

      if (!hasChat.data()) {
        const docRef4 = await setDoc(doc(collection(db, `accounts/${uid2}/chats`), uid), {
          favorite: false,
          uid: uid,
          last_message,
          unread_message: 1,
          timestamp: serverTimestamp(),
        });
      } else {
        const docRef2 = await updateDoc(doc(db, `accounts/${uid2}/chats`, uid), {
          last_message,
          unread_message: hasChat.data()?.unread_message+1,
          timestamp: serverTimestamp()
        });
      }




      const docRef2 = await updateDoc(doc(db, `accounts/${uid}/chats`, `${uid2}`), {
        last_message,
        timestamp: serverTimestamp()
      });
      
  
  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}



export async function getMessages(setMessages: Function, selectedChat: any) {  
    
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

  if (uid) {
    try {
      const res = await onSnapshot(doc(db, "accounts", uid), (doc) => {
        setUser(doc.data())
      })
    } catch (e) {
      console.log(e);
    }
  }
  


}




export async function getFireUsers(setSearchResult: Function, search: String) {
    
  try {
    const res = await getDocs(query(collection(db, 'accounts'), where("display_name", "==", search), where("uid", "!=", auth.currentUser.uid), limit(20)))
    
    setSearchResult(res.docs.map((item) => {

      return { ...item.data(), id: item.id }

    }));
  } catch (e) {
    console.log(e);
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




export async function openChat(setSearch : Function, uid: any, uid2: any, setSelectedChat: Function) {
  setSearch("")
  const chatId = uid>uid2 ? `${uid}-${uid2}` : `${uid2}-${uid}`


  if (uid !== uid2) {
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
  
  
  
        const docRef3 = await setDoc(doc(collection(db, `accounts/${uid}/chats`), uid2), {
          favorite: false,
          uid: uid2,
          last_message: "",
          unread_message: 0,
          timestamp: serverTimestamp(),
        });
  
      }
  
        
      localStorage.setItem("last_opened_chat", uid2)
  
      setSelectedChat(chatId)
  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}



export async function getUserChats(setChats: Function, setFireUsersChat: Function, setHasFavorites: Function, fireUsersChat: any, chats: any, uid: any) {  
    
  try {
    const res = await onSnapshot(query(collection(db, `accounts/${uid}/chats`), orderBy("timestamp", "desc")), (data: any) => {
      setChats(data.docs.map((item: any) => {
        return { ...item.data(), id: item.id }
      }));


      data?.docs?.map(async (chat: any) => {

          const getAccount = await getDoc(doc(db, `accounts`, chat.data().uid))
          

          if (fireUsersChat.find((a: any) => a.uid === chat.uid) === undefined) {
             setFireUsersChat((oldArray: any) => [...oldArray, {
                display_name: getAccount.data()?.display_name,
                online: getAccount.data()?.online,
                uid: getAccount.data()?.uid,
                biography: getAccount.data()?.biography,
                image_url: getAccount.data()?.image_url,
              }])
            
            if (chat.favorite) {
              setHasFavorites(true)
            }
          }
          console.log(chat.data());
          
          if (chat.data().favorite === true) {
            setHasFavorites(true)
          }

      })
    })

    


  } catch (e) {
    console.log(e);
  }


  

}