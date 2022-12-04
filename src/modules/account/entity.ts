class AccountEntity {

    id: string = '';
    usename: string = '';
    password: string = '';
    name: string = '';
    phone: string = '';
    email: string = '';
    rule: string = '';
    status: boolean = false;
    key: number = 0;

    constructor(account?: Partial<AccountEntity>) {
        if (!account) {
            return;
        }
        Object.assign(this, account);
    }
}



export default AccountEntity;