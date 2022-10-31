import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "my-demo-588ec.firebaseapp.com",
    projectId: "my-demo-588ec",
    storageBucket: "my-demo-588ec.appspot.com",
    messagingSenderId: "689950900266",
    appId: "1:689950900266:web:57cad4396f79864d1a8353",
    measurementId: "G-W72B9WMWMD"
};


export class FirebaseConfig {
    private static instance: FirebaseConfig | null = null;
    private fbApp: any = null;
    fbDB: any = null;
    auth: any = null;

    constructor() {
        this.fbApp = initializeApp(firebaseConfig);
        this.fbDB = getFirestore(this.fbApp);
        this.auth = getAuth(this.fbApp);
    }



    static getInstance() {
        if (this.instance == null) {
            this.instance = new FirebaseConfig();
        }

        return this.instance;
    }
}