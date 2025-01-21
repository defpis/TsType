import { it, expectTypeOf } from "vitest";

interface T1 {
  k1: string;
  k2: number;
}

var r1: T1["k1"];

it("test T[K]", () => {
  expectTypeOf(r1).toEqualTypeOf<string>();
});

var r2: T1["k1" | "k2"];

it("test T[K]", () => {
  expectTypeOf(r2).toEqualTypeOf<string | number>();
});

var r3: T1[keyof T1];

it("test T[K]", () => {
  expectTypeOf(r3).toEqualTypeOf<string | number>();
});
