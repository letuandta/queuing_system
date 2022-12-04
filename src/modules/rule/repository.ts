import { PaginationEntity } from "@core/pagination/entity";
import { addData, ChangeData, getDatas, getSingleData } from "src/firebase/fbServices"
import RuleEntity from "./entity";

const collection = "rule"

const getRules = (paging: any, option: any): Promise<{ data: Array<RuleEntity>; info: PaginationEntity }> => {
    return getDatas(paging, option, collection)
}

const getRule = (documentId: string): Promise<{ data: RuleEntity; status: boolean }> => {
    return getSingleData(collection, documentId)
}

const addRule = (data: Partial<RuleEntity>): Promise<{ status: boolean }> => {
    return addData(collection, data)
}

const changeRule = (documentId: string, data: Partial<RuleEntity>): Promise<{ status: boolean }> => {
    return ChangeData(collection, documentId, data)
}

export default {
    getRules,
    getRule,
    addRule,
    changeRule,
};