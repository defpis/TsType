import { it, expectTypeOf } from "vitest";

interface T1 {
  k1: string;
}

interface T2 {
  k1: number;
}

type T3 = T1 & T2;

var r1: T3["k1"]; // never

it("&", () => {
  expectTypeOf(r1).toEqualTypeOf<never>();
});
