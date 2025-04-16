type Concat<T1 extends string[], T2 extends string[]> = [
  ...T1,
  ...T2
]

declare class EVar<const _1 extends string = any> {
  EVar: null
}

declare class ELit<const _1 extends Lit = any> {
  ELit: null
}

declare class EApp<
  const _1 extends Lit = any,
  const _2 extends Exp = any
> {
  EApp: null
}

declare class ELet<
  const _1 extends string = any,
  const _2 extends Exp = any,
  const _3 extends Exp = any
> {
  ELet: null
}

type Exp = EVar | ELit | EApp | ELet

declare class LInt<const _ extends number = any> {
  LInt: null
}
declare class LBool<const _ extends boolean = any> {
  LBool: null
}

type Lit = LInt | LBool

declare class TVar<const _1 extends string = any> {
  TVar: null
}

declare class TInt {
  TInt: null
}

declare class TBool {
  TBool: null
}

declare class TFun<
  const _1 extends Type = any,
  const _2 extends Type = any
> {
  TFun: null
}

type Type = TVar | TInt | TBool | TFun

type Subst = Record<string, Type>

declare class Scheme<
  const _1 extends string[] = any,
  const _2 extends Type = any
> {
  Scheme: null
}

declare namespace Map {
  export type Get<
    R extends Record<string, any>,
    K extends string
  > = K extends keyof R ? R[K] : never

  export type Contains<
    R extends Record<string, any>,
    K extends string
  > = K extends keyof R ? true : false
}

declare namespace Types {
  export type FTV<T extends Type> =
    T extends TVar<infer N> ? [N]
    : T extends TInt | TBool ? []
    : T extends TFun<infer t1, infer t2> ?
      // @ts-expect-error nah we good
      Concat<FTV<t1>, FTV<t2>>
    : never

  export type Apply<S extends Subst, T extends Type> =
    T extends TVar<infer N> ?
      Map.Contains<S, N> extends true ?
        S[N]
      : T
    : T extends TFun<infer T1, infer T2> ?
      [Apply<S, T1>, Apply<S, T2>] extends (
        [infer T1_ extends Type, infer T2_ extends Type]
      ) ?
        TFun<T1_, T2_>
      : never
    : T
}

type TFunExample = TFun<TBool, TFun<TVar<"x">, TVar<"y">>>

// type _  = Types.FTV<TFunExample>
type _ = Types.Apply<{}, TFunExample>

type asdf = TVar<"a">
type __ = Types.Apply<{}, asdf>
