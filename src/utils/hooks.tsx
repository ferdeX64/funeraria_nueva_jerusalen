import {
    collection,
    onSnapshot,
    doc,
    getDocs,
    getDoc,
    setDoc,
    query,
    where,
    updateDoc,
    arrayUnion,
    Timestamp,
    addDoc,
  } from "firebase/firestore";
  import { onMounted, ref } from "vue";
  import { db } from "./firebase";
export function deuda(){
    let firedata = ref();
    interface User {
        date: string;
        detalle: string;
        deuda_total: string;
        foto: object;
        deuda: object;
        value: string;
      }
    const cities: Array<User> = [];
    function getDocu() {
        let count = 0;
        const q = query(collection(db, "data"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cities.push({
              date: doc.data().date,
              detalle: doc.data().detalle,
              deuda_total: doc.data().deuda_total,
              foto: doc.data().foto,
              deuda: doc.data().deuda,
              value: doc.data().value,
            });
            console.log(cities);
          });
          console.log("Current cities in CA: ", cities.join(", "));
          firedata.value = cities;
        });
      }
      onMounted(() => {
        getDocu(); // <div>
      });
      return{
        firedata
      }

}