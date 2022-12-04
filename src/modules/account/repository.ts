import { PaginationEntity } from "@core/pagination/entity";
import { addData, ChangeData, getDatas, getSingleData } from "src/firebase/fbServices"
import AccountEntity from "./entity";

const collection = "account"

const getAccounts = (paging: any, option: any): Promise<{ data: Array<AccountEntity>; info: PaginationEntity }> => {
    return getDatas(paging, option, collection)
}

const getAccount = (documentId: string): Promise<{ data: AccountEntity; status: boolean }> => {
    return getSingleData(collection, documentId)
}

const addAccount = (data: Partial<AccountEntity>): Promise<{ status: boolean }> => {
    return addData(collection, data)
}

const changeAccount = (documentId: string, data: Partial<AccountEntity>): Promise<{ status: boolean }> => {
    return ChangeData(collection, documentId, data)
}

export default {
    getAccounts,
    getAccount,
    addAccount,
    changeAccount,
};