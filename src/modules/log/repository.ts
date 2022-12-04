import { PaginationEntity } from "@core/pagination/entity";
import { addData, ChangeData, getDatas, getSingleData } from "src/firebase/fbServices"
import LogEntity from "./entity";

const collection = "log"

const getLogs = (paging: any, option: any): Promise<{ data: Array<LogEntity>; info: PaginationEntity }> => {
    return getDatas(paging, option, collection)
}

const getLog = (documentId: string): Promise<{ data: LogEntity; status: boolean }> => {
    return getSingleData(collection, documentId)
}

const addLog = (data: Partial<LogEntity>): Promise<{ status: boolean }> => {
    return addData(collection, data)
}

const changeLog = (documentId: string, data: Partial<LogEntity>): Promise<{ status: boolean }> => {
    return ChangeData(collection, documentId, data)
}

export default {
    getLogs,
    getLog,
    addLog,
    changeLog,
};