import { PaginationEntity } from "@core/pagination/entity";
import { getDatas } from "src/firebase/fbServices"
import DeviceEntity from "./entity";



const getDevices = (paging: any, option: any): Promise<{ data: Array<DeviceEntity>; info: PaginationEntity}> => {
    return getDatas(paging, option, "device")
}

export default {
    getDevices,
};