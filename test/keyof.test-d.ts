import { it, expectTypeOf } from "vitest";

interface T1 {
  k1: string;
  k2: string;
}

var r1: keyof T1; // "k1" | "k2"

it("test keyof", () => {
  expectTypeOf(r1).toEqualTypeOf<"k1" | "k2">();
});

class T2 {
  private k1?: string;
  k2?: string;
}

var r2: keyof T2; // "k2"

it("test keyof", () => {
  expectTypeOf(r2).toEqualTypeOf<"k2">();
});
