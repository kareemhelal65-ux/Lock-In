
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Card
 * 
 */
export type Card = $Result.DefaultSelection<Prisma.$CardPayload>
/**
 * Model UserCard
 * 
 */
export type UserCard = $Result.DefaultSelection<Prisma.$UserCardPayload>
/**
 * Model Vendor
 * 
 */
export type Vendor = $Result.DefaultSelection<Prisma.$VendorPayload>
/**
 * Model MenuItem
 * 
 */
export type MenuItem = $Result.DefaultSelection<Prisma.$MenuItemPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model ParticipantOrder
 * 
 */
export type ParticipantOrder = $Result.DefaultSelection<Prisma.$ParticipantOrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model FriendshipStreak
 * 
 */
export type FriendshipStreak = $Result.DefaultSelection<Prisma.$FriendshipStreakPayload>
/**
 * Model HypeLog
 * 
 */
export type HypeLog = $Result.DefaultSelection<Prisma.$HypeLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.card`: Exposes CRUD operations for the **Card** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cards
    * const cards = await prisma.card.findMany()
    * ```
    */
  get card(): Prisma.CardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCard`: Exposes CRUD operations for the **UserCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCards
    * const userCards = await prisma.userCard.findMany()
    * ```
    */
  get userCard(): Prisma.UserCardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendor`: Exposes CRUD operations for the **Vendor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendor.findMany()
    * ```
    */
  get vendor(): Prisma.VendorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menuItem`: Exposes CRUD operations for the **MenuItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuItems
    * const menuItems = await prisma.menuItem.findMany()
    * ```
    */
  get menuItem(): Prisma.MenuItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participantOrder`: Exposes CRUD operations for the **ParticipantOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParticipantOrders
    * const participantOrders = await prisma.participantOrder.findMany()
    * ```
    */
  get participantOrder(): Prisma.ParticipantOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendshipStreak`: Exposes CRUD operations for the **FriendshipStreak** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendshipStreaks
    * const friendshipStreaks = await prisma.friendshipStreak.findMany()
    * ```
    */
  get friendshipStreak(): Prisma.FriendshipStreakDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hypeLog`: Exposes CRUD operations for the **HypeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HypeLogs
    * const hypeLogs = await prisma.hypeLog.findMany()
    * ```
    */
  get hypeLog(): Prisma.HypeLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Card: 'Card',
    UserCard: 'UserCard',
    Vendor: 'Vendor',
    MenuItem: 'MenuItem',
    Order: 'Order',
    ParticipantOrder: 'ParticipantOrder',
    OrderItem: 'OrderItem',
    FriendshipStreak: 'FriendshipStreak',
    HypeLog: 'HypeLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "card" | "userCard" | "vendor" | "menuItem" | "order" | "participantOrder" | "orderItem" | "friendshipStreak" | "hypeLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Card: {
        payload: Prisma.$CardPayload<ExtArgs>
        fields: Prisma.CardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findFirst: {
            args: Prisma.CardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findMany: {
            args: Prisma.CardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          create: {
            args: Prisma.CardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          createMany: {
            args: Prisma.CardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          delete: {
            args: Prisma.CardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          update: {
            args: Prisma.CardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          deleteMany: {
            args: Prisma.CardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          upsert: {
            args: Prisma.CardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          aggregate: {
            args: Prisma.CardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard>
          }
          groupBy: {
            args: Prisma.CardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardCountArgs<ExtArgs>
            result: $Utils.Optional<CardCountAggregateOutputType> | number
          }
        }
      }
      UserCard: {
        payload: Prisma.$UserCardPayload<ExtArgs>
        fields: Prisma.UserCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          findFirst: {
            args: Prisma.UserCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          findMany: {
            args: Prisma.UserCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>[]
          }
          create: {
            args: Prisma.UserCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          createMany: {
            args: Prisma.UserCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>[]
          }
          delete: {
            args: Prisma.UserCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          update: {
            args: Prisma.UserCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          deleteMany: {
            args: Prisma.UserCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>[]
          }
          upsert: {
            args: Prisma.UserCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          aggregate: {
            args: Prisma.UserCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCard>
          }
          groupBy: {
            args: Prisma.UserCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCardCountArgs<ExtArgs>
            result: $Utils.Optional<UserCardCountAggregateOutputType> | number
          }
        }
      }
      Vendor: {
        payload: Prisma.$VendorPayload<ExtArgs>
        fields: Prisma.VendorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findFirst: {
            args: Prisma.VendorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findMany: {
            args: Prisma.VendorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          create: {
            args: Prisma.VendorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          createMany: {
            args: Prisma.VendorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          delete: {
            args: Prisma.VendorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          update: {
            args: Prisma.VendorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          deleteMany: {
            args: Prisma.VendorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          upsert: {
            args: Prisma.VendorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          aggregate: {
            args: Prisma.VendorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendor>
          }
          groupBy: {
            args: Prisma.VendorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorCountArgs<ExtArgs>
            result: $Utils.Optional<VendorCountAggregateOutputType> | number
          }
        }
      }
      MenuItem: {
        payload: Prisma.$MenuItemPayload<ExtArgs>
        fields: Prisma.MenuItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findFirst: {
            args: Prisma.MenuItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findMany: {
            args: Prisma.MenuItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          create: {
            args: Prisma.MenuItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          createMany: {
            args: Prisma.MenuItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          delete: {
            args: Prisma.MenuItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          update: {
            args: Prisma.MenuItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          deleteMany: {
            args: Prisma.MenuItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          upsert: {
            args: Prisma.MenuItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          aggregate: {
            args: Prisma.MenuItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuItem>
          }
          groupBy: {
            args: Prisma.MenuItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuItemCountArgs<ExtArgs>
            result: $Utils.Optional<MenuItemCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      ParticipantOrder: {
        payload: Prisma.$ParticipantOrderPayload<ExtArgs>
        fields: Prisma.ParticipantOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipantOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipantOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>
          }
          findFirst: {
            args: Prisma.ParticipantOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipantOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>
          }
          findMany: {
            args: Prisma.ParticipantOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>[]
          }
          create: {
            args: Prisma.ParticipantOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>
          }
          createMany: {
            args: Prisma.ParticipantOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParticipantOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>[]
          }
          delete: {
            args: Prisma.ParticipantOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>
          }
          update: {
            args: Prisma.ParticipantOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>
          }
          deleteMany: {
            args: Prisma.ParticipantOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipantOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParticipantOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>[]
          }
          upsert: {
            args: Prisma.ParticipantOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantOrderPayload>
          }
          aggregate: {
            args: Prisma.ParticipantOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipantOrder>
          }
          groupBy: {
            args: Prisma.ParticipantOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipantOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipantOrderCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipantOrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      FriendshipStreak: {
        payload: Prisma.$FriendshipStreakPayload<ExtArgs>
        fields: Prisma.FriendshipStreakFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendshipStreakFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendshipStreakFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>
          }
          findFirst: {
            args: Prisma.FriendshipStreakFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendshipStreakFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>
          }
          findMany: {
            args: Prisma.FriendshipStreakFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>[]
          }
          create: {
            args: Prisma.FriendshipStreakCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>
          }
          createMany: {
            args: Prisma.FriendshipStreakCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendshipStreakCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>[]
          }
          delete: {
            args: Prisma.FriendshipStreakDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>
          }
          update: {
            args: Prisma.FriendshipStreakUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>
          }
          deleteMany: {
            args: Prisma.FriendshipStreakDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendshipStreakUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendshipStreakUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>[]
          }
          upsert: {
            args: Prisma.FriendshipStreakUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipStreakPayload>
          }
          aggregate: {
            args: Prisma.FriendshipStreakAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendshipStreak>
          }
          groupBy: {
            args: Prisma.FriendshipStreakGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendshipStreakGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendshipStreakCountArgs<ExtArgs>
            result: $Utils.Optional<FriendshipStreakCountAggregateOutputType> | number
          }
        }
      }
      HypeLog: {
        payload: Prisma.$HypeLogPayload<ExtArgs>
        fields: Prisma.HypeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HypeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HypeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>
          }
          findFirst: {
            args: Prisma.HypeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HypeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>
          }
          findMany: {
            args: Prisma.HypeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>[]
          }
          create: {
            args: Prisma.HypeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>
          }
          createMany: {
            args: Prisma.HypeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HypeLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>[]
          }
          delete: {
            args: Prisma.HypeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>
          }
          update: {
            args: Prisma.HypeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>
          }
          deleteMany: {
            args: Prisma.HypeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HypeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HypeLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>[]
          }
          upsert: {
            args: Prisma.HypeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HypeLogPayload>
          }
          aggregate: {
            args: Prisma.HypeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHypeLog>
          }
          groupBy: {
            args: Prisma.HypeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<HypeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.HypeLogCountArgs<ExtArgs>
            result: $Utils.Optional<HypeLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    card?: CardOmit
    userCard?: UserCardOmit
    vendor?: VendorOmit
    menuItem?: MenuItemOmit
    order?: OrderOmit
    participantOrder?: ParticipantOrderOmit
    orderItem?: OrderItemOmit
    friendshipStreak?: FriendshipStreakOmit
    hypeLog?: HypeLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    inventory: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | UserCountOutputTypeCountInventoryArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInventoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardWhereInput
  }


  /**
   * Count Type CardCountOutputType
   */

  export type CardCountOutputType = {
    users: number
  }

  export type CardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CardCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardCountOutputType
     */
    select?: CardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardWhereInput
  }


  /**
   * Count Type VendorCountOutputType
   */

  export type VendorCountOutputType = {
    menuItems: number
    orders: number
  }

  export type VendorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menuItems?: boolean | VendorCountOutputTypeCountMenuItemsArgs
    orders?: boolean | VendorCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorCountOutputType
     */
    select?: VendorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountMenuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    hypeScore: number | null
    sawaCurrency: number | null
    keysAvailable: number | null
    walletBalance: number | null
    locksUntilMysteryCop: number | null
  }

  export type UserSumAggregateOutputType = {
    hypeScore: number | null
    sawaCurrency: number | null
    keysAvailable: number | null
    walletBalance: number | null
    locksUntilMysteryCop: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    avatar: string | null
    hypeScore: number | null
    sawaCurrency: number | null
    keysAvailable: number | null
    activeCardId: string | null
    walletBalance: number | null
    locksUntilMysteryCop: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    avatar: string | null
    hypeScore: number | null
    sawaCurrency: number | null
    keysAvailable: number | null
    activeCardId: string | null
    walletBalance: number | null
    locksUntilMysteryCop: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    passwordHash: number
    name: number
    avatar: number
    hypeScore: number
    sawaCurrency: number
    keysAvailable: number
    activeCardId: number
    walletBalance: number
    locksUntilMysteryCop: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    hypeScore?: true
    sawaCurrency?: true
    keysAvailable?: true
    walletBalance?: true
    locksUntilMysteryCop?: true
  }

  export type UserSumAggregateInputType = {
    hypeScore?: true
    sawaCurrency?: true
    keysAvailable?: true
    walletBalance?: true
    locksUntilMysteryCop?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    name?: true
    avatar?: true
    hypeScore?: true
    sawaCurrency?: true
    keysAvailable?: true
    activeCardId?: true
    walletBalance?: true
    locksUntilMysteryCop?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    name?: true
    avatar?: true
    hypeScore?: true
    sawaCurrency?: true
    keysAvailable?: true
    activeCardId?: true
    walletBalance?: true
    locksUntilMysteryCop?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    passwordHash?: true
    name?: true
    avatar?: true
    hypeScore?: true
    sawaCurrency?: true
    keysAvailable?: true
    activeCardId?: true
    walletBalance?: true
    locksUntilMysteryCop?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    passwordHash: string
    name: string
    avatar: string
    hypeScore: number
    sawaCurrency: number
    keysAvailable: number
    activeCardId: string | null
    walletBalance: number
    locksUntilMysteryCop: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    avatar?: boolean
    hypeScore?: boolean
    sawaCurrency?: boolean
    keysAvailable?: boolean
    activeCardId?: boolean
    walletBalance?: boolean
    locksUntilMysteryCop?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inventory?: boolean | User$inventoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    avatar?: boolean
    hypeScore?: boolean
    sawaCurrency?: boolean
    keysAvailable?: boolean
    activeCardId?: boolean
    walletBalance?: boolean
    locksUntilMysteryCop?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    avatar?: boolean
    hypeScore?: boolean
    sawaCurrency?: boolean
    keysAvailable?: boolean
    activeCardId?: boolean
    walletBalance?: boolean
    locksUntilMysteryCop?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    avatar?: boolean
    hypeScore?: boolean
    sawaCurrency?: boolean
    keysAvailable?: boolean
    activeCardId?: boolean
    walletBalance?: boolean
    locksUntilMysteryCop?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "passwordHash" | "name" | "avatar" | "hypeScore" | "sawaCurrency" | "keysAvailable" | "activeCardId" | "walletBalance" | "locksUntilMysteryCop" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | User$inventoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      inventory: Prisma.$UserCardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      passwordHash: string
      name: string
      avatar: string
      hypeScore: number
      sawaCurrency: number
      keysAvailable: number
      activeCardId: string | null
      walletBalance: number
      locksUntilMysteryCop: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventory<T extends User$inventoryArgs<ExtArgs> = {}>(args?: Subset<T, User$inventoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly hypeScore: FieldRef<"User", 'Int'>
    readonly sawaCurrency: FieldRef<"User", 'Int'>
    readonly keysAvailable: FieldRef<"User", 'Int'>
    readonly activeCardId: FieldRef<"User", 'String'>
    readonly walletBalance: FieldRef<"User", 'Float'>
    readonly locksUntilMysteryCop: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.inventory
   */
  export type User$inventoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    where?: UserCardWhereInput
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    cursor?: UserCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Card
   */

  export type AggregateCard = {
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  export type CardAvgAggregateOutputType = {
    dropRate: number | null
  }

  export type CardSumAggregateOutputType = {
    dropRate: number | null
  }

  export type CardMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    perkCode: string | null
    rarity: string | null
    dropRate: number | null
    usage: string | null
  }

  export type CardMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    perkCode: string | null
    rarity: string | null
    dropRate: number | null
    usage: string | null
  }

  export type CardCountAggregateOutputType = {
    id: number
    name: number
    description: number
    perkCode: number
    rarity: number
    dropRate: number
    usage: number
    _all: number
  }


  export type CardAvgAggregateInputType = {
    dropRate?: true
  }

  export type CardSumAggregateInputType = {
    dropRate?: true
  }

  export type CardMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    perkCode?: true
    rarity?: true
    dropRate?: true
    usage?: true
  }

  export type CardMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    perkCode?: true
    rarity?: true
    dropRate?: true
    usage?: true
  }

  export type CardCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    perkCode?: true
    rarity?: true
    dropRate?: true
    usage?: true
    _all?: true
  }

  export type CardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Card to aggregate.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cards
    **/
    _count?: true | CardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardMaxAggregateInputType
  }

  export type GetCardAggregateType<T extends CardAggregateArgs> = {
        [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard[P]>
      : GetScalarType<T[P], AggregateCard[P]>
  }




  export type CardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
    orderBy?: CardOrderByWithAggregationInput | CardOrderByWithAggregationInput[]
    by: CardScalarFieldEnum[] | CardScalarFieldEnum
    having?: CardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardCountAggregateInputType | true
    _avg?: CardAvgAggregateInputType
    _sum?: CardSumAggregateInputType
    _min?: CardMinAggregateInputType
    _max?: CardMaxAggregateInputType
  }

  export type CardGroupByOutputType = {
    id: string
    name: string
    description: string
    perkCode: string
    rarity: string
    dropRate: number
    usage: string
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  type GetCardGroupByPayload<T extends CardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardGroupByOutputType[P]>
            : GetScalarType<T[P], CardGroupByOutputType[P]>
        }
      >
    >


  export type CardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    perkCode?: boolean
    rarity?: boolean
    dropRate?: boolean
    usage?: boolean
    users?: boolean | Card$usersArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type CardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    perkCode?: boolean
    rarity?: boolean
    dropRate?: boolean
    usage?: boolean
  }, ExtArgs["result"]["card"]>

  export type CardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    perkCode?: boolean
    rarity?: boolean
    dropRate?: boolean
    usage?: boolean
  }, ExtArgs["result"]["card"]>

  export type CardSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    perkCode?: boolean
    rarity?: boolean
    dropRate?: boolean
    usage?: boolean
  }

  export type CardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "perkCode" | "rarity" | "dropRate" | "usage", ExtArgs["result"]["card"]>
  export type CardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Card$usersArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Card"
    objects: {
      users: Prisma.$UserCardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      perkCode: string
      rarity: string
      dropRate: number
      usage: string
    }, ExtArgs["result"]["card"]>
    composites: {}
  }

  type CardGetPayload<S extends boolean | null | undefined | CardDefaultArgs> = $Result.GetResult<Prisma.$CardPayload, S>

  type CardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardCountAggregateInputType | true
    }

  export interface CardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Card'], meta: { name: 'Card' } }
    /**
     * Find zero or one Card that matches the filter.
     * @param {CardFindUniqueArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardFindUniqueArgs>(args: SelectSubset<T, CardFindUniqueArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Card that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardFindUniqueOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardFindUniqueOrThrowArgs>(args: SelectSubset<T, CardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardFindFirstArgs>(args?: SelectSubset<T, CardFindFirstArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardFindFirstOrThrowArgs>(args?: SelectSubset<T, CardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cards
     * const cards = await prisma.card.findMany()
     * 
     * // Get first 10 Cards
     * const cards = await prisma.card.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardWithIdOnly = await prisma.card.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardFindManyArgs>(args?: SelectSubset<T, CardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Card.
     * @param {CardCreateArgs} args - Arguments to create a Card.
     * @example
     * // Create one Card
     * const Card = await prisma.card.create({
     *   data: {
     *     // ... data to create a Card
     *   }
     * })
     * 
     */
    create<T extends CardCreateArgs>(args: SelectSubset<T, CardCreateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cards.
     * @param {CardCreateManyArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardCreateManyArgs>(args?: SelectSubset<T, CardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cards and returns the data saved in the database.
     * @param {CardCreateManyAndReturnArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CardCreateManyAndReturnArgs>(args?: SelectSubset<T, CardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Card.
     * @param {CardDeleteArgs} args - Arguments to delete one Card.
     * @example
     * // Delete one Card
     * const Card = await prisma.card.delete({
     *   where: {
     *     // ... filter to delete one Card
     *   }
     * })
     * 
     */
    delete<T extends CardDeleteArgs>(args: SelectSubset<T, CardDeleteArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Card.
     * @param {CardUpdateArgs} args - Arguments to update one Card.
     * @example
     * // Update one Card
     * const card = await prisma.card.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardUpdateArgs>(args: SelectSubset<T, CardUpdateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cards.
     * @param {CardDeleteManyArgs} args - Arguments to filter Cards to delete.
     * @example
     * // Delete a few Cards
     * const { count } = await prisma.card.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardDeleteManyArgs>(args?: SelectSubset<T, CardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardUpdateManyArgs>(args: SelectSubset<T, CardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards and returns the data updated in the database.
     * @param {CardUpdateManyAndReturnArgs} args - Arguments to update many Cards.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CardUpdateManyAndReturnArgs>(args: SelectSubset<T, CardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Card.
     * @param {CardUpsertArgs} args - Arguments to update or create a Card.
     * @example
     * // Update or create a Card
     * const card = await prisma.card.upsert({
     *   create: {
     *     // ... data to create a Card
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card we want to update
     *   }
     * })
     */
    upsert<T extends CardUpsertArgs>(args: SelectSubset<T, CardUpsertArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardCountArgs} args - Arguments to filter Cards to count.
     * @example
     * // Count the number of Cards
     * const count = await prisma.card.count({
     *   where: {
     *     // ... the filter for the Cards we want to count
     *   }
     * })
    **/
    count<T extends CardCountArgs>(
      args?: Subset<T, CardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardAggregateArgs>(args: Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>

    /**
     * Group by Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardGroupByArgs['orderBy'] }
        : { orderBy?: CardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Card model
   */
  readonly fields: CardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Card.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Card$usersArgs<ExtArgs> = {}>(args?: Subset<T, Card$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Card model
   */
  interface CardFieldRefs {
    readonly id: FieldRef<"Card", 'String'>
    readonly name: FieldRef<"Card", 'String'>
    readonly description: FieldRef<"Card", 'String'>
    readonly perkCode: FieldRef<"Card", 'String'>
    readonly rarity: FieldRef<"Card", 'String'>
    readonly dropRate: FieldRef<"Card", 'Float'>
    readonly usage: FieldRef<"Card", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Card findUnique
   */
  export type CardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findUniqueOrThrow
   */
  export type CardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findFirst
   */
  export type CardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findFirstOrThrow
   */
  export type CardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findMany
   */
  export type CardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Cards to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card create
   */
  export type CardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to create a Card.
     */
    data: XOR<CardCreateInput, CardUncheckedCreateInput>
  }

  /**
   * Card createMany
   */
  export type CardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
  }

  /**
   * Card createManyAndReturn
   */
  export type CardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
  }

  /**
   * Card update
   */
  export type CardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to update a Card.
     */
    data: XOR<CardUpdateInput, CardUncheckedUpdateInput>
    /**
     * Choose, which Card to update.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card updateMany
   */
  export type CardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to update.
     */
    limit?: number
  }

  /**
   * Card updateManyAndReturn
   */
  export type CardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to update.
     */
    limit?: number
  }

  /**
   * Card upsert
   */
  export type CardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The filter to search for the Card to update in case it exists.
     */
    where: CardWhereUniqueInput
    /**
     * In case the Card found by the `where` argument doesn't exist, create a new Card with this data.
     */
    create: XOR<CardCreateInput, CardUncheckedCreateInput>
    /**
     * In case the Card was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardUpdateInput, CardUncheckedUpdateInput>
  }

  /**
   * Card delete
   */
  export type CardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter which Card to delete.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card deleteMany
   */
  export type CardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cards to delete
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to delete.
     */
    limit?: number
  }

  /**
   * Card.users
   */
  export type Card$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    where?: UserCardWhereInput
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    cursor?: UserCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * Card without action
   */
  export type CardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
  }


  /**
   * Model UserCard
   */

  export type AggregateUserCard = {
    _count: UserCardCountAggregateOutputType | null
    _avg: UserCardAvgAggregateOutputType | null
    _sum: UserCardSumAggregateOutputType | null
    _min: UserCardMinAggregateOutputType | null
    _max: UserCardMaxAggregateOutputType | null
  }

  export type UserCardAvgAggregateOutputType = {
    remainingValue: number | null
  }

  export type UserCardSumAggregateOutputType = {
    remainingValue: number | null
  }

  export type UserCardMinAggregateOutputType = {
    id: string | null
    userId: string | null
    cardId: string | null
    isUsed: boolean | null
    remainingValue: number | null
    acquiredAt: Date | null
  }

  export type UserCardMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    cardId: string | null
    isUsed: boolean | null
    remainingValue: number | null
    acquiredAt: Date | null
  }

  export type UserCardCountAggregateOutputType = {
    id: number
    userId: number
    cardId: number
    isUsed: number
    remainingValue: number
    acquiredAt: number
    _all: number
  }


  export type UserCardAvgAggregateInputType = {
    remainingValue?: true
  }

  export type UserCardSumAggregateInputType = {
    remainingValue?: true
  }

  export type UserCardMinAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    isUsed?: true
    remainingValue?: true
    acquiredAt?: true
  }

  export type UserCardMaxAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    isUsed?: true
    remainingValue?: true
    acquiredAt?: true
  }

  export type UserCardCountAggregateInputType = {
    id?: true
    userId?: true
    cardId?: true
    isUsed?: true
    remainingValue?: true
    acquiredAt?: true
    _all?: true
  }

  export type UserCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCard to aggregate.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCards
    **/
    _count?: true | UserCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCardMaxAggregateInputType
  }

  export type GetUserCardAggregateType<T extends UserCardAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCard[P]>
      : GetScalarType<T[P], AggregateUserCard[P]>
  }




  export type UserCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardWhereInput
    orderBy?: UserCardOrderByWithAggregationInput | UserCardOrderByWithAggregationInput[]
    by: UserCardScalarFieldEnum[] | UserCardScalarFieldEnum
    having?: UserCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCardCountAggregateInputType | true
    _avg?: UserCardAvgAggregateInputType
    _sum?: UserCardSumAggregateInputType
    _min?: UserCardMinAggregateInputType
    _max?: UserCardMaxAggregateInputType
  }

  export type UserCardGroupByOutputType = {
    id: string
    userId: string
    cardId: string
    isUsed: boolean
    remainingValue: number | null
    acquiredAt: Date
    _count: UserCardCountAggregateOutputType | null
    _avg: UserCardAvgAggregateOutputType | null
    _sum: UserCardSumAggregateOutputType | null
    _min: UserCardMinAggregateOutputType | null
    _max: UserCardMaxAggregateOutputType | null
  }

  type GetUserCardGroupByPayload<T extends UserCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCardGroupByOutputType[P]>
            : GetScalarType<T[P], UserCardGroupByOutputType[P]>
        }
      >
    >


  export type UserCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    isUsed?: boolean
    remainingValue?: boolean
    acquiredAt?: boolean
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCard"]>

  export type UserCardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    isUsed?: boolean
    remainingValue?: boolean
    acquiredAt?: boolean
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCard"]>

  export type UserCardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardId?: boolean
    isUsed?: boolean
    remainingValue?: boolean
    acquiredAt?: boolean
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCard"]>

  export type UserCardSelectScalar = {
    id?: boolean
    userId?: boolean
    cardId?: boolean
    isUsed?: boolean
    remainingValue?: boolean
    acquiredAt?: boolean
  }

  export type UserCardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "cardId" | "isUsed" | "remainingValue" | "acquiredAt", ExtArgs["result"]["userCard"]>
  export type UserCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserCardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserCardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCard"
    objects: {
      card: Prisma.$CardPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      cardId: string
      isUsed: boolean
      remainingValue: number | null
      acquiredAt: Date
    }, ExtArgs["result"]["userCard"]>
    composites: {}
  }

  type UserCardGetPayload<S extends boolean | null | undefined | UserCardDefaultArgs> = $Result.GetResult<Prisma.$UserCardPayload, S>

  type UserCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCardCountAggregateInputType | true
    }

  export interface UserCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCard'], meta: { name: 'UserCard' } }
    /**
     * Find zero or one UserCard that matches the filter.
     * @param {UserCardFindUniqueArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCardFindUniqueArgs>(args: SelectSubset<T, UserCardFindUniqueArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCardFindUniqueOrThrowArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCardFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardFindFirstArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCardFindFirstArgs>(args?: SelectSubset<T, UserCardFindFirstArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardFindFirstOrThrowArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCardFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCards
     * const userCards = await prisma.userCard.findMany()
     * 
     * // Get first 10 UserCards
     * const userCards = await prisma.userCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCardWithIdOnly = await prisma.userCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCardFindManyArgs>(args?: SelectSubset<T, UserCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCard.
     * @param {UserCardCreateArgs} args - Arguments to create a UserCard.
     * @example
     * // Create one UserCard
     * const UserCard = await prisma.userCard.create({
     *   data: {
     *     // ... data to create a UserCard
     *   }
     * })
     * 
     */
    create<T extends UserCardCreateArgs>(args: SelectSubset<T, UserCardCreateArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCards.
     * @param {UserCardCreateManyArgs} args - Arguments to create many UserCards.
     * @example
     * // Create many UserCards
     * const userCard = await prisma.userCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCardCreateManyArgs>(args?: SelectSubset<T, UserCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCards and returns the data saved in the database.
     * @param {UserCardCreateManyAndReturnArgs} args - Arguments to create many UserCards.
     * @example
     * // Create many UserCards
     * const userCard = await prisma.userCard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCards and only return the `id`
     * const userCardWithIdOnly = await prisma.userCard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCardCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCard.
     * @param {UserCardDeleteArgs} args - Arguments to delete one UserCard.
     * @example
     * // Delete one UserCard
     * const UserCard = await prisma.userCard.delete({
     *   where: {
     *     // ... filter to delete one UserCard
     *   }
     * })
     * 
     */
    delete<T extends UserCardDeleteArgs>(args: SelectSubset<T, UserCardDeleteArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCard.
     * @param {UserCardUpdateArgs} args - Arguments to update one UserCard.
     * @example
     * // Update one UserCard
     * const userCard = await prisma.userCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCardUpdateArgs>(args: SelectSubset<T, UserCardUpdateArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCards.
     * @param {UserCardDeleteManyArgs} args - Arguments to filter UserCards to delete.
     * @example
     * // Delete a few UserCards
     * const { count } = await prisma.userCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCardDeleteManyArgs>(args?: SelectSubset<T, UserCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCards
     * const userCard = await prisma.userCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCardUpdateManyArgs>(args: SelectSubset<T, UserCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCards and returns the data updated in the database.
     * @param {UserCardUpdateManyAndReturnArgs} args - Arguments to update many UserCards.
     * @example
     * // Update many UserCards
     * const userCard = await prisma.userCard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCards and only return the `id`
     * const userCardWithIdOnly = await prisma.userCard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserCardUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCard.
     * @param {UserCardUpsertArgs} args - Arguments to update or create a UserCard.
     * @example
     * // Update or create a UserCard
     * const userCard = await prisma.userCard.upsert({
     *   create: {
     *     // ... data to create a UserCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCard we want to update
     *   }
     * })
     */
    upsert<T extends UserCardUpsertArgs>(args: SelectSubset<T, UserCardUpsertArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardCountArgs} args - Arguments to filter UserCards to count.
     * @example
     * // Count the number of UserCards
     * const count = await prisma.userCard.count({
     *   where: {
     *     // ... the filter for the UserCards we want to count
     *   }
     * })
    **/
    count<T extends UserCardCountArgs>(
      args?: Subset<T, UserCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCardAggregateArgs>(args: Subset<T, UserCardAggregateArgs>): Prisma.PrismaPromise<GetUserCardAggregateType<T>>

    /**
     * Group by UserCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCardGroupByArgs['orderBy'] }
        : { orderBy?: UserCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCard model
   */
  readonly fields: UserCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    card<T extends CardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardDefaultArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCard model
   */
  interface UserCardFieldRefs {
    readonly id: FieldRef<"UserCard", 'String'>
    readonly userId: FieldRef<"UserCard", 'String'>
    readonly cardId: FieldRef<"UserCard", 'String'>
    readonly isUsed: FieldRef<"UserCard", 'Boolean'>
    readonly remainingValue: FieldRef<"UserCard", 'Float'>
    readonly acquiredAt: FieldRef<"UserCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCard findUnique
   */
  export type UserCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard findUniqueOrThrow
   */
  export type UserCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard findFirst
   */
  export type UserCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCards.
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCards.
     */
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * UserCard findFirstOrThrow
   */
  export type UserCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCards.
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCards.
     */
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * UserCard findMany
   */
  export type UserCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCards to fetch.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCards.
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * UserCard create
   */
  export type UserCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCard.
     */
    data: XOR<UserCardCreateInput, UserCardUncheckedCreateInput>
  }

  /**
   * UserCard createMany
   */
  export type UserCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCards.
     */
    data: UserCardCreateManyInput | UserCardCreateManyInput[]
  }

  /**
   * UserCard createManyAndReturn
   */
  export type UserCardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * The data used to create many UserCards.
     */
    data: UserCardCreateManyInput | UserCardCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCard update
   */
  export type UserCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCard.
     */
    data: XOR<UserCardUpdateInput, UserCardUncheckedUpdateInput>
    /**
     * Choose, which UserCard to update.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard updateMany
   */
  export type UserCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCards.
     */
    data: XOR<UserCardUpdateManyMutationInput, UserCardUncheckedUpdateManyInput>
    /**
     * Filter which UserCards to update
     */
    where?: UserCardWhereInput
    /**
     * Limit how many UserCards to update.
     */
    limit?: number
  }

  /**
   * UserCard updateManyAndReturn
   */
  export type UserCardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * The data used to update UserCards.
     */
    data: XOR<UserCardUpdateManyMutationInput, UserCardUncheckedUpdateManyInput>
    /**
     * Filter which UserCards to update
     */
    where?: UserCardWhereInput
    /**
     * Limit how many UserCards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCard upsert
   */
  export type UserCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCard to update in case it exists.
     */
    where: UserCardWhereUniqueInput
    /**
     * In case the UserCard found by the `where` argument doesn't exist, create a new UserCard with this data.
     */
    create: XOR<UserCardCreateInput, UserCardUncheckedCreateInput>
    /**
     * In case the UserCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCardUpdateInput, UserCardUncheckedUpdateInput>
  }

  /**
   * UserCard delete
   */
  export type UserCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter which UserCard to delete.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard deleteMany
   */
  export type UserCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCards to delete
     */
    where?: UserCardWhereInput
    /**
     * Limit how many UserCards to delete.
     */
    limit?: number
  }

  /**
   * UserCard without action
   */
  export type UserCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
  }


  /**
   * Model Vendor
   */

  export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  export type VendorAvgAggregateOutputType = {
    rating: number | null
    ratingCount: number | null
    commissionOwedBalance: number | null
    subsidiesOwedBalance: number | null
    lifetimeSales: number | null
    lifetimeOrders: number | null
    hypeMultiplier: number | null
  }

  export type VendorSumAggregateOutputType = {
    rating: number | null
    ratingCount: number | null
    commissionOwedBalance: number | null
    subsidiesOwedBalance: number | null
    lifetimeSales: number | null
    lifetimeOrders: number | null
    hypeMultiplier: number | null
  }

  export type VendorMinAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    image: string | null
    bannerImage: string | null
    rating: number | null
    ratingCount: number | null
    status: string | null
    announcementBanner: string | null
    instapayAddress: string | null
    instapayName: string | null
    commissionOwedBalance: number | null
    subsidiesOwedBalance: number | null
    lifetimeSales: number | null
    lifetimeOrders: number | null
    ledgerPinHash: string | null
    hypeMultiplier: number | null
    createdAt: Date | null
    updatedAt: Date | null
    announcementUpdatedAt: Date | null
  }

  export type VendorMaxAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    image: string | null
    bannerImage: string | null
    rating: number | null
    ratingCount: number | null
    status: string | null
    announcementBanner: string | null
    instapayAddress: string | null
    instapayName: string | null
    commissionOwedBalance: number | null
    subsidiesOwedBalance: number | null
    lifetimeSales: number | null
    lifetimeOrders: number | null
    ledgerPinHash: string | null
    hypeMultiplier: number | null
    createdAt: Date | null
    updatedAt: Date | null
    announcementUpdatedAt: Date | null
  }

  export type VendorCountAggregateOutputType = {
    id: number
    username: number
    passwordHash: number
    name: number
    image: number
    bannerImage: number
    rating: number
    ratingCount: number
    status: number
    announcementBanner: number
    instapayAddress: number
    instapayName: number
    commissionOwedBalance: number
    subsidiesOwedBalance: number
    lifetimeSales: number
    lifetimeOrders: number
    ledgerPinHash: number
    hypeMultiplier: number
    createdAt: number
    updatedAt: number
    announcementUpdatedAt: number
    _all: number
  }


  export type VendorAvgAggregateInputType = {
    rating?: true
    ratingCount?: true
    commissionOwedBalance?: true
    subsidiesOwedBalance?: true
    lifetimeSales?: true
    lifetimeOrders?: true
    hypeMultiplier?: true
  }

  export type VendorSumAggregateInputType = {
    rating?: true
    ratingCount?: true
    commissionOwedBalance?: true
    subsidiesOwedBalance?: true
    lifetimeSales?: true
    lifetimeOrders?: true
    hypeMultiplier?: true
  }

  export type VendorMinAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    image?: true
    bannerImage?: true
    rating?: true
    ratingCount?: true
    status?: true
    announcementBanner?: true
    instapayAddress?: true
    instapayName?: true
    commissionOwedBalance?: true
    subsidiesOwedBalance?: true
    lifetimeSales?: true
    lifetimeOrders?: true
    ledgerPinHash?: true
    hypeMultiplier?: true
    createdAt?: true
    updatedAt?: true
    announcementUpdatedAt?: true
  }

  export type VendorMaxAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    image?: true
    bannerImage?: true
    rating?: true
    ratingCount?: true
    status?: true
    announcementBanner?: true
    instapayAddress?: true
    instapayName?: true
    commissionOwedBalance?: true
    subsidiesOwedBalance?: true
    lifetimeSales?: true
    lifetimeOrders?: true
    ledgerPinHash?: true
    hypeMultiplier?: true
    createdAt?: true
    updatedAt?: true
    announcementUpdatedAt?: true
  }

  export type VendorCountAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    image?: true
    bannerImage?: true
    rating?: true
    ratingCount?: true
    status?: true
    announcementBanner?: true
    instapayAddress?: true
    instapayName?: true
    commissionOwedBalance?: true
    subsidiesOwedBalance?: true
    lifetimeSales?: true
    lifetimeOrders?: true
    ledgerPinHash?: true
    hypeMultiplier?: true
    createdAt?: true
    updatedAt?: true
    announcementUpdatedAt?: true
    _all?: true
  }

  export type VendorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendor to aggregate.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendors
    **/
    _count?: true | VendorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorMaxAggregateInputType
  }

  export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
        [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendor[P]>
      : GetScalarType<T[P], AggregateVendor[P]>
  }




  export type VendorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorWhereInput
    orderBy?: VendorOrderByWithAggregationInput | VendorOrderByWithAggregationInput[]
    by: VendorScalarFieldEnum[] | VendorScalarFieldEnum
    having?: VendorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorCountAggregateInputType | true
    _avg?: VendorAvgAggregateInputType
    _sum?: VendorSumAggregateInputType
    _min?: VendorMinAggregateInputType
    _max?: VendorMaxAggregateInputType
  }

  export type VendorGroupByOutputType = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage: string | null
    rating: number
    ratingCount: number
    status: string
    announcementBanner: string | null
    instapayAddress: string | null
    instapayName: string | null
    commissionOwedBalance: number
    subsidiesOwedBalance: number
    lifetimeSales: number
    lifetimeOrders: number
    ledgerPinHash: string | null
    hypeMultiplier: number
    createdAt: Date
    updatedAt: Date
    announcementUpdatedAt: Date | null
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorGroupByOutputType[P]>
            : GetScalarType<T[P], VendorGroupByOutputType[P]>
        }
      >
    >


  export type VendorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    image?: boolean
    bannerImage?: boolean
    rating?: boolean
    ratingCount?: boolean
    status?: boolean
    announcementBanner?: boolean
    instapayAddress?: boolean
    instapayName?: boolean
    commissionOwedBalance?: boolean
    subsidiesOwedBalance?: boolean
    lifetimeSales?: boolean
    lifetimeOrders?: boolean
    ledgerPinHash?: boolean
    hypeMultiplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    announcementUpdatedAt?: boolean
    menuItems?: boolean | Vendor$menuItemsArgs<ExtArgs>
    orders?: boolean | Vendor$ordersArgs<ExtArgs>
    _count?: boolean | VendorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    image?: boolean
    bannerImage?: boolean
    rating?: boolean
    ratingCount?: boolean
    status?: boolean
    announcementBanner?: boolean
    instapayAddress?: boolean
    instapayName?: boolean
    commissionOwedBalance?: boolean
    subsidiesOwedBalance?: boolean
    lifetimeSales?: boolean
    lifetimeOrders?: boolean
    ledgerPinHash?: boolean
    hypeMultiplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    announcementUpdatedAt?: boolean
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    image?: boolean
    bannerImage?: boolean
    rating?: boolean
    ratingCount?: boolean
    status?: boolean
    announcementBanner?: boolean
    instapayAddress?: boolean
    instapayName?: boolean
    commissionOwedBalance?: boolean
    subsidiesOwedBalance?: boolean
    lifetimeSales?: boolean
    lifetimeOrders?: boolean
    ledgerPinHash?: boolean
    hypeMultiplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    announcementUpdatedAt?: boolean
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectScalar = {
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    image?: boolean
    bannerImage?: boolean
    rating?: boolean
    ratingCount?: boolean
    status?: boolean
    announcementBanner?: boolean
    instapayAddress?: boolean
    instapayName?: boolean
    commissionOwedBalance?: boolean
    subsidiesOwedBalance?: boolean
    lifetimeSales?: boolean
    lifetimeOrders?: boolean
    ledgerPinHash?: boolean
    hypeMultiplier?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    announcementUpdatedAt?: boolean
  }

  export type VendorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "passwordHash" | "name" | "image" | "bannerImage" | "rating" | "ratingCount" | "status" | "announcementBanner" | "instapayAddress" | "instapayName" | "commissionOwedBalance" | "subsidiesOwedBalance" | "lifetimeSales" | "lifetimeOrders" | "ledgerPinHash" | "hypeMultiplier" | "createdAt" | "updatedAt" | "announcementUpdatedAt", ExtArgs["result"]["vendor"]>
  export type VendorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menuItems?: boolean | Vendor$menuItemsArgs<ExtArgs>
    orders?: boolean | Vendor$ordersArgs<ExtArgs>
    _count?: boolean | VendorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VendorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VendorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vendor"
    objects: {
      menuItems: Prisma.$MenuItemPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      passwordHash: string
      name: string
      image: string
      bannerImage: string | null
      rating: number
      ratingCount: number
      status: string
      announcementBanner: string | null
      instapayAddress: string | null
      instapayName: string | null
      commissionOwedBalance: number
      subsidiesOwedBalance: number
      lifetimeSales: number
      lifetimeOrders: number
      ledgerPinHash: string | null
      hypeMultiplier: number
      createdAt: Date
      updatedAt: Date
      announcementUpdatedAt: Date | null
    }, ExtArgs["result"]["vendor"]>
    composites: {}
  }

  type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = $Result.GetResult<Prisma.$VendorPayload, S>

  type VendorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorCountAggregateInputType | true
    }

  export interface VendorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vendor'], meta: { name: 'Vendor' } }
    /**
     * Find zero or one Vendor that matches the filter.
     * @param {VendorFindUniqueArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorFindUniqueArgs>(args: SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vendor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorFindUniqueOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorFindFirstArgs>(args?: SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendor.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorWithIdOnly = await prisma.vendor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorFindManyArgs>(args?: SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vendor.
     * @param {VendorCreateArgs} args - Arguments to create a Vendor.
     * @example
     * // Create one Vendor
     * const Vendor = await prisma.vendor.create({
     *   data: {
     *     // ... data to create a Vendor
     *   }
     * })
     * 
     */
    create<T extends VendorCreateArgs>(args: SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendors.
     * @param {VendorCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorCreateManyArgs>(args?: SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vendor.
     * @param {VendorDeleteArgs} args - Arguments to delete one Vendor.
     * @example
     * // Delete one Vendor
     * const Vendor = await prisma.vendor.delete({
     *   where: {
     *     // ... filter to delete one Vendor
     *   }
     * })
     * 
     */
    delete<T extends VendorDeleteArgs>(args: SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vendor.
     * @param {VendorUpdateArgs} args - Arguments to update one Vendor.
     * @example
     * // Update one Vendor
     * const vendor = await prisma.vendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorUpdateArgs>(args: SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendors.
     * @param {VendorDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorDeleteManyArgs>(args?: SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorUpdateManyArgs>(args: SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors and returns the data updated in the database.
     * @param {VendorUpdateManyAndReturnArgs} args - Arguments to update many Vendors.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vendor.
     * @param {VendorUpsertArgs} args - Arguments to update or create a Vendor.
     * @example
     * // Update or create a Vendor
     * const vendor = await prisma.vendor.upsert({
     *   create: {
     *     // ... data to create a Vendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendor we want to update
     *   }
     * })
     */
    upsert<T extends VendorUpsertArgs>(args: SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendor.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorCountArgs>(
      args?: Subset<T, VendorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorAggregateArgs>(args: Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>

    /**
     * Group by Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorGroupByArgs['orderBy'] }
        : { orderBy?: VendorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vendor model
   */
  readonly fields: VendorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vendor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menuItems<T extends Vendor$menuItemsArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$menuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Vendor$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vendor model
   */
  interface VendorFieldRefs {
    readonly id: FieldRef<"Vendor", 'String'>
    readonly username: FieldRef<"Vendor", 'String'>
    readonly passwordHash: FieldRef<"Vendor", 'String'>
    readonly name: FieldRef<"Vendor", 'String'>
    readonly image: FieldRef<"Vendor", 'String'>
    readonly bannerImage: FieldRef<"Vendor", 'String'>
    readonly rating: FieldRef<"Vendor", 'Float'>
    readonly ratingCount: FieldRef<"Vendor", 'Int'>
    readonly status: FieldRef<"Vendor", 'String'>
    readonly announcementBanner: FieldRef<"Vendor", 'String'>
    readonly instapayAddress: FieldRef<"Vendor", 'String'>
    readonly instapayName: FieldRef<"Vendor", 'String'>
    readonly commissionOwedBalance: FieldRef<"Vendor", 'Float'>
    readonly subsidiesOwedBalance: FieldRef<"Vendor", 'Float'>
    readonly lifetimeSales: FieldRef<"Vendor", 'Float'>
    readonly lifetimeOrders: FieldRef<"Vendor", 'Int'>
    readonly ledgerPinHash: FieldRef<"Vendor", 'String'>
    readonly hypeMultiplier: FieldRef<"Vendor", 'Float'>
    readonly createdAt: FieldRef<"Vendor", 'DateTime'>
    readonly updatedAt: FieldRef<"Vendor", 'DateTime'>
    readonly announcementUpdatedAt: FieldRef<"Vendor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vendor findUnique
   */
  export type VendorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findUniqueOrThrow
   */
  export type VendorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findFirst
   */
  export type VendorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findFirstOrThrow
   */
  export type VendorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findMany
   */
  export type VendorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor create
   */
  export type VendorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to create a Vendor.
     */
    data: XOR<VendorCreateInput, VendorUncheckedCreateInput>
  }

  /**
   * Vendor createMany
   */
  export type VendorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
  }

  /**
   * Vendor createManyAndReturn
   */
  export type VendorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
  }

  /**
   * Vendor update
   */
  export type VendorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to update a Vendor.
     */
    data: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
    /**
     * Choose, which Vendor to update.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor updateMany
   */
  export type VendorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendor updateManyAndReturn
   */
  export type VendorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendor upsert
   */
  export type VendorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The filter to search for the Vendor to update in case it exists.
     */
    where: VendorWhereUniqueInput
    /**
     * In case the Vendor found by the `where` argument doesn't exist, create a new Vendor with this data.
     */
    create: XOR<VendorCreateInput, VendorUncheckedCreateInput>
    /**
     * In case the Vendor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
  }

  /**
   * Vendor delete
   */
  export type VendorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter which Vendor to delete.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor deleteMany
   */
  export type VendorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to delete.
     */
    limit?: number
  }

  /**
   * Vendor.menuItems
   */
  export type Vendor$menuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    cursor?: MenuItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * Vendor.orders
   */
  export type Vendor$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Vendor without action
   */
  export type VendorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
  }


  /**
   * Model MenuItem
   */

  export type AggregateMenuItem = {
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  export type MenuItemAvgAggregateOutputType = {
    price: number | null
    requiredHypeLevel: number | null
  }

  export type MenuItemSumAggregateOutputType = {
    price: number | null
    requiredHypeLevel: number | null
  }

  export type MenuItemMinAggregateOutputType = {
    id: string | null
    vendorId: string | null
    name: string | null
    description: string | null
    price: number | null
    image: string | null
    inStock: boolean | null
    requiredHypeLevel: number | null
    category: string | null
    addOns: string | null
  }

  export type MenuItemMaxAggregateOutputType = {
    id: string | null
    vendorId: string | null
    name: string | null
    description: string | null
    price: number | null
    image: string | null
    inStock: boolean | null
    requiredHypeLevel: number | null
    category: string | null
    addOns: string | null
  }

  export type MenuItemCountAggregateOutputType = {
    id: number
    vendorId: number
    name: number
    description: number
    price: number
    image: number
    inStock: number
    requiredHypeLevel: number
    category: number
    addOns: number
    _all: number
  }


  export type MenuItemAvgAggregateInputType = {
    price?: true
    requiredHypeLevel?: true
  }

  export type MenuItemSumAggregateInputType = {
    price?: true
    requiredHypeLevel?: true
  }

  export type MenuItemMinAggregateInputType = {
    id?: true
    vendorId?: true
    name?: true
    description?: true
    price?: true
    image?: true
    inStock?: true
    requiredHypeLevel?: true
    category?: true
    addOns?: true
  }

  export type MenuItemMaxAggregateInputType = {
    id?: true
    vendorId?: true
    name?: true
    description?: true
    price?: true
    image?: true
    inStock?: true
    requiredHypeLevel?: true
    category?: true
    addOns?: true
  }

  export type MenuItemCountAggregateInputType = {
    id?: true
    vendorId?: true
    name?: true
    description?: true
    price?: true
    image?: true
    inStock?: true
    requiredHypeLevel?: true
    category?: true
    addOns?: true
    _all?: true
  }

  export type MenuItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItem to aggregate.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuItems
    **/
    _count?: true | MenuItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuItemMaxAggregateInputType
  }

  export type GetMenuItemAggregateType<T extends MenuItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuItem[P]>
      : GetScalarType<T[P], AggregateMenuItem[P]>
  }




  export type MenuItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithAggregationInput | MenuItemOrderByWithAggregationInput[]
    by: MenuItemScalarFieldEnum[] | MenuItemScalarFieldEnum
    having?: MenuItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuItemCountAggregateInputType | true
    _avg?: MenuItemAvgAggregateInputType
    _sum?: MenuItemSumAggregateInputType
    _min?: MenuItemMinAggregateInputType
    _max?: MenuItemMaxAggregateInputType
  }

  export type MenuItemGroupByOutputType = {
    id: string
    vendorId: string
    name: string
    description: string
    price: number
    image: string
    inStock: boolean
    requiredHypeLevel: number
    category: string
    addOns: string
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  type GetMenuItemGroupByPayload<T extends MenuItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
            : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
        }
      >
    >


  export type MenuItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    inStock?: boolean
    requiredHypeLevel?: boolean
    category?: boolean
    addOns?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    inStock?: boolean
    requiredHypeLevel?: boolean
    category?: boolean
    addOns?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    inStock?: boolean
    requiredHypeLevel?: boolean
    category?: boolean
    addOns?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectScalar = {
    id?: boolean
    vendorId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    inStock?: boolean
    requiredHypeLevel?: boolean
    category?: boolean
    addOns?: boolean
  }

  export type MenuItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vendorId" | "name" | "description" | "price" | "image" | "inStock" | "requiredHypeLevel" | "category" | "addOns", ExtArgs["result"]["menuItem"]>
  export type MenuItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }

  export type $MenuItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuItem"
    objects: {
      vendor: Prisma.$VendorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vendorId: string
      name: string
      description: string
      price: number
      image: string
      inStock: boolean
      requiredHypeLevel: number
      category: string
      addOns: string
    }, ExtArgs["result"]["menuItem"]>
    composites: {}
  }

  type MenuItemGetPayload<S extends boolean | null | undefined | MenuItemDefaultArgs> = $Result.GetResult<Prisma.$MenuItemPayload, S>

  type MenuItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuItemCountAggregateInputType | true
    }

  export interface MenuItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuItem'], meta: { name: 'MenuItem' } }
    /**
     * Find zero or one MenuItem that matches the filter.
     * @param {MenuItemFindUniqueArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuItemFindUniqueArgs>(args: SelectSubset<T, MenuItemFindUniqueArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MenuItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuItemFindUniqueOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuItemFindFirstArgs>(args?: SelectSubset<T, MenuItemFindFirstArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuItems
     * const menuItems = await prisma.menuItem.findMany()
     * 
     * // Get first 10 MenuItems
     * const menuItems = await prisma.menuItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuItemFindManyArgs>(args?: SelectSubset<T, MenuItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MenuItem.
     * @param {MenuItemCreateArgs} args - Arguments to create a MenuItem.
     * @example
     * // Create one MenuItem
     * const MenuItem = await prisma.menuItem.create({
     *   data: {
     *     // ... data to create a MenuItem
     *   }
     * })
     * 
     */
    create<T extends MenuItemCreateArgs>(args: SelectSubset<T, MenuItemCreateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MenuItems.
     * @param {MenuItemCreateManyArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuItemCreateManyArgs>(args?: SelectSubset<T, MenuItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuItems and returns the data saved in the database.
     * @param {MenuItemCreateManyAndReturnArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MenuItem.
     * @param {MenuItemDeleteArgs} args - Arguments to delete one MenuItem.
     * @example
     * // Delete one MenuItem
     * const MenuItem = await prisma.menuItem.delete({
     *   where: {
     *     // ... filter to delete one MenuItem
     *   }
     * })
     * 
     */
    delete<T extends MenuItemDeleteArgs>(args: SelectSubset<T, MenuItemDeleteArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MenuItem.
     * @param {MenuItemUpdateArgs} args - Arguments to update one MenuItem.
     * @example
     * // Update one MenuItem
     * const menuItem = await prisma.menuItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuItemUpdateArgs>(args: SelectSubset<T, MenuItemUpdateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MenuItems.
     * @param {MenuItemDeleteManyArgs} args - Arguments to filter MenuItems to delete.
     * @example
     * // Delete a few MenuItems
     * const { count } = await prisma.menuItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuItemDeleteManyArgs>(args?: SelectSubset<T, MenuItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuItemUpdateManyArgs>(args: SelectSubset<T, MenuItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems and returns the data updated in the database.
     * @param {MenuItemUpdateManyAndReturnArgs} args - Arguments to update many MenuItems.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MenuItemUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MenuItem.
     * @param {MenuItemUpsertArgs} args - Arguments to update or create a MenuItem.
     * @example
     * // Update or create a MenuItem
     * const menuItem = await prisma.menuItem.upsert({
     *   create: {
     *     // ... data to create a MenuItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuItem we want to update
     *   }
     * })
     */
    upsert<T extends MenuItemUpsertArgs>(args: SelectSubset<T, MenuItemUpsertArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemCountArgs} args - Arguments to filter MenuItems to count.
     * @example
     * // Count the number of MenuItems
     * const count = await prisma.menuItem.count({
     *   where: {
     *     // ... the filter for the MenuItems we want to count
     *   }
     * })
    **/
    count<T extends MenuItemCountArgs>(
      args?: Subset<T, MenuItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuItemAggregateArgs>(args: Subset<T, MenuItemAggregateArgs>): Prisma.PrismaPromise<GetMenuItemAggregateType<T>>

    /**
     * Group by MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuItemGroupByArgs['orderBy'] }
        : { orderBy?: MenuItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuItem model
   */
  readonly fields: MenuItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenuItem model
   */
  interface MenuItemFieldRefs {
    readonly id: FieldRef<"MenuItem", 'String'>
    readonly vendorId: FieldRef<"MenuItem", 'String'>
    readonly name: FieldRef<"MenuItem", 'String'>
    readonly description: FieldRef<"MenuItem", 'String'>
    readonly price: FieldRef<"MenuItem", 'Float'>
    readonly image: FieldRef<"MenuItem", 'String'>
    readonly inStock: FieldRef<"MenuItem", 'Boolean'>
    readonly requiredHypeLevel: FieldRef<"MenuItem", 'Int'>
    readonly category: FieldRef<"MenuItem", 'String'>
    readonly addOns: FieldRef<"MenuItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MenuItem findUnique
   */
  export type MenuItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findUniqueOrThrow
   */
  export type MenuItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findFirst
   */
  export type MenuItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findFirstOrThrow
   */
  export type MenuItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findMany
   */
  export type MenuItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem create
   */
  export type MenuItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MenuItem.
     */
    data: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
  }

  /**
   * MenuItem createMany
   */
  export type MenuItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
  }

  /**
   * MenuItem createManyAndReturn
   */
  export type MenuItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem update
   */
  export type MenuItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MenuItem.
     */
    data: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
    /**
     * Choose, which MenuItem to update.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem updateMany
   */
  export type MenuItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
  }

  /**
   * MenuItem updateManyAndReturn
   */
  export type MenuItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem upsert
   */
  export type MenuItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MenuItem to update in case it exists.
     */
    where: MenuItemWhereUniqueInput
    /**
     * In case the MenuItem found by the `where` argument doesn't exist, create a new MenuItem with this data.
     */
    create: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
    /**
     * In case the MenuItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
  }

  /**
   * MenuItem delete
   */
  export type MenuItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter which MenuItem to delete.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem deleteMany
   */
  export type MenuItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItems to delete
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to delete.
     */
    limit?: number
  }

  /**
   * MenuItem without action
   */
  export type MenuItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalAmount: number | null
    sawaSubsidy: number | null
  }

  export type OrderSumAggregateOutputType = {
    totalAmount: number | null
    sawaSubsidy: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    hostId: string | null
    vendorId: string | null
    totalAmount: number | null
    sawaSubsidy: number | null
    isCoveredByHost: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    hostId: string | null
    vendorId: string | null
    totalAmount: number | null
    sawaSubsidy: number | null
    isCoveredByHost: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    hostId: number
    vendorId: number
    totalAmount: number
    sawaSubsidy: number
    isCoveredByHost: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalAmount?: true
    sawaSubsidy?: true
  }

  export type OrderSumAggregateInputType = {
    totalAmount?: true
    sawaSubsidy?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    hostId?: true
    vendorId?: true
    totalAmount?: true
    sawaSubsidy?: true
    isCoveredByHost?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    hostId?: true
    vendorId?: true
    totalAmount?: true
    sawaSubsidy?: true
    isCoveredByHost?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    hostId?: true
    vendorId?: true
    totalAmount?: true
    sawaSubsidy?: true
    isCoveredByHost?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    orderNumber: string
    hostId: string
    vendorId: string
    totalAmount: number
    sawaSubsidy: number
    isCoveredByHost: boolean
    status: string
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    hostId?: boolean
    vendorId?: boolean
    totalAmount?: boolean
    sawaSubsidy?: boolean
    isCoveredByHost?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    hostId?: boolean
    vendorId?: boolean
    totalAmount?: boolean
    sawaSubsidy?: boolean
    isCoveredByHost?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    hostId?: boolean
    vendorId?: boolean
    totalAmount?: boolean
    sawaSubsidy?: boolean
    isCoveredByHost?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    hostId?: boolean
    vendorId?: boolean
    totalAmount?: boolean
    sawaSubsidy?: boolean
    isCoveredByHost?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNumber" | "hostId" | "vendorId" | "totalAmount" | "sawaSubsidy" | "isCoveredByHost" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      vendor: Prisma.$VendorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNumber: string
      hostId: string
      vendorId: string
      totalAmount: number
      sawaSubsidy: number
      isCoveredByHost: boolean
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly orderNumber: FieldRef<"Order", 'String'>
    readonly hostId: FieldRef<"Order", 'String'>
    readonly vendorId: FieldRef<"Order", 'String'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly sawaSubsidy: FieldRef<"Order", 'Float'>
    readonly isCoveredByHost: FieldRef<"Order", 'Boolean'>
    readonly status: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model ParticipantOrder
   */

  export type AggregateParticipantOrder = {
    _count: ParticipantOrderCountAggregateOutputType | null
    _avg: ParticipantOrderAvgAggregateOutputType | null
    _sum: ParticipantOrderSumAggregateOutputType | null
    _min: ParticipantOrderMinAggregateOutputType | null
    _max: ParticipantOrderMaxAggregateOutputType | null
  }

  export type ParticipantOrderAvgAggregateOutputType = {
    shareAmount: number | null
    sawaSubsidy: number | null
  }

  export type ParticipantOrderSumAggregateOutputType = {
    shareAmount: number | null
    sawaSubsidy: number | null
  }

  export type ParticipantOrderMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    userId: string | null
    shareAmount: number | null
    sawaSubsidy: number | null
    perkUserCardId: string | null
    hasPaid: boolean | null
    paymentScreenshotUrl: string | null
    ocrVerificationLog: string | null
  }

  export type ParticipantOrderMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    userId: string | null
    shareAmount: number | null
    sawaSubsidy: number | null
    perkUserCardId: string | null
    hasPaid: boolean | null
    paymentScreenshotUrl: string | null
    ocrVerificationLog: string | null
  }

  export type ParticipantOrderCountAggregateOutputType = {
    id: number
    orderId: number
    userId: number
    shareAmount: number
    sawaSubsidy: number
    perkUserCardId: number
    hasPaid: number
    paymentScreenshotUrl: number
    ocrVerificationLog: number
    _all: number
  }


  export type ParticipantOrderAvgAggregateInputType = {
    shareAmount?: true
    sawaSubsidy?: true
  }

  export type ParticipantOrderSumAggregateInputType = {
    shareAmount?: true
    sawaSubsidy?: true
  }

  export type ParticipantOrderMinAggregateInputType = {
    id?: true
    orderId?: true
    userId?: true
    shareAmount?: true
    sawaSubsidy?: true
    perkUserCardId?: true
    hasPaid?: true
    paymentScreenshotUrl?: true
    ocrVerificationLog?: true
  }

  export type ParticipantOrderMaxAggregateInputType = {
    id?: true
    orderId?: true
    userId?: true
    shareAmount?: true
    sawaSubsidy?: true
    perkUserCardId?: true
    hasPaid?: true
    paymentScreenshotUrl?: true
    ocrVerificationLog?: true
  }

  export type ParticipantOrderCountAggregateInputType = {
    id?: true
    orderId?: true
    userId?: true
    shareAmount?: true
    sawaSubsidy?: true
    perkUserCardId?: true
    hasPaid?: true
    paymentScreenshotUrl?: true
    ocrVerificationLog?: true
    _all?: true
  }

  export type ParticipantOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParticipantOrder to aggregate.
     */
    where?: ParticipantOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantOrders to fetch.
     */
    orderBy?: ParticipantOrderOrderByWithRelationInput | ParticipantOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipantOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParticipantOrders
    **/
    _count?: true | ParticipantOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParticipantOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParticipantOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantOrderMaxAggregateInputType
  }

  export type GetParticipantOrderAggregateType<T extends ParticipantOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipantOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipantOrder[P]>
      : GetScalarType<T[P], AggregateParticipantOrder[P]>
  }




  export type ParticipantOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantOrderWhereInput
    orderBy?: ParticipantOrderOrderByWithAggregationInput | ParticipantOrderOrderByWithAggregationInput[]
    by: ParticipantOrderScalarFieldEnum[] | ParticipantOrderScalarFieldEnum
    having?: ParticipantOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantOrderCountAggregateInputType | true
    _avg?: ParticipantOrderAvgAggregateInputType
    _sum?: ParticipantOrderSumAggregateInputType
    _min?: ParticipantOrderMinAggregateInputType
    _max?: ParticipantOrderMaxAggregateInputType
  }

  export type ParticipantOrderGroupByOutputType = {
    id: string
    orderId: string
    userId: string
    shareAmount: number
    sawaSubsidy: number
    perkUserCardId: string | null
    hasPaid: boolean
    paymentScreenshotUrl: string | null
    ocrVerificationLog: string | null
    _count: ParticipantOrderCountAggregateOutputType | null
    _avg: ParticipantOrderAvgAggregateOutputType | null
    _sum: ParticipantOrderSumAggregateOutputType | null
    _min: ParticipantOrderMinAggregateOutputType | null
    _max: ParticipantOrderMaxAggregateOutputType | null
  }

  type GetParticipantOrderGroupByPayload<T extends ParticipantOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantOrderGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantOrderGroupByOutputType[P]>
        }
      >
    >


  export type ParticipantOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    userId?: boolean
    shareAmount?: boolean
    sawaSubsidy?: boolean
    perkUserCardId?: boolean
    hasPaid?: boolean
    paymentScreenshotUrl?: boolean
    ocrVerificationLog?: boolean
  }, ExtArgs["result"]["participantOrder"]>

  export type ParticipantOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    userId?: boolean
    shareAmount?: boolean
    sawaSubsidy?: boolean
    perkUserCardId?: boolean
    hasPaid?: boolean
    paymentScreenshotUrl?: boolean
    ocrVerificationLog?: boolean
  }, ExtArgs["result"]["participantOrder"]>

  export type ParticipantOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    userId?: boolean
    shareAmount?: boolean
    sawaSubsidy?: boolean
    perkUserCardId?: boolean
    hasPaid?: boolean
    paymentScreenshotUrl?: boolean
    ocrVerificationLog?: boolean
  }, ExtArgs["result"]["participantOrder"]>

  export type ParticipantOrderSelectScalar = {
    id?: boolean
    orderId?: boolean
    userId?: boolean
    shareAmount?: boolean
    sawaSubsidy?: boolean
    perkUserCardId?: boolean
    hasPaid?: boolean
    paymentScreenshotUrl?: boolean
    ocrVerificationLog?: boolean
  }

  export type ParticipantOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "userId" | "shareAmount" | "sawaSubsidy" | "perkUserCardId" | "hasPaid" | "paymentScreenshotUrl" | "ocrVerificationLog", ExtArgs["result"]["participantOrder"]>

  export type $ParticipantOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParticipantOrder"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      userId: string
      shareAmount: number
      sawaSubsidy: number
      perkUserCardId: string | null
      hasPaid: boolean
      paymentScreenshotUrl: string | null
      ocrVerificationLog: string | null
    }, ExtArgs["result"]["participantOrder"]>
    composites: {}
  }

  type ParticipantOrderGetPayload<S extends boolean | null | undefined | ParticipantOrderDefaultArgs> = $Result.GetResult<Prisma.$ParticipantOrderPayload, S>

  type ParticipantOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParticipantOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParticipantOrderCountAggregateInputType | true
    }

  export interface ParticipantOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParticipantOrder'], meta: { name: 'ParticipantOrder' } }
    /**
     * Find zero or one ParticipantOrder that matches the filter.
     * @param {ParticipantOrderFindUniqueArgs} args - Arguments to find a ParticipantOrder
     * @example
     * // Get one ParticipantOrder
     * const participantOrder = await prisma.participantOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParticipantOrderFindUniqueArgs>(args: SelectSubset<T, ParticipantOrderFindUniqueArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParticipantOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParticipantOrderFindUniqueOrThrowArgs} args - Arguments to find a ParticipantOrder
     * @example
     * // Get one ParticipantOrder
     * const participantOrder = await prisma.participantOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParticipantOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, ParticipantOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParticipantOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderFindFirstArgs} args - Arguments to find a ParticipantOrder
     * @example
     * // Get one ParticipantOrder
     * const participantOrder = await prisma.participantOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParticipantOrderFindFirstArgs>(args?: SelectSubset<T, ParticipantOrderFindFirstArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParticipantOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderFindFirstOrThrowArgs} args - Arguments to find a ParticipantOrder
     * @example
     * // Get one ParticipantOrder
     * const participantOrder = await prisma.participantOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParticipantOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, ParticipantOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParticipantOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParticipantOrders
     * const participantOrders = await prisma.participantOrder.findMany()
     * 
     * // Get first 10 ParticipantOrders
     * const participantOrders = await prisma.participantOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participantOrderWithIdOnly = await prisma.participantOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParticipantOrderFindManyArgs>(args?: SelectSubset<T, ParticipantOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParticipantOrder.
     * @param {ParticipantOrderCreateArgs} args - Arguments to create a ParticipantOrder.
     * @example
     * // Create one ParticipantOrder
     * const ParticipantOrder = await prisma.participantOrder.create({
     *   data: {
     *     // ... data to create a ParticipantOrder
     *   }
     * })
     * 
     */
    create<T extends ParticipantOrderCreateArgs>(args: SelectSubset<T, ParticipantOrderCreateArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParticipantOrders.
     * @param {ParticipantOrderCreateManyArgs} args - Arguments to create many ParticipantOrders.
     * @example
     * // Create many ParticipantOrders
     * const participantOrder = await prisma.participantOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParticipantOrderCreateManyArgs>(args?: SelectSubset<T, ParticipantOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParticipantOrders and returns the data saved in the database.
     * @param {ParticipantOrderCreateManyAndReturnArgs} args - Arguments to create many ParticipantOrders.
     * @example
     * // Create many ParticipantOrders
     * const participantOrder = await prisma.participantOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParticipantOrders and only return the `id`
     * const participantOrderWithIdOnly = await prisma.participantOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParticipantOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, ParticipantOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParticipantOrder.
     * @param {ParticipantOrderDeleteArgs} args - Arguments to delete one ParticipantOrder.
     * @example
     * // Delete one ParticipantOrder
     * const ParticipantOrder = await prisma.participantOrder.delete({
     *   where: {
     *     // ... filter to delete one ParticipantOrder
     *   }
     * })
     * 
     */
    delete<T extends ParticipantOrderDeleteArgs>(args: SelectSubset<T, ParticipantOrderDeleteArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParticipantOrder.
     * @param {ParticipantOrderUpdateArgs} args - Arguments to update one ParticipantOrder.
     * @example
     * // Update one ParticipantOrder
     * const participantOrder = await prisma.participantOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParticipantOrderUpdateArgs>(args: SelectSubset<T, ParticipantOrderUpdateArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParticipantOrders.
     * @param {ParticipantOrderDeleteManyArgs} args - Arguments to filter ParticipantOrders to delete.
     * @example
     * // Delete a few ParticipantOrders
     * const { count } = await prisma.participantOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParticipantOrderDeleteManyArgs>(args?: SelectSubset<T, ParticipantOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParticipantOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParticipantOrders
     * const participantOrder = await prisma.participantOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParticipantOrderUpdateManyArgs>(args: SelectSubset<T, ParticipantOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParticipantOrders and returns the data updated in the database.
     * @param {ParticipantOrderUpdateManyAndReturnArgs} args - Arguments to update many ParticipantOrders.
     * @example
     * // Update many ParticipantOrders
     * const participantOrder = await prisma.participantOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParticipantOrders and only return the `id`
     * const participantOrderWithIdOnly = await prisma.participantOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParticipantOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, ParticipantOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParticipantOrder.
     * @param {ParticipantOrderUpsertArgs} args - Arguments to update or create a ParticipantOrder.
     * @example
     * // Update or create a ParticipantOrder
     * const participantOrder = await prisma.participantOrder.upsert({
     *   create: {
     *     // ... data to create a ParticipantOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParticipantOrder we want to update
     *   }
     * })
     */
    upsert<T extends ParticipantOrderUpsertArgs>(args: SelectSubset<T, ParticipantOrderUpsertArgs<ExtArgs>>): Prisma__ParticipantOrderClient<$Result.GetResult<Prisma.$ParticipantOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParticipantOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderCountArgs} args - Arguments to filter ParticipantOrders to count.
     * @example
     * // Count the number of ParticipantOrders
     * const count = await prisma.participantOrder.count({
     *   where: {
     *     // ... the filter for the ParticipantOrders we want to count
     *   }
     * })
    **/
    count<T extends ParticipantOrderCountArgs>(
      args?: Subset<T, ParticipantOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParticipantOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipantOrderAggregateArgs>(args: Subset<T, ParticipantOrderAggregateArgs>): Prisma.PrismaPromise<GetParticipantOrderAggregateType<T>>

    /**
     * Group by ParticipantOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParticipantOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipantOrderGroupByArgs['orderBy'] }
        : { orderBy?: ParticipantOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParticipantOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParticipantOrder model
   */
  readonly fields: ParticipantOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParticipantOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParticipantOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParticipantOrder model
   */
  interface ParticipantOrderFieldRefs {
    readonly id: FieldRef<"ParticipantOrder", 'String'>
    readonly orderId: FieldRef<"ParticipantOrder", 'String'>
    readonly userId: FieldRef<"ParticipantOrder", 'String'>
    readonly shareAmount: FieldRef<"ParticipantOrder", 'Float'>
    readonly sawaSubsidy: FieldRef<"ParticipantOrder", 'Float'>
    readonly perkUserCardId: FieldRef<"ParticipantOrder", 'String'>
    readonly hasPaid: FieldRef<"ParticipantOrder", 'Boolean'>
    readonly paymentScreenshotUrl: FieldRef<"ParticipantOrder", 'String'>
    readonly ocrVerificationLog: FieldRef<"ParticipantOrder", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ParticipantOrder findUnique
   */
  export type ParticipantOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * Filter, which ParticipantOrder to fetch.
     */
    where: ParticipantOrderWhereUniqueInput
  }

  /**
   * ParticipantOrder findUniqueOrThrow
   */
  export type ParticipantOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * Filter, which ParticipantOrder to fetch.
     */
    where: ParticipantOrderWhereUniqueInput
  }

  /**
   * ParticipantOrder findFirst
   */
  export type ParticipantOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * Filter, which ParticipantOrder to fetch.
     */
    where?: ParticipantOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantOrders to fetch.
     */
    orderBy?: ParticipantOrderOrderByWithRelationInput | ParticipantOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantOrders.
     */
    cursor?: ParticipantOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantOrders.
     */
    distinct?: ParticipantOrderScalarFieldEnum | ParticipantOrderScalarFieldEnum[]
  }

  /**
   * ParticipantOrder findFirstOrThrow
   */
  export type ParticipantOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * Filter, which ParticipantOrder to fetch.
     */
    where?: ParticipantOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantOrders to fetch.
     */
    orderBy?: ParticipantOrderOrderByWithRelationInput | ParticipantOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantOrders.
     */
    cursor?: ParticipantOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantOrders.
     */
    distinct?: ParticipantOrderScalarFieldEnum | ParticipantOrderScalarFieldEnum[]
  }

  /**
   * ParticipantOrder findMany
   */
  export type ParticipantOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * Filter, which ParticipantOrders to fetch.
     */
    where?: ParticipantOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantOrders to fetch.
     */
    orderBy?: ParticipantOrderOrderByWithRelationInput | ParticipantOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParticipantOrders.
     */
    cursor?: ParticipantOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantOrders.
     */
    skip?: number
    distinct?: ParticipantOrderScalarFieldEnum | ParticipantOrderScalarFieldEnum[]
  }

  /**
   * ParticipantOrder create
   */
  export type ParticipantOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * The data needed to create a ParticipantOrder.
     */
    data: XOR<ParticipantOrderCreateInput, ParticipantOrderUncheckedCreateInput>
  }

  /**
   * ParticipantOrder createMany
   */
  export type ParticipantOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParticipantOrders.
     */
    data: ParticipantOrderCreateManyInput | ParticipantOrderCreateManyInput[]
  }

  /**
   * ParticipantOrder createManyAndReturn
   */
  export type ParticipantOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * The data used to create many ParticipantOrders.
     */
    data: ParticipantOrderCreateManyInput | ParticipantOrderCreateManyInput[]
  }

  /**
   * ParticipantOrder update
   */
  export type ParticipantOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * The data needed to update a ParticipantOrder.
     */
    data: XOR<ParticipantOrderUpdateInput, ParticipantOrderUncheckedUpdateInput>
    /**
     * Choose, which ParticipantOrder to update.
     */
    where: ParticipantOrderWhereUniqueInput
  }

  /**
   * ParticipantOrder updateMany
   */
  export type ParticipantOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParticipantOrders.
     */
    data: XOR<ParticipantOrderUpdateManyMutationInput, ParticipantOrderUncheckedUpdateManyInput>
    /**
     * Filter which ParticipantOrders to update
     */
    where?: ParticipantOrderWhereInput
    /**
     * Limit how many ParticipantOrders to update.
     */
    limit?: number
  }

  /**
   * ParticipantOrder updateManyAndReturn
   */
  export type ParticipantOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * The data used to update ParticipantOrders.
     */
    data: XOR<ParticipantOrderUpdateManyMutationInput, ParticipantOrderUncheckedUpdateManyInput>
    /**
     * Filter which ParticipantOrders to update
     */
    where?: ParticipantOrderWhereInput
    /**
     * Limit how many ParticipantOrders to update.
     */
    limit?: number
  }

  /**
   * ParticipantOrder upsert
   */
  export type ParticipantOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * The filter to search for the ParticipantOrder to update in case it exists.
     */
    where: ParticipantOrderWhereUniqueInput
    /**
     * In case the ParticipantOrder found by the `where` argument doesn't exist, create a new ParticipantOrder with this data.
     */
    create: XOR<ParticipantOrderCreateInput, ParticipantOrderUncheckedCreateInput>
    /**
     * In case the ParticipantOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipantOrderUpdateInput, ParticipantOrderUncheckedUpdateInput>
  }

  /**
   * ParticipantOrder delete
   */
  export type ParticipantOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
    /**
     * Filter which ParticipantOrder to delete.
     */
    where: ParticipantOrderWhereUniqueInput
  }

  /**
   * ParticipantOrder deleteMany
   */
  export type ParticipantOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParticipantOrders to delete
     */
    where?: ParticipantOrderWhereInput
    /**
     * Limit how many ParticipantOrders to delete.
     */
    limit?: number
  }

  /**
   * ParticipantOrder without action
   */
  export type ParticipantOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantOrder
     */
    select?: ParticipantOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParticipantOrder
     */
    omit?: ParticipantOrderOmit<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    price: number | null
    quantity: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    price: number | null
    quantity: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    menuItemId: string | null
    flashDropId: string | null
    name: string | null
    price: number | null
    quantity: number | null
    modifiers: string | null
    specialNotes: string | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    menuItemId: string | null
    flashDropId: string | null
    name: string | null
    price: number | null
    quantity: number | null
    modifiers: string | null
    specialNotes: string | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    menuItemId: number
    flashDropId: number
    name: number
    price: number
    quantity: number
    modifiers: number
    specialNotes: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    price?: true
    quantity?: true
  }

  export type OrderItemSumAggregateInputType = {
    price?: true
    quantity?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    flashDropId?: true
    name?: true
    price?: true
    quantity?: true
    modifiers?: true
    specialNotes?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    flashDropId?: true
    name?: true
    price?: true
    quantity?: true
    modifiers?: true
    specialNotes?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    flashDropId?: true
    name?: true
    price?: true
    quantity?: true
    modifiers?: true
    specialNotes?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    menuItemId: string | null
    flashDropId: string | null
    name: string
    price: number
    quantity: number
    modifiers: string
    specialNotes: string | null
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    flashDropId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    modifiers?: boolean
    specialNotes?: boolean
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    flashDropId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    modifiers?: boolean
    specialNotes?: boolean
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    flashDropId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    modifiers?: boolean
    specialNotes?: boolean
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    flashDropId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    modifiers?: boolean
    specialNotes?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "menuItemId" | "flashDropId" | "name" | "price" | "quantity" | "modifiers" | "specialNotes", ExtArgs["result"]["orderItem"]>

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      menuItemId: string | null
      flashDropId: string | null
      name: string
      price: number
      quantity: number
      modifiers: string
      specialNotes: string | null
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly menuItemId: FieldRef<"OrderItem", 'String'>
    readonly flashDropId: FieldRef<"OrderItem", 'String'>
    readonly name: FieldRef<"OrderItem", 'String'>
    readonly price: FieldRef<"OrderItem", 'Float'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly modifiers: FieldRef<"OrderItem", 'String'>
    readonly specialNotes: FieldRef<"OrderItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
  }


  /**
   * Model FriendshipStreak
   */

  export type AggregateFriendshipStreak = {
    _count: FriendshipStreakCountAggregateOutputType | null
    _avg: FriendshipStreakAvgAggregateOutputType | null
    _sum: FriendshipStreakSumAggregateOutputType | null
    _min: FriendshipStreakMinAggregateOutputType | null
    _max: FriendshipStreakMaxAggregateOutputType | null
  }

  export type FriendshipStreakAvgAggregateOutputType = {
    streak: number | null
  }

  export type FriendshipStreakSumAggregateOutputType = {
    streak: number | null
  }

  export type FriendshipStreakMinAggregateOutputType = {
    id: string | null
    userId: string | null
    friendId: string | null
    streak: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendshipStreakMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    friendId: string | null
    streak: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendshipStreakCountAggregateOutputType = {
    id: number
    userId: number
    friendId: number
    streak: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FriendshipStreakAvgAggregateInputType = {
    streak?: true
  }

  export type FriendshipStreakSumAggregateInputType = {
    streak?: true
  }

  export type FriendshipStreakMinAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    streak?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendshipStreakMaxAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    streak?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendshipStreakCountAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    streak?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FriendshipStreakAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendshipStreak to aggregate.
     */
    where?: FriendshipStreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendshipStreaks to fetch.
     */
    orderBy?: FriendshipStreakOrderByWithRelationInput | FriendshipStreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendshipStreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendshipStreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendshipStreaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendshipStreaks
    **/
    _count?: true | FriendshipStreakCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FriendshipStreakAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FriendshipStreakSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendshipStreakMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendshipStreakMaxAggregateInputType
  }

  export type GetFriendshipStreakAggregateType<T extends FriendshipStreakAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendshipStreak]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendshipStreak[P]>
      : GetScalarType<T[P], AggregateFriendshipStreak[P]>
  }




  export type FriendshipStreakGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipStreakWhereInput
    orderBy?: FriendshipStreakOrderByWithAggregationInput | FriendshipStreakOrderByWithAggregationInput[]
    by: FriendshipStreakScalarFieldEnum[] | FriendshipStreakScalarFieldEnum
    having?: FriendshipStreakScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendshipStreakCountAggregateInputType | true
    _avg?: FriendshipStreakAvgAggregateInputType
    _sum?: FriendshipStreakSumAggregateInputType
    _min?: FriendshipStreakMinAggregateInputType
    _max?: FriendshipStreakMaxAggregateInputType
  }

  export type FriendshipStreakGroupByOutputType = {
    id: string
    userId: string
    friendId: string
    streak: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: FriendshipStreakCountAggregateOutputType | null
    _avg: FriendshipStreakAvgAggregateOutputType | null
    _sum: FriendshipStreakSumAggregateOutputType | null
    _min: FriendshipStreakMinAggregateOutputType | null
    _max: FriendshipStreakMaxAggregateOutputType | null
  }

  type GetFriendshipStreakGroupByPayload<T extends FriendshipStreakGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendshipStreakGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendshipStreakGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendshipStreakGroupByOutputType[P]>
            : GetScalarType<T[P], FriendshipStreakGroupByOutputType[P]>
        }
      >
    >


  export type FriendshipStreakSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    streak?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["friendshipStreak"]>

  export type FriendshipStreakSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    streak?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["friendshipStreak"]>

  export type FriendshipStreakSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    streak?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["friendshipStreak"]>

  export type FriendshipStreakSelectScalar = {
    id?: boolean
    userId?: boolean
    friendId?: boolean
    streak?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FriendshipStreakOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "friendId" | "streak" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["friendshipStreak"]>

  export type $FriendshipStreakPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendshipStreak"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      friendId: string
      streak: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["friendshipStreak"]>
    composites: {}
  }

  type FriendshipStreakGetPayload<S extends boolean | null | undefined | FriendshipStreakDefaultArgs> = $Result.GetResult<Prisma.$FriendshipStreakPayload, S>

  type FriendshipStreakCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendshipStreakFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendshipStreakCountAggregateInputType | true
    }

  export interface FriendshipStreakDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendshipStreak'], meta: { name: 'FriendshipStreak' } }
    /**
     * Find zero or one FriendshipStreak that matches the filter.
     * @param {FriendshipStreakFindUniqueArgs} args - Arguments to find a FriendshipStreak
     * @example
     * // Get one FriendshipStreak
     * const friendshipStreak = await prisma.friendshipStreak.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendshipStreakFindUniqueArgs>(args: SelectSubset<T, FriendshipStreakFindUniqueArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendshipStreak that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendshipStreakFindUniqueOrThrowArgs} args - Arguments to find a FriendshipStreak
     * @example
     * // Get one FriendshipStreak
     * const friendshipStreak = await prisma.friendshipStreak.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendshipStreakFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendshipStreakFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendshipStreak that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakFindFirstArgs} args - Arguments to find a FriendshipStreak
     * @example
     * // Get one FriendshipStreak
     * const friendshipStreak = await prisma.friendshipStreak.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendshipStreakFindFirstArgs>(args?: SelectSubset<T, FriendshipStreakFindFirstArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendshipStreak that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakFindFirstOrThrowArgs} args - Arguments to find a FriendshipStreak
     * @example
     * // Get one FriendshipStreak
     * const friendshipStreak = await prisma.friendshipStreak.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendshipStreakFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendshipStreakFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendshipStreaks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendshipStreaks
     * const friendshipStreaks = await prisma.friendshipStreak.findMany()
     * 
     * // Get first 10 FriendshipStreaks
     * const friendshipStreaks = await prisma.friendshipStreak.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendshipStreakWithIdOnly = await prisma.friendshipStreak.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendshipStreakFindManyArgs>(args?: SelectSubset<T, FriendshipStreakFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendshipStreak.
     * @param {FriendshipStreakCreateArgs} args - Arguments to create a FriendshipStreak.
     * @example
     * // Create one FriendshipStreak
     * const FriendshipStreak = await prisma.friendshipStreak.create({
     *   data: {
     *     // ... data to create a FriendshipStreak
     *   }
     * })
     * 
     */
    create<T extends FriendshipStreakCreateArgs>(args: SelectSubset<T, FriendshipStreakCreateArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendshipStreaks.
     * @param {FriendshipStreakCreateManyArgs} args - Arguments to create many FriendshipStreaks.
     * @example
     * // Create many FriendshipStreaks
     * const friendshipStreak = await prisma.friendshipStreak.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendshipStreakCreateManyArgs>(args?: SelectSubset<T, FriendshipStreakCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendshipStreaks and returns the data saved in the database.
     * @param {FriendshipStreakCreateManyAndReturnArgs} args - Arguments to create many FriendshipStreaks.
     * @example
     * // Create many FriendshipStreaks
     * const friendshipStreak = await prisma.friendshipStreak.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendshipStreaks and only return the `id`
     * const friendshipStreakWithIdOnly = await prisma.friendshipStreak.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendshipStreakCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendshipStreakCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FriendshipStreak.
     * @param {FriendshipStreakDeleteArgs} args - Arguments to delete one FriendshipStreak.
     * @example
     * // Delete one FriendshipStreak
     * const FriendshipStreak = await prisma.friendshipStreak.delete({
     *   where: {
     *     // ... filter to delete one FriendshipStreak
     *   }
     * })
     * 
     */
    delete<T extends FriendshipStreakDeleteArgs>(args: SelectSubset<T, FriendshipStreakDeleteArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendshipStreak.
     * @param {FriendshipStreakUpdateArgs} args - Arguments to update one FriendshipStreak.
     * @example
     * // Update one FriendshipStreak
     * const friendshipStreak = await prisma.friendshipStreak.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendshipStreakUpdateArgs>(args: SelectSubset<T, FriendshipStreakUpdateArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendshipStreaks.
     * @param {FriendshipStreakDeleteManyArgs} args - Arguments to filter FriendshipStreaks to delete.
     * @example
     * // Delete a few FriendshipStreaks
     * const { count } = await prisma.friendshipStreak.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendshipStreakDeleteManyArgs>(args?: SelectSubset<T, FriendshipStreakDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendshipStreaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendshipStreaks
     * const friendshipStreak = await prisma.friendshipStreak.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendshipStreakUpdateManyArgs>(args: SelectSubset<T, FriendshipStreakUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendshipStreaks and returns the data updated in the database.
     * @param {FriendshipStreakUpdateManyAndReturnArgs} args - Arguments to update many FriendshipStreaks.
     * @example
     * // Update many FriendshipStreaks
     * const friendshipStreak = await prisma.friendshipStreak.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FriendshipStreaks and only return the `id`
     * const friendshipStreakWithIdOnly = await prisma.friendshipStreak.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendshipStreakUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendshipStreakUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FriendshipStreak.
     * @param {FriendshipStreakUpsertArgs} args - Arguments to update or create a FriendshipStreak.
     * @example
     * // Update or create a FriendshipStreak
     * const friendshipStreak = await prisma.friendshipStreak.upsert({
     *   create: {
     *     // ... data to create a FriendshipStreak
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendshipStreak we want to update
     *   }
     * })
     */
    upsert<T extends FriendshipStreakUpsertArgs>(args: SelectSubset<T, FriendshipStreakUpsertArgs<ExtArgs>>): Prisma__FriendshipStreakClient<$Result.GetResult<Prisma.$FriendshipStreakPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendshipStreaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakCountArgs} args - Arguments to filter FriendshipStreaks to count.
     * @example
     * // Count the number of FriendshipStreaks
     * const count = await prisma.friendshipStreak.count({
     *   where: {
     *     // ... the filter for the FriendshipStreaks we want to count
     *   }
     * })
    **/
    count<T extends FriendshipStreakCountArgs>(
      args?: Subset<T, FriendshipStreakCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendshipStreakCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendshipStreak.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendshipStreakAggregateArgs>(args: Subset<T, FriendshipStreakAggregateArgs>): Prisma.PrismaPromise<GetFriendshipStreakAggregateType<T>>

    /**
     * Group by FriendshipStreak.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipStreakGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendshipStreakGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendshipStreakGroupByArgs['orderBy'] }
        : { orderBy?: FriendshipStreakGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendshipStreakGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendshipStreakGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendshipStreak model
   */
  readonly fields: FriendshipStreakFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendshipStreak.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendshipStreakClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendshipStreak model
   */
  interface FriendshipStreakFieldRefs {
    readonly id: FieldRef<"FriendshipStreak", 'String'>
    readonly userId: FieldRef<"FriendshipStreak", 'String'>
    readonly friendId: FieldRef<"FriendshipStreak", 'String'>
    readonly streak: FieldRef<"FriendshipStreak", 'Int'>
    readonly isActive: FieldRef<"FriendshipStreak", 'Boolean'>
    readonly createdAt: FieldRef<"FriendshipStreak", 'DateTime'>
    readonly updatedAt: FieldRef<"FriendshipStreak", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendshipStreak findUnique
   */
  export type FriendshipStreakFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * Filter, which FriendshipStreak to fetch.
     */
    where: FriendshipStreakWhereUniqueInput
  }

  /**
   * FriendshipStreak findUniqueOrThrow
   */
  export type FriendshipStreakFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * Filter, which FriendshipStreak to fetch.
     */
    where: FriendshipStreakWhereUniqueInput
  }

  /**
   * FriendshipStreak findFirst
   */
  export type FriendshipStreakFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * Filter, which FriendshipStreak to fetch.
     */
    where?: FriendshipStreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendshipStreaks to fetch.
     */
    orderBy?: FriendshipStreakOrderByWithRelationInput | FriendshipStreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendshipStreaks.
     */
    cursor?: FriendshipStreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendshipStreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendshipStreaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendshipStreaks.
     */
    distinct?: FriendshipStreakScalarFieldEnum | FriendshipStreakScalarFieldEnum[]
  }

  /**
   * FriendshipStreak findFirstOrThrow
   */
  export type FriendshipStreakFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * Filter, which FriendshipStreak to fetch.
     */
    where?: FriendshipStreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendshipStreaks to fetch.
     */
    orderBy?: FriendshipStreakOrderByWithRelationInput | FriendshipStreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendshipStreaks.
     */
    cursor?: FriendshipStreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendshipStreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendshipStreaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendshipStreaks.
     */
    distinct?: FriendshipStreakScalarFieldEnum | FriendshipStreakScalarFieldEnum[]
  }

  /**
   * FriendshipStreak findMany
   */
  export type FriendshipStreakFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * Filter, which FriendshipStreaks to fetch.
     */
    where?: FriendshipStreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendshipStreaks to fetch.
     */
    orderBy?: FriendshipStreakOrderByWithRelationInput | FriendshipStreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendshipStreaks.
     */
    cursor?: FriendshipStreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendshipStreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendshipStreaks.
     */
    skip?: number
    distinct?: FriendshipStreakScalarFieldEnum | FriendshipStreakScalarFieldEnum[]
  }

  /**
   * FriendshipStreak create
   */
  export type FriendshipStreakCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * The data needed to create a FriendshipStreak.
     */
    data: XOR<FriendshipStreakCreateInput, FriendshipStreakUncheckedCreateInput>
  }

  /**
   * FriendshipStreak createMany
   */
  export type FriendshipStreakCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendshipStreaks.
     */
    data: FriendshipStreakCreateManyInput | FriendshipStreakCreateManyInput[]
  }

  /**
   * FriendshipStreak createManyAndReturn
   */
  export type FriendshipStreakCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * The data used to create many FriendshipStreaks.
     */
    data: FriendshipStreakCreateManyInput | FriendshipStreakCreateManyInput[]
  }

  /**
   * FriendshipStreak update
   */
  export type FriendshipStreakUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * The data needed to update a FriendshipStreak.
     */
    data: XOR<FriendshipStreakUpdateInput, FriendshipStreakUncheckedUpdateInput>
    /**
     * Choose, which FriendshipStreak to update.
     */
    where: FriendshipStreakWhereUniqueInput
  }

  /**
   * FriendshipStreak updateMany
   */
  export type FriendshipStreakUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendshipStreaks.
     */
    data: XOR<FriendshipStreakUpdateManyMutationInput, FriendshipStreakUncheckedUpdateManyInput>
    /**
     * Filter which FriendshipStreaks to update
     */
    where?: FriendshipStreakWhereInput
    /**
     * Limit how many FriendshipStreaks to update.
     */
    limit?: number
  }

  /**
   * FriendshipStreak updateManyAndReturn
   */
  export type FriendshipStreakUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * The data used to update FriendshipStreaks.
     */
    data: XOR<FriendshipStreakUpdateManyMutationInput, FriendshipStreakUncheckedUpdateManyInput>
    /**
     * Filter which FriendshipStreaks to update
     */
    where?: FriendshipStreakWhereInput
    /**
     * Limit how many FriendshipStreaks to update.
     */
    limit?: number
  }

  /**
   * FriendshipStreak upsert
   */
  export type FriendshipStreakUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * The filter to search for the FriendshipStreak to update in case it exists.
     */
    where: FriendshipStreakWhereUniqueInput
    /**
     * In case the FriendshipStreak found by the `where` argument doesn't exist, create a new FriendshipStreak with this data.
     */
    create: XOR<FriendshipStreakCreateInput, FriendshipStreakUncheckedCreateInput>
    /**
     * In case the FriendshipStreak was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendshipStreakUpdateInput, FriendshipStreakUncheckedUpdateInput>
  }

  /**
   * FriendshipStreak delete
   */
  export type FriendshipStreakDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
    /**
     * Filter which FriendshipStreak to delete.
     */
    where: FriendshipStreakWhereUniqueInput
  }

  /**
   * FriendshipStreak deleteMany
   */
  export type FriendshipStreakDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendshipStreaks to delete
     */
    where?: FriendshipStreakWhereInput
    /**
     * Limit how many FriendshipStreaks to delete.
     */
    limit?: number
  }

  /**
   * FriendshipStreak without action
   */
  export type FriendshipStreakDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendshipStreak
     */
    select?: FriendshipStreakSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendshipStreak
     */
    omit?: FriendshipStreakOmit<ExtArgs> | null
  }


  /**
   * Model HypeLog
   */

  export type AggregateHypeLog = {
    _count: HypeLogCountAggregateOutputType | null
    _avg: HypeLogAvgAggregateOutputType | null
    _sum: HypeLogSumAggregateOutputType | null
    _min: HypeLogMinAggregateOutputType | null
    _max: HypeLogMaxAggregateOutputType | null
  }

  export type HypeLogAvgAggregateOutputType = {
    points: number | null
  }

  export type HypeLogSumAggregateOutputType = {
    points: number | null
  }

  export type HypeLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    points: number | null
    reason: string | null
    createdAt: Date | null
  }

  export type HypeLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    points: number | null
    reason: string | null
    createdAt: Date | null
  }

  export type HypeLogCountAggregateOutputType = {
    id: number
    userId: number
    points: number
    reason: number
    createdAt: number
    _all: number
  }


  export type HypeLogAvgAggregateInputType = {
    points?: true
  }

  export type HypeLogSumAggregateInputType = {
    points?: true
  }

  export type HypeLogMinAggregateInputType = {
    id?: true
    userId?: true
    points?: true
    reason?: true
    createdAt?: true
  }

  export type HypeLogMaxAggregateInputType = {
    id?: true
    userId?: true
    points?: true
    reason?: true
    createdAt?: true
  }

  export type HypeLogCountAggregateInputType = {
    id?: true
    userId?: true
    points?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type HypeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HypeLog to aggregate.
     */
    where?: HypeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HypeLogs to fetch.
     */
    orderBy?: HypeLogOrderByWithRelationInput | HypeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HypeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HypeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HypeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HypeLogs
    **/
    _count?: true | HypeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HypeLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HypeLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HypeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HypeLogMaxAggregateInputType
  }

  export type GetHypeLogAggregateType<T extends HypeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateHypeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHypeLog[P]>
      : GetScalarType<T[P], AggregateHypeLog[P]>
  }




  export type HypeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HypeLogWhereInput
    orderBy?: HypeLogOrderByWithAggregationInput | HypeLogOrderByWithAggregationInput[]
    by: HypeLogScalarFieldEnum[] | HypeLogScalarFieldEnum
    having?: HypeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HypeLogCountAggregateInputType | true
    _avg?: HypeLogAvgAggregateInputType
    _sum?: HypeLogSumAggregateInputType
    _min?: HypeLogMinAggregateInputType
    _max?: HypeLogMaxAggregateInputType
  }

  export type HypeLogGroupByOutputType = {
    id: string
    userId: string
    points: number
    reason: string | null
    createdAt: Date
    _count: HypeLogCountAggregateOutputType | null
    _avg: HypeLogAvgAggregateOutputType | null
    _sum: HypeLogSumAggregateOutputType | null
    _min: HypeLogMinAggregateOutputType | null
    _max: HypeLogMaxAggregateOutputType | null
  }

  type GetHypeLogGroupByPayload<T extends HypeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HypeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HypeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HypeLogGroupByOutputType[P]>
            : GetScalarType<T[P], HypeLogGroupByOutputType[P]>
        }
      >
    >


  export type HypeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hypeLog"]>

  export type HypeLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hypeLog"]>

  export type HypeLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hypeLog"]>

  export type HypeLogSelectScalar = {
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type HypeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "points" | "reason" | "createdAt", ExtArgs["result"]["hypeLog"]>

  export type $HypeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HypeLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      points: number
      reason: string | null
      createdAt: Date
    }, ExtArgs["result"]["hypeLog"]>
    composites: {}
  }

  type HypeLogGetPayload<S extends boolean | null | undefined | HypeLogDefaultArgs> = $Result.GetResult<Prisma.$HypeLogPayload, S>

  type HypeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HypeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HypeLogCountAggregateInputType | true
    }

  export interface HypeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HypeLog'], meta: { name: 'HypeLog' } }
    /**
     * Find zero or one HypeLog that matches the filter.
     * @param {HypeLogFindUniqueArgs} args - Arguments to find a HypeLog
     * @example
     * // Get one HypeLog
     * const hypeLog = await prisma.hypeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HypeLogFindUniqueArgs>(args: SelectSubset<T, HypeLogFindUniqueArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HypeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HypeLogFindUniqueOrThrowArgs} args - Arguments to find a HypeLog
     * @example
     * // Get one HypeLog
     * const hypeLog = await prisma.hypeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HypeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, HypeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HypeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogFindFirstArgs} args - Arguments to find a HypeLog
     * @example
     * // Get one HypeLog
     * const hypeLog = await prisma.hypeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HypeLogFindFirstArgs>(args?: SelectSubset<T, HypeLogFindFirstArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HypeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogFindFirstOrThrowArgs} args - Arguments to find a HypeLog
     * @example
     * // Get one HypeLog
     * const hypeLog = await prisma.hypeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HypeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, HypeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HypeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HypeLogs
     * const hypeLogs = await prisma.hypeLog.findMany()
     * 
     * // Get first 10 HypeLogs
     * const hypeLogs = await prisma.hypeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hypeLogWithIdOnly = await prisma.hypeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HypeLogFindManyArgs>(args?: SelectSubset<T, HypeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HypeLog.
     * @param {HypeLogCreateArgs} args - Arguments to create a HypeLog.
     * @example
     * // Create one HypeLog
     * const HypeLog = await prisma.hypeLog.create({
     *   data: {
     *     // ... data to create a HypeLog
     *   }
     * })
     * 
     */
    create<T extends HypeLogCreateArgs>(args: SelectSubset<T, HypeLogCreateArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HypeLogs.
     * @param {HypeLogCreateManyArgs} args - Arguments to create many HypeLogs.
     * @example
     * // Create many HypeLogs
     * const hypeLog = await prisma.hypeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HypeLogCreateManyArgs>(args?: SelectSubset<T, HypeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HypeLogs and returns the data saved in the database.
     * @param {HypeLogCreateManyAndReturnArgs} args - Arguments to create many HypeLogs.
     * @example
     * // Create many HypeLogs
     * const hypeLog = await prisma.hypeLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HypeLogs and only return the `id`
     * const hypeLogWithIdOnly = await prisma.hypeLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HypeLogCreateManyAndReturnArgs>(args?: SelectSubset<T, HypeLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HypeLog.
     * @param {HypeLogDeleteArgs} args - Arguments to delete one HypeLog.
     * @example
     * // Delete one HypeLog
     * const HypeLog = await prisma.hypeLog.delete({
     *   where: {
     *     // ... filter to delete one HypeLog
     *   }
     * })
     * 
     */
    delete<T extends HypeLogDeleteArgs>(args: SelectSubset<T, HypeLogDeleteArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HypeLog.
     * @param {HypeLogUpdateArgs} args - Arguments to update one HypeLog.
     * @example
     * // Update one HypeLog
     * const hypeLog = await prisma.hypeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HypeLogUpdateArgs>(args: SelectSubset<T, HypeLogUpdateArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HypeLogs.
     * @param {HypeLogDeleteManyArgs} args - Arguments to filter HypeLogs to delete.
     * @example
     * // Delete a few HypeLogs
     * const { count } = await prisma.hypeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HypeLogDeleteManyArgs>(args?: SelectSubset<T, HypeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HypeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HypeLogs
     * const hypeLog = await prisma.hypeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HypeLogUpdateManyArgs>(args: SelectSubset<T, HypeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HypeLogs and returns the data updated in the database.
     * @param {HypeLogUpdateManyAndReturnArgs} args - Arguments to update many HypeLogs.
     * @example
     * // Update many HypeLogs
     * const hypeLog = await prisma.hypeLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HypeLogs and only return the `id`
     * const hypeLogWithIdOnly = await prisma.hypeLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HypeLogUpdateManyAndReturnArgs>(args: SelectSubset<T, HypeLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HypeLog.
     * @param {HypeLogUpsertArgs} args - Arguments to update or create a HypeLog.
     * @example
     * // Update or create a HypeLog
     * const hypeLog = await prisma.hypeLog.upsert({
     *   create: {
     *     // ... data to create a HypeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HypeLog we want to update
     *   }
     * })
     */
    upsert<T extends HypeLogUpsertArgs>(args: SelectSubset<T, HypeLogUpsertArgs<ExtArgs>>): Prisma__HypeLogClient<$Result.GetResult<Prisma.$HypeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HypeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogCountArgs} args - Arguments to filter HypeLogs to count.
     * @example
     * // Count the number of HypeLogs
     * const count = await prisma.hypeLog.count({
     *   where: {
     *     // ... the filter for the HypeLogs we want to count
     *   }
     * })
    **/
    count<T extends HypeLogCountArgs>(
      args?: Subset<T, HypeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HypeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HypeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HypeLogAggregateArgs>(args: Subset<T, HypeLogAggregateArgs>): Prisma.PrismaPromise<GetHypeLogAggregateType<T>>

    /**
     * Group by HypeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HypeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HypeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HypeLogGroupByArgs['orderBy'] }
        : { orderBy?: HypeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HypeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHypeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HypeLog model
   */
  readonly fields: HypeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HypeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HypeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HypeLog model
   */
  interface HypeLogFieldRefs {
    readonly id: FieldRef<"HypeLog", 'String'>
    readonly userId: FieldRef<"HypeLog", 'String'>
    readonly points: FieldRef<"HypeLog", 'Int'>
    readonly reason: FieldRef<"HypeLog", 'String'>
    readonly createdAt: FieldRef<"HypeLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HypeLog findUnique
   */
  export type HypeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * Filter, which HypeLog to fetch.
     */
    where: HypeLogWhereUniqueInput
  }

  /**
   * HypeLog findUniqueOrThrow
   */
  export type HypeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * Filter, which HypeLog to fetch.
     */
    where: HypeLogWhereUniqueInput
  }

  /**
   * HypeLog findFirst
   */
  export type HypeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * Filter, which HypeLog to fetch.
     */
    where?: HypeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HypeLogs to fetch.
     */
    orderBy?: HypeLogOrderByWithRelationInput | HypeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HypeLogs.
     */
    cursor?: HypeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HypeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HypeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HypeLogs.
     */
    distinct?: HypeLogScalarFieldEnum | HypeLogScalarFieldEnum[]
  }

  /**
   * HypeLog findFirstOrThrow
   */
  export type HypeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * Filter, which HypeLog to fetch.
     */
    where?: HypeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HypeLogs to fetch.
     */
    orderBy?: HypeLogOrderByWithRelationInput | HypeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HypeLogs.
     */
    cursor?: HypeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HypeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HypeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HypeLogs.
     */
    distinct?: HypeLogScalarFieldEnum | HypeLogScalarFieldEnum[]
  }

  /**
   * HypeLog findMany
   */
  export type HypeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * Filter, which HypeLogs to fetch.
     */
    where?: HypeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HypeLogs to fetch.
     */
    orderBy?: HypeLogOrderByWithRelationInput | HypeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HypeLogs.
     */
    cursor?: HypeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HypeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HypeLogs.
     */
    skip?: number
    distinct?: HypeLogScalarFieldEnum | HypeLogScalarFieldEnum[]
  }

  /**
   * HypeLog create
   */
  export type HypeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * The data needed to create a HypeLog.
     */
    data: XOR<HypeLogCreateInput, HypeLogUncheckedCreateInput>
  }

  /**
   * HypeLog createMany
   */
  export type HypeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HypeLogs.
     */
    data: HypeLogCreateManyInput | HypeLogCreateManyInput[]
  }

  /**
   * HypeLog createManyAndReturn
   */
  export type HypeLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * The data used to create many HypeLogs.
     */
    data: HypeLogCreateManyInput | HypeLogCreateManyInput[]
  }

  /**
   * HypeLog update
   */
  export type HypeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * The data needed to update a HypeLog.
     */
    data: XOR<HypeLogUpdateInput, HypeLogUncheckedUpdateInput>
    /**
     * Choose, which HypeLog to update.
     */
    where: HypeLogWhereUniqueInput
  }

  /**
   * HypeLog updateMany
   */
  export type HypeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HypeLogs.
     */
    data: XOR<HypeLogUpdateManyMutationInput, HypeLogUncheckedUpdateManyInput>
    /**
     * Filter which HypeLogs to update
     */
    where?: HypeLogWhereInput
    /**
     * Limit how many HypeLogs to update.
     */
    limit?: number
  }

  /**
   * HypeLog updateManyAndReturn
   */
  export type HypeLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * The data used to update HypeLogs.
     */
    data: XOR<HypeLogUpdateManyMutationInput, HypeLogUncheckedUpdateManyInput>
    /**
     * Filter which HypeLogs to update
     */
    where?: HypeLogWhereInput
    /**
     * Limit how many HypeLogs to update.
     */
    limit?: number
  }

  /**
   * HypeLog upsert
   */
  export type HypeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * The filter to search for the HypeLog to update in case it exists.
     */
    where: HypeLogWhereUniqueInput
    /**
     * In case the HypeLog found by the `where` argument doesn't exist, create a new HypeLog with this data.
     */
    create: XOR<HypeLogCreateInput, HypeLogUncheckedCreateInput>
    /**
     * In case the HypeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HypeLogUpdateInput, HypeLogUncheckedUpdateInput>
  }

  /**
   * HypeLog delete
   */
  export type HypeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
    /**
     * Filter which HypeLog to delete.
     */
    where: HypeLogWhereUniqueInput
  }

  /**
   * HypeLog deleteMany
   */
  export type HypeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HypeLogs to delete
     */
    where?: HypeLogWhereInput
    /**
     * Limit how many HypeLogs to delete.
     */
    limit?: number
  }

  /**
   * HypeLog without action
   */
  export type HypeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HypeLog
     */
    select?: HypeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HypeLog
     */
    omit?: HypeLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    passwordHash: 'passwordHash',
    name: 'name',
    avatar: 'avatar',
    hypeScore: 'hypeScore',
    sawaCurrency: 'sawaCurrency',
    keysAvailable: 'keysAvailable',
    activeCardId: 'activeCardId',
    walletBalance: 'walletBalance',
    locksUntilMysteryCop: 'locksUntilMysteryCop',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CardScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    perkCode: 'perkCode',
    rarity: 'rarity',
    dropRate: 'dropRate',
    usage: 'usage'
  };

  export type CardScalarFieldEnum = (typeof CardScalarFieldEnum)[keyof typeof CardScalarFieldEnum]


  export const UserCardScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cardId: 'cardId',
    isUsed: 'isUsed',
    remainingValue: 'remainingValue',
    acquiredAt: 'acquiredAt'
  };

  export type UserCardScalarFieldEnum = (typeof UserCardScalarFieldEnum)[keyof typeof UserCardScalarFieldEnum]


  export const VendorScalarFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    name: 'name',
    image: 'image',
    bannerImage: 'bannerImage',
    rating: 'rating',
    ratingCount: 'ratingCount',
    status: 'status',
    announcementBanner: 'announcementBanner',
    instapayAddress: 'instapayAddress',
    instapayName: 'instapayName',
    commissionOwedBalance: 'commissionOwedBalance',
    subsidiesOwedBalance: 'subsidiesOwedBalance',
    lifetimeSales: 'lifetimeSales',
    lifetimeOrders: 'lifetimeOrders',
    ledgerPinHash: 'ledgerPinHash',
    hypeMultiplier: 'hypeMultiplier',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    announcementUpdatedAt: 'announcementUpdatedAt'
  };

  export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum]


  export const MenuItemScalarFieldEnum: {
    id: 'id',
    vendorId: 'vendorId',
    name: 'name',
    description: 'description',
    price: 'price',
    image: 'image',
    inStock: 'inStock',
    requiredHypeLevel: 'requiredHypeLevel',
    category: 'category',
    addOns: 'addOns'
  };

  export type MenuItemScalarFieldEnum = (typeof MenuItemScalarFieldEnum)[keyof typeof MenuItemScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    hostId: 'hostId',
    vendorId: 'vendorId',
    totalAmount: 'totalAmount',
    sawaSubsidy: 'sawaSubsidy',
    isCoveredByHost: 'isCoveredByHost',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const ParticipantOrderScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    userId: 'userId',
    shareAmount: 'shareAmount',
    sawaSubsidy: 'sawaSubsidy',
    perkUserCardId: 'perkUserCardId',
    hasPaid: 'hasPaid',
    paymentScreenshotUrl: 'paymentScreenshotUrl',
    ocrVerificationLog: 'ocrVerificationLog'
  };

  export type ParticipantOrderScalarFieldEnum = (typeof ParticipantOrderScalarFieldEnum)[keyof typeof ParticipantOrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    menuItemId: 'menuItemId',
    flashDropId: 'flashDropId',
    name: 'name',
    price: 'price',
    quantity: 'quantity',
    modifiers: 'modifiers',
    specialNotes: 'specialNotes'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const FriendshipStreakScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    friendId: 'friendId',
    streak: 'streak',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FriendshipStreakScalarFieldEnum = (typeof FriendshipStreakScalarFieldEnum)[keyof typeof FriendshipStreakScalarFieldEnum]


  export const HypeLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    points: 'points',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type HypeLogScalarFieldEnum = (typeof HypeLogScalarFieldEnum)[keyof typeof HypeLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatar?: StringFilter<"User"> | string
    hypeScore?: IntFilter<"User"> | number
    sawaCurrency?: IntFilter<"User"> | number
    keysAvailable?: IntFilter<"User"> | number
    activeCardId?: StringNullableFilter<"User"> | string | null
    walletBalance?: FloatFilter<"User"> | number
    locksUntilMysteryCop?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inventory?: UserCardListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    activeCardId?: SortOrderInput | SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inventory?: UserCardOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatar?: StringFilter<"User"> | string
    hypeScore?: IntFilter<"User"> | number
    sawaCurrency?: IntFilter<"User"> | number
    keysAvailable?: IntFilter<"User"> | number
    activeCardId?: StringNullableFilter<"User"> | string | null
    walletBalance?: FloatFilter<"User"> | number
    locksUntilMysteryCop?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inventory?: UserCardListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    activeCardId?: SortOrderInput | SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringWithAggregatesFilter<"User"> | string
    hypeScore?: IntWithAggregatesFilter<"User"> | number
    sawaCurrency?: IntWithAggregatesFilter<"User"> | number
    keysAvailable?: IntWithAggregatesFilter<"User"> | number
    activeCardId?: StringNullableWithAggregatesFilter<"User"> | string | null
    walletBalance?: FloatWithAggregatesFilter<"User"> | number
    locksUntilMysteryCop?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CardWhereInput = {
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    id?: StringFilter<"Card"> | string
    name?: StringFilter<"Card"> | string
    description?: StringFilter<"Card"> | string
    perkCode?: StringFilter<"Card"> | string
    rarity?: StringFilter<"Card"> | string
    dropRate?: FloatFilter<"Card"> | number
    usage?: StringFilter<"Card"> | string
    users?: UserCardListRelationFilter
  }

  export type CardOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    perkCode?: SortOrder
    rarity?: SortOrder
    dropRate?: SortOrder
    usage?: SortOrder
    users?: UserCardOrderByRelationAggregateInput
  }

  export type CardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    perkCode?: string
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    description?: StringFilter<"Card"> | string
    rarity?: StringFilter<"Card"> | string
    dropRate?: FloatFilter<"Card"> | number
    usage?: StringFilter<"Card"> | string
    users?: UserCardListRelationFilter
  }, "id" | "name" | "perkCode">

  export type CardOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    perkCode?: SortOrder
    rarity?: SortOrder
    dropRate?: SortOrder
    usage?: SortOrder
    _count?: CardCountOrderByAggregateInput
    _avg?: CardAvgOrderByAggregateInput
    _max?: CardMaxOrderByAggregateInput
    _min?: CardMinOrderByAggregateInput
    _sum?: CardSumOrderByAggregateInput
  }

  export type CardScalarWhereWithAggregatesInput = {
    AND?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    OR?: CardScalarWhereWithAggregatesInput[]
    NOT?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Card"> | string
    name?: StringWithAggregatesFilter<"Card"> | string
    description?: StringWithAggregatesFilter<"Card"> | string
    perkCode?: StringWithAggregatesFilter<"Card"> | string
    rarity?: StringWithAggregatesFilter<"Card"> | string
    dropRate?: FloatWithAggregatesFilter<"Card"> | number
    usage?: StringWithAggregatesFilter<"Card"> | string
  }

  export type UserCardWhereInput = {
    AND?: UserCardWhereInput | UserCardWhereInput[]
    OR?: UserCardWhereInput[]
    NOT?: UserCardWhereInput | UserCardWhereInput[]
    id?: StringFilter<"UserCard"> | string
    userId?: StringFilter<"UserCard"> | string
    cardId?: StringFilter<"UserCard"> | string
    isUsed?: BoolFilter<"UserCard"> | boolean
    remainingValue?: FloatNullableFilter<"UserCard"> | number | null
    acquiredAt?: DateTimeFilter<"UserCard"> | Date | string
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserCardOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    isUsed?: SortOrder
    remainingValue?: SortOrderInput | SortOrder
    acquiredAt?: SortOrder
    card?: CardOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserCardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserCardWhereInput | UserCardWhereInput[]
    OR?: UserCardWhereInput[]
    NOT?: UserCardWhereInput | UserCardWhereInput[]
    userId?: StringFilter<"UserCard"> | string
    cardId?: StringFilter<"UserCard"> | string
    isUsed?: BoolFilter<"UserCard"> | boolean
    remainingValue?: FloatNullableFilter<"UserCard"> | number | null
    acquiredAt?: DateTimeFilter<"UserCard"> | Date | string
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserCardOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    isUsed?: SortOrder
    remainingValue?: SortOrderInput | SortOrder
    acquiredAt?: SortOrder
    _count?: UserCardCountOrderByAggregateInput
    _avg?: UserCardAvgOrderByAggregateInput
    _max?: UserCardMaxOrderByAggregateInput
    _min?: UserCardMinOrderByAggregateInput
    _sum?: UserCardSumOrderByAggregateInput
  }

  export type UserCardScalarWhereWithAggregatesInput = {
    AND?: UserCardScalarWhereWithAggregatesInput | UserCardScalarWhereWithAggregatesInput[]
    OR?: UserCardScalarWhereWithAggregatesInput[]
    NOT?: UserCardScalarWhereWithAggregatesInput | UserCardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserCard"> | string
    userId?: StringWithAggregatesFilter<"UserCard"> | string
    cardId?: StringWithAggregatesFilter<"UserCard"> | string
    isUsed?: BoolWithAggregatesFilter<"UserCard"> | boolean
    remainingValue?: FloatNullableWithAggregatesFilter<"UserCard"> | number | null
    acquiredAt?: DateTimeWithAggregatesFilter<"UserCard"> | Date | string
  }

  export type VendorWhereInput = {
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    id?: StringFilter<"Vendor"> | string
    username?: StringFilter<"Vendor"> | string
    passwordHash?: StringFilter<"Vendor"> | string
    name?: StringFilter<"Vendor"> | string
    image?: StringFilter<"Vendor"> | string
    bannerImage?: StringNullableFilter<"Vendor"> | string | null
    rating?: FloatFilter<"Vendor"> | number
    ratingCount?: IntFilter<"Vendor"> | number
    status?: StringFilter<"Vendor"> | string
    announcementBanner?: StringNullableFilter<"Vendor"> | string | null
    instapayAddress?: StringNullableFilter<"Vendor"> | string | null
    instapayName?: StringNullableFilter<"Vendor"> | string | null
    commissionOwedBalance?: FloatFilter<"Vendor"> | number
    subsidiesOwedBalance?: FloatFilter<"Vendor"> | number
    lifetimeSales?: FloatFilter<"Vendor"> | number
    lifetimeOrders?: IntFilter<"Vendor"> | number
    ledgerPinHash?: StringNullableFilter<"Vendor"> | string | null
    hypeMultiplier?: FloatFilter<"Vendor"> | number
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeFilter<"Vendor"> | Date | string
    announcementUpdatedAt?: DateTimeNullableFilter<"Vendor"> | Date | string | null
    menuItems?: MenuItemListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type VendorOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bannerImage?: SortOrderInput | SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    status?: SortOrder
    announcementBanner?: SortOrderInput | SortOrder
    instapayAddress?: SortOrderInput | SortOrder
    instapayName?: SortOrderInput | SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    ledgerPinHash?: SortOrderInput | SortOrder
    hypeMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    announcementUpdatedAt?: SortOrderInput | SortOrder
    menuItems?: MenuItemOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    passwordHash?: StringFilter<"Vendor"> | string
    name?: StringFilter<"Vendor"> | string
    image?: StringFilter<"Vendor"> | string
    bannerImage?: StringNullableFilter<"Vendor"> | string | null
    rating?: FloatFilter<"Vendor"> | number
    ratingCount?: IntFilter<"Vendor"> | number
    status?: StringFilter<"Vendor"> | string
    announcementBanner?: StringNullableFilter<"Vendor"> | string | null
    instapayAddress?: StringNullableFilter<"Vendor"> | string | null
    instapayName?: StringNullableFilter<"Vendor"> | string | null
    commissionOwedBalance?: FloatFilter<"Vendor"> | number
    subsidiesOwedBalance?: FloatFilter<"Vendor"> | number
    lifetimeSales?: FloatFilter<"Vendor"> | number
    lifetimeOrders?: IntFilter<"Vendor"> | number
    ledgerPinHash?: StringNullableFilter<"Vendor"> | string | null
    hypeMultiplier?: FloatFilter<"Vendor"> | number
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeFilter<"Vendor"> | Date | string
    announcementUpdatedAt?: DateTimeNullableFilter<"Vendor"> | Date | string | null
    menuItems?: MenuItemListRelationFilter
    orders?: OrderListRelationFilter
  }, "id" | "username">

  export type VendorOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bannerImage?: SortOrderInput | SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    status?: SortOrder
    announcementBanner?: SortOrderInput | SortOrder
    instapayAddress?: SortOrderInput | SortOrder
    instapayName?: SortOrderInput | SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    ledgerPinHash?: SortOrderInput | SortOrder
    hypeMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    announcementUpdatedAt?: SortOrderInput | SortOrder
    _count?: VendorCountOrderByAggregateInput
    _avg?: VendorAvgOrderByAggregateInput
    _max?: VendorMaxOrderByAggregateInput
    _min?: VendorMinOrderByAggregateInput
    _sum?: VendorSumOrderByAggregateInput
  }

  export type VendorScalarWhereWithAggregatesInput = {
    AND?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    OR?: VendorScalarWhereWithAggregatesInput[]
    NOT?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vendor"> | string
    username?: StringWithAggregatesFilter<"Vendor"> | string
    passwordHash?: StringWithAggregatesFilter<"Vendor"> | string
    name?: StringWithAggregatesFilter<"Vendor"> | string
    image?: StringWithAggregatesFilter<"Vendor"> | string
    bannerImage?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    rating?: FloatWithAggregatesFilter<"Vendor"> | number
    ratingCount?: IntWithAggregatesFilter<"Vendor"> | number
    status?: StringWithAggregatesFilter<"Vendor"> | string
    announcementBanner?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    instapayAddress?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    instapayName?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    commissionOwedBalance?: FloatWithAggregatesFilter<"Vendor"> | number
    subsidiesOwedBalance?: FloatWithAggregatesFilter<"Vendor"> | number
    lifetimeSales?: FloatWithAggregatesFilter<"Vendor"> | number
    lifetimeOrders?: IntWithAggregatesFilter<"Vendor"> | number
    ledgerPinHash?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    hypeMultiplier?: FloatWithAggregatesFilter<"Vendor"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
    announcementUpdatedAt?: DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null
  }

  export type MenuItemWhereInput = {
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    id?: StringFilter<"MenuItem"> | string
    vendorId?: StringFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringFilter<"MenuItem"> | string
    price?: FloatFilter<"MenuItem"> | number
    image?: StringFilter<"MenuItem"> | string
    inStock?: BoolFilter<"MenuItem"> | boolean
    requiredHypeLevel?: IntFilter<"MenuItem"> | number
    category?: StringFilter<"MenuItem"> | string
    addOns?: StringFilter<"MenuItem"> | string
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }

  export type MenuItemOrderByWithRelationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    inStock?: SortOrder
    requiredHypeLevel?: SortOrder
    category?: SortOrder
    addOns?: SortOrder
    vendor?: VendorOrderByWithRelationInput
  }

  export type MenuItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    vendorId?: StringFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringFilter<"MenuItem"> | string
    price?: FloatFilter<"MenuItem"> | number
    image?: StringFilter<"MenuItem"> | string
    inStock?: BoolFilter<"MenuItem"> | boolean
    requiredHypeLevel?: IntFilter<"MenuItem"> | number
    category?: StringFilter<"MenuItem"> | string
    addOns?: StringFilter<"MenuItem"> | string
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }, "id">

  export type MenuItemOrderByWithAggregationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    inStock?: SortOrder
    requiredHypeLevel?: SortOrder
    category?: SortOrder
    addOns?: SortOrder
    _count?: MenuItemCountOrderByAggregateInput
    _avg?: MenuItemAvgOrderByAggregateInput
    _max?: MenuItemMaxOrderByAggregateInput
    _min?: MenuItemMinOrderByAggregateInput
    _sum?: MenuItemSumOrderByAggregateInput
  }

  export type MenuItemScalarWhereWithAggregatesInput = {
    AND?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    OR?: MenuItemScalarWhereWithAggregatesInput[]
    NOT?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MenuItem"> | string
    vendorId?: StringWithAggregatesFilter<"MenuItem"> | string
    name?: StringWithAggregatesFilter<"MenuItem"> | string
    description?: StringWithAggregatesFilter<"MenuItem"> | string
    price?: FloatWithAggregatesFilter<"MenuItem"> | number
    image?: StringWithAggregatesFilter<"MenuItem"> | string
    inStock?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    requiredHypeLevel?: IntWithAggregatesFilter<"MenuItem"> | number
    category?: StringWithAggregatesFilter<"MenuItem"> | string
    addOns?: StringWithAggregatesFilter<"MenuItem"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    hostId?: StringFilter<"Order"> | string
    vendorId?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    sawaSubsidy?: FloatFilter<"Order"> | number
    isCoveredByHost?: BoolFilter<"Order"> | boolean
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    hostId?: SortOrder
    vendorId?: SortOrder
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
    isCoveredByHost?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendor?: VendorOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    orderNumber?: StringFilter<"Order"> | string
    hostId?: StringFilter<"Order"> | string
    vendorId?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    sawaSubsidy?: FloatFilter<"Order"> | number
    isCoveredByHost?: BoolFilter<"Order"> | boolean
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    vendor?: XOR<VendorScalarRelationFilter, VendorWhereInput>
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    hostId?: SortOrder
    vendorId?: SortOrder
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
    isCoveredByHost?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    orderNumber?: StringWithAggregatesFilter<"Order"> | string
    hostId?: StringWithAggregatesFilter<"Order"> | string
    vendorId?: StringWithAggregatesFilter<"Order"> | string
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    sawaSubsidy?: FloatWithAggregatesFilter<"Order"> | number
    isCoveredByHost?: BoolWithAggregatesFilter<"Order"> | boolean
    status?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type ParticipantOrderWhereInput = {
    AND?: ParticipantOrderWhereInput | ParticipantOrderWhereInput[]
    OR?: ParticipantOrderWhereInput[]
    NOT?: ParticipantOrderWhereInput | ParticipantOrderWhereInput[]
    id?: StringFilter<"ParticipantOrder"> | string
    orderId?: StringFilter<"ParticipantOrder"> | string
    userId?: StringFilter<"ParticipantOrder"> | string
    shareAmount?: FloatFilter<"ParticipantOrder"> | number
    sawaSubsidy?: FloatFilter<"ParticipantOrder"> | number
    perkUserCardId?: StringNullableFilter<"ParticipantOrder"> | string | null
    hasPaid?: BoolFilter<"ParticipantOrder"> | boolean
    paymentScreenshotUrl?: StringNullableFilter<"ParticipantOrder"> | string | null
    ocrVerificationLog?: StringNullableFilter<"ParticipantOrder"> | string | null
  }

  export type ParticipantOrderOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
    perkUserCardId?: SortOrderInput | SortOrder
    hasPaid?: SortOrder
    paymentScreenshotUrl?: SortOrderInput | SortOrder
    ocrVerificationLog?: SortOrderInput | SortOrder
  }

  export type ParticipantOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParticipantOrderWhereInput | ParticipantOrderWhereInput[]
    OR?: ParticipantOrderWhereInput[]
    NOT?: ParticipantOrderWhereInput | ParticipantOrderWhereInput[]
    orderId?: StringFilter<"ParticipantOrder"> | string
    userId?: StringFilter<"ParticipantOrder"> | string
    shareAmount?: FloatFilter<"ParticipantOrder"> | number
    sawaSubsidy?: FloatFilter<"ParticipantOrder"> | number
    perkUserCardId?: StringNullableFilter<"ParticipantOrder"> | string | null
    hasPaid?: BoolFilter<"ParticipantOrder"> | boolean
    paymentScreenshotUrl?: StringNullableFilter<"ParticipantOrder"> | string | null
    ocrVerificationLog?: StringNullableFilter<"ParticipantOrder"> | string | null
  }, "id">

  export type ParticipantOrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
    perkUserCardId?: SortOrderInput | SortOrder
    hasPaid?: SortOrder
    paymentScreenshotUrl?: SortOrderInput | SortOrder
    ocrVerificationLog?: SortOrderInput | SortOrder
    _count?: ParticipantOrderCountOrderByAggregateInput
    _avg?: ParticipantOrderAvgOrderByAggregateInput
    _max?: ParticipantOrderMaxOrderByAggregateInput
    _min?: ParticipantOrderMinOrderByAggregateInput
    _sum?: ParticipantOrderSumOrderByAggregateInput
  }

  export type ParticipantOrderScalarWhereWithAggregatesInput = {
    AND?: ParticipantOrderScalarWhereWithAggregatesInput | ParticipantOrderScalarWhereWithAggregatesInput[]
    OR?: ParticipantOrderScalarWhereWithAggregatesInput[]
    NOT?: ParticipantOrderScalarWhereWithAggregatesInput | ParticipantOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ParticipantOrder"> | string
    orderId?: StringWithAggregatesFilter<"ParticipantOrder"> | string
    userId?: StringWithAggregatesFilter<"ParticipantOrder"> | string
    shareAmount?: FloatWithAggregatesFilter<"ParticipantOrder"> | number
    sawaSubsidy?: FloatWithAggregatesFilter<"ParticipantOrder"> | number
    perkUserCardId?: StringNullableWithAggregatesFilter<"ParticipantOrder"> | string | null
    hasPaid?: BoolWithAggregatesFilter<"ParticipantOrder"> | boolean
    paymentScreenshotUrl?: StringNullableWithAggregatesFilter<"ParticipantOrder"> | string | null
    ocrVerificationLog?: StringNullableWithAggregatesFilter<"ParticipantOrder"> | string | null
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    menuItemId?: StringNullableFilter<"OrderItem"> | string | null
    flashDropId?: StringNullableFilter<"OrderItem"> | string | null
    name?: StringFilter<"OrderItem"> | string
    price?: FloatFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    modifiers?: StringFilter<"OrderItem"> | string
    specialNotes?: StringNullableFilter<"OrderItem"> | string | null
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrderInput | SortOrder
    flashDropId?: SortOrderInput | SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    modifiers?: SortOrder
    specialNotes?: SortOrderInput | SortOrder
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    menuItemId?: StringNullableFilter<"OrderItem"> | string | null
    flashDropId?: StringNullableFilter<"OrderItem"> | string | null
    name?: StringFilter<"OrderItem"> | string
    price?: FloatFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    modifiers?: StringFilter<"OrderItem"> | string
    specialNotes?: StringNullableFilter<"OrderItem"> | string | null
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrderInput | SortOrder
    flashDropId?: SortOrderInput | SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    modifiers?: SortOrder
    specialNotes?: SortOrderInput | SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    menuItemId?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    flashDropId?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    name?: StringWithAggregatesFilter<"OrderItem"> | string
    price?: FloatWithAggregatesFilter<"OrderItem"> | number
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    modifiers?: StringWithAggregatesFilter<"OrderItem"> | string
    specialNotes?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
  }

  export type FriendshipStreakWhereInput = {
    AND?: FriendshipStreakWhereInput | FriendshipStreakWhereInput[]
    OR?: FriendshipStreakWhereInput[]
    NOT?: FriendshipStreakWhereInput | FriendshipStreakWhereInput[]
    id?: StringFilter<"FriendshipStreak"> | string
    userId?: StringFilter<"FriendshipStreak"> | string
    friendId?: StringFilter<"FriendshipStreak"> | string
    streak?: IntFilter<"FriendshipStreak"> | number
    isActive?: BoolFilter<"FriendshipStreak"> | boolean
    createdAt?: DateTimeFilter<"FriendshipStreak"> | Date | string
    updatedAt?: DateTimeFilter<"FriendshipStreak"> | Date | string
  }

  export type FriendshipStreakOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    streak?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendshipStreakWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FriendshipStreakWhereInput | FriendshipStreakWhereInput[]
    OR?: FriendshipStreakWhereInput[]
    NOT?: FriendshipStreakWhereInput | FriendshipStreakWhereInput[]
    userId?: StringFilter<"FriendshipStreak"> | string
    friendId?: StringFilter<"FriendshipStreak"> | string
    streak?: IntFilter<"FriendshipStreak"> | number
    isActive?: BoolFilter<"FriendshipStreak"> | boolean
    createdAt?: DateTimeFilter<"FriendshipStreak"> | Date | string
    updatedAt?: DateTimeFilter<"FriendshipStreak"> | Date | string
  }, "id">

  export type FriendshipStreakOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    streak?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FriendshipStreakCountOrderByAggregateInput
    _avg?: FriendshipStreakAvgOrderByAggregateInput
    _max?: FriendshipStreakMaxOrderByAggregateInput
    _min?: FriendshipStreakMinOrderByAggregateInput
    _sum?: FriendshipStreakSumOrderByAggregateInput
  }

  export type FriendshipStreakScalarWhereWithAggregatesInput = {
    AND?: FriendshipStreakScalarWhereWithAggregatesInput | FriendshipStreakScalarWhereWithAggregatesInput[]
    OR?: FriendshipStreakScalarWhereWithAggregatesInput[]
    NOT?: FriendshipStreakScalarWhereWithAggregatesInput | FriendshipStreakScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendshipStreak"> | string
    userId?: StringWithAggregatesFilter<"FriendshipStreak"> | string
    friendId?: StringWithAggregatesFilter<"FriendshipStreak"> | string
    streak?: IntWithAggregatesFilter<"FriendshipStreak"> | number
    isActive?: BoolWithAggregatesFilter<"FriendshipStreak"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FriendshipStreak"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FriendshipStreak"> | Date | string
  }

  export type HypeLogWhereInput = {
    AND?: HypeLogWhereInput | HypeLogWhereInput[]
    OR?: HypeLogWhereInput[]
    NOT?: HypeLogWhereInput | HypeLogWhereInput[]
    id?: StringFilter<"HypeLog"> | string
    userId?: StringFilter<"HypeLog"> | string
    points?: IntFilter<"HypeLog"> | number
    reason?: StringNullableFilter<"HypeLog"> | string | null
    createdAt?: DateTimeFilter<"HypeLog"> | Date | string
  }

  export type HypeLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type HypeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HypeLogWhereInput | HypeLogWhereInput[]
    OR?: HypeLogWhereInput[]
    NOT?: HypeLogWhereInput | HypeLogWhereInput[]
    userId?: StringFilter<"HypeLog"> | string
    points?: IntFilter<"HypeLog"> | number
    reason?: StringNullableFilter<"HypeLog"> | string | null
    createdAt?: DateTimeFilter<"HypeLog"> | Date | string
  }, "id">

  export type HypeLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: HypeLogCountOrderByAggregateInput
    _avg?: HypeLogAvgOrderByAggregateInput
    _max?: HypeLogMaxOrderByAggregateInput
    _min?: HypeLogMinOrderByAggregateInput
    _sum?: HypeLogSumOrderByAggregateInput
  }

  export type HypeLogScalarWhereWithAggregatesInput = {
    AND?: HypeLogScalarWhereWithAggregatesInput | HypeLogScalarWhereWithAggregatesInput[]
    OR?: HypeLogScalarWhereWithAggregatesInput[]
    NOT?: HypeLogScalarWhereWithAggregatesInput | HypeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HypeLog"> | string
    userId?: StringWithAggregatesFilter<"HypeLog"> | string
    points?: IntWithAggregatesFilter<"HypeLog"> | number
    reason?: StringNullableWithAggregatesFilter<"HypeLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HypeLog"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    username: string
    passwordHash: string
    name: string
    avatar: string
    hypeScore?: number
    sawaCurrency?: number
    keysAvailable?: number
    activeCardId?: string | null
    walletBalance?: number
    locksUntilMysteryCop?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inventory?: UserCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    username: string
    passwordHash: string
    name: string
    avatar: string
    hypeScore?: number
    sawaCurrency?: number
    keysAvailable?: number
    activeCardId?: string | null
    walletBalance?: number
    locksUntilMysteryCop?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inventory?: UserCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    hypeScore?: IntFieldUpdateOperationsInput | number
    sawaCurrency?: IntFieldUpdateOperationsInput | number
    keysAvailable?: IntFieldUpdateOperationsInput | number
    activeCardId?: NullableStringFieldUpdateOperationsInput | string | null
    walletBalance?: FloatFieldUpdateOperationsInput | number
    locksUntilMysteryCop?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventory?: UserCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    hypeScore?: IntFieldUpdateOperationsInput | number
    sawaCurrency?: IntFieldUpdateOperationsInput | number
    keysAvailable?: IntFieldUpdateOperationsInput | number
    activeCardId?: NullableStringFieldUpdateOperationsInput | string | null
    walletBalance?: FloatFieldUpdateOperationsInput | number
    locksUntilMysteryCop?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inventory?: UserCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    username: string
    passwordHash: string
    name: string
    avatar: string
    hypeScore?: number
    sawaCurrency?: number
    keysAvailable?: number
    activeCardId?: string | null
    walletBalance?: number
    locksUntilMysteryCop?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    hypeScore?: IntFieldUpdateOperationsInput | number
    sawaCurrency?: IntFieldUpdateOperationsInput | number
    keysAvailable?: IntFieldUpdateOperationsInput | number
    activeCardId?: NullableStringFieldUpdateOperationsInput | string | null
    walletBalance?: FloatFieldUpdateOperationsInput | number
    locksUntilMysteryCop?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    hypeScore?: IntFieldUpdateOperationsInput | number
    sawaCurrency?: IntFieldUpdateOperationsInput | number
    keysAvailable?: IntFieldUpdateOperationsInput | number
    activeCardId?: NullableStringFieldUpdateOperationsInput | string | null
    walletBalance?: FloatFieldUpdateOperationsInput | number
    locksUntilMysteryCop?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardCreateInput = {
    id: string
    name: string
    description: string
    perkCode: string
    rarity: string
    dropRate?: number
    usage?: string
    users?: UserCardCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateInput = {
    id: string
    name: string
    description: string
    perkCode: string
    rarity: string
    dropRate?: number
    usage?: string
    users?: UserCardUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    perkCode?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    dropRate?: FloatFieldUpdateOperationsInput | number
    usage?: StringFieldUpdateOperationsInput | string
    users?: UserCardUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    perkCode?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    dropRate?: FloatFieldUpdateOperationsInput | number
    usage?: StringFieldUpdateOperationsInput | string
    users?: UserCardUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardCreateManyInput = {
    id: string
    name: string
    description: string
    perkCode: string
    rarity: string
    dropRate?: number
    usage?: string
  }

  export type CardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    perkCode?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    dropRate?: FloatFieldUpdateOperationsInput | number
    usage?: StringFieldUpdateOperationsInput | string
  }

  export type CardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    perkCode?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    dropRate?: FloatFieldUpdateOperationsInput | number
    usage?: StringFieldUpdateOperationsInput | string
  }

  export type UserCardCreateInput = {
    id: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
    card: CardCreateNestedOneWithoutUsersInput
    user: UserCreateNestedOneWithoutInventoryInput
  }

  export type UserCardUncheckedCreateInput = {
    id: string
    userId: string
    cardId: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
  }

  export type UserCardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutUsersNestedInput
    user?: UserUpdateOneRequiredWithoutInventoryNestedInput
  }

  export type UserCardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardCreateManyInput = {
    id: string
    userId: string
    cardId: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
  }

  export type UserCardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorCreateInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
    menuItems?: MenuItemCreateNestedManyWithoutVendorInput
    orders?: OrderCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutVendorInput
    orders?: OrderUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menuItems?: MenuItemUpdateManyWithoutVendorNestedInput
    orders?: OrderUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menuItems?: MenuItemUncheckedUpdateManyWithoutVendorNestedInput
    orders?: OrderUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type VendorCreateManyInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
  }

  export type VendorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VendorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MenuItemCreateInput = {
    id: string
    name: string
    description: string
    price: number
    image: string
    inStock?: boolean
    requiredHypeLevel?: number
    category: string
    addOns?: string
    vendor: VendorCreateNestedOneWithoutMenuItemsInput
  }

  export type MenuItemUncheckedCreateInput = {
    id: string
    vendorId: string
    name: string
    description: string
    price: number
    image: string
    inStock?: boolean
    requiredHypeLevel?: number
    category: string
    addOns?: string
  }

  export type MenuItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
    vendor?: VendorUpdateOneRequiredWithoutMenuItemsNestedInput
  }

  export type MenuItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
  }

  export type MenuItemCreateManyInput = {
    id: string
    vendorId: string
    name: string
    description: string
    price: number
    image: string
    inStock?: boolean
    requiredHypeLevel?: number
    category: string
    addOns?: string
  }

  export type MenuItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
  }

  export type MenuItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateInput = {
    id: string
    orderNumber: string
    hostId: string
    totalAmount: number
    sawaSubsidy?: number
    isCoveredByHost?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor: VendorCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateInput = {
    id: string
    orderNumber: string
    hostId: string
    vendorId: string
    totalAmount: number
    sawaSubsidy?: number
    isCoveredByHost?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyInput = {
    id: string
    orderNumber: string
    hostId: string
    vendorId: string
    totalAmount: number
    sawaSubsidy?: number
    isCoveredByHost?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipantOrderCreateInput = {
    id: string
    orderId: string
    userId: string
    shareAmount: number
    sawaSubsidy?: number
    perkUserCardId?: string | null
    hasPaid?: boolean
    paymentScreenshotUrl?: string | null
    ocrVerificationLog?: string | null
  }

  export type ParticipantOrderUncheckedCreateInput = {
    id: string
    orderId: string
    userId: string
    shareAmount: number
    sawaSubsidy?: number
    perkUserCardId?: string | null
    hasPaid?: boolean
    paymentScreenshotUrl?: string | null
    ocrVerificationLog?: string | null
  }

  export type ParticipantOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    shareAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    perkUserCardId?: NullableStringFieldUpdateOperationsInput | string | null
    hasPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ocrVerificationLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    shareAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    perkUserCardId?: NullableStringFieldUpdateOperationsInput | string | null
    hasPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ocrVerificationLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantOrderCreateManyInput = {
    id: string
    orderId: string
    userId: string
    shareAmount: number
    sawaSubsidy?: number
    perkUserCardId?: string | null
    hasPaid?: boolean
    paymentScreenshotUrl?: string | null
    ocrVerificationLog?: string | null
  }

  export type ParticipantOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    shareAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    perkUserCardId?: NullableStringFieldUpdateOperationsInput | string | null
    hasPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ocrVerificationLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    shareAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    perkUserCardId?: NullableStringFieldUpdateOperationsInput | string | null
    hasPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentScreenshotUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ocrVerificationLog?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateInput = {
    id: string
    orderId: string
    menuItemId?: string | null
    flashDropId?: string | null
    name: string
    price: number
    quantity?: number
    modifiers: string
    specialNotes?: string | null
  }

  export type OrderItemUncheckedCreateInput = {
    id: string
    orderId: string
    menuItemId?: string | null
    flashDropId?: string | null
    name: string
    price: number
    quantity?: number
    modifiers: string
    specialNotes?: string | null
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    menuItemId?: NullableStringFieldUpdateOperationsInput | string | null
    flashDropId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    modifiers?: StringFieldUpdateOperationsInput | string
    specialNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    menuItemId?: NullableStringFieldUpdateOperationsInput | string | null
    flashDropId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    modifiers?: StringFieldUpdateOperationsInput | string
    specialNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyInput = {
    id: string
    orderId: string
    menuItemId?: string | null
    flashDropId?: string | null
    name: string
    price: number
    quantity?: number
    modifiers: string
    specialNotes?: string | null
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    menuItemId?: NullableStringFieldUpdateOperationsInput | string | null
    flashDropId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    modifiers?: StringFieldUpdateOperationsInput | string
    specialNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    menuItemId?: NullableStringFieldUpdateOperationsInput | string | null
    flashDropId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    modifiers?: StringFieldUpdateOperationsInput | string
    specialNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FriendshipStreakCreateInput = {
    id: string
    userId: string
    friendId: string
    streak?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipStreakUncheckedCreateInput = {
    id: string
    userId: string
    friendId: string
    streak?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipStreakUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipStreakUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipStreakCreateManyInput = {
    id: string
    userId: string
    friendId: string
    streak?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipStreakUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipStreakUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HypeLogCreateInput = {
    id: string
    userId: string
    points: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type HypeLogUncheckedCreateInput = {
    id: string
    userId: string
    points: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type HypeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HypeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HypeLogCreateManyInput = {
    id: string
    userId: string
    points: number
    reason?: string | null
    createdAt?: Date | string
  }

  export type HypeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HypeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCardListRelationFilter = {
    every?: UserCardWhereInput
    some?: UserCardWhereInput
    none?: UserCardWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    activeCardId?: SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    activeCardId?: SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    activeCardId?: SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    hypeScore?: SortOrder
    sawaCurrency?: SortOrder
    keysAvailable?: SortOrder
    walletBalance?: SortOrder
    locksUntilMysteryCop?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CardCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    perkCode?: SortOrder
    rarity?: SortOrder
    dropRate?: SortOrder
    usage?: SortOrder
  }

  export type CardAvgOrderByAggregateInput = {
    dropRate?: SortOrder
  }

  export type CardMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    perkCode?: SortOrder
    rarity?: SortOrder
    dropRate?: SortOrder
    usage?: SortOrder
  }

  export type CardMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    perkCode?: SortOrder
    rarity?: SortOrder
    dropRate?: SortOrder
    usage?: SortOrder
  }

  export type CardSumOrderByAggregateInput = {
    dropRate?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CardScalarRelationFilter = {
    is?: CardWhereInput
    isNot?: CardWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserCardCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    isUsed?: SortOrder
    remainingValue?: SortOrder
    acquiredAt?: SortOrder
  }

  export type UserCardAvgOrderByAggregateInput = {
    remainingValue?: SortOrder
  }

  export type UserCardMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    isUsed?: SortOrder
    remainingValue?: SortOrder
    acquiredAt?: SortOrder
  }

  export type UserCardMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardId?: SortOrder
    isUsed?: SortOrder
    remainingValue?: SortOrder
    acquiredAt?: SortOrder
  }

  export type UserCardSumOrderByAggregateInput = {
    remainingValue?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MenuItemListRelationFilter = {
    every?: MenuItemWhereInput
    some?: MenuItemWhereInput
    none?: MenuItemWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type MenuItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendorCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bannerImage?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    status?: SortOrder
    announcementBanner?: SortOrder
    instapayAddress?: SortOrder
    instapayName?: SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    ledgerPinHash?: SortOrder
    hypeMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    announcementUpdatedAt?: SortOrder
  }

  export type VendorAvgOrderByAggregateInput = {
    rating?: SortOrder
    ratingCount?: SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    hypeMultiplier?: SortOrder
  }

  export type VendorMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bannerImage?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    status?: SortOrder
    announcementBanner?: SortOrder
    instapayAddress?: SortOrder
    instapayName?: SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    ledgerPinHash?: SortOrder
    hypeMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    announcementUpdatedAt?: SortOrder
  }

  export type VendorMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    image?: SortOrder
    bannerImage?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    status?: SortOrder
    announcementBanner?: SortOrder
    instapayAddress?: SortOrder
    instapayName?: SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    ledgerPinHash?: SortOrder
    hypeMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    announcementUpdatedAt?: SortOrder
  }

  export type VendorSumOrderByAggregateInput = {
    rating?: SortOrder
    ratingCount?: SortOrder
    commissionOwedBalance?: SortOrder
    subsidiesOwedBalance?: SortOrder
    lifetimeSales?: SortOrder
    lifetimeOrders?: SortOrder
    hypeMultiplier?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VendorScalarRelationFilter = {
    is?: VendorWhereInput
    isNot?: VendorWhereInput
  }

  export type MenuItemCountOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    inStock?: SortOrder
    requiredHypeLevel?: SortOrder
    category?: SortOrder
    addOns?: SortOrder
  }

  export type MenuItemAvgOrderByAggregateInput = {
    price?: SortOrder
    requiredHypeLevel?: SortOrder
  }

  export type MenuItemMaxOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    inStock?: SortOrder
    requiredHypeLevel?: SortOrder
    category?: SortOrder
    addOns?: SortOrder
  }

  export type MenuItemMinOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    inStock?: SortOrder
    requiredHypeLevel?: SortOrder
    category?: SortOrder
    addOns?: SortOrder
  }

  export type MenuItemSumOrderByAggregateInput = {
    price?: SortOrder
    requiredHypeLevel?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    hostId?: SortOrder
    vendorId?: SortOrder
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
    isCoveredByHost?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    hostId?: SortOrder
    vendorId?: SortOrder
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
    isCoveredByHost?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    hostId?: SortOrder
    vendorId?: SortOrder
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
    isCoveredByHost?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    sawaSubsidy?: SortOrder
  }

  export type ParticipantOrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
    perkUserCardId?: SortOrder
    hasPaid?: SortOrder
    paymentScreenshotUrl?: SortOrder
    ocrVerificationLog?: SortOrder
  }

  export type ParticipantOrderAvgOrderByAggregateInput = {
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
  }

  export type ParticipantOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
    perkUserCardId?: SortOrder
    hasPaid?: SortOrder
    paymentScreenshotUrl?: SortOrder
    ocrVerificationLog?: SortOrder
  }

  export type ParticipantOrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
    perkUserCardId?: SortOrder
    hasPaid?: SortOrder
    paymentScreenshotUrl?: SortOrder
    ocrVerificationLog?: SortOrder
  }

  export type ParticipantOrderSumOrderByAggregateInput = {
    shareAmount?: SortOrder
    sawaSubsidy?: SortOrder
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    flashDropId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    modifiers?: SortOrder
    specialNotes?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    flashDropId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    modifiers?: SortOrder
    specialNotes?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    flashDropId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    modifiers?: SortOrder
    specialNotes?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
  }

  export type FriendshipStreakCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    streak?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendshipStreakAvgOrderByAggregateInput = {
    streak?: SortOrder
  }

  export type FriendshipStreakMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    streak?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendshipStreakMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    streak?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendshipStreakSumOrderByAggregateInput = {
    streak?: SortOrder
  }

  export type HypeLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type HypeLogAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type HypeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type HypeLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type HypeLogSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type UserCardCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
  }

  export type UserCardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserCardUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    upsert?: UserCardUpsertWithWhereUniqueWithoutUserInput | UserCardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    set?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    disconnect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    delete?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    update?: UserCardUpdateWithWhereUniqueWithoutUserInput | UserCardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCardUpdateManyWithWhereWithoutUserInput | UserCardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
  }

  export type UserCardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    upsert?: UserCardUpsertWithWhereUniqueWithoutUserInput | UserCardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    set?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    disconnect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    delete?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    update?: UserCardUpdateWithWhereUniqueWithoutUserInput | UserCardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCardUpdateManyWithWhereWithoutUserInput | UserCardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
  }

  export type UserCardCreateNestedManyWithoutCardInput = {
    create?: XOR<UserCardCreateWithoutCardInput, UserCardUncheckedCreateWithoutCardInput> | UserCardCreateWithoutCardInput[] | UserCardUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutCardInput | UserCardCreateOrConnectWithoutCardInput[]
    createMany?: UserCardCreateManyCardInputEnvelope
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
  }

  export type UserCardUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<UserCardCreateWithoutCardInput, UserCardUncheckedCreateWithoutCardInput> | UserCardCreateWithoutCardInput[] | UserCardUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutCardInput | UserCardCreateOrConnectWithoutCardInput[]
    createMany?: UserCardCreateManyCardInputEnvelope
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
  }

  export type UserCardUpdateManyWithoutCardNestedInput = {
    create?: XOR<UserCardCreateWithoutCardInput, UserCardUncheckedCreateWithoutCardInput> | UserCardCreateWithoutCardInput[] | UserCardUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutCardInput | UserCardCreateOrConnectWithoutCardInput[]
    upsert?: UserCardUpsertWithWhereUniqueWithoutCardInput | UserCardUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: UserCardCreateManyCardInputEnvelope
    set?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    disconnect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    delete?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    update?: UserCardUpdateWithWhereUniqueWithoutCardInput | UserCardUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: UserCardUpdateManyWithWhereWithoutCardInput | UserCardUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
  }

  export type UserCardUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<UserCardCreateWithoutCardInput, UserCardUncheckedCreateWithoutCardInput> | UserCardCreateWithoutCardInput[] | UserCardUncheckedCreateWithoutCardInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutCardInput | UserCardCreateOrConnectWithoutCardInput[]
    upsert?: UserCardUpsertWithWhereUniqueWithoutCardInput | UserCardUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: UserCardCreateManyCardInputEnvelope
    set?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    disconnect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    delete?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    update?: UserCardUpdateWithWhereUniqueWithoutCardInput | UserCardUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: UserCardUpdateManyWithWhereWithoutCardInput | UserCardUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
  }

  export type CardCreateNestedOneWithoutUsersInput = {
    create?: XOR<CardCreateWithoutUsersInput, CardUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CardCreateOrConnectWithoutUsersInput
    connect?: CardWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInventoryInput = {
    create?: XOR<UserCreateWithoutInventoryInput, UserUncheckedCreateWithoutInventoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutInventoryInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CardUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CardCreateWithoutUsersInput, CardUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CardCreateOrConnectWithoutUsersInput
    upsert?: CardUpsertWithoutUsersInput
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutUsersInput, CardUpdateWithoutUsersInput>, CardUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutInventoryNestedInput = {
    create?: XOR<UserCreateWithoutInventoryInput, UserUncheckedCreateWithoutInventoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutInventoryInput
    upsert?: UserUpsertWithoutInventoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInventoryInput, UserUpdateWithoutInventoryInput>, UserUncheckedUpdateWithoutInventoryInput>
  }

  export type MenuItemCreateNestedManyWithoutVendorInput = {
    create?: XOR<MenuItemCreateWithoutVendorInput, MenuItemUncheckedCreateWithoutVendorInput> | MenuItemCreateWithoutVendorInput[] | MenuItemUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutVendorInput | MenuItemCreateOrConnectWithoutVendorInput[]
    createMany?: MenuItemCreateManyVendorInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutVendorInput = {
    create?: XOR<OrderCreateWithoutVendorInput, OrderUncheckedCreateWithoutVendorInput> | OrderCreateWithoutVendorInput[] | OrderUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutVendorInput | OrderCreateOrConnectWithoutVendorInput[]
    createMany?: OrderCreateManyVendorInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type MenuItemUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<MenuItemCreateWithoutVendorInput, MenuItemUncheckedCreateWithoutVendorInput> | MenuItemCreateWithoutVendorInput[] | MenuItemUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutVendorInput | MenuItemCreateOrConnectWithoutVendorInput[]
    createMany?: MenuItemCreateManyVendorInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<OrderCreateWithoutVendorInput, OrderUncheckedCreateWithoutVendorInput> | OrderCreateWithoutVendorInput[] | OrderUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutVendorInput | OrderCreateOrConnectWithoutVendorInput[]
    createMany?: OrderCreateManyVendorInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MenuItemUpdateManyWithoutVendorNestedInput = {
    create?: XOR<MenuItemCreateWithoutVendorInput, MenuItemUncheckedCreateWithoutVendorInput> | MenuItemCreateWithoutVendorInput[] | MenuItemUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutVendorInput | MenuItemCreateOrConnectWithoutVendorInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutVendorInput | MenuItemUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: MenuItemCreateManyVendorInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutVendorInput | MenuItemUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutVendorInput | MenuItemUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutVendorNestedInput = {
    create?: XOR<OrderCreateWithoutVendorInput, OrderUncheckedCreateWithoutVendorInput> | OrderCreateWithoutVendorInput[] | OrderUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutVendorInput | OrderCreateOrConnectWithoutVendorInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutVendorInput | OrderUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: OrderCreateManyVendorInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutVendorInput | OrderUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutVendorInput | OrderUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type MenuItemUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<MenuItemCreateWithoutVendorInput, MenuItemUncheckedCreateWithoutVendorInput> | MenuItemCreateWithoutVendorInput[] | MenuItemUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutVendorInput | MenuItemCreateOrConnectWithoutVendorInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutVendorInput | MenuItemUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: MenuItemCreateManyVendorInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutVendorInput | MenuItemUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutVendorInput | MenuItemUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<OrderCreateWithoutVendorInput, OrderUncheckedCreateWithoutVendorInput> | OrderCreateWithoutVendorInput[] | OrderUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutVendorInput | OrderCreateOrConnectWithoutVendorInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutVendorInput | OrderUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: OrderCreateManyVendorInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutVendorInput | OrderUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutVendorInput | OrderUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type VendorCreateNestedOneWithoutMenuItemsInput = {
    create?: XOR<VendorCreateWithoutMenuItemsInput, VendorUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutMenuItemsInput
    connect?: VendorWhereUniqueInput
  }

  export type VendorUpdateOneRequiredWithoutMenuItemsNestedInput = {
    create?: XOR<VendorCreateWithoutMenuItemsInput, VendorUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutMenuItemsInput
    upsert?: VendorUpsertWithoutMenuItemsInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutMenuItemsInput, VendorUpdateWithoutMenuItemsInput>, VendorUncheckedUpdateWithoutMenuItemsInput>
  }

  export type VendorCreateNestedOneWithoutOrdersInput = {
    create?: XOR<VendorCreateWithoutOrdersInput, VendorUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: VendorCreateOrConnectWithoutOrdersInput
    connect?: VendorWhereUniqueInput
  }

  export type VendorUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<VendorCreateWithoutOrdersInput, VendorUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: VendorCreateOrConnectWithoutOrdersInput
    upsert?: VendorUpsertWithoutOrdersInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutOrdersInput, VendorUpdateWithoutOrdersInput>, VendorUncheckedUpdateWithoutOrdersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserCardCreateWithoutUserInput = {
    id: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
    card: CardCreateNestedOneWithoutUsersInput
  }

  export type UserCardUncheckedCreateWithoutUserInput = {
    id: string
    cardId: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
  }

  export type UserCardCreateOrConnectWithoutUserInput = {
    where: UserCardWhereUniqueInput
    create: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput>
  }

  export type UserCardCreateManyUserInputEnvelope = {
    data: UserCardCreateManyUserInput | UserCardCreateManyUserInput[]
  }

  export type UserCardUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCardWhereUniqueInput
    update: XOR<UserCardUpdateWithoutUserInput, UserCardUncheckedUpdateWithoutUserInput>
    create: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput>
  }

  export type UserCardUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCardWhereUniqueInput
    data: XOR<UserCardUpdateWithoutUserInput, UserCardUncheckedUpdateWithoutUserInput>
  }

  export type UserCardUpdateManyWithWhereWithoutUserInput = {
    where: UserCardScalarWhereInput
    data: XOR<UserCardUpdateManyMutationInput, UserCardUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCardScalarWhereInput = {
    AND?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
    OR?: UserCardScalarWhereInput[]
    NOT?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
    id?: StringFilter<"UserCard"> | string
    userId?: StringFilter<"UserCard"> | string
    cardId?: StringFilter<"UserCard"> | string
    isUsed?: BoolFilter<"UserCard"> | boolean
    remainingValue?: FloatNullableFilter<"UserCard"> | number | null
    acquiredAt?: DateTimeFilter<"UserCard"> | Date | string
  }

  export type UserCardCreateWithoutCardInput = {
    id: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
    user: UserCreateNestedOneWithoutInventoryInput
  }

  export type UserCardUncheckedCreateWithoutCardInput = {
    id: string
    userId: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
  }

  export type UserCardCreateOrConnectWithoutCardInput = {
    where: UserCardWhereUniqueInput
    create: XOR<UserCardCreateWithoutCardInput, UserCardUncheckedCreateWithoutCardInput>
  }

  export type UserCardCreateManyCardInputEnvelope = {
    data: UserCardCreateManyCardInput | UserCardCreateManyCardInput[]
  }

  export type UserCardUpsertWithWhereUniqueWithoutCardInput = {
    where: UserCardWhereUniqueInput
    update: XOR<UserCardUpdateWithoutCardInput, UserCardUncheckedUpdateWithoutCardInput>
    create: XOR<UserCardCreateWithoutCardInput, UserCardUncheckedCreateWithoutCardInput>
  }

  export type UserCardUpdateWithWhereUniqueWithoutCardInput = {
    where: UserCardWhereUniqueInput
    data: XOR<UserCardUpdateWithoutCardInput, UserCardUncheckedUpdateWithoutCardInput>
  }

  export type UserCardUpdateManyWithWhereWithoutCardInput = {
    where: UserCardScalarWhereInput
    data: XOR<UserCardUpdateManyMutationInput, UserCardUncheckedUpdateManyWithoutCardInput>
  }

  export type CardCreateWithoutUsersInput = {
    id: string
    name: string
    description: string
    perkCode: string
    rarity: string
    dropRate?: number
    usage?: string
  }

  export type CardUncheckedCreateWithoutUsersInput = {
    id: string
    name: string
    description: string
    perkCode: string
    rarity: string
    dropRate?: number
    usage?: string
  }

  export type CardCreateOrConnectWithoutUsersInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutUsersInput, CardUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutInventoryInput = {
    id: string
    email: string
    username: string
    passwordHash: string
    name: string
    avatar: string
    hypeScore?: number
    sawaCurrency?: number
    keysAvailable?: number
    activeCardId?: string | null
    walletBalance?: number
    locksUntilMysteryCop?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutInventoryInput = {
    id: string
    email: string
    username: string
    passwordHash: string
    name: string
    avatar: string
    hypeScore?: number
    sawaCurrency?: number
    keysAvailable?: number
    activeCardId?: string | null
    walletBalance?: number
    locksUntilMysteryCop?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutInventoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInventoryInput, UserUncheckedCreateWithoutInventoryInput>
  }

  export type CardUpsertWithoutUsersInput = {
    update: XOR<CardUpdateWithoutUsersInput, CardUncheckedUpdateWithoutUsersInput>
    create: XOR<CardCreateWithoutUsersInput, CardUncheckedCreateWithoutUsersInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutUsersInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutUsersInput, CardUncheckedUpdateWithoutUsersInput>
  }

  export type CardUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    perkCode?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    dropRate?: FloatFieldUpdateOperationsInput | number
    usage?: StringFieldUpdateOperationsInput | string
  }

  export type CardUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    perkCode?: StringFieldUpdateOperationsInput | string
    rarity?: StringFieldUpdateOperationsInput | string
    dropRate?: FloatFieldUpdateOperationsInput | number
    usage?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutInventoryInput = {
    update: XOR<UserUpdateWithoutInventoryInput, UserUncheckedUpdateWithoutInventoryInput>
    create: XOR<UserCreateWithoutInventoryInput, UserUncheckedCreateWithoutInventoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInventoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInventoryInput, UserUncheckedUpdateWithoutInventoryInput>
  }

  export type UserUpdateWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    hypeScore?: IntFieldUpdateOperationsInput | number
    sawaCurrency?: IntFieldUpdateOperationsInput | number
    keysAvailable?: IntFieldUpdateOperationsInput | number
    activeCardId?: NullableStringFieldUpdateOperationsInput | string | null
    walletBalance?: FloatFieldUpdateOperationsInput | number
    locksUntilMysteryCop?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    hypeScore?: IntFieldUpdateOperationsInput | number
    sawaCurrency?: IntFieldUpdateOperationsInput | number
    keysAvailable?: IntFieldUpdateOperationsInput | number
    activeCardId?: NullableStringFieldUpdateOperationsInput | string | null
    walletBalance?: FloatFieldUpdateOperationsInput | number
    locksUntilMysteryCop?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateWithoutVendorInput = {
    id: string
    name: string
    description: string
    price: number
    image: string
    inStock?: boolean
    requiredHypeLevel?: number
    category: string
    addOns?: string
  }

  export type MenuItemUncheckedCreateWithoutVendorInput = {
    id: string
    name: string
    description: string
    price: number
    image: string
    inStock?: boolean
    requiredHypeLevel?: number
    category: string
    addOns?: string
  }

  export type MenuItemCreateOrConnectWithoutVendorInput = {
    where: MenuItemWhereUniqueInput
    create: XOR<MenuItemCreateWithoutVendorInput, MenuItemUncheckedCreateWithoutVendorInput>
  }

  export type MenuItemCreateManyVendorInputEnvelope = {
    data: MenuItemCreateManyVendorInput | MenuItemCreateManyVendorInput[]
  }

  export type OrderCreateWithoutVendorInput = {
    id: string
    orderNumber: string
    hostId: string
    totalAmount: number
    sawaSubsidy?: number
    isCoveredByHost?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUncheckedCreateWithoutVendorInput = {
    id: string
    orderNumber: string
    hostId: string
    totalAmount: number
    sawaSubsidy?: number
    isCoveredByHost?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutVendorInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutVendorInput, OrderUncheckedCreateWithoutVendorInput>
  }

  export type OrderCreateManyVendorInputEnvelope = {
    data: OrderCreateManyVendorInput | OrderCreateManyVendorInput[]
  }

  export type MenuItemUpsertWithWhereUniqueWithoutVendorInput = {
    where: MenuItemWhereUniqueInput
    update: XOR<MenuItemUpdateWithoutVendorInput, MenuItemUncheckedUpdateWithoutVendorInput>
    create: XOR<MenuItemCreateWithoutVendorInput, MenuItemUncheckedCreateWithoutVendorInput>
  }

  export type MenuItemUpdateWithWhereUniqueWithoutVendorInput = {
    where: MenuItemWhereUniqueInput
    data: XOR<MenuItemUpdateWithoutVendorInput, MenuItemUncheckedUpdateWithoutVendorInput>
  }

  export type MenuItemUpdateManyWithWhereWithoutVendorInput = {
    where: MenuItemScalarWhereInput
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyWithoutVendorInput>
  }

  export type MenuItemScalarWhereInput = {
    AND?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    OR?: MenuItemScalarWhereInput[]
    NOT?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    id?: StringFilter<"MenuItem"> | string
    vendorId?: StringFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringFilter<"MenuItem"> | string
    price?: FloatFilter<"MenuItem"> | number
    image?: StringFilter<"MenuItem"> | string
    inStock?: BoolFilter<"MenuItem"> | boolean
    requiredHypeLevel?: IntFilter<"MenuItem"> | number
    category?: StringFilter<"MenuItem"> | string
    addOns?: StringFilter<"MenuItem"> | string
  }

  export type OrderUpsertWithWhereUniqueWithoutVendorInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutVendorInput, OrderUncheckedUpdateWithoutVendorInput>
    create: XOR<OrderCreateWithoutVendorInput, OrderUncheckedCreateWithoutVendorInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutVendorInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutVendorInput, OrderUncheckedUpdateWithoutVendorInput>
  }

  export type OrderUpdateManyWithWhereWithoutVendorInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutVendorInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    hostId?: StringFilter<"Order"> | string
    vendorId?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    sawaSubsidy?: FloatFilter<"Order"> | number
    isCoveredByHost?: BoolFilter<"Order"> | boolean
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type VendorCreateWithoutMenuItemsInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
    orders?: OrderCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutMenuItemsInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
    orders?: OrderUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutMenuItemsInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutMenuItemsInput, VendorUncheckedCreateWithoutMenuItemsInput>
  }

  export type VendorUpsertWithoutMenuItemsInput = {
    update: XOR<VendorUpdateWithoutMenuItemsInput, VendorUncheckedUpdateWithoutMenuItemsInput>
    create: XOR<VendorCreateWithoutMenuItemsInput, VendorUncheckedCreateWithoutMenuItemsInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutMenuItemsInput, VendorUncheckedUpdateWithoutMenuItemsInput>
  }

  export type VendorUpdateWithoutMenuItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orders?: OrderUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutMenuItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orders?: OrderUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type VendorCreateWithoutOrdersInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
    menuItems?: MenuItemCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutOrdersInput = {
    id: string
    username: string
    passwordHash: string
    name: string
    image: string
    bannerImage?: string | null
    rating?: number
    ratingCount?: number
    status?: string
    announcementBanner?: string | null
    instapayAddress?: string | null
    instapayName?: string | null
    commissionOwedBalance?: number
    subsidiesOwedBalance?: number
    lifetimeSales?: number
    lifetimeOrders?: number
    ledgerPinHash?: string | null
    hypeMultiplier?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    announcementUpdatedAt?: Date | string | null
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutOrdersInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutOrdersInput, VendorUncheckedCreateWithoutOrdersInput>
  }

  export type VendorUpsertWithoutOrdersInput = {
    update: XOR<VendorUpdateWithoutOrdersInput, VendorUncheckedUpdateWithoutOrdersInput>
    create: XOR<VendorCreateWithoutOrdersInput, VendorUncheckedCreateWithoutOrdersInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutOrdersInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutOrdersInput, VendorUncheckedUpdateWithoutOrdersInput>
  }

  export type VendorUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menuItems?: MenuItemUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    bannerImage?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    announcementBanner?: NullableStringFieldUpdateOperationsInput | string | null
    instapayAddress?: NullableStringFieldUpdateOperationsInput | string | null
    instapayName?: NullableStringFieldUpdateOperationsInput | string | null
    commissionOwedBalance?: FloatFieldUpdateOperationsInput | number
    subsidiesOwedBalance?: FloatFieldUpdateOperationsInput | number
    lifetimeSales?: FloatFieldUpdateOperationsInput | number
    lifetimeOrders?: IntFieldUpdateOperationsInput | number
    ledgerPinHash?: NullableStringFieldUpdateOperationsInput | string | null
    hypeMultiplier?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcementUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menuItems?: MenuItemUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type UserCardCreateManyUserInput = {
    id: string
    cardId: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
  }

  export type UserCardUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserCardUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardCreateManyCardInput = {
    id: string
    userId: string
    isUsed?: boolean
    remainingValue?: number | null
    acquiredAt?: Date | string
  }

  export type UserCardUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInventoryNestedInput
  }

  export type UserCardUncheckedUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUncheckedUpdateManyWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    remainingValue?: NullableFloatFieldUpdateOperationsInput | number | null
    acquiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateManyVendorInput = {
    id: string
    name: string
    description: string
    price: number
    image: string
    inStock?: boolean
    requiredHypeLevel?: number
    category: string
    addOns?: string
  }

  export type OrderCreateManyVendorInput = {
    id: string
    orderNumber: string
    hostId: string
    totalAmount: number
    sawaSubsidy?: number
    isCoveredByHost?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
  }

  export type MenuItemUncheckedUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
  }

  export type MenuItemUncheckedUpdateManyWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    inStock?: BoolFieldUpdateOperationsInput | boolean
    requiredHypeLevel?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    addOns?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    sawaSubsidy?: FloatFieldUpdateOperationsInput | number
    isCoveredByHost?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}