declare module 'js-big-decimal' {
  export default class bigDecimal {
    constructor(value: string);
    divide(divisor: bigDecimal): bigDecimal;
    compareTo(other: bigDecimal): number;
    value: string;
  }
}

declare class Decimals {
  divide(a: string, b: string): string;
  gt(a: string, b: string): boolean;
  gte(a: string, b: string): boolean;
  lte(a: string, b: string): boolean;
  multBigN(a: string, b: string): string;
  d(amount: string, decimals: number, precision?: number): string;
  displayToWei(display: string, decimals: number): string;
  com(x: string | number): string;
  round(_value: string | number, decimals: number): string;
  bigD(value: string | number): bigDecimal;
}

export default Decimals;

declare function weiToDisplay(gwei: string, decimals: number): string;
