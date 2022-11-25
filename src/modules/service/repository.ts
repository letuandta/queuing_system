import { PaginationEntity } from "@core/pagination/entity";
import { addData, ChangeData, getDatas, getSingleData } from "src/firebase/fbServices"
import ServiceEntity from "./entity";

const collection = "service"

const getServices = (paging: any, option: any): Promise<{ data: Array<ServiceEntity>; info: PaginationEntity }> => {
    return getDatas(paging, option, collection)
}

const getService = (documentId: string): Promise<{ data: ServiceEntity; status: boolean }> => {
    return getSingleData(collection, documentId)
}

const addService = (data: Partial<ServiceEntity>): Promise<{ status: boolean }> => {
    return addData(collection, data)
}

const changeService = (documentId: string, data: Partial<ServiceEntity>): Promise<{ status: boolean }> => {
    return ChangeData(collection, documentId, data)
}

export default {
    getServices,
    getService,
    addService,
    changeService,
};