import firebbase from 'firebase/app';
import 'firebase/database';

export const onConnectionChanged = onConnection =>
    firebase
        .database()
        .ref('.info/connected')
        .on('value', snapshot => {
            const isConnected = snapshot?.val() ? snapshot.val() : false;
            onConnection(isConnected)
        })