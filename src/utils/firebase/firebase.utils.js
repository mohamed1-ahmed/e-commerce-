import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection, //to create a collection in firestore
    writeBatch,
    getDocs,
    query,
    // DocumentSnapshot, //the name states to write to the collection
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUXlw_nZMu6crIZPNsFL5VGjTps9O6Agc",
    authDomain: "crown-clothing-db-67811.firebaseapp.com",
    projectId: "crown-clothing-db-67811",
    storageBucket: "crown-clothing-db-67811.appspot.com",
    messagingSenderId: "817104094772",
    appId: "1:817104094772:web:2809da9c0558ca0ac0ec61",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//create a provider instance
const provider = new GoogleAuthProvider();

//setup provider
provider.setCustomParameters({
    prompt: "select_account", //we need a prompt to have the user forced to select an account
    //when they interact with our application
});

//create an instance for auth function
export const auth = getAuth();

//create a function pass the auth and provider as parameters
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//create a firestore database instance
export const db = getFirestore();

//to add data to firestore
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    //create a collection in the db with the collectionKey
    const collectionRef = collection(db, collectionKey);

    //create a batch inside the collection
    const batch = writeBatch(db);

    objectsToAdd?.forEach((object) => {
        //create the object inside collection
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async (label) => {
    const collectionRef = collection(db, label);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    //querySnapshot is the response that has the docs array

    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    //get doc by id
    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            //create / set the document with the data from userAuth in my collection
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    //if user data exists
    return userSnapshot;
};

export const createUserAuthWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//everytime auth changes the callback is called
export const onAuthStateChangeListener = (callback) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            unsubscribe();
            resolve(userAuth);
        });
    });
};
