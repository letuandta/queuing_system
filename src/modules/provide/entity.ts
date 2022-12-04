class ProvideEntity {

    id: string = '';
    key: number = 0;
    Name: string = '';
    service: string = '';
    order: number = 0;
    start: string = '';
    end: string = '';
    device: string = '';
    status: string = '';
    phone: string = '';
    email: string = '';


    constructor(provide?: Partial<ProvideEntity>) {
        if (!provide) {
            return;
        }
        Object.assign(this, provide)
    }

}


export default ProvideEntity