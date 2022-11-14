import { PaginationEntity } from "@core/pagination/entity";
import { getDatas } from "src/firebase/fbServices"



const getDevices = (paging: any, option: any): Promise<{ data: Array<any>; info: PaginationEntity}> => {
    return getDatas(paging, option, "device")
}

export default {
    getDevices,
};