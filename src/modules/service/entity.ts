interface IProvideRule {
    autoFrom: number,
    autoTo: number,
    prefix: number,
    surfix: number,
    resetDaily: boolean
}



class ServiceEntity {

    id: string = '';
    serviceId: String = '';
    serviceName: string = '';
    description: string = '';
    activeStatus: boolean = true;
    key: number = 0;
    provideRule: IProvideRule = {
        autoFrom: 0,
        autoTo: 0,
        prefix: 0,
        surfix: 0,
        resetDaily: true
    }

    constructor(service?: Partial<ServiceEntity>) {
        if (!service) {
            return;
        }
        Object.assign(this, service);
    }
}



export default ServiceEntity;