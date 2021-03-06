import { IArrayExtension } from './extensions/array.extension';
import { IDataExtension } from './extensions/date.extension';
import { INumberExtension } from './extensions/number.extension';
import { IStringExtension } from './extensions/string.extension';
export declare function ext(_this: Date): IDataExtension;
export declare function ext(_this: string): IStringExtension;
export declare function ext(_this: number): INumberExtension;
export declare function ext<T>(_this: T[]): IArrayExtension<T>;
