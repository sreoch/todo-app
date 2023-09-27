import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB-zeWqKySSSrj2Ulmnmk19zbp92ZIUZhM',
	authDomain: 'agenda-d46e5.firebaseapp.com',
	projectId: 'agenda-d46e5',
	storageBucket: 'agenda-d46e5.appspot.com',
	messagingSenderId: '120828592284',
	appId: '1:120828592284:web:bdaf196bfde1b96d1f2d59',
	measurementId: 'G-2GGM2QP7PL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
