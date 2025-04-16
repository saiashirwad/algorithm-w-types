type Concat<T1 extends string[], T2 extends string[]> = [
  ...T1,
  ...T2
]

declare class EVar<const _1 extends string = any> {
  public __evar: null
}
declare class ELit<const _1 extends Lit = any> {
  public __elit: null
}
declare class EApp<
  const _1 extends Lit = any,
  const _2 extends Exp = any
> {
  public __eapp: null
}
declare class ELet<
  const _1 extends string = any,
  const _2 extends Exp = any,
  const _3 extends Exp = any
> {
  public __elet: null
}

type Exp = EVar | ELit | EApp | ELet

declare class LInt<const _ extends number = any> {
  public __lint: null
}
declare class LBool<const _ extends boolean = any> {
  public __lbool: null
}

type Lit = LInt | LBool

declare class TVar<const _1 extends string = any> {
  public __tvar: null
}
declare class TInt {
  public __tint: null
}
declare class TBool {
  public __tbool: null
}
declare class TFun<
  const _1 extends Type = any,
  const _2 extends Type = any
> {
  public __tfun: null
}

type Type = TVar | TInt | TBool | TFun

declare class Scheme<
  const _1 extends string[] = any,
  const _2 extends Type = any
> {
  public __scheme: null
}

type ftv<T extends Type> =
  T extends TVar<infer n> ? [n]
  : T extends TInt | TBool ? []
  : T extends TFun<infer t1, infer t2> ?
    // @ts-ignore
    Concat<ftv<t1>, ftv<t2>>
  : never

type R3 = ftv<TFun<TBool, TFun<TVar<"x">, TVar<"y">>>>
