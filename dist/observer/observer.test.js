import Observer from './observer';
export class TestClass extends Observer {
    constructor() {
        super();
        this._value = 1;
    }
    inc() {
        this._value++;
        this.fire('inc', {
            value: this._value
        });
    }
    dec() {
        this._value--;
        this.fire('dev', {
            val: this._value
        });
    }
}
