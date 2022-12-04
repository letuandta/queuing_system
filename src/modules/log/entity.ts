class LogEntity {

    id: string = '';
    usename: string = '';
    time: string = '';
    IP: string = '';
    acctive: string = '';
    key: number = 0;

    constructor(log?: Partial<LogEntity>) {
        if (!log) {
            return;
        }
        Object.assign(this, log);
    }
}



export default LogEntity;