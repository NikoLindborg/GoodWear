# GoodWear
Team project for Metropolia UAD Web-based mobile applications course.

Authors Aleksi Kytö, Niko Lindborg and Aleksi Kosonen. 

# Installation 

1. Clone repo
```
https://github.com/NikoLindborg/GoodWear.git
```
2. Create Firebase database
```
Create a Firestore Database: https://firebase.google.com/docs/firestore/quickstart
```
3. Add firebaseConfig.js file
```
Copy the following info from Firebase and add a file named 'firebaseConfig.js' such as following:

const firebaseConfig = {
  apiKey: 'your apiKey',
  authDomain: 'your authDomain,
  projectId: 'your projectId',
  storageBucket: 'your storageBucket',
  messagingSenderId: 'your messagingSenderId',
  appId: 'your appId',
};

export {firebaseConfig};
```
4. Install NPM packages
```
npm i
```

5. Run the app!
```
npm start
```

# About GoodWear

GoodWear is a mobile secondhand marketplace app. 

In GoodWear you can post your sellable items and browse other's items. Posts are filtered with tags, which can be used to search itmes. GoodWear also provides an Watchlist-feature, where user can enter categories they would like to follow. 

Items can be bought through Chat feature where users can provide needed information for purchasing. Chat uses Firebase Firestore database for storing chats as individual documents. 

GoodWear doesn't require registering for browsing items but it is needed for communicating through Chat and posting items. 
