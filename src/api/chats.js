import db from '../db/firestore';
import firebase from 'firebase/app';



// get data from snapshot
const extractSnapshotData = snapshot =>
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

// fetching all chats
export const fetchChats = () =>
        db.collection('chats').get().then(extractSnapshotData)

// creating chat room
export const createChat = (chat) =>
        db.collection(`chats`).add(chat).then(docRef => docRef.id)

// join a chat room 
export const joinChat = async (userId, chatId) => {
        const userRef = db.doc(`profiles/${userId}`);
        const chatRef = db.doc(`chats/${chatId}`);

        // add chat to user joinedChat
        // add user to chat joinedUsers
        await userRef.update({ joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef) })
        await chatRef.update({ joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef) })
}

// subscribing to a chat
export const subscribeToChat = (chatId, onSubsribe) =>
        db
                .collection('chats')
                .doc(chatId)
                .onSnapshot(snapshot => {
                        const chat = { id: snapshot.id, ...snapshot.data() }
                        onSubsribe(chat);
                })

// subscribing to a user profile
export const subscribeToProfile = (uid, onSubscribe) =>
        db
                .collection('profiles')
                .doc(uid)
                .onSnapshot(snapshot => onSubscribe(snapshot.data()))

// send chat message
export const sendChatMessage = (message, chatId) =>
        db
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .doc(message.timestamp)
                .set(message)

// subscribing to messages
export const subscribeToMessages = (chatId, onSubscribe) =>
        db
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .onSnapshot(snapshot => onSubscribe(snapshot.docChanges()))