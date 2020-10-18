import db from '../db/firestore';
import firebase from 'firebase/app';



// get data from snapshot
const extractSnapshotData = snapshot =>
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

export const fetchChats = () =>
        db.collection('chats').get().then(extractSnapshotData)

export const createChat = (chat) =>
        db.collection(`chats`).add(chat).then(docRef => docRef.id)

export const joinChat = async (userId, chatId) => {
        const userRef = db.doc(`profiles/${userId}`);
        const chatRef = db.doc(`chats/${chatId}`);

        // add chat to user joinedChat
        // add user to chat joinedUsers
        await userRef.update({ joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef) })
        await chatRef.update({ joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef) })
}

export const subscribeToChat = (chatId, onSubsribe) =>
  db
    .collection('chats')
    .doc(chatId)
    .onSnapshot(snapshot => {
      const chat = {id: snapshot.id, ...snapshot.data()}
      onSubsribe(chat);
    })

export const subscribeToProfile = (uid, onSubscribe) => 
    db
        .collection('profiles')
        .doc(uid)
        .onSnapshot(snapshot => onSubscribe(snapshot.data()))