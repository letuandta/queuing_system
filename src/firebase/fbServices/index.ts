import { PaginationEntity } from "@core/pagination/entity";
import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, Query, query, QueryConstraint, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "../configs";
import lodash from 'lodash';


const db = FirebaseConfig.getInstance().fbDB;


export const getDatas = async (paging: any, option: any, collectionName: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {

  // const whereQuery = option.filter ? where(option.filter.field, "==", option.filter.value) : where("deviceName", "!=", " ")
  const deviceCollecttion = collection(db, collectionName)

  var q: Query = query(deviceCollecttion,
    orderBy('key'),
  )

  if (!lodash.isEmpty(option.filter)) {

    let conditions: QueryConstraint[] = []

    option.filter.map(
      fil => {
        if (fil.value !== 'all') {
          let check = fil.value === 'true'
          conditions.push(where(`${fil.field}`, '==', typeof check === 'boolean' ? check : `${fil.value}`))
        }
      }
    )

    q = query(deviceCollecttion, ...conditions)
  }


  const docs = getDocs(q)
  const count = getCountFromServer(deviceCollecttion);

  const data = await docs;
  const total = await count;

  const customdata = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));


  console.group([
    "===========================================================================",
    customdata,
    total.data().count,
    paging,
    option.filter,
    "============================================================================"
  ]);
  console.groupEnd();
  //  
  return { data: customdata, info: { total: customdata.length } }
}


export const getSingleData = async (collectionName: string, documentId: string): Promise<{ data: any, status: boolean }> => {

  const docRef = doc(db, collectionName, documentId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data(), status: true }
  } else {
    return { data: "Data dont exist!!!", status: false }
  }
}

export const addData = async (collectionName: string, data: any): Promise<{ status: boolean }> => {

  const collectionRef = collection(db, collectionName);

  const newDoc = await addDoc(collectionRef, data);

  if (newDoc.id) {
    return { status: true }
  } else {
    return { status: false }
  }

}


export const ChangeData = async (collectionName: string, documentId: string, data: any): Promise<{ status: boolean }> => {

  const docRef = doc(db, collectionName, documentId);

  await setDoc(docRef, data);

  return { status: true }
}

