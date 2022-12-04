import { PaginationEntity } from "@core/pagination/entity";
import { addData, ChangeData, getDatas, getSingleData } from "src/firebase/fbServices"
import ProvideEntity from "./entity";

const collection = "provide"

const getProvides = (paging: any, option: any): Promise<{ data: Array<ProvideEntity>; info: PaginationEntity }> => {
    return getDatas(paging, option, collection)
}

const getProvide = (documentId: string): Promise<{ data: ProvideEntity; status: boolean }> => {
    return getSingleData(collection, documentId)
}

const addProvide = (data: Partial<ProvideEntity>): Promise<{ status: boolean }> => {
    return addData(collection, data)
}

const changeProvide = (documentId: string, data: Partial<ProvideEntity>): Promise<{ status: boolean }> => {
    return ChangeData(collection, documentId, data)
}

export default {
    getProvides,
    getProvide,
    addProvide,
    changeProvide,
};