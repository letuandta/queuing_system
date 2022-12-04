class RuleEntity {

    id: string = '';
    name: string = '';
    total: number = 0;
    description: string = '';
    key: number = 0;

    constructor(rule?: Partial<RuleEntity>) {
        if (!rule) {
            return;
        }
        Object.assign(this, rule);
    }
}



export default RuleEntity;