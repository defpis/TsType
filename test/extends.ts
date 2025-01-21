import { it, expectTypeOf, expect } from "vitest";

interface T1 {
  k1: string;
}

interface T2 {
  k2: number;
}

var r1: T1 & T2;

it("extends", () => {
  expectTypeOf(r1).toMatchTypeOf<{ k1: string; k2: number }>();
});

interface T3 extends T1, T2 {}
var r2: T3;

it("extends", () => {
  expectTypeOf(r2).toEqualTypeOf<{ k1: string; k2: number }>();
});

var r3: "x" extends "x" ? 1 : 2;

it("extends", () => {
  expectTypeOf(r3).toEqualTypeOf<1>();
});

type P<T> = T extends "x" ? 1 : 2;
var r4: P<"x">;
var r5: P<"y">;
var r6: P<"x" | "y">;

it("extends", () => {
  expectTypeOf(r4).toEqualTypeOf<1>();
  expectTypeOf(r5).toEqualTypeOf<2>();
  expectTypeOf(r6).toEqualTypeOf<1 | 2>();
});

interface T4 {
  k1: string;
}

interface T5 extends T4 {
  k2: number;
}

var r7: T4;
var r8: T5;

it("extends", () => {
  r7 = r8;
  expectTypeOf(r7).toEqualTypeOf<T4>();

  try {
    // @ts-expect-error
    r8 = r7;
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

// 数组协变

var r9: T4[];
var r10: T5[];

it("extends", () => {
  r9 = r10;
  expectTypeOf(r9).toEqualTypeOf<T4[]>();
});

// 参数逆变

type T4Fn = (arg: T4) => void;
type T5Fn = (arg: T5) => void;

var r11: T4Fn;
var r12: T5Fn;

it("extends", () => {
  r12 = r11;
  expectTypeOf(r12).toEqualTypeOf<T5Fn>();

  try {
    // @ts-expect-error
    r11 = r12;
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

// 联合转交叉利用了函数参数的逆变特性
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

var r13: UnionToIntersection<T1 | T2>;
var r14: UnionToIntersection<T4 | T5>;

it("extends", () => {
  expectTypeOf(r13).toMatchTypeOf<T1 & T2>();
  expectTypeOf(r14).toMatchTypeOf<T5>();
});
