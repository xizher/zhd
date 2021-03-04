import Observer from './observer';
export declare class TestClass extends Observer<{
    'inc': {
        value: number;
    };
    'dev': {
        val: number;
    };
}> {
    private _value;
    constructor();
    inc(): void;
    dec(): void;
}
