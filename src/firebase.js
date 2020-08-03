import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

//firebase init 
const firebaseConfig = {
  apiKey: "AIzaSyDMVQkJyevOtx2BTMlfEmvhLjoZnWXXaZY",
  authDomain: "afriiconn-6d414.firebaseapp.com",
  databaseURL: "https://afriiconn-6d414.firebaseio.com",
  projectId: "afriiconn-6d414",
  storageBucket: "afriiconn-6d414.appspot.com",
  messagingSenderId: "271908555833",
  appId: "1:271908555833:web:a07fdd3d578653e63191e8",
  measurementId: "G-N7RFZ2T4Z6"
};

firebase.initializeApp(firebaseConfig)

//utils
const db = firebase.firestore()
const auth = firebase.auth()

//collection references
const ordersCollection = db.collection('Orders')
const customersCollection = db.collection('customer')
const truckersCollection = db.collection('trucker')

//images references
const productImagesStorage = firebase.storage().ref().child('item_pic')
const licenseImagesStoraghe = firebase.storage().ref().child('licence')

//export utils/refs
export {
  db,
  auth,
  ordersCollection,
  customersCollection,
  truckersCollection,
  productImagesStorage,
  licenseImagesStoraghe
}