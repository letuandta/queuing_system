import { PaginationEntity } from "@core/pagination/entity";
import { addData, ChangeData, getDatas, getSingleData } from "src/firebase/fbServices"
import DeviceEntity from "./entity";


const collection = "device"

const getDevices = (paging: any, option: any): Promise<{ data: Array<DeviceEntity>; info: PaginationEntity }> => {
    return getDatas(paging, option, collection)
}

const getDevice = (documentId: string): Promise<{ data: DeviceEntity; status: boolean }> => {
    return getSingleData(collection, documentId)
}

const addDevice = (data: Partial<DeviceEntity>): Promise<{ status: boolean }> => {
    return addData(collection, data)
}

const changeDevice = (documentId: string, data: Partial<DeviceEntity>): Promise<{ status: boolean }> => {
    return ChangeData(collection, documentId, data)
}

export default {
    getDevices,
    getDevice,
    addDevice,
    changeDevice,
};