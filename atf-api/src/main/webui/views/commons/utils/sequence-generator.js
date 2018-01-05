export const sequenceGenerator = class {
    constructor() {
        this.sequence = 0;
    }

    increaseAndGet() {
        this.sequence = this.sequence + 1;
        return this.sequence;
    }

}


