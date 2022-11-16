import { PaginationEntity } from "@core/pagination/entity";
import { collection, getCountFromServer, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { FirebaseConfig } from "../configs";



const db = FirebaseConfig.getInstance().fbDB;


export const getDatas = async (paging: any, option: any, docName: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {

    // const whereQuery = option.filter ? where(option.filter.field, "==", option.filter.value) : where("deviceName", "!=", " ")
    const deviceCollecttion = collection(db, docName)

    const q = query(deviceCollecttion,
      orderBy('key'),
      startAfter((paging.current - 1) * paging.pageSize),
      limit(paging.pageSize));

    const docs = getDocs(q)
    const count = getCountFromServer(deviceCollecttion);

    const data = await docs;
    const total = await count;

    const customdata = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));


    // console.group([
    //   "===========================================================================",
    //   customdata,
    //   total.data().count,
    //   paging,
    //   option.filter.field,
    //   option.filter.value,
    //   "============================================================================"
    // ]);
    // console.groupEnd();
    return { data: customdata, info: { total: total.data().count } }
  }