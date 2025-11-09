import { addDoc, collection, deleteDoc } from "firebase/firestore";
import { firebaseDB } from "../../config/firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";

async function addData(tableName, data) {
    // Add a new document in collection "cities"
    // await setDoc(doc(firebaseDB, "cities"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });

    const docRef = await addDoc(collection(firebaseDB, tableName), data);

    console.log("Document written with ID: ", docRef.id);

}

async function deleteData(tableName, docId) {

    const cityRef = doc(firebaseDB, tableName, docId);

    try {
        await deleteDoc(cityRef);
        console.log("OK")
    } catch (error) {
        // ...
        console.log(error, 'error')
        console.log("sistemde hata var")

    }
}

export {
    addData,
    deleteData
}