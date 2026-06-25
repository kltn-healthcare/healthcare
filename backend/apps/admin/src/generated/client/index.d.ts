
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Clinic
 * 
 */
export type Clinic = $Result.DefaultSelection<Prisma.$ClinicPayload>
/**
 * Model ClinicAdmin
 * 
 */
export type ClinicAdmin = $Result.DefaultSelection<Prisma.$ClinicAdminPayload>
/**
 * Model ClinicWorkingHour
 * 
 */
export type ClinicWorkingHour = $Result.DefaultSelection<Prisma.$ClinicWorkingHourPayload>
/**
 * Model Specialty
 * 
 */
export type Specialty = $Result.DefaultSelection<Prisma.$SpecialtyPayload>
/**
 * Model ClinicSpecialty
 * 
 */
export type ClinicSpecialty = $Result.DefaultSelection<Prisma.$ClinicSpecialtyPayload>
/**
 * Model ClinicSpecialtySchedule
 * 
 */
export type ClinicSpecialtySchedule = $Result.DefaultSelection<Prisma.$ClinicSpecialtySchedulePayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model HealthPackage
 * 
 */
export type HealthPackage = $Result.DefaultSelection<Prisma.$HealthPackagePayload>
/**
 * Model PackageAvailability
 * 
 */
export type PackageAvailability = $Result.DefaultSelection<Prisma.$PackageAvailabilityPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Clinics
 * const clinics = await prisma.clinic.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Clinics
   * const clinics = await prisma.clinic.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.clinic`: Exposes CRUD operations for the **Clinic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinics
    * const clinics = await prisma.clinic.findMany()
    * ```
    */
  get clinic(): Prisma.ClinicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicAdmin`: Exposes CRUD operations for the **ClinicAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicAdmins
    * const clinicAdmins = await prisma.clinicAdmin.findMany()
    * ```
    */
  get clinicAdmin(): Prisma.ClinicAdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicWorkingHour`: Exposes CRUD operations for the **ClinicWorkingHour** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicWorkingHours
    * const clinicWorkingHours = await prisma.clinicWorkingHour.findMany()
    * ```
    */
  get clinicWorkingHour(): Prisma.ClinicWorkingHourDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.specialty`: Exposes CRUD operations for the **Specialty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Specialties
    * const specialties = await prisma.specialty.findMany()
    * ```
    */
  get specialty(): Prisma.SpecialtyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicSpecialty`: Exposes CRUD operations for the **ClinicSpecialty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicSpecialties
    * const clinicSpecialties = await prisma.clinicSpecialty.findMany()
    * ```
    */
  get clinicSpecialty(): Prisma.ClinicSpecialtyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicSpecialtySchedule`: Exposes CRUD operations for the **ClinicSpecialtySchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicSpecialtySchedules
    * const clinicSpecialtySchedules = await prisma.clinicSpecialtySchedule.findMany()
    * ```
    */
  get clinicSpecialtySchedule(): Prisma.ClinicSpecialtyScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.healthPackage`: Exposes CRUD operations for the **HealthPackage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HealthPackages
    * const healthPackages = await prisma.healthPackage.findMany()
    * ```
    */
  get healthPackage(): Prisma.HealthPackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.packageAvailability`: Exposes CRUD operations for the **PackageAvailability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PackageAvailabilities
    * const packageAvailabilities = await prisma.packageAvailability.findMany()
    * ```
    */
  get packageAvailability(): Prisma.PackageAvailabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
    Clinic: 'Clinic',
    ClinicAdmin: 'ClinicAdmin',
    ClinicWorkingHour: 'ClinicWorkingHour',
    Specialty: 'Specialty',
    ClinicSpecialty: 'ClinicSpecialty',
    ClinicSpecialtySchedule: 'ClinicSpecialtySchedule',
    Doctor: 'Doctor',
    HealthPackage: 'HealthPackage',
    PackageAvailability: 'PackageAvailability',
    Article: 'Article'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "clinic" | "clinicAdmin" | "clinicWorkingHour" | "specialty" | "clinicSpecialty" | "clinicSpecialtySchedule" | "doctor" | "healthPackage" | "packageAvailability" | "article"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Clinic: {
        payload: Prisma.$ClinicPayload<ExtArgs>
        fields: Prisma.ClinicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findFirst: {
            args: Prisma.ClinicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findMany: {
            args: Prisma.ClinicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          create: {
            args: Prisma.ClinicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          createMany: {
            args: Prisma.ClinicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          delete: {
            args: Prisma.ClinicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          update: {
            args: Prisma.ClinicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          deleteMany: {
            args: Prisma.ClinicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          upsert: {
            args: Prisma.ClinicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          aggregate: {
            args: Prisma.ClinicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinic>
          }
          groupBy: {
            args: Prisma.ClinicGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicCountAggregateOutputType> | number
          }
        }
      }
      ClinicAdmin: {
        payload: Prisma.$ClinicAdminPayload<ExtArgs>
        fields: Prisma.ClinicAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>
          }
          findFirst: {
            args: Prisma.ClinicAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>
          }
          findMany: {
            args: Prisma.ClinicAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>[]
          }
          create: {
            args: Prisma.ClinicAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>
          }
          createMany: {
            args: Prisma.ClinicAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>[]
          }
          delete: {
            args: Prisma.ClinicAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>
          }
          update: {
            args: Prisma.ClinicAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>
          }
          deleteMany: {
            args: Prisma.ClinicAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicAdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>[]
          }
          upsert: {
            args: Prisma.ClinicAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicAdminPayload>
          }
          aggregate: {
            args: Prisma.ClinicAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicAdmin>
          }
          groupBy: {
            args: Prisma.ClinicAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicAdminCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicAdminCountAggregateOutputType> | number
          }
        }
      }
      ClinicWorkingHour: {
        payload: Prisma.$ClinicWorkingHourPayload<ExtArgs>
        fields: Prisma.ClinicWorkingHourFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicWorkingHourFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicWorkingHourFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>
          }
          findFirst: {
            args: Prisma.ClinicWorkingHourFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicWorkingHourFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>
          }
          findMany: {
            args: Prisma.ClinicWorkingHourFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>[]
          }
          create: {
            args: Prisma.ClinicWorkingHourCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>
          }
          createMany: {
            args: Prisma.ClinicWorkingHourCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicWorkingHourCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>[]
          }
          delete: {
            args: Prisma.ClinicWorkingHourDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>
          }
          update: {
            args: Prisma.ClinicWorkingHourUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>
          }
          deleteMany: {
            args: Prisma.ClinicWorkingHourDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicWorkingHourUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicWorkingHourUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>[]
          }
          upsert: {
            args: Prisma.ClinicWorkingHourUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicWorkingHourPayload>
          }
          aggregate: {
            args: Prisma.ClinicWorkingHourAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicWorkingHour>
          }
          groupBy: {
            args: Prisma.ClinicWorkingHourGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicWorkingHourGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicWorkingHourCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicWorkingHourCountAggregateOutputType> | number
          }
        }
      }
      Specialty: {
        payload: Prisma.$SpecialtyPayload<ExtArgs>
        fields: Prisma.SpecialtyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpecialtyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpecialtyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>
          }
          findFirst: {
            args: Prisma.SpecialtyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpecialtyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>
          }
          findMany: {
            args: Prisma.SpecialtyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>[]
          }
          create: {
            args: Prisma.SpecialtyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>
          }
          createMany: {
            args: Prisma.SpecialtyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpecialtyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>[]
          }
          delete: {
            args: Prisma.SpecialtyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>
          }
          update: {
            args: Prisma.SpecialtyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>
          }
          deleteMany: {
            args: Prisma.SpecialtyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpecialtyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpecialtyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>[]
          }
          upsert: {
            args: Prisma.SpecialtyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialtyPayload>
          }
          aggregate: {
            args: Prisma.SpecialtyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpecialty>
          }
          groupBy: {
            args: Prisma.SpecialtyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpecialtyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpecialtyCountArgs<ExtArgs>
            result: $Utils.Optional<SpecialtyCountAggregateOutputType> | number
          }
        }
      }
      ClinicSpecialty: {
        payload: Prisma.$ClinicSpecialtyPayload<ExtArgs>
        fields: Prisma.ClinicSpecialtyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicSpecialtyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicSpecialtyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>
          }
          findFirst: {
            args: Prisma.ClinicSpecialtyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicSpecialtyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>
          }
          findMany: {
            args: Prisma.ClinicSpecialtyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>[]
          }
          create: {
            args: Prisma.ClinicSpecialtyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>
          }
          createMany: {
            args: Prisma.ClinicSpecialtyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicSpecialtyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>[]
          }
          delete: {
            args: Prisma.ClinicSpecialtyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>
          }
          update: {
            args: Prisma.ClinicSpecialtyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>
          }
          deleteMany: {
            args: Prisma.ClinicSpecialtyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicSpecialtyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicSpecialtyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>[]
          }
          upsert: {
            args: Prisma.ClinicSpecialtyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtyPayload>
          }
          aggregate: {
            args: Prisma.ClinicSpecialtyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicSpecialty>
          }
          groupBy: {
            args: Prisma.ClinicSpecialtyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicSpecialtyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicSpecialtyCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicSpecialtyCountAggregateOutputType> | number
          }
        }
      }
      ClinicSpecialtySchedule: {
        payload: Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>
        fields: Prisma.ClinicSpecialtyScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicSpecialtyScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicSpecialtyScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>
          }
          findFirst: {
            args: Prisma.ClinicSpecialtyScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicSpecialtyScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>
          }
          findMany: {
            args: Prisma.ClinicSpecialtyScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>[]
          }
          create: {
            args: Prisma.ClinicSpecialtyScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>
          }
          createMany: {
            args: Prisma.ClinicSpecialtyScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicSpecialtyScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>[]
          }
          delete: {
            args: Prisma.ClinicSpecialtyScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>
          }
          update: {
            args: Prisma.ClinicSpecialtyScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>
          }
          deleteMany: {
            args: Prisma.ClinicSpecialtyScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicSpecialtyScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicSpecialtyScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>[]
          }
          upsert: {
            args: Prisma.ClinicSpecialtyScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicSpecialtySchedulePayload>
          }
          aggregate: {
            args: Prisma.ClinicSpecialtyScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicSpecialtySchedule>
          }
          groupBy: {
            args: Prisma.ClinicSpecialtyScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicSpecialtyScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicSpecialtyScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicSpecialtyScheduleCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      HealthPackage: {
        payload: Prisma.$HealthPackagePayload<ExtArgs>
        fields: Prisma.HealthPackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthPackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthPackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>
          }
          findFirst: {
            args: Prisma.HealthPackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthPackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>
          }
          findMany: {
            args: Prisma.HealthPackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>[]
          }
          create: {
            args: Prisma.HealthPackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>
          }
          createMany: {
            args: Prisma.HealthPackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthPackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>[]
          }
          delete: {
            args: Prisma.HealthPackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>
          }
          update: {
            args: Prisma.HealthPackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>
          }
          deleteMany: {
            args: Prisma.HealthPackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthPackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthPackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>[]
          }
          upsert: {
            args: Prisma.HealthPackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthPackagePayload>
          }
          aggregate: {
            args: Prisma.HealthPackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealthPackage>
          }
          groupBy: {
            args: Prisma.HealthPackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthPackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthPackageCountArgs<ExtArgs>
            result: $Utils.Optional<HealthPackageCountAggregateOutputType> | number
          }
        }
      }
      PackageAvailability: {
        payload: Prisma.$PackageAvailabilityPayload<ExtArgs>
        fields: Prisma.PackageAvailabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageAvailabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageAvailabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>
          }
          findFirst: {
            args: Prisma.PackageAvailabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageAvailabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>
          }
          findMany: {
            args: Prisma.PackageAvailabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>[]
          }
          create: {
            args: Prisma.PackageAvailabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>
          }
          createMany: {
            args: Prisma.PackageAvailabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageAvailabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>[]
          }
          delete: {
            args: Prisma.PackageAvailabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>
          }
          update: {
            args: Prisma.PackageAvailabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>
          }
          deleteMany: {
            args: Prisma.PackageAvailabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageAvailabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageAvailabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>[]
          }
          upsert: {
            args: Prisma.PackageAvailabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageAvailabilityPayload>
          }
          aggregate: {
            args: Prisma.PackageAvailabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackageAvailability>
          }
          groupBy: {
            args: Prisma.PackageAvailabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageAvailabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageAvailabilityCountArgs<ExtArgs>
            result: $Utils.Optional<PackageAvailabilityCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    clinic?: ClinicOmit
    clinicAdmin?: ClinicAdminOmit
    clinicWorkingHour?: ClinicWorkingHourOmit
    specialty?: SpecialtyOmit
    clinicSpecialty?: ClinicSpecialtyOmit
    clinicSpecialtySchedule?: ClinicSpecialtyScheduleOmit
    doctor?: DoctorOmit
    healthPackage?: HealthPackageOmit
    packageAvailability?: PackageAvailabilityOmit
    article?: ArticleOmit
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
   * Count Type ClinicCountOutputType
   */

  export type ClinicCountOutputType = {
    doctors: number
    clinicAdmins: number
    healthPackages: number
    specialties: number
    workingHours: number
    specialtySchedules: number
  }

  export type ClinicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | ClinicCountOutputTypeCountDoctorsArgs
    clinicAdmins?: boolean | ClinicCountOutputTypeCountClinicAdminsArgs
    healthPackages?: boolean | ClinicCountOutputTypeCountHealthPackagesArgs
    specialties?: boolean | ClinicCountOutputTypeCountSpecialtiesArgs
    workingHours?: boolean | ClinicCountOutputTypeCountWorkingHoursArgs
    specialtySchedules?: boolean | ClinicCountOutputTypeCountSpecialtySchedulesArgs
  }

  // Custom InputTypes
  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCountOutputType
     */
    select?: ClinicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountDoctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountClinicAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicAdminWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountHealthPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthPackageWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountSpecialtiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountWorkingHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWorkingHourWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountSpecialtySchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyScheduleWhereInput
  }


  /**
   * Count Type SpecialtyCountOutputType
   */

  export type SpecialtyCountOutputType = {
    doctors: number
    clinics: number
    specialtySchedules: number
    healthPackages: number
  }

  export type SpecialtyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | SpecialtyCountOutputTypeCountDoctorsArgs
    clinics?: boolean | SpecialtyCountOutputTypeCountClinicsArgs
    specialtySchedules?: boolean | SpecialtyCountOutputTypeCountSpecialtySchedulesArgs
    healthPackages?: boolean | SpecialtyCountOutputTypeCountHealthPackagesArgs
  }

  // Custom InputTypes
  /**
   * SpecialtyCountOutputType without action
   */
  export type SpecialtyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpecialtyCountOutputType
     */
    select?: SpecialtyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpecialtyCountOutputType without action
   */
  export type SpecialtyCountOutputTypeCountDoctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
  }

  /**
   * SpecialtyCountOutputType without action
   */
  export type SpecialtyCountOutputTypeCountClinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyWhereInput
  }

  /**
   * SpecialtyCountOutputType without action
   */
  export type SpecialtyCountOutputTypeCountSpecialtySchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyScheduleWhereInput
  }

  /**
   * SpecialtyCountOutputType without action
   */
  export type SpecialtyCountOutputTypeCountHealthPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthPackageWhereInput
  }


  /**
   * Count Type ClinicSpecialtyCountOutputType
   */

  export type ClinicSpecialtyCountOutputType = {
    schedules: number
  }

  export type ClinicSpecialtyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | ClinicSpecialtyCountOutputTypeCountSchedulesArgs
  }

  // Custom InputTypes
  /**
   * ClinicSpecialtyCountOutputType without action
   */
  export type ClinicSpecialtyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtyCountOutputType
     */
    select?: ClinicSpecialtyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicSpecialtyCountOutputType without action
   */
  export type ClinicSpecialtyCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyScheduleWhereInput
  }


  /**
   * Count Type HealthPackageCountOutputType
   */

  export type HealthPackageCountOutputType = {
    availabilities: number
  }

  export type HealthPackageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    availabilities?: boolean | HealthPackageCountOutputTypeCountAvailabilitiesArgs
  }

  // Custom InputTypes
  /**
   * HealthPackageCountOutputType without action
   */
  export type HealthPackageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackageCountOutputType
     */
    select?: HealthPackageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HealthPackageCountOutputType without action
   */
  export type HealthPackageCountOutputTypeCountAvailabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAvailabilityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Clinic
   */

  export type AggregateClinic = {
    _count: ClinicCountAggregateOutputType | null
    _avg: ClinicAvgAggregateOutputType | null
    _sum: ClinicSumAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  export type ClinicAvgAggregateOutputType = {
    rating: Decimal | null
    reviewCount: number | null
    latitude: Decimal | null
    longitude: Decimal | null
    depositAmount: number | null
  }

  export type ClinicSumAggregateOutputType = {
    rating: Decimal | null
    reviewCount: number | null
    latitude: Decimal | null
    longitude: Decimal | null
    depositAmount: number | null
  }

  export type ClinicMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    rating: Decimal | null
    reviewCount: number | null
    image: string | null
    isOpen: boolean | null
    openingHours: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    bankInfo: string | null
    depositAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    rating: Decimal | null
    reviewCount: number | null
    image: string | null
    isOpen: boolean | null
    openingHours: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    bankInfo: string | null
    depositAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicCountAggregateOutputType = {
    id: number
    name: number
    description: number
    address: number
    phone: number
    email: number
    website: number
    rating: number
    reviewCount: number
    image: number
    isOpen: number
    openingHours: number
    latitude: number
    longitude: number
    bankInfo: number
    depositAmount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicAvgAggregateInputType = {
    rating?: true
    reviewCount?: true
    latitude?: true
    longitude?: true
    depositAmount?: true
  }

  export type ClinicSumAggregateInputType = {
    rating?: true
    reviewCount?: true
    latitude?: true
    longitude?: true
    depositAmount?: true
  }

  export type ClinicMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    rating?: true
    reviewCount?: true
    image?: true
    isOpen?: true
    openingHours?: true
    latitude?: true
    longitude?: true
    bankInfo?: true
    depositAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    rating?: true
    reviewCount?: true
    image?: true
    isOpen?: true
    openingHours?: true
    latitude?: true
    longitude?: true
    bankInfo?: true
    depositAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    rating?: true
    reviewCount?: true
    image?: true
    isOpen?: true
    openingHours?: true
    latitude?: true
    longitude?: true
    bankInfo?: true
    depositAmount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinic to aggregate.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clinics
    **/
    _count?: true | ClinicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicMaxAggregateInputType
  }

  export type GetClinicAggregateType<T extends ClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateClinic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinic[P]>
      : GetScalarType<T[P], AggregateClinic[P]>
  }




  export type ClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWhereInput
    orderBy?: ClinicOrderByWithAggregationInput | ClinicOrderByWithAggregationInput[]
    by: ClinicScalarFieldEnum[] | ClinicScalarFieldEnum
    having?: ClinicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicCountAggregateInputType | true
    _avg?: ClinicAvgAggregateInputType
    _sum?: ClinicSumAggregateInputType
    _min?: ClinicMinAggregateInputType
    _max?: ClinicMaxAggregateInputType
  }

  export type ClinicGroupByOutputType = {
    id: string
    name: string
    description: string | null
    address: string
    phone: string | null
    email: string | null
    website: string | null
    rating: Decimal
    reviewCount: number
    image: string | null
    isOpen: boolean
    openingHours: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    bankInfo: string | null
    depositAmount: number
    createdAt: Date
    updatedAt: Date
    _count: ClinicCountAggregateOutputType | null
    _avg: ClinicAvgAggregateOutputType | null
    _sum: ClinicSumAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  type GetClinicGroupByPayload<T extends ClinicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    rating?: boolean
    reviewCount?: boolean
    image?: boolean
    isOpen?: boolean
    openingHours?: boolean
    latitude?: boolean
    longitude?: boolean
    bankInfo?: boolean
    depositAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctors?: boolean | Clinic$doctorsArgs<ExtArgs>
    clinicAdmins?: boolean | Clinic$clinicAdminsArgs<ExtArgs>
    healthPackages?: boolean | Clinic$healthPackagesArgs<ExtArgs>
    specialties?: boolean | Clinic$specialtiesArgs<ExtArgs>
    workingHours?: boolean | Clinic$workingHoursArgs<ExtArgs>
    specialtySchedules?: boolean | Clinic$specialtySchedulesArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    rating?: boolean
    reviewCount?: boolean
    image?: boolean
    isOpen?: boolean
    openingHours?: boolean
    latitude?: boolean
    longitude?: boolean
    bankInfo?: boolean
    depositAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    rating?: boolean
    reviewCount?: boolean
    image?: boolean
    isOpen?: boolean
    openingHours?: boolean
    latitude?: boolean
    longitude?: boolean
    bankInfo?: boolean
    depositAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    rating?: boolean
    reviewCount?: boolean
    image?: boolean
    isOpen?: boolean
    openingHours?: boolean
    latitude?: boolean
    longitude?: boolean
    bankInfo?: boolean
    depositAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "address" | "phone" | "email" | "website" | "rating" | "reviewCount" | "image" | "isOpen" | "openingHours" | "latitude" | "longitude" | "bankInfo" | "depositAmount" | "createdAt" | "updatedAt", ExtArgs["result"]["clinic"]>
  export type ClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | Clinic$doctorsArgs<ExtArgs>
    clinicAdmins?: boolean | Clinic$clinicAdminsArgs<ExtArgs>
    healthPackages?: boolean | Clinic$healthPackagesArgs<ExtArgs>
    specialties?: boolean | Clinic$specialtiesArgs<ExtArgs>
    workingHours?: boolean | Clinic$workingHoursArgs<ExtArgs>
    specialtySchedules?: boolean | Clinic$specialtySchedulesArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clinic"
    objects: {
      doctors: Prisma.$DoctorPayload<ExtArgs>[]
      clinicAdmins: Prisma.$ClinicAdminPayload<ExtArgs>[]
      healthPackages: Prisma.$HealthPackagePayload<ExtArgs>[]
      specialties: Prisma.$ClinicSpecialtyPayload<ExtArgs>[]
      workingHours: Prisma.$ClinicWorkingHourPayload<ExtArgs>[]
      specialtySchedules: Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      address: string
      phone: string | null
      email: string | null
      website: string | null
      rating: Prisma.Decimal
      reviewCount: number
      image: string | null
      isOpen: boolean
      openingHours: string | null
      latitude: Prisma.Decimal | null
      longitude: Prisma.Decimal | null
      bankInfo: string | null
      depositAmount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinic"]>
    composites: {}
  }

  type ClinicGetPayload<S extends boolean | null | undefined | ClinicDefaultArgs> = $Result.GetResult<Prisma.$ClinicPayload, S>

  type ClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicCountAggregateInputType | true
    }

  export interface ClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinic'], meta: { name: 'Clinic' } }
    /**
     * Find zero or one Clinic that matches the filter.
     * @param {ClinicFindUniqueArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicFindUniqueArgs>(args: SelectSubset<T, ClinicFindUniqueArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicFindUniqueOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicFindFirstArgs>(args?: SelectSubset<T, ClinicFindFirstArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinics
     * const clinics = await prisma.clinic.findMany()
     * 
     * // Get first 10 Clinics
     * const clinics = await prisma.clinic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicWithIdOnly = await prisma.clinic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicFindManyArgs>(args?: SelectSubset<T, ClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinic.
     * @param {ClinicCreateArgs} args - Arguments to create a Clinic.
     * @example
     * // Create one Clinic
     * const Clinic = await prisma.clinic.create({
     *   data: {
     *     // ... data to create a Clinic
     *   }
     * })
     * 
     */
    create<T extends ClinicCreateArgs>(args: SelectSubset<T, ClinicCreateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinics.
     * @param {ClinicCreateManyArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicCreateManyArgs>(args?: SelectSubset<T, ClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinics and returns the data saved in the database.
     * @param {ClinicCreateManyAndReturnArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinic.
     * @param {ClinicDeleteArgs} args - Arguments to delete one Clinic.
     * @example
     * // Delete one Clinic
     * const Clinic = await prisma.clinic.delete({
     *   where: {
     *     // ... filter to delete one Clinic
     *   }
     * })
     * 
     */
    delete<T extends ClinicDeleteArgs>(args: SelectSubset<T, ClinicDeleteArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinic.
     * @param {ClinicUpdateArgs} args - Arguments to update one Clinic.
     * @example
     * // Update one Clinic
     * const clinic = await prisma.clinic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicUpdateArgs>(args: SelectSubset<T, ClinicUpdateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinics.
     * @param {ClinicDeleteManyArgs} args - Arguments to filter Clinics to delete.
     * @example
     * // Delete a few Clinics
     * const { count } = await prisma.clinic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicDeleteManyArgs>(args?: SelectSubset<T, ClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicUpdateManyArgs>(args: SelectSubset<T, ClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics and returns the data updated in the database.
     * @param {ClinicUpdateManyAndReturnArgs} args - Arguments to update many Clinics.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinic.
     * @param {ClinicUpsertArgs} args - Arguments to update or create a Clinic.
     * @example
     * // Update or create a Clinic
     * const clinic = await prisma.clinic.upsert({
     *   create: {
     *     // ... data to create a Clinic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinic we want to update
     *   }
     * })
     */
    upsert<T extends ClinicUpsertArgs>(args: SelectSubset<T, ClinicUpsertArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCountArgs} args - Arguments to filter Clinics to count.
     * @example
     * // Count the number of Clinics
     * const count = await prisma.clinic.count({
     *   where: {
     *     // ... the filter for the Clinics we want to count
     *   }
     * })
    **/
    count<T extends ClinicCountArgs>(
      args?: Subset<T, ClinicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClinicAggregateArgs>(args: Subset<T, ClinicAggregateArgs>): Prisma.PrismaPromise<GetClinicAggregateType<T>>

    /**
     * Group by Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicGroupByArgs} args - Group by arguments.
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
      T extends ClinicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicGroupByArgs['orderBy'] }
        : { orderBy?: ClinicGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clinic model
   */
  readonly fields: ClinicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clinic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctors<T extends Clinic$doctorsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$doctorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clinicAdmins<T extends Clinic$clinicAdminsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$clinicAdminsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    healthPackages<T extends Clinic$healthPackagesArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$healthPackagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specialties<T extends Clinic$specialtiesArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$specialtiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workingHours<T extends Clinic$workingHoursArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$workingHoursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specialtySchedules<T extends Clinic$specialtySchedulesArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$specialtySchedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Clinic model
   */
  interface ClinicFieldRefs {
    readonly id: FieldRef<"Clinic", 'String'>
    readonly name: FieldRef<"Clinic", 'String'>
    readonly description: FieldRef<"Clinic", 'String'>
    readonly address: FieldRef<"Clinic", 'String'>
    readonly phone: FieldRef<"Clinic", 'String'>
    readonly email: FieldRef<"Clinic", 'String'>
    readonly website: FieldRef<"Clinic", 'String'>
    readonly rating: FieldRef<"Clinic", 'Decimal'>
    readonly reviewCount: FieldRef<"Clinic", 'Int'>
    readonly image: FieldRef<"Clinic", 'String'>
    readonly isOpen: FieldRef<"Clinic", 'Boolean'>
    readonly openingHours: FieldRef<"Clinic", 'String'>
    readonly latitude: FieldRef<"Clinic", 'Decimal'>
    readonly longitude: FieldRef<"Clinic", 'Decimal'>
    readonly bankInfo: FieldRef<"Clinic", 'String'>
    readonly depositAmount: FieldRef<"Clinic", 'Int'>
    readonly createdAt: FieldRef<"Clinic", 'DateTime'>
    readonly updatedAt: FieldRef<"Clinic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clinic findUnique
   */
  export type ClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findUniqueOrThrow
   */
  export type ClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findFirst
   */
  export type ClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findFirstOrThrow
   */
  export type ClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findMany
   */
  export type ClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinics to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic create
   */
  export type ClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to create a Clinic.
     */
    data: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
  }

  /**
   * Clinic createMany
   */
  export type ClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic createManyAndReturn
   */
  export type ClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic update
   */
  export type ClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to update a Clinic.
     */
    data: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
    /**
     * Choose, which Clinic to update.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic updateMany
   */
  export type ClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic updateManyAndReturn
   */
  export type ClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic upsert
   */
  export type ClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The filter to search for the Clinic to update in case it exists.
     */
    where: ClinicWhereUniqueInput
    /**
     * In case the Clinic found by the `where` argument doesn't exist, create a new Clinic with this data.
     */
    create: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
    /**
     * In case the Clinic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
  }

  /**
   * Clinic delete
   */
  export type ClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter which Clinic to delete.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic deleteMany
   */
  export type ClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinics to delete
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to delete.
     */
    limit?: number
  }

  /**
   * Clinic.doctors
   */
  export type Clinic$doctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    cursor?: DoctorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Clinic.clinicAdmins
   */
  export type Clinic$clinicAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    where?: ClinicAdminWhereInput
    orderBy?: ClinicAdminOrderByWithRelationInput | ClinicAdminOrderByWithRelationInput[]
    cursor?: ClinicAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicAdminScalarFieldEnum | ClinicAdminScalarFieldEnum[]
  }

  /**
   * Clinic.healthPackages
   */
  export type Clinic$healthPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    where?: HealthPackageWhereInput
    orderBy?: HealthPackageOrderByWithRelationInput | HealthPackageOrderByWithRelationInput[]
    cursor?: HealthPackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HealthPackageScalarFieldEnum | HealthPackageScalarFieldEnum[]
  }

  /**
   * Clinic.specialties
   */
  export type Clinic$specialtiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    where?: ClinicSpecialtyWhereInput
    orderBy?: ClinicSpecialtyOrderByWithRelationInput | ClinicSpecialtyOrderByWithRelationInput[]
    cursor?: ClinicSpecialtyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicSpecialtyScalarFieldEnum | ClinicSpecialtyScalarFieldEnum[]
  }

  /**
   * Clinic.workingHours
   */
  export type Clinic$workingHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    where?: ClinicWorkingHourWhereInput
    orderBy?: ClinicWorkingHourOrderByWithRelationInput | ClinicWorkingHourOrderByWithRelationInput[]
    cursor?: ClinicWorkingHourWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicWorkingHourScalarFieldEnum | ClinicWorkingHourScalarFieldEnum[]
  }

  /**
   * Clinic.specialtySchedules
   */
  export type Clinic$specialtySchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    where?: ClinicSpecialtyScheduleWhereInput
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicSpecialtyScheduleScalarFieldEnum | ClinicSpecialtyScheduleScalarFieldEnum[]
  }

  /**
   * Clinic without action
   */
  export type ClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
  }


  /**
   * Model ClinicAdmin
   */

  export type AggregateClinicAdmin = {
    _count: ClinicAdminCountAggregateOutputType | null
    _min: ClinicAdminMinAggregateOutputType | null
    _max: ClinicAdminMaxAggregateOutputType | null
  }

  export type ClinicAdminMinAggregateOutputType = {
    id: string | null
    userId: string | null
    clinicId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicAdminMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    clinicId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicAdminCountAggregateOutputType = {
    id: number
    userId: number
    clinicId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicAdminMinAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicAdminMaxAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicAdminCountAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicAdmin to aggregate.
     */
    where?: ClinicAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicAdmins to fetch.
     */
    orderBy?: ClinicAdminOrderByWithRelationInput | ClinicAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicAdmins
    **/
    _count?: true | ClinicAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicAdminMaxAggregateInputType
  }

  export type GetClinicAdminAggregateType<T extends ClinicAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicAdmin[P]>
      : GetScalarType<T[P], AggregateClinicAdmin[P]>
  }




  export type ClinicAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicAdminWhereInput
    orderBy?: ClinicAdminOrderByWithAggregationInput | ClinicAdminOrderByWithAggregationInput[]
    by: ClinicAdminScalarFieldEnum[] | ClinicAdminScalarFieldEnum
    having?: ClinicAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicAdminCountAggregateInputType | true
    _min?: ClinicAdminMinAggregateInputType
    _max?: ClinicAdminMaxAggregateInputType
  }

  export type ClinicAdminGroupByOutputType = {
    id: string
    userId: string
    clinicId: string
    createdAt: Date
    updatedAt: Date
    _count: ClinicAdminCountAggregateOutputType | null
    _min: ClinicAdminMinAggregateOutputType | null
    _max: ClinicAdminMaxAggregateOutputType | null
  }

  type GetClinicAdminGroupByPayload<T extends ClinicAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicAdminGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicAdminGroupByOutputType[P]>
        }
      >
    >


  export type ClinicAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicAdmin"]>

  export type ClinicAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicAdmin"]>

  export type ClinicAdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicAdmin"]>

  export type ClinicAdminSelectScalar = {
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicAdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "clinicId" | "createdAt" | "updatedAt", ExtArgs["result"]["clinicAdmin"]>
  export type ClinicAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type ClinicAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type ClinicAdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $ClinicAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicAdmin"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      clinicId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinicAdmin"]>
    composites: {}
  }

  type ClinicAdminGetPayload<S extends boolean | null | undefined | ClinicAdminDefaultArgs> = $Result.GetResult<Prisma.$ClinicAdminPayload, S>

  type ClinicAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicAdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicAdminCountAggregateInputType | true
    }

  export interface ClinicAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicAdmin'], meta: { name: 'ClinicAdmin' } }
    /**
     * Find zero or one ClinicAdmin that matches the filter.
     * @param {ClinicAdminFindUniqueArgs} args - Arguments to find a ClinicAdmin
     * @example
     * // Get one ClinicAdmin
     * const clinicAdmin = await prisma.clinicAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicAdminFindUniqueArgs>(args: SelectSubset<T, ClinicAdminFindUniqueArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicAdmin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicAdminFindUniqueOrThrowArgs} args - Arguments to find a ClinicAdmin
     * @example
     * // Get one ClinicAdmin
     * const clinicAdmin = await prisma.clinicAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminFindFirstArgs} args - Arguments to find a ClinicAdmin
     * @example
     * // Get one ClinicAdmin
     * const clinicAdmin = await prisma.clinicAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicAdminFindFirstArgs>(args?: SelectSubset<T, ClinicAdminFindFirstArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminFindFirstOrThrowArgs} args - Arguments to find a ClinicAdmin
     * @example
     * // Get one ClinicAdmin
     * const clinicAdmin = await prisma.clinicAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicAdmins
     * const clinicAdmins = await prisma.clinicAdmin.findMany()
     * 
     * // Get first 10 ClinicAdmins
     * const clinicAdmins = await prisma.clinicAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicAdminWithIdOnly = await prisma.clinicAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicAdminFindManyArgs>(args?: SelectSubset<T, ClinicAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicAdmin.
     * @param {ClinicAdminCreateArgs} args - Arguments to create a ClinicAdmin.
     * @example
     * // Create one ClinicAdmin
     * const ClinicAdmin = await prisma.clinicAdmin.create({
     *   data: {
     *     // ... data to create a ClinicAdmin
     *   }
     * })
     * 
     */
    create<T extends ClinicAdminCreateArgs>(args: SelectSubset<T, ClinicAdminCreateArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicAdmins.
     * @param {ClinicAdminCreateManyArgs} args - Arguments to create many ClinicAdmins.
     * @example
     * // Create many ClinicAdmins
     * const clinicAdmin = await prisma.clinicAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicAdminCreateManyArgs>(args?: SelectSubset<T, ClinicAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicAdmins and returns the data saved in the database.
     * @param {ClinicAdminCreateManyAndReturnArgs} args - Arguments to create many ClinicAdmins.
     * @example
     * // Create many ClinicAdmins
     * const clinicAdmin = await prisma.clinicAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicAdmins and only return the `id`
     * const clinicAdminWithIdOnly = await prisma.clinicAdmin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicAdmin.
     * @param {ClinicAdminDeleteArgs} args - Arguments to delete one ClinicAdmin.
     * @example
     * // Delete one ClinicAdmin
     * const ClinicAdmin = await prisma.clinicAdmin.delete({
     *   where: {
     *     // ... filter to delete one ClinicAdmin
     *   }
     * })
     * 
     */
    delete<T extends ClinicAdminDeleteArgs>(args: SelectSubset<T, ClinicAdminDeleteArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicAdmin.
     * @param {ClinicAdminUpdateArgs} args - Arguments to update one ClinicAdmin.
     * @example
     * // Update one ClinicAdmin
     * const clinicAdmin = await prisma.clinicAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicAdminUpdateArgs>(args: SelectSubset<T, ClinicAdminUpdateArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicAdmins.
     * @param {ClinicAdminDeleteManyArgs} args - Arguments to filter ClinicAdmins to delete.
     * @example
     * // Delete a few ClinicAdmins
     * const { count } = await prisma.clinicAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicAdminDeleteManyArgs>(args?: SelectSubset<T, ClinicAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicAdmins
     * const clinicAdmin = await prisma.clinicAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicAdminUpdateManyArgs>(args: SelectSubset<T, ClinicAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicAdmins and returns the data updated in the database.
     * @param {ClinicAdminUpdateManyAndReturnArgs} args - Arguments to update many ClinicAdmins.
     * @example
     * // Update many ClinicAdmins
     * const clinicAdmin = await prisma.clinicAdmin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicAdmins and only return the `id`
     * const clinicAdminWithIdOnly = await prisma.clinicAdmin.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClinicAdminUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicAdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicAdmin.
     * @param {ClinicAdminUpsertArgs} args - Arguments to update or create a ClinicAdmin.
     * @example
     * // Update or create a ClinicAdmin
     * const clinicAdmin = await prisma.clinicAdmin.upsert({
     *   create: {
     *     // ... data to create a ClinicAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicAdmin we want to update
     *   }
     * })
     */
    upsert<T extends ClinicAdminUpsertArgs>(args: SelectSubset<T, ClinicAdminUpsertArgs<ExtArgs>>): Prisma__ClinicAdminClient<$Result.GetResult<Prisma.$ClinicAdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminCountArgs} args - Arguments to filter ClinicAdmins to count.
     * @example
     * // Count the number of ClinicAdmins
     * const count = await prisma.clinicAdmin.count({
     *   where: {
     *     // ... the filter for the ClinicAdmins we want to count
     *   }
     * })
    **/
    count<T extends ClinicAdminCountArgs>(
      args?: Subset<T, ClinicAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClinicAdminAggregateArgs>(args: Subset<T, ClinicAdminAggregateArgs>): Prisma.PrismaPromise<GetClinicAdminAggregateType<T>>

    /**
     * Group by ClinicAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAdminGroupByArgs} args - Group by arguments.
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
      T extends ClinicAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicAdminGroupByArgs['orderBy'] }
        : { orderBy?: ClinicAdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClinicAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicAdmin model
   */
  readonly fields: ClinicAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClinicAdmin model
   */
  interface ClinicAdminFieldRefs {
    readonly id: FieldRef<"ClinicAdmin", 'String'>
    readonly userId: FieldRef<"ClinicAdmin", 'String'>
    readonly clinicId: FieldRef<"ClinicAdmin", 'String'>
    readonly createdAt: FieldRef<"ClinicAdmin", 'DateTime'>
    readonly updatedAt: FieldRef<"ClinicAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicAdmin findUnique
   */
  export type ClinicAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * Filter, which ClinicAdmin to fetch.
     */
    where: ClinicAdminWhereUniqueInput
  }

  /**
   * ClinicAdmin findUniqueOrThrow
   */
  export type ClinicAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * Filter, which ClinicAdmin to fetch.
     */
    where: ClinicAdminWhereUniqueInput
  }

  /**
   * ClinicAdmin findFirst
   */
  export type ClinicAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * Filter, which ClinicAdmin to fetch.
     */
    where?: ClinicAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicAdmins to fetch.
     */
    orderBy?: ClinicAdminOrderByWithRelationInput | ClinicAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicAdmins.
     */
    cursor?: ClinicAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicAdmins.
     */
    distinct?: ClinicAdminScalarFieldEnum | ClinicAdminScalarFieldEnum[]
  }

  /**
   * ClinicAdmin findFirstOrThrow
   */
  export type ClinicAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * Filter, which ClinicAdmin to fetch.
     */
    where?: ClinicAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicAdmins to fetch.
     */
    orderBy?: ClinicAdminOrderByWithRelationInput | ClinicAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicAdmins.
     */
    cursor?: ClinicAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicAdmins.
     */
    distinct?: ClinicAdminScalarFieldEnum | ClinicAdminScalarFieldEnum[]
  }

  /**
   * ClinicAdmin findMany
   */
  export type ClinicAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * Filter, which ClinicAdmins to fetch.
     */
    where?: ClinicAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicAdmins to fetch.
     */
    orderBy?: ClinicAdminOrderByWithRelationInput | ClinicAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicAdmins.
     */
    cursor?: ClinicAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicAdmins.
     */
    distinct?: ClinicAdminScalarFieldEnum | ClinicAdminScalarFieldEnum[]
  }

  /**
   * ClinicAdmin create
   */
  export type ClinicAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicAdmin.
     */
    data: XOR<ClinicAdminCreateInput, ClinicAdminUncheckedCreateInput>
  }

  /**
   * ClinicAdmin createMany
   */
  export type ClinicAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicAdmins.
     */
    data: ClinicAdminCreateManyInput | ClinicAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicAdmin createManyAndReturn
   */
  export type ClinicAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicAdmins.
     */
    data: ClinicAdminCreateManyInput | ClinicAdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicAdmin update
   */
  export type ClinicAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicAdmin.
     */
    data: XOR<ClinicAdminUpdateInput, ClinicAdminUncheckedUpdateInput>
    /**
     * Choose, which ClinicAdmin to update.
     */
    where: ClinicAdminWhereUniqueInput
  }

  /**
   * ClinicAdmin updateMany
   */
  export type ClinicAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicAdmins.
     */
    data: XOR<ClinicAdminUpdateManyMutationInput, ClinicAdminUncheckedUpdateManyInput>
    /**
     * Filter which ClinicAdmins to update
     */
    where?: ClinicAdminWhereInput
    /**
     * Limit how many ClinicAdmins to update.
     */
    limit?: number
  }

  /**
   * ClinicAdmin updateManyAndReturn
   */
  export type ClinicAdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * The data used to update ClinicAdmins.
     */
    data: XOR<ClinicAdminUpdateManyMutationInput, ClinicAdminUncheckedUpdateManyInput>
    /**
     * Filter which ClinicAdmins to update
     */
    where?: ClinicAdminWhereInput
    /**
     * Limit how many ClinicAdmins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicAdmin upsert
   */
  export type ClinicAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicAdmin to update in case it exists.
     */
    where: ClinicAdminWhereUniqueInput
    /**
     * In case the ClinicAdmin found by the `where` argument doesn't exist, create a new ClinicAdmin with this data.
     */
    create: XOR<ClinicAdminCreateInput, ClinicAdminUncheckedCreateInput>
    /**
     * In case the ClinicAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicAdminUpdateInput, ClinicAdminUncheckedUpdateInput>
  }

  /**
   * ClinicAdmin delete
   */
  export type ClinicAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
    /**
     * Filter which ClinicAdmin to delete.
     */
    where: ClinicAdminWhereUniqueInput
  }

  /**
   * ClinicAdmin deleteMany
   */
  export type ClinicAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicAdmins to delete
     */
    where?: ClinicAdminWhereInput
    /**
     * Limit how many ClinicAdmins to delete.
     */
    limit?: number
  }

  /**
   * ClinicAdmin without action
   */
  export type ClinicAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicAdmin
     */
    select?: ClinicAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicAdmin
     */
    omit?: ClinicAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicAdminInclude<ExtArgs> | null
  }


  /**
   * Model ClinicWorkingHour
   */

  export type AggregateClinicWorkingHour = {
    _count: ClinicWorkingHourCountAggregateOutputType | null
    _avg: ClinicWorkingHourAvgAggregateOutputType | null
    _sum: ClinicWorkingHourSumAggregateOutputType | null
    _min: ClinicWorkingHourMinAggregateOutputType | null
    _max: ClinicWorkingHourMaxAggregateOutputType | null
  }

  export type ClinicWorkingHourAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type ClinicWorkingHourSumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type ClinicWorkingHourMinAggregateOutputType = {
    id: string | null
    clinicId: string | null
    dayOfWeek: number | null
    isOpen: boolean | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicWorkingHourMaxAggregateOutputType = {
    id: string | null
    clinicId: string | null
    dayOfWeek: number | null
    isOpen: boolean | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicWorkingHourCountAggregateOutputType = {
    id: number
    clinicId: number
    dayOfWeek: number
    isOpen: number
    startTime: number
    endTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicWorkingHourAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type ClinicWorkingHourSumAggregateInputType = {
    dayOfWeek?: true
  }

  export type ClinicWorkingHourMinAggregateInputType = {
    id?: true
    clinicId?: true
    dayOfWeek?: true
    isOpen?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicWorkingHourMaxAggregateInputType = {
    id?: true
    clinicId?: true
    dayOfWeek?: true
    isOpen?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicWorkingHourCountAggregateInputType = {
    id?: true
    clinicId?: true
    dayOfWeek?: true
    isOpen?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicWorkingHourAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicWorkingHour to aggregate.
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicWorkingHours to fetch.
     */
    orderBy?: ClinicWorkingHourOrderByWithRelationInput | ClinicWorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicWorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicWorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicWorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicWorkingHours
    **/
    _count?: true | ClinicWorkingHourCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicWorkingHourAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicWorkingHourSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicWorkingHourMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicWorkingHourMaxAggregateInputType
  }

  export type GetClinicWorkingHourAggregateType<T extends ClinicWorkingHourAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicWorkingHour]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicWorkingHour[P]>
      : GetScalarType<T[P], AggregateClinicWorkingHour[P]>
  }




  export type ClinicWorkingHourGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWorkingHourWhereInput
    orderBy?: ClinicWorkingHourOrderByWithAggregationInput | ClinicWorkingHourOrderByWithAggregationInput[]
    by: ClinicWorkingHourScalarFieldEnum[] | ClinicWorkingHourScalarFieldEnum
    having?: ClinicWorkingHourScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicWorkingHourCountAggregateInputType | true
    _avg?: ClinicWorkingHourAvgAggregateInputType
    _sum?: ClinicWorkingHourSumAggregateInputType
    _min?: ClinicWorkingHourMinAggregateInputType
    _max?: ClinicWorkingHourMaxAggregateInputType
  }

  export type ClinicWorkingHourGroupByOutputType = {
    id: string
    clinicId: string
    dayOfWeek: number
    isOpen: boolean
    startTime: string
    endTime: string
    createdAt: Date
    updatedAt: Date
    _count: ClinicWorkingHourCountAggregateOutputType | null
    _avg: ClinicWorkingHourAvgAggregateOutputType | null
    _sum: ClinicWorkingHourSumAggregateOutputType | null
    _min: ClinicWorkingHourMinAggregateOutputType | null
    _max: ClinicWorkingHourMaxAggregateOutputType | null
  }

  type GetClinicWorkingHourGroupByPayload<T extends ClinicWorkingHourGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicWorkingHourGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicWorkingHourGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicWorkingHourGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicWorkingHourGroupByOutputType[P]>
        }
      >
    >


  export type ClinicWorkingHourSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicWorkingHour"]>

  export type ClinicWorkingHourSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicWorkingHour"]>

  export type ClinicWorkingHourSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicWorkingHour"]>

  export type ClinicWorkingHourSelectScalar = {
    id?: boolean
    clinicId?: boolean
    dayOfWeek?: boolean
    isOpen?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicWorkingHourOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clinicId" | "dayOfWeek" | "isOpen" | "startTime" | "endTime" | "createdAt" | "updatedAt", ExtArgs["result"]["clinicWorkingHour"]>
  export type ClinicWorkingHourInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type ClinicWorkingHourIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type ClinicWorkingHourIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $ClinicWorkingHourPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicWorkingHour"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clinicId: string
      dayOfWeek: number
      isOpen: boolean
      startTime: string
      endTime: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinicWorkingHour"]>
    composites: {}
  }

  type ClinicWorkingHourGetPayload<S extends boolean | null | undefined | ClinicWorkingHourDefaultArgs> = $Result.GetResult<Prisma.$ClinicWorkingHourPayload, S>

  type ClinicWorkingHourCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicWorkingHourFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicWorkingHourCountAggregateInputType | true
    }

  export interface ClinicWorkingHourDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicWorkingHour'], meta: { name: 'ClinicWorkingHour' } }
    /**
     * Find zero or one ClinicWorkingHour that matches the filter.
     * @param {ClinicWorkingHourFindUniqueArgs} args - Arguments to find a ClinicWorkingHour
     * @example
     * // Get one ClinicWorkingHour
     * const clinicWorkingHour = await prisma.clinicWorkingHour.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicWorkingHourFindUniqueArgs>(args: SelectSubset<T, ClinicWorkingHourFindUniqueArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicWorkingHour that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicWorkingHourFindUniqueOrThrowArgs} args - Arguments to find a ClinicWorkingHour
     * @example
     * // Get one ClinicWorkingHour
     * const clinicWorkingHour = await prisma.clinicWorkingHour.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicWorkingHourFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicWorkingHourFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicWorkingHour that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourFindFirstArgs} args - Arguments to find a ClinicWorkingHour
     * @example
     * // Get one ClinicWorkingHour
     * const clinicWorkingHour = await prisma.clinicWorkingHour.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicWorkingHourFindFirstArgs>(args?: SelectSubset<T, ClinicWorkingHourFindFirstArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicWorkingHour that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourFindFirstOrThrowArgs} args - Arguments to find a ClinicWorkingHour
     * @example
     * // Get one ClinicWorkingHour
     * const clinicWorkingHour = await prisma.clinicWorkingHour.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicWorkingHourFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicWorkingHourFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicWorkingHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicWorkingHours
     * const clinicWorkingHours = await prisma.clinicWorkingHour.findMany()
     * 
     * // Get first 10 ClinicWorkingHours
     * const clinicWorkingHours = await prisma.clinicWorkingHour.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicWorkingHourWithIdOnly = await prisma.clinicWorkingHour.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicWorkingHourFindManyArgs>(args?: SelectSubset<T, ClinicWorkingHourFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicWorkingHour.
     * @param {ClinicWorkingHourCreateArgs} args - Arguments to create a ClinicWorkingHour.
     * @example
     * // Create one ClinicWorkingHour
     * const ClinicWorkingHour = await prisma.clinicWorkingHour.create({
     *   data: {
     *     // ... data to create a ClinicWorkingHour
     *   }
     * })
     * 
     */
    create<T extends ClinicWorkingHourCreateArgs>(args: SelectSubset<T, ClinicWorkingHourCreateArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicWorkingHours.
     * @param {ClinicWorkingHourCreateManyArgs} args - Arguments to create many ClinicWorkingHours.
     * @example
     * // Create many ClinicWorkingHours
     * const clinicWorkingHour = await prisma.clinicWorkingHour.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicWorkingHourCreateManyArgs>(args?: SelectSubset<T, ClinicWorkingHourCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicWorkingHours and returns the data saved in the database.
     * @param {ClinicWorkingHourCreateManyAndReturnArgs} args - Arguments to create many ClinicWorkingHours.
     * @example
     * // Create many ClinicWorkingHours
     * const clinicWorkingHour = await prisma.clinicWorkingHour.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicWorkingHours and only return the `id`
     * const clinicWorkingHourWithIdOnly = await prisma.clinicWorkingHour.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicWorkingHourCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicWorkingHourCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicWorkingHour.
     * @param {ClinicWorkingHourDeleteArgs} args - Arguments to delete one ClinicWorkingHour.
     * @example
     * // Delete one ClinicWorkingHour
     * const ClinicWorkingHour = await prisma.clinicWorkingHour.delete({
     *   where: {
     *     // ... filter to delete one ClinicWorkingHour
     *   }
     * })
     * 
     */
    delete<T extends ClinicWorkingHourDeleteArgs>(args: SelectSubset<T, ClinicWorkingHourDeleteArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicWorkingHour.
     * @param {ClinicWorkingHourUpdateArgs} args - Arguments to update one ClinicWorkingHour.
     * @example
     * // Update one ClinicWorkingHour
     * const clinicWorkingHour = await prisma.clinicWorkingHour.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicWorkingHourUpdateArgs>(args: SelectSubset<T, ClinicWorkingHourUpdateArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicWorkingHours.
     * @param {ClinicWorkingHourDeleteManyArgs} args - Arguments to filter ClinicWorkingHours to delete.
     * @example
     * // Delete a few ClinicWorkingHours
     * const { count } = await prisma.clinicWorkingHour.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicWorkingHourDeleteManyArgs>(args?: SelectSubset<T, ClinicWorkingHourDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicWorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicWorkingHours
     * const clinicWorkingHour = await prisma.clinicWorkingHour.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicWorkingHourUpdateManyArgs>(args: SelectSubset<T, ClinicWorkingHourUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicWorkingHours and returns the data updated in the database.
     * @param {ClinicWorkingHourUpdateManyAndReturnArgs} args - Arguments to update many ClinicWorkingHours.
     * @example
     * // Update many ClinicWorkingHours
     * const clinicWorkingHour = await prisma.clinicWorkingHour.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicWorkingHours and only return the `id`
     * const clinicWorkingHourWithIdOnly = await prisma.clinicWorkingHour.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClinicWorkingHourUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicWorkingHourUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicWorkingHour.
     * @param {ClinicWorkingHourUpsertArgs} args - Arguments to update or create a ClinicWorkingHour.
     * @example
     * // Update or create a ClinicWorkingHour
     * const clinicWorkingHour = await prisma.clinicWorkingHour.upsert({
     *   create: {
     *     // ... data to create a ClinicWorkingHour
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicWorkingHour we want to update
     *   }
     * })
     */
    upsert<T extends ClinicWorkingHourUpsertArgs>(args: SelectSubset<T, ClinicWorkingHourUpsertArgs<ExtArgs>>): Prisma__ClinicWorkingHourClient<$Result.GetResult<Prisma.$ClinicWorkingHourPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicWorkingHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourCountArgs} args - Arguments to filter ClinicWorkingHours to count.
     * @example
     * // Count the number of ClinicWorkingHours
     * const count = await prisma.clinicWorkingHour.count({
     *   where: {
     *     // ... the filter for the ClinicWorkingHours we want to count
     *   }
     * })
    **/
    count<T extends ClinicWorkingHourCountArgs>(
      args?: Subset<T, ClinicWorkingHourCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicWorkingHourCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicWorkingHour.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClinicWorkingHourAggregateArgs>(args: Subset<T, ClinicWorkingHourAggregateArgs>): Prisma.PrismaPromise<GetClinicWorkingHourAggregateType<T>>

    /**
     * Group by ClinicWorkingHour.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicWorkingHourGroupByArgs} args - Group by arguments.
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
      T extends ClinicWorkingHourGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicWorkingHourGroupByArgs['orderBy'] }
        : { orderBy?: ClinicWorkingHourGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClinicWorkingHourGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicWorkingHourGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicWorkingHour model
   */
  readonly fields: ClinicWorkingHourFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicWorkingHour.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicWorkingHourClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClinicWorkingHour model
   */
  interface ClinicWorkingHourFieldRefs {
    readonly id: FieldRef<"ClinicWorkingHour", 'String'>
    readonly clinicId: FieldRef<"ClinicWorkingHour", 'String'>
    readonly dayOfWeek: FieldRef<"ClinicWorkingHour", 'Int'>
    readonly isOpen: FieldRef<"ClinicWorkingHour", 'Boolean'>
    readonly startTime: FieldRef<"ClinicWorkingHour", 'String'>
    readonly endTime: FieldRef<"ClinicWorkingHour", 'String'>
    readonly createdAt: FieldRef<"ClinicWorkingHour", 'DateTime'>
    readonly updatedAt: FieldRef<"ClinicWorkingHour", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicWorkingHour findUnique
   */
  export type ClinicWorkingHourFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which ClinicWorkingHour to fetch.
     */
    where: ClinicWorkingHourWhereUniqueInput
  }

  /**
   * ClinicWorkingHour findUniqueOrThrow
   */
  export type ClinicWorkingHourFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which ClinicWorkingHour to fetch.
     */
    where: ClinicWorkingHourWhereUniqueInput
  }

  /**
   * ClinicWorkingHour findFirst
   */
  export type ClinicWorkingHourFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which ClinicWorkingHour to fetch.
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicWorkingHours to fetch.
     */
    orderBy?: ClinicWorkingHourOrderByWithRelationInput | ClinicWorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicWorkingHours.
     */
    cursor?: ClinicWorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicWorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicWorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicWorkingHours.
     */
    distinct?: ClinicWorkingHourScalarFieldEnum | ClinicWorkingHourScalarFieldEnum[]
  }

  /**
   * ClinicWorkingHour findFirstOrThrow
   */
  export type ClinicWorkingHourFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which ClinicWorkingHour to fetch.
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicWorkingHours to fetch.
     */
    orderBy?: ClinicWorkingHourOrderByWithRelationInput | ClinicWorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicWorkingHours.
     */
    cursor?: ClinicWorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicWorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicWorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicWorkingHours.
     */
    distinct?: ClinicWorkingHourScalarFieldEnum | ClinicWorkingHourScalarFieldEnum[]
  }

  /**
   * ClinicWorkingHour findMany
   */
  export type ClinicWorkingHourFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * Filter, which ClinicWorkingHours to fetch.
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicWorkingHours to fetch.
     */
    orderBy?: ClinicWorkingHourOrderByWithRelationInput | ClinicWorkingHourOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicWorkingHours.
     */
    cursor?: ClinicWorkingHourWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicWorkingHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicWorkingHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicWorkingHours.
     */
    distinct?: ClinicWorkingHourScalarFieldEnum | ClinicWorkingHourScalarFieldEnum[]
  }

  /**
   * ClinicWorkingHour create
   */
  export type ClinicWorkingHourCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicWorkingHour.
     */
    data: XOR<ClinicWorkingHourCreateInput, ClinicWorkingHourUncheckedCreateInput>
  }

  /**
   * ClinicWorkingHour createMany
   */
  export type ClinicWorkingHourCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicWorkingHours.
     */
    data: ClinicWorkingHourCreateManyInput | ClinicWorkingHourCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicWorkingHour createManyAndReturn
   */
  export type ClinicWorkingHourCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicWorkingHours.
     */
    data: ClinicWorkingHourCreateManyInput | ClinicWorkingHourCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicWorkingHour update
   */
  export type ClinicWorkingHourUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicWorkingHour.
     */
    data: XOR<ClinicWorkingHourUpdateInput, ClinicWorkingHourUncheckedUpdateInput>
    /**
     * Choose, which ClinicWorkingHour to update.
     */
    where: ClinicWorkingHourWhereUniqueInput
  }

  /**
   * ClinicWorkingHour updateMany
   */
  export type ClinicWorkingHourUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicWorkingHours.
     */
    data: XOR<ClinicWorkingHourUpdateManyMutationInput, ClinicWorkingHourUncheckedUpdateManyInput>
    /**
     * Filter which ClinicWorkingHours to update
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * Limit how many ClinicWorkingHours to update.
     */
    limit?: number
  }

  /**
   * ClinicWorkingHour updateManyAndReturn
   */
  export type ClinicWorkingHourUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * The data used to update ClinicWorkingHours.
     */
    data: XOR<ClinicWorkingHourUpdateManyMutationInput, ClinicWorkingHourUncheckedUpdateManyInput>
    /**
     * Filter which ClinicWorkingHours to update
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * Limit how many ClinicWorkingHours to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicWorkingHour upsert
   */
  export type ClinicWorkingHourUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicWorkingHour to update in case it exists.
     */
    where: ClinicWorkingHourWhereUniqueInput
    /**
     * In case the ClinicWorkingHour found by the `where` argument doesn't exist, create a new ClinicWorkingHour with this data.
     */
    create: XOR<ClinicWorkingHourCreateInput, ClinicWorkingHourUncheckedCreateInput>
    /**
     * In case the ClinicWorkingHour was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicWorkingHourUpdateInput, ClinicWorkingHourUncheckedUpdateInput>
  }

  /**
   * ClinicWorkingHour delete
   */
  export type ClinicWorkingHourDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
    /**
     * Filter which ClinicWorkingHour to delete.
     */
    where: ClinicWorkingHourWhereUniqueInput
  }

  /**
   * ClinicWorkingHour deleteMany
   */
  export type ClinicWorkingHourDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicWorkingHours to delete
     */
    where?: ClinicWorkingHourWhereInput
    /**
     * Limit how many ClinicWorkingHours to delete.
     */
    limit?: number
  }

  /**
   * ClinicWorkingHour without action
   */
  export type ClinicWorkingHourDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicWorkingHour
     */
    select?: ClinicWorkingHourSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicWorkingHour
     */
    omit?: ClinicWorkingHourOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicWorkingHourInclude<ExtArgs> | null
  }


  /**
   * Model Specialty
   */

  export type AggregateSpecialty = {
    _count: SpecialtyCountAggregateOutputType | null
    _min: SpecialtyMinAggregateOutputType | null
    _max: SpecialtyMaxAggregateOutputType | null
  }

  export type SpecialtyMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpecialtyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpecialtyCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpecialtyMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpecialtyMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpecialtyCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpecialtyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specialty to aggregate.
     */
    where?: SpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialties to fetch.
     */
    orderBy?: SpecialtyOrderByWithRelationInput | SpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Specialties
    **/
    _count?: true | SpecialtyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpecialtyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpecialtyMaxAggregateInputType
  }

  export type GetSpecialtyAggregateType<T extends SpecialtyAggregateArgs> = {
        [P in keyof T & keyof AggregateSpecialty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpecialty[P]>
      : GetScalarType<T[P], AggregateSpecialty[P]>
  }




  export type SpecialtyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpecialtyWhereInput
    orderBy?: SpecialtyOrderByWithAggregationInput | SpecialtyOrderByWithAggregationInput[]
    by: SpecialtyScalarFieldEnum[] | SpecialtyScalarFieldEnum
    having?: SpecialtyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpecialtyCountAggregateInputType | true
    _min?: SpecialtyMinAggregateInputType
    _max?: SpecialtyMaxAggregateInputType
  }

  export type SpecialtyGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: SpecialtyCountAggregateOutputType | null
    _min: SpecialtyMinAggregateOutputType | null
    _max: SpecialtyMaxAggregateOutputType | null
  }

  type GetSpecialtyGroupByPayload<T extends SpecialtyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpecialtyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpecialtyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpecialtyGroupByOutputType[P]>
            : GetScalarType<T[P], SpecialtyGroupByOutputType[P]>
        }
      >
    >


  export type SpecialtySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctors?: boolean | Specialty$doctorsArgs<ExtArgs>
    clinics?: boolean | Specialty$clinicsArgs<ExtArgs>
    specialtySchedules?: boolean | Specialty$specialtySchedulesArgs<ExtArgs>
    healthPackages?: boolean | Specialty$healthPackagesArgs<ExtArgs>
    _count?: boolean | SpecialtyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["specialty"]>

  export type SpecialtySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["specialty"]>

  export type SpecialtySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["specialty"]>

  export type SpecialtySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpecialtyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["specialty"]>
  export type SpecialtyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | Specialty$doctorsArgs<ExtArgs>
    clinics?: boolean | Specialty$clinicsArgs<ExtArgs>
    specialtySchedules?: boolean | Specialty$specialtySchedulesArgs<ExtArgs>
    healthPackages?: boolean | Specialty$healthPackagesArgs<ExtArgs>
    _count?: boolean | SpecialtyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpecialtyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SpecialtyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SpecialtyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Specialty"
    objects: {
      doctors: Prisma.$DoctorPayload<ExtArgs>[]
      clinics: Prisma.$ClinicSpecialtyPayload<ExtArgs>[]
      specialtySchedules: Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>[]
      healthPackages: Prisma.$HealthPackagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["specialty"]>
    composites: {}
  }

  type SpecialtyGetPayload<S extends boolean | null | undefined | SpecialtyDefaultArgs> = $Result.GetResult<Prisma.$SpecialtyPayload, S>

  type SpecialtyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpecialtyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpecialtyCountAggregateInputType | true
    }

  export interface SpecialtyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Specialty'], meta: { name: 'Specialty' } }
    /**
     * Find zero or one Specialty that matches the filter.
     * @param {SpecialtyFindUniqueArgs} args - Arguments to find a Specialty
     * @example
     * // Get one Specialty
     * const specialty = await prisma.specialty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpecialtyFindUniqueArgs>(args: SelectSubset<T, SpecialtyFindUniqueArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Specialty that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpecialtyFindUniqueOrThrowArgs} args - Arguments to find a Specialty
     * @example
     * // Get one Specialty
     * const specialty = await prisma.specialty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpecialtyFindUniqueOrThrowArgs>(args: SelectSubset<T, SpecialtyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Specialty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyFindFirstArgs} args - Arguments to find a Specialty
     * @example
     * // Get one Specialty
     * const specialty = await prisma.specialty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpecialtyFindFirstArgs>(args?: SelectSubset<T, SpecialtyFindFirstArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Specialty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyFindFirstOrThrowArgs} args - Arguments to find a Specialty
     * @example
     * // Get one Specialty
     * const specialty = await prisma.specialty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpecialtyFindFirstOrThrowArgs>(args?: SelectSubset<T, SpecialtyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Specialties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Specialties
     * const specialties = await prisma.specialty.findMany()
     * 
     * // Get first 10 Specialties
     * const specialties = await prisma.specialty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const specialtyWithIdOnly = await prisma.specialty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpecialtyFindManyArgs>(args?: SelectSubset<T, SpecialtyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Specialty.
     * @param {SpecialtyCreateArgs} args - Arguments to create a Specialty.
     * @example
     * // Create one Specialty
     * const Specialty = await prisma.specialty.create({
     *   data: {
     *     // ... data to create a Specialty
     *   }
     * })
     * 
     */
    create<T extends SpecialtyCreateArgs>(args: SelectSubset<T, SpecialtyCreateArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Specialties.
     * @param {SpecialtyCreateManyArgs} args - Arguments to create many Specialties.
     * @example
     * // Create many Specialties
     * const specialty = await prisma.specialty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpecialtyCreateManyArgs>(args?: SelectSubset<T, SpecialtyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Specialties and returns the data saved in the database.
     * @param {SpecialtyCreateManyAndReturnArgs} args - Arguments to create many Specialties.
     * @example
     * // Create many Specialties
     * const specialty = await prisma.specialty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Specialties and only return the `id`
     * const specialtyWithIdOnly = await prisma.specialty.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpecialtyCreateManyAndReturnArgs>(args?: SelectSubset<T, SpecialtyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Specialty.
     * @param {SpecialtyDeleteArgs} args - Arguments to delete one Specialty.
     * @example
     * // Delete one Specialty
     * const Specialty = await prisma.specialty.delete({
     *   where: {
     *     // ... filter to delete one Specialty
     *   }
     * })
     * 
     */
    delete<T extends SpecialtyDeleteArgs>(args: SelectSubset<T, SpecialtyDeleteArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Specialty.
     * @param {SpecialtyUpdateArgs} args - Arguments to update one Specialty.
     * @example
     * // Update one Specialty
     * const specialty = await prisma.specialty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpecialtyUpdateArgs>(args: SelectSubset<T, SpecialtyUpdateArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Specialties.
     * @param {SpecialtyDeleteManyArgs} args - Arguments to filter Specialties to delete.
     * @example
     * // Delete a few Specialties
     * const { count } = await prisma.specialty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpecialtyDeleteManyArgs>(args?: SelectSubset<T, SpecialtyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specialties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Specialties
     * const specialty = await prisma.specialty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpecialtyUpdateManyArgs>(args: SelectSubset<T, SpecialtyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specialties and returns the data updated in the database.
     * @param {SpecialtyUpdateManyAndReturnArgs} args - Arguments to update many Specialties.
     * @example
     * // Update many Specialties
     * const specialty = await prisma.specialty.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Specialties and only return the `id`
     * const specialtyWithIdOnly = await prisma.specialty.updateManyAndReturn({
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
    updateManyAndReturn<T extends SpecialtyUpdateManyAndReturnArgs>(args: SelectSubset<T, SpecialtyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Specialty.
     * @param {SpecialtyUpsertArgs} args - Arguments to update or create a Specialty.
     * @example
     * // Update or create a Specialty
     * const specialty = await prisma.specialty.upsert({
     *   create: {
     *     // ... data to create a Specialty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Specialty we want to update
     *   }
     * })
     */
    upsert<T extends SpecialtyUpsertArgs>(args: SelectSubset<T, SpecialtyUpsertArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Specialties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyCountArgs} args - Arguments to filter Specialties to count.
     * @example
     * // Count the number of Specialties
     * const count = await prisma.specialty.count({
     *   where: {
     *     // ... the filter for the Specialties we want to count
     *   }
     * })
    **/
    count<T extends SpecialtyCountArgs>(
      args?: Subset<T, SpecialtyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpecialtyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Specialty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SpecialtyAggregateArgs>(args: Subset<T, SpecialtyAggregateArgs>): Prisma.PrismaPromise<GetSpecialtyAggregateType<T>>

    /**
     * Group by Specialty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialtyGroupByArgs} args - Group by arguments.
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
      T extends SpecialtyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpecialtyGroupByArgs['orderBy'] }
        : { orderBy?: SpecialtyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SpecialtyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpecialtyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Specialty model
   */
  readonly fields: SpecialtyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Specialty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpecialtyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctors<T extends Specialty$doctorsArgs<ExtArgs> = {}>(args?: Subset<T, Specialty$doctorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clinics<T extends Specialty$clinicsArgs<ExtArgs> = {}>(args?: Subset<T, Specialty$clinicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specialtySchedules<T extends Specialty$specialtySchedulesArgs<ExtArgs> = {}>(args?: Subset<T, Specialty$specialtySchedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    healthPackages<T extends Specialty$healthPackagesArgs<ExtArgs> = {}>(args?: Subset<T, Specialty$healthPackagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Specialty model
   */
  interface SpecialtyFieldRefs {
    readonly id: FieldRef<"Specialty", 'String'>
    readonly name: FieldRef<"Specialty", 'String'>
    readonly createdAt: FieldRef<"Specialty", 'DateTime'>
    readonly updatedAt: FieldRef<"Specialty", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Specialty findUnique
   */
  export type SpecialtyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which Specialty to fetch.
     */
    where: SpecialtyWhereUniqueInput
  }

  /**
   * Specialty findUniqueOrThrow
   */
  export type SpecialtyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which Specialty to fetch.
     */
    where: SpecialtyWhereUniqueInput
  }

  /**
   * Specialty findFirst
   */
  export type SpecialtyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which Specialty to fetch.
     */
    where?: SpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialties to fetch.
     */
    orderBy?: SpecialtyOrderByWithRelationInput | SpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specialties.
     */
    cursor?: SpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialties.
     */
    distinct?: SpecialtyScalarFieldEnum | SpecialtyScalarFieldEnum[]
  }

  /**
   * Specialty findFirstOrThrow
   */
  export type SpecialtyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which Specialty to fetch.
     */
    where?: SpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialties to fetch.
     */
    orderBy?: SpecialtyOrderByWithRelationInput | SpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specialties.
     */
    cursor?: SpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialties.
     */
    distinct?: SpecialtyScalarFieldEnum | SpecialtyScalarFieldEnum[]
  }

  /**
   * Specialty findMany
   */
  export type SpecialtyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which Specialties to fetch.
     */
    where?: SpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialties to fetch.
     */
    orderBy?: SpecialtyOrderByWithRelationInput | SpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Specialties.
     */
    cursor?: SpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialties.
     */
    distinct?: SpecialtyScalarFieldEnum | SpecialtyScalarFieldEnum[]
  }

  /**
   * Specialty create
   */
  export type SpecialtyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * The data needed to create a Specialty.
     */
    data: XOR<SpecialtyCreateInput, SpecialtyUncheckedCreateInput>
  }

  /**
   * Specialty createMany
   */
  export type SpecialtyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Specialties.
     */
    data: SpecialtyCreateManyInput | SpecialtyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Specialty createManyAndReturn
   */
  export type SpecialtyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * The data used to create many Specialties.
     */
    data: SpecialtyCreateManyInput | SpecialtyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Specialty update
   */
  export type SpecialtyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * The data needed to update a Specialty.
     */
    data: XOR<SpecialtyUpdateInput, SpecialtyUncheckedUpdateInput>
    /**
     * Choose, which Specialty to update.
     */
    where: SpecialtyWhereUniqueInput
  }

  /**
   * Specialty updateMany
   */
  export type SpecialtyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Specialties.
     */
    data: XOR<SpecialtyUpdateManyMutationInput, SpecialtyUncheckedUpdateManyInput>
    /**
     * Filter which Specialties to update
     */
    where?: SpecialtyWhereInput
    /**
     * Limit how many Specialties to update.
     */
    limit?: number
  }

  /**
   * Specialty updateManyAndReturn
   */
  export type SpecialtyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * The data used to update Specialties.
     */
    data: XOR<SpecialtyUpdateManyMutationInput, SpecialtyUncheckedUpdateManyInput>
    /**
     * Filter which Specialties to update
     */
    where?: SpecialtyWhereInput
    /**
     * Limit how many Specialties to update.
     */
    limit?: number
  }

  /**
   * Specialty upsert
   */
  export type SpecialtyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * The filter to search for the Specialty to update in case it exists.
     */
    where: SpecialtyWhereUniqueInput
    /**
     * In case the Specialty found by the `where` argument doesn't exist, create a new Specialty with this data.
     */
    create: XOR<SpecialtyCreateInput, SpecialtyUncheckedCreateInput>
    /**
     * In case the Specialty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpecialtyUpdateInput, SpecialtyUncheckedUpdateInput>
  }

  /**
   * Specialty delete
   */
  export type SpecialtyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    /**
     * Filter which Specialty to delete.
     */
    where: SpecialtyWhereUniqueInput
  }

  /**
   * Specialty deleteMany
   */
  export type SpecialtyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specialties to delete
     */
    where?: SpecialtyWhereInput
    /**
     * Limit how many Specialties to delete.
     */
    limit?: number
  }

  /**
   * Specialty.doctors
   */
  export type Specialty$doctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    cursor?: DoctorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Specialty.clinics
   */
  export type Specialty$clinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    where?: ClinicSpecialtyWhereInput
    orderBy?: ClinicSpecialtyOrderByWithRelationInput | ClinicSpecialtyOrderByWithRelationInput[]
    cursor?: ClinicSpecialtyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicSpecialtyScalarFieldEnum | ClinicSpecialtyScalarFieldEnum[]
  }

  /**
   * Specialty.specialtySchedules
   */
  export type Specialty$specialtySchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    where?: ClinicSpecialtyScheduleWhereInput
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicSpecialtyScheduleScalarFieldEnum | ClinicSpecialtyScheduleScalarFieldEnum[]
  }

  /**
   * Specialty.healthPackages
   */
  export type Specialty$healthPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    where?: HealthPackageWhereInput
    orderBy?: HealthPackageOrderByWithRelationInput | HealthPackageOrderByWithRelationInput[]
    cursor?: HealthPackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HealthPackageScalarFieldEnum | HealthPackageScalarFieldEnum[]
  }

  /**
   * Specialty without action
   */
  export type SpecialtyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
  }


  /**
   * Model ClinicSpecialty
   */

  export type AggregateClinicSpecialty = {
    _count: ClinicSpecialtyCountAggregateOutputType | null
    _min: ClinicSpecialtyMinAggregateOutputType | null
    _max: ClinicSpecialtyMaxAggregateOutputType | null
  }

  export type ClinicSpecialtyMinAggregateOutputType = {
    clinicId: string | null
    specialtyId: string | null
    createdAt: Date | null
  }

  export type ClinicSpecialtyMaxAggregateOutputType = {
    clinicId: string | null
    specialtyId: string | null
    createdAt: Date | null
  }

  export type ClinicSpecialtyCountAggregateOutputType = {
    clinicId: number
    specialtyId: number
    createdAt: number
    _all: number
  }


  export type ClinicSpecialtyMinAggregateInputType = {
    clinicId?: true
    specialtyId?: true
    createdAt?: true
  }

  export type ClinicSpecialtyMaxAggregateInputType = {
    clinicId?: true
    specialtyId?: true
    createdAt?: true
  }

  export type ClinicSpecialtyCountAggregateInputType = {
    clinicId?: true
    specialtyId?: true
    createdAt?: true
    _all?: true
  }

  export type ClinicSpecialtyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicSpecialty to aggregate.
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialties to fetch.
     */
    orderBy?: ClinicSpecialtyOrderByWithRelationInput | ClinicSpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicSpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicSpecialties
    **/
    _count?: true | ClinicSpecialtyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicSpecialtyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicSpecialtyMaxAggregateInputType
  }

  export type GetClinicSpecialtyAggregateType<T extends ClinicSpecialtyAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicSpecialty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicSpecialty[P]>
      : GetScalarType<T[P], AggregateClinicSpecialty[P]>
  }




  export type ClinicSpecialtyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyWhereInput
    orderBy?: ClinicSpecialtyOrderByWithAggregationInput | ClinicSpecialtyOrderByWithAggregationInput[]
    by: ClinicSpecialtyScalarFieldEnum[] | ClinicSpecialtyScalarFieldEnum
    having?: ClinicSpecialtyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicSpecialtyCountAggregateInputType | true
    _min?: ClinicSpecialtyMinAggregateInputType
    _max?: ClinicSpecialtyMaxAggregateInputType
  }

  export type ClinicSpecialtyGroupByOutputType = {
    clinicId: string
    specialtyId: string
    createdAt: Date
    _count: ClinicSpecialtyCountAggregateOutputType | null
    _min: ClinicSpecialtyMinAggregateOutputType | null
    _max: ClinicSpecialtyMaxAggregateOutputType | null
  }

  type GetClinicSpecialtyGroupByPayload<T extends ClinicSpecialtyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicSpecialtyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicSpecialtyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicSpecialtyGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicSpecialtyGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSpecialtySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    schedules?: boolean | ClinicSpecialty$schedulesArgs<ExtArgs>
    _count?: boolean | ClinicSpecialtyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicSpecialty"]>

  export type ClinicSpecialtySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicSpecialty"]>

  export type ClinicSpecialtySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicSpecialty"]>

  export type ClinicSpecialtySelectScalar = {
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
  }

  export type ClinicSpecialtyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"clinicId" | "specialtyId" | "createdAt", ExtArgs["result"]["clinicSpecialty"]>
  export type ClinicSpecialtyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    schedules?: boolean | ClinicSpecialty$schedulesArgs<ExtArgs>
    _count?: boolean | ClinicSpecialtyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicSpecialtyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }
  export type ClinicSpecialtyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }

  export type $ClinicSpecialtyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicSpecialty"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
      specialty: Prisma.$SpecialtyPayload<ExtArgs>
      schedules: Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      clinicId: string
      specialtyId: string
      createdAt: Date
    }, ExtArgs["result"]["clinicSpecialty"]>
    composites: {}
  }

  type ClinicSpecialtyGetPayload<S extends boolean | null | undefined | ClinicSpecialtyDefaultArgs> = $Result.GetResult<Prisma.$ClinicSpecialtyPayload, S>

  type ClinicSpecialtyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicSpecialtyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicSpecialtyCountAggregateInputType | true
    }

  export interface ClinicSpecialtyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicSpecialty'], meta: { name: 'ClinicSpecialty' } }
    /**
     * Find zero or one ClinicSpecialty that matches the filter.
     * @param {ClinicSpecialtyFindUniqueArgs} args - Arguments to find a ClinicSpecialty
     * @example
     * // Get one ClinicSpecialty
     * const clinicSpecialty = await prisma.clinicSpecialty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicSpecialtyFindUniqueArgs>(args: SelectSubset<T, ClinicSpecialtyFindUniqueArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicSpecialty that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicSpecialtyFindUniqueOrThrowArgs} args - Arguments to find a ClinicSpecialty
     * @example
     * // Get one ClinicSpecialty
     * const clinicSpecialty = await prisma.clinicSpecialty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicSpecialtyFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicSpecialtyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicSpecialty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyFindFirstArgs} args - Arguments to find a ClinicSpecialty
     * @example
     * // Get one ClinicSpecialty
     * const clinicSpecialty = await prisma.clinicSpecialty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicSpecialtyFindFirstArgs>(args?: SelectSubset<T, ClinicSpecialtyFindFirstArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicSpecialty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyFindFirstOrThrowArgs} args - Arguments to find a ClinicSpecialty
     * @example
     * // Get one ClinicSpecialty
     * const clinicSpecialty = await prisma.clinicSpecialty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicSpecialtyFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicSpecialtyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicSpecialties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicSpecialties
     * const clinicSpecialties = await prisma.clinicSpecialty.findMany()
     * 
     * // Get first 10 ClinicSpecialties
     * const clinicSpecialties = await prisma.clinicSpecialty.findMany({ take: 10 })
     * 
     * // Only select the `clinicId`
     * const clinicSpecialtyWithClinicIdOnly = await prisma.clinicSpecialty.findMany({ select: { clinicId: true } })
     * 
     */
    findMany<T extends ClinicSpecialtyFindManyArgs>(args?: SelectSubset<T, ClinicSpecialtyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicSpecialty.
     * @param {ClinicSpecialtyCreateArgs} args - Arguments to create a ClinicSpecialty.
     * @example
     * // Create one ClinicSpecialty
     * const ClinicSpecialty = await prisma.clinicSpecialty.create({
     *   data: {
     *     // ... data to create a ClinicSpecialty
     *   }
     * })
     * 
     */
    create<T extends ClinicSpecialtyCreateArgs>(args: SelectSubset<T, ClinicSpecialtyCreateArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicSpecialties.
     * @param {ClinicSpecialtyCreateManyArgs} args - Arguments to create many ClinicSpecialties.
     * @example
     * // Create many ClinicSpecialties
     * const clinicSpecialty = await prisma.clinicSpecialty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicSpecialtyCreateManyArgs>(args?: SelectSubset<T, ClinicSpecialtyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicSpecialties and returns the data saved in the database.
     * @param {ClinicSpecialtyCreateManyAndReturnArgs} args - Arguments to create many ClinicSpecialties.
     * @example
     * // Create many ClinicSpecialties
     * const clinicSpecialty = await prisma.clinicSpecialty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicSpecialties and only return the `clinicId`
     * const clinicSpecialtyWithClinicIdOnly = await prisma.clinicSpecialty.createManyAndReturn({
     *   select: { clinicId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicSpecialtyCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicSpecialtyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicSpecialty.
     * @param {ClinicSpecialtyDeleteArgs} args - Arguments to delete one ClinicSpecialty.
     * @example
     * // Delete one ClinicSpecialty
     * const ClinicSpecialty = await prisma.clinicSpecialty.delete({
     *   where: {
     *     // ... filter to delete one ClinicSpecialty
     *   }
     * })
     * 
     */
    delete<T extends ClinicSpecialtyDeleteArgs>(args: SelectSubset<T, ClinicSpecialtyDeleteArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicSpecialty.
     * @param {ClinicSpecialtyUpdateArgs} args - Arguments to update one ClinicSpecialty.
     * @example
     * // Update one ClinicSpecialty
     * const clinicSpecialty = await prisma.clinicSpecialty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicSpecialtyUpdateArgs>(args: SelectSubset<T, ClinicSpecialtyUpdateArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicSpecialties.
     * @param {ClinicSpecialtyDeleteManyArgs} args - Arguments to filter ClinicSpecialties to delete.
     * @example
     * // Delete a few ClinicSpecialties
     * const { count } = await prisma.clinicSpecialty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicSpecialtyDeleteManyArgs>(args?: SelectSubset<T, ClinicSpecialtyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicSpecialties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicSpecialties
     * const clinicSpecialty = await prisma.clinicSpecialty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicSpecialtyUpdateManyArgs>(args: SelectSubset<T, ClinicSpecialtyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicSpecialties and returns the data updated in the database.
     * @param {ClinicSpecialtyUpdateManyAndReturnArgs} args - Arguments to update many ClinicSpecialties.
     * @example
     * // Update many ClinicSpecialties
     * const clinicSpecialty = await prisma.clinicSpecialty.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicSpecialties and only return the `clinicId`
     * const clinicSpecialtyWithClinicIdOnly = await prisma.clinicSpecialty.updateManyAndReturn({
     *   select: { clinicId: true },
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
    updateManyAndReturn<T extends ClinicSpecialtyUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicSpecialtyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicSpecialty.
     * @param {ClinicSpecialtyUpsertArgs} args - Arguments to update or create a ClinicSpecialty.
     * @example
     * // Update or create a ClinicSpecialty
     * const clinicSpecialty = await prisma.clinicSpecialty.upsert({
     *   create: {
     *     // ... data to create a ClinicSpecialty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicSpecialty we want to update
     *   }
     * })
     */
    upsert<T extends ClinicSpecialtyUpsertArgs>(args: SelectSubset<T, ClinicSpecialtyUpsertArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicSpecialties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyCountArgs} args - Arguments to filter ClinicSpecialties to count.
     * @example
     * // Count the number of ClinicSpecialties
     * const count = await prisma.clinicSpecialty.count({
     *   where: {
     *     // ... the filter for the ClinicSpecialties we want to count
     *   }
     * })
    **/
    count<T extends ClinicSpecialtyCountArgs>(
      args?: Subset<T, ClinicSpecialtyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicSpecialtyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicSpecialty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClinicSpecialtyAggregateArgs>(args: Subset<T, ClinicSpecialtyAggregateArgs>): Prisma.PrismaPromise<GetClinicSpecialtyAggregateType<T>>

    /**
     * Group by ClinicSpecialty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyGroupByArgs} args - Group by arguments.
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
      T extends ClinicSpecialtyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicSpecialtyGroupByArgs['orderBy'] }
        : { orderBy?: ClinicSpecialtyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClinicSpecialtyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicSpecialtyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicSpecialty model
   */
  readonly fields: ClinicSpecialtyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicSpecialty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicSpecialtyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    specialty<T extends SpecialtyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpecialtyDefaultArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedules<T extends ClinicSpecialty$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, ClinicSpecialty$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ClinicSpecialty model
   */
  interface ClinicSpecialtyFieldRefs {
    readonly clinicId: FieldRef<"ClinicSpecialty", 'String'>
    readonly specialtyId: FieldRef<"ClinicSpecialty", 'String'>
    readonly createdAt: FieldRef<"ClinicSpecialty", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicSpecialty findUnique
   */
  export type ClinicSpecialtyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialty to fetch.
     */
    where: ClinicSpecialtyWhereUniqueInput
  }

  /**
   * ClinicSpecialty findUniqueOrThrow
   */
  export type ClinicSpecialtyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialty to fetch.
     */
    where: ClinicSpecialtyWhereUniqueInput
  }

  /**
   * ClinicSpecialty findFirst
   */
  export type ClinicSpecialtyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialty to fetch.
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialties to fetch.
     */
    orderBy?: ClinicSpecialtyOrderByWithRelationInput | ClinicSpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicSpecialties.
     */
    cursor?: ClinicSpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSpecialties.
     */
    distinct?: ClinicSpecialtyScalarFieldEnum | ClinicSpecialtyScalarFieldEnum[]
  }

  /**
   * ClinicSpecialty findFirstOrThrow
   */
  export type ClinicSpecialtyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialty to fetch.
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialties to fetch.
     */
    orderBy?: ClinicSpecialtyOrderByWithRelationInput | ClinicSpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicSpecialties.
     */
    cursor?: ClinicSpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSpecialties.
     */
    distinct?: ClinicSpecialtyScalarFieldEnum | ClinicSpecialtyScalarFieldEnum[]
  }

  /**
   * ClinicSpecialty findMany
   */
  export type ClinicSpecialtyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialties to fetch.
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialties to fetch.
     */
    orderBy?: ClinicSpecialtyOrderByWithRelationInput | ClinicSpecialtyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicSpecialties.
     */
    cursor?: ClinicSpecialtyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSpecialties.
     */
    distinct?: ClinicSpecialtyScalarFieldEnum | ClinicSpecialtyScalarFieldEnum[]
  }

  /**
   * ClinicSpecialty create
   */
  export type ClinicSpecialtyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicSpecialty.
     */
    data: XOR<ClinicSpecialtyCreateInput, ClinicSpecialtyUncheckedCreateInput>
  }

  /**
   * ClinicSpecialty createMany
   */
  export type ClinicSpecialtyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicSpecialties.
     */
    data: ClinicSpecialtyCreateManyInput | ClinicSpecialtyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicSpecialty createManyAndReturn
   */
  export type ClinicSpecialtyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicSpecialties.
     */
    data: ClinicSpecialtyCreateManyInput | ClinicSpecialtyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicSpecialty update
   */
  export type ClinicSpecialtyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicSpecialty.
     */
    data: XOR<ClinicSpecialtyUpdateInput, ClinicSpecialtyUncheckedUpdateInput>
    /**
     * Choose, which ClinicSpecialty to update.
     */
    where: ClinicSpecialtyWhereUniqueInput
  }

  /**
   * ClinicSpecialty updateMany
   */
  export type ClinicSpecialtyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicSpecialties.
     */
    data: XOR<ClinicSpecialtyUpdateManyMutationInput, ClinicSpecialtyUncheckedUpdateManyInput>
    /**
     * Filter which ClinicSpecialties to update
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * Limit how many ClinicSpecialties to update.
     */
    limit?: number
  }

  /**
   * ClinicSpecialty updateManyAndReturn
   */
  export type ClinicSpecialtyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * The data used to update ClinicSpecialties.
     */
    data: XOR<ClinicSpecialtyUpdateManyMutationInput, ClinicSpecialtyUncheckedUpdateManyInput>
    /**
     * Filter which ClinicSpecialties to update
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * Limit how many ClinicSpecialties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicSpecialty upsert
   */
  export type ClinicSpecialtyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicSpecialty to update in case it exists.
     */
    where: ClinicSpecialtyWhereUniqueInput
    /**
     * In case the ClinicSpecialty found by the `where` argument doesn't exist, create a new ClinicSpecialty with this data.
     */
    create: XOR<ClinicSpecialtyCreateInput, ClinicSpecialtyUncheckedCreateInput>
    /**
     * In case the ClinicSpecialty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicSpecialtyUpdateInput, ClinicSpecialtyUncheckedUpdateInput>
  }

  /**
   * ClinicSpecialty delete
   */
  export type ClinicSpecialtyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
    /**
     * Filter which ClinicSpecialty to delete.
     */
    where: ClinicSpecialtyWhereUniqueInput
  }

  /**
   * ClinicSpecialty deleteMany
   */
  export type ClinicSpecialtyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicSpecialties to delete
     */
    where?: ClinicSpecialtyWhereInput
    /**
     * Limit how many ClinicSpecialties to delete.
     */
    limit?: number
  }

  /**
   * ClinicSpecialty.schedules
   */
  export type ClinicSpecialty$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    where?: ClinicSpecialtyScheduleWhereInput
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicSpecialtyScheduleScalarFieldEnum | ClinicSpecialtyScheduleScalarFieldEnum[]
  }

  /**
   * ClinicSpecialty without action
   */
  export type ClinicSpecialtyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialty
     */
    select?: ClinicSpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialty
     */
    omit?: ClinicSpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyInclude<ExtArgs> | null
  }


  /**
   * Model ClinicSpecialtySchedule
   */

  export type AggregateClinicSpecialtySchedule = {
    _count: ClinicSpecialtyScheduleCountAggregateOutputType | null
    _avg: ClinicSpecialtyScheduleAvgAggregateOutputType | null
    _sum: ClinicSpecialtyScheduleSumAggregateOutputType | null
    _min: ClinicSpecialtyScheduleMinAggregateOutputType | null
    _max: ClinicSpecialtyScheduleMaxAggregateOutputType | null
  }

  export type ClinicSpecialtyScheduleAvgAggregateOutputType = {
    dayOfWeek: number | null
    slotDurationMinutes: number | null
    capacity: number | null
  }

  export type ClinicSpecialtyScheduleSumAggregateOutputType = {
    dayOfWeek: number | null
    slotDurationMinutes: number | null
    capacity: number | null
  }

  export type ClinicSpecialtyScheduleMinAggregateOutputType = {
    id: string | null
    clinicId: string | null
    specialtyId: string | null
    dayOfWeek: number | null
    isActive: boolean | null
    startTime: string | null
    endTime: string | null
    slotDurationMinutes: number | null
    capacity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicSpecialtyScheduleMaxAggregateOutputType = {
    id: string | null
    clinicId: string | null
    specialtyId: string | null
    dayOfWeek: number | null
    isActive: boolean | null
    startTime: string | null
    endTime: string | null
    slotDurationMinutes: number | null
    capacity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicSpecialtyScheduleCountAggregateOutputType = {
    id: number
    clinicId: number
    specialtyId: number
    dayOfWeek: number
    isActive: number
    startTime: number
    endTime: number
    slotDurationMinutes: number
    capacity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicSpecialtyScheduleAvgAggregateInputType = {
    dayOfWeek?: true
    slotDurationMinutes?: true
    capacity?: true
  }

  export type ClinicSpecialtyScheduleSumAggregateInputType = {
    dayOfWeek?: true
    slotDurationMinutes?: true
    capacity?: true
  }

  export type ClinicSpecialtyScheduleMinAggregateInputType = {
    id?: true
    clinicId?: true
    specialtyId?: true
    dayOfWeek?: true
    isActive?: true
    startTime?: true
    endTime?: true
    slotDurationMinutes?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicSpecialtyScheduleMaxAggregateInputType = {
    id?: true
    clinicId?: true
    specialtyId?: true
    dayOfWeek?: true
    isActive?: true
    startTime?: true
    endTime?: true
    slotDurationMinutes?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicSpecialtyScheduleCountAggregateInputType = {
    id?: true
    clinicId?: true
    specialtyId?: true
    dayOfWeek?: true
    isActive?: true
    startTime?: true
    endTime?: true
    slotDurationMinutes?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicSpecialtyScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicSpecialtySchedule to aggregate.
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialtySchedules to fetch.
     */
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialtySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialtySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicSpecialtySchedules
    **/
    _count?: true | ClinicSpecialtyScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicSpecialtyScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicSpecialtyScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicSpecialtyScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicSpecialtyScheduleMaxAggregateInputType
  }

  export type GetClinicSpecialtyScheduleAggregateType<T extends ClinicSpecialtyScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicSpecialtySchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicSpecialtySchedule[P]>
      : GetScalarType<T[P], AggregateClinicSpecialtySchedule[P]>
  }




  export type ClinicSpecialtyScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicSpecialtyScheduleWhereInput
    orderBy?: ClinicSpecialtyScheduleOrderByWithAggregationInput | ClinicSpecialtyScheduleOrderByWithAggregationInput[]
    by: ClinicSpecialtyScheduleScalarFieldEnum[] | ClinicSpecialtyScheduleScalarFieldEnum
    having?: ClinicSpecialtyScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicSpecialtyScheduleCountAggregateInputType | true
    _avg?: ClinicSpecialtyScheduleAvgAggregateInputType
    _sum?: ClinicSpecialtyScheduleSumAggregateInputType
    _min?: ClinicSpecialtyScheduleMinAggregateInputType
    _max?: ClinicSpecialtyScheduleMaxAggregateInputType
  }

  export type ClinicSpecialtyScheduleGroupByOutputType = {
    id: string
    clinicId: string
    specialtyId: string
    dayOfWeek: number
    isActive: boolean
    startTime: string
    endTime: string
    slotDurationMinutes: number
    capacity: number
    createdAt: Date
    updatedAt: Date
    _count: ClinicSpecialtyScheduleCountAggregateOutputType | null
    _avg: ClinicSpecialtyScheduleAvgAggregateOutputType | null
    _sum: ClinicSpecialtyScheduleSumAggregateOutputType | null
    _min: ClinicSpecialtyScheduleMinAggregateOutputType | null
    _max: ClinicSpecialtyScheduleMaxAggregateOutputType | null
  }

  type GetClinicSpecialtyScheduleGroupByPayload<T extends ClinicSpecialtyScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicSpecialtyScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicSpecialtyScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicSpecialtyScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicSpecialtyScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSpecialtyScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    clinicSpecialty?: boolean | ClinicSpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicSpecialtySchedule"]>

  export type ClinicSpecialtyScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    clinicSpecialty?: boolean | ClinicSpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicSpecialtySchedule"]>

  export type ClinicSpecialtyScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    clinicSpecialty?: boolean | ClinicSpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicSpecialtySchedule"]>

  export type ClinicSpecialtyScheduleSelectScalar = {
    id?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicSpecialtyScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clinicId" | "specialtyId" | "dayOfWeek" | "isActive" | "startTime" | "endTime" | "slotDurationMinutes" | "capacity" | "createdAt" | "updatedAt", ExtArgs["result"]["clinicSpecialtySchedule"]>
  export type ClinicSpecialtyScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    clinicSpecialty?: boolean | ClinicSpecialtyDefaultArgs<ExtArgs>
  }
  export type ClinicSpecialtyScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    clinicSpecialty?: boolean | ClinicSpecialtyDefaultArgs<ExtArgs>
  }
  export type ClinicSpecialtyScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
    clinicSpecialty?: boolean | ClinicSpecialtyDefaultArgs<ExtArgs>
  }

  export type $ClinicSpecialtySchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicSpecialtySchedule"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
      specialty: Prisma.$SpecialtyPayload<ExtArgs>
      clinicSpecialty: Prisma.$ClinicSpecialtyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clinicId: string
      specialtyId: string
      dayOfWeek: number
      isActive: boolean
      startTime: string
      endTime: string
      slotDurationMinutes: number
      capacity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinicSpecialtySchedule"]>
    composites: {}
  }

  type ClinicSpecialtyScheduleGetPayload<S extends boolean | null | undefined | ClinicSpecialtyScheduleDefaultArgs> = $Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload, S>

  type ClinicSpecialtyScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicSpecialtyScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicSpecialtyScheduleCountAggregateInputType | true
    }

  export interface ClinicSpecialtyScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicSpecialtySchedule'], meta: { name: 'ClinicSpecialtySchedule' } }
    /**
     * Find zero or one ClinicSpecialtySchedule that matches the filter.
     * @param {ClinicSpecialtyScheduleFindUniqueArgs} args - Arguments to find a ClinicSpecialtySchedule
     * @example
     * // Get one ClinicSpecialtySchedule
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicSpecialtyScheduleFindUniqueArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleFindUniqueArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicSpecialtySchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicSpecialtyScheduleFindUniqueOrThrowArgs} args - Arguments to find a ClinicSpecialtySchedule
     * @example
     * // Get one ClinicSpecialtySchedule
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicSpecialtyScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicSpecialtySchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleFindFirstArgs} args - Arguments to find a ClinicSpecialtySchedule
     * @example
     * // Get one ClinicSpecialtySchedule
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicSpecialtyScheduleFindFirstArgs>(args?: SelectSubset<T, ClinicSpecialtyScheduleFindFirstArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicSpecialtySchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleFindFirstOrThrowArgs} args - Arguments to find a ClinicSpecialtySchedule
     * @example
     * // Get one ClinicSpecialtySchedule
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicSpecialtyScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicSpecialtyScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicSpecialtySchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicSpecialtySchedules
     * const clinicSpecialtySchedules = await prisma.clinicSpecialtySchedule.findMany()
     * 
     * // Get first 10 ClinicSpecialtySchedules
     * const clinicSpecialtySchedules = await prisma.clinicSpecialtySchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicSpecialtyScheduleWithIdOnly = await prisma.clinicSpecialtySchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicSpecialtyScheduleFindManyArgs>(args?: SelectSubset<T, ClinicSpecialtyScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicSpecialtySchedule.
     * @param {ClinicSpecialtyScheduleCreateArgs} args - Arguments to create a ClinicSpecialtySchedule.
     * @example
     * // Create one ClinicSpecialtySchedule
     * const ClinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.create({
     *   data: {
     *     // ... data to create a ClinicSpecialtySchedule
     *   }
     * })
     * 
     */
    create<T extends ClinicSpecialtyScheduleCreateArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleCreateArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicSpecialtySchedules.
     * @param {ClinicSpecialtyScheduleCreateManyArgs} args - Arguments to create many ClinicSpecialtySchedules.
     * @example
     * // Create many ClinicSpecialtySchedules
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicSpecialtyScheduleCreateManyArgs>(args?: SelectSubset<T, ClinicSpecialtyScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicSpecialtySchedules and returns the data saved in the database.
     * @param {ClinicSpecialtyScheduleCreateManyAndReturnArgs} args - Arguments to create many ClinicSpecialtySchedules.
     * @example
     * // Create many ClinicSpecialtySchedules
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicSpecialtySchedules and only return the `id`
     * const clinicSpecialtyScheduleWithIdOnly = await prisma.clinicSpecialtySchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicSpecialtyScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicSpecialtyScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicSpecialtySchedule.
     * @param {ClinicSpecialtyScheduleDeleteArgs} args - Arguments to delete one ClinicSpecialtySchedule.
     * @example
     * // Delete one ClinicSpecialtySchedule
     * const ClinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.delete({
     *   where: {
     *     // ... filter to delete one ClinicSpecialtySchedule
     *   }
     * })
     * 
     */
    delete<T extends ClinicSpecialtyScheduleDeleteArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleDeleteArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicSpecialtySchedule.
     * @param {ClinicSpecialtyScheduleUpdateArgs} args - Arguments to update one ClinicSpecialtySchedule.
     * @example
     * // Update one ClinicSpecialtySchedule
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicSpecialtyScheduleUpdateArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleUpdateArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicSpecialtySchedules.
     * @param {ClinicSpecialtyScheduleDeleteManyArgs} args - Arguments to filter ClinicSpecialtySchedules to delete.
     * @example
     * // Delete a few ClinicSpecialtySchedules
     * const { count } = await prisma.clinicSpecialtySchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicSpecialtyScheduleDeleteManyArgs>(args?: SelectSubset<T, ClinicSpecialtyScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicSpecialtySchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicSpecialtySchedules
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicSpecialtyScheduleUpdateManyArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicSpecialtySchedules and returns the data updated in the database.
     * @param {ClinicSpecialtyScheduleUpdateManyAndReturnArgs} args - Arguments to update many ClinicSpecialtySchedules.
     * @example
     * // Update many ClinicSpecialtySchedules
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicSpecialtySchedules and only return the `id`
     * const clinicSpecialtyScheduleWithIdOnly = await prisma.clinicSpecialtySchedule.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClinicSpecialtyScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicSpecialtySchedule.
     * @param {ClinicSpecialtyScheduleUpsertArgs} args - Arguments to update or create a ClinicSpecialtySchedule.
     * @example
     * // Update or create a ClinicSpecialtySchedule
     * const clinicSpecialtySchedule = await prisma.clinicSpecialtySchedule.upsert({
     *   create: {
     *     // ... data to create a ClinicSpecialtySchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicSpecialtySchedule we want to update
     *   }
     * })
     */
    upsert<T extends ClinicSpecialtyScheduleUpsertArgs>(args: SelectSubset<T, ClinicSpecialtyScheduleUpsertArgs<ExtArgs>>): Prisma__ClinicSpecialtyScheduleClient<$Result.GetResult<Prisma.$ClinicSpecialtySchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicSpecialtySchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleCountArgs} args - Arguments to filter ClinicSpecialtySchedules to count.
     * @example
     * // Count the number of ClinicSpecialtySchedules
     * const count = await prisma.clinicSpecialtySchedule.count({
     *   where: {
     *     // ... the filter for the ClinicSpecialtySchedules we want to count
     *   }
     * })
    **/
    count<T extends ClinicSpecialtyScheduleCountArgs>(
      args?: Subset<T, ClinicSpecialtyScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicSpecialtyScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicSpecialtySchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClinicSpecialtyScheduleAggregateArgs>(args: Subset<T, ClinicSpecialtyScheduleAggregateArgs>): Prisma.PrismaPromise<GetClinicSpecialtyScheduleAggregateType<T>>

    /**
     * Group by ClinicSpecialtySchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicSpecialtyScheduleGroupByArgs} args - Group by arguments.
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
      T extends ClinicSpecialtyScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicSpecialtyScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ClinicSpecialtyScheduleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClinicSpecialtyScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicSpecialtyScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicSpecialtySchedule model
   */
  readonly fields: ClinicSpecialtyScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicSpecialtySchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicSpecialtyScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    specialty<T extends SpecialtyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpecialtyDefaultArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinicSpecialty<T extends ClinicSpecialtyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicSpecialtyDefaultArgs<ExtArgs>>): Prisma__ClinicSpecialtyClient<$Result.GetResult<Prisma.$ClinicSpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClinicSpecialtySchedule model
   */
  interface ClinicSpecialtyScheduleFieldRefs {
    readonly id: FieldRef<"ClinicSpecialtySchedule", 'String'>
    readonly clinicId: FieldRef<"ClinicSpecialtySchedule", 'String'>
    readonly specialtyId: FieldRef<"ClinicSpecialtySchedule", 'String'>
    readonly dayOfWeek: FieldRef<"ClinicSpecialtySchedule", 'Int'>
    readonly isActive: FieldRef<"ClinicSpecialtySchedule", 'Boolean'>
    readonly startTime: FieldRef<"ClinicSpecialtySchedule", 'String'>
    readonly endTime: FieldRef<"ClinicSpecialtySchedule", 'String'>
    readonly slotDurationMinutes: FieldRef<"ClinicSpecialtySchedule", 'Int'>
    readonly capacity: FieldRef<"ClinicSpecialtySchedule", 'Int'>
    readonly createdAt: FieldRef<"ClinicSpecialtySchedule", 'DateTime'>
    readonly updatedAt: FieldRef<"ClinicSpecialtySchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicSpecialtySchedule findUnique
   */
  export type ClinicSpecialtyScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialtySchedule to fetch.
     */
    where: ClinicSpecialtyScheduleWhereUniqueInput
  }

  /**
   * ClinicSpecialtySchedule findUniqueOrThrow
   */
  export type ClinicSpecialtyScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialtySchedule to fetch.
     */
    where: ClinicSpecialtyScheduleWhereUniqueInput
  }

  /**
   * ClinicSpecialtySchedule findFirst
   */
  export type ClinicSpecialtyScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialtySchedule to fetch.
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialtySchedules to fetch.
     */
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicSpecialtySchedules.
     */
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialtySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialtySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSpecialtySchedules.
     */
    distinct?: ClinicSpecialtyScheduleScalarFieldEnum | ClinicSpecialtyScheduleScalarFieldEnum[]
  }

  /**
   * ClinicSpecialtySchedule findFirstOrThrow
   */
  export type ClinicSpecialtyScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialtySchedule to fetch.
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialtySchedules to fetch.
     */
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicSpecialtySchedules.
     */
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialtySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialtySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSpecialtySchedules.
     */
    distinct?: ClinicSpecialtyScheduleScalarFieldEnum | ClinicSpecialtyScheduleScalarFieldEnum[]
  }

  /**
   * ClinicSpecialtySchedule findMany
   */
  export type ClinicSpecialtyScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ClinicSpecialtySchedules to fetch.
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicSpecialtySchedules to fetch.
     */
    orderBy?: ClinicSpecialtyScheduleOrderByWithRelationInput | ClinicSpecialtyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicSpecialtySchedules.
     */
    cursor?: ClinicSpecialtyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicSpecialtySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicSpecialtySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicSpecialtySchedules.
     */
    distinct?: ClinicSpecialtyScheduleScalarFieldEnum | ClinicSpecialtyScheduleScalarFieldEnum[]
  }

  /**
   * ClinicSpecialtySchedule create
   */
  export type ClinicSpecialtyScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicSpecialtySchedule.
     */
    data: XOR<ClinicSpecialtyScheduleCreateInput, ClinicSpecialtyScheduleUncheckedCreateInput>
  }

  /**
   * ClinicSpecialtySchedule createMany
   */
  export type ClinicSpecialtyScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicSpecialtySchedules.
     */
    data: ClinicSpecialtyScheduleCreateManyInput | ClinicSpecialtyScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicSpecialtySchedule createManyAndReturn
   */
  export type ClinicSpecialtyScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicSpecialtySchedules.
     */
    data: ClinicSpecialtyScheduleCreateManyInput | ClinicSpecialtyScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicSpecialtySchedule update
   */
  export type ClinicSpecialtyScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicSpecialtySchedule.
     */
    data: XOR<ClinicSpecialtyScheduleUpdateInput, ClinicSpecialtyScheduleUncheckedUpdateInput>
    /**
     * Choose, which ClinicSpecialtySchedule to update.
     */
    where: ClinicSpecialtyScheduleWhereUniqueInput
  }

  /**
   * ClinicSpecialtySchedule updateMany
   */
  export type ClinicSpecialtyScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicSpecialtySchedules.
     */
    data: XOR<ClinicSpecialtyScheduleUpdateManyMutationInput, ClinicSpecialtyScheduleUncheckedUpdateManyInput>
    /**
     * Filter which ClinicSpecialtySchedules to update
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * Limit how many ClinicSpecialtySchedules to update.
     */
    limit?: number
  }

  /**
   * ClinicSpecialtySchedule updateManyAndReturn
   */
  export type ClinicSpecialtyScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * The data used to update ClinicSpecialtySchedules.
     */
    data: XOR<ClinicSpecialtyScheduleUpdateManyMutationInput, ClinicSpecialtyScheduleUncheckedUpdateManyInput>
    /**
     * Filter which ClinicSpecialtySchedules to update
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * Limit how many ClinicSpecialtySchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicSpecialtySchedule upsert
   */
  export type ClinicSpecialtyScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicSpecialtySchedule to update in case it exists.
     */
    where: ClinicSpecialtyScheduleWhereUniqueInput
    /**
     * In case the ClinicSpecialtySchedule found by the `where` argument doesn't exist, create a new ClinicSpecialtySchedule with this data.
     */
    create: XOR<ClinicSpecialtyScheduleCreateInput, ClinicSpecialtyScheduleUncheckedCreateInput>
    /**
     * In case the ClinicSpecialtySchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicSpecialtyScheduleUpdateInput, ClinicSpecialtyScheduleUncheckedUpdateInput>
  }

  /**
   * ClinicSpecialtySchedule delete
   */
  export type ClinicSpecialtyScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
    /**
     * Filter which ClinicSpecialtySchedule to delete.
     */
    where: ClinicSpecialtyScheduleWhereUniqueInput
  }

  /**
   * ClinicSpecialtySchedule deleteMany
   */
  export type ClinicSpecialtyScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicSpecialtySchedules to delete
     */
    where?: ClinicSpecialtyScheduleWhereInput
    /**
     * Limit how many ClinicSpecialtySchedules to delete.
     */
    limit?: number
  }

  /**
   * ClinicSpecialtySchedule without action
   */
  export type ClinicSpecialtyScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicSpecialtySchedule
     */
    select?: ClinicSpecialtyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicSpecialtySchedule
     */
    omit?: ClinicSpecialtyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicSpecialtyScheduleInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorAvgAggregateOutputType = {
    experience: number | null
  }

  export type DoctorSumAggregateOutputType = {
    experience: number | null
  }

  export type DoctorMinAggregateOutputType = {
    id: string | null
    userId: string | null
    clinicId: string | null
    specialtyId: string | null
    name: string | null
    experience: number | null
    avatar: string | null
    bio: string | null
    isAvailable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    clinicId: string | null
    specialtyId: string | null
    name: string | null
    experience: number | null
    avatar: string | null
    bio: string | null
    isAvailable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorCountAggregateOutputType = {
    id: number
    userId: number
    clinicId: number
    specialtyId: number
    name: number
    qualifications: number
    experience: number
    avatar: number
    bio: number
    isAvailable: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoctorAvgAggregateInputType = {
    experience?: true
  }

  export type DoctorSumAggregateInputType = {
    experience?: true
  }

  export type DoctorMinAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    specialtyId?: true
    name?: true
    experience?: true
    avatar?: true
    bio?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorMaxAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    specialtyId?: true
    name?: true
    experience?: true
    avatar?: true
    bio?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorCountAggregateInputType = {
    id?: true
    userId?: true
    clinicId?: true
    specialtyId?: true
    name?: true
    qualifications?: true
    experience?: true
    avatar?: true
    bio?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _avg?: DoctorAvgAggregateInputType
    _sum?: DoctorSumAggregateInputType
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    id: string
    userId: string | null
    clinicId: string
    specialtyId: string
    name: string
    qualifications: JsonValue | null
    experience: number
    avatar: string | null
    bio: string | null
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    name?: boolean
    qualifications?: boolean
    experience?: boolean
    avatar?: boolean
    bio?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    name?: boolean
    qualifications?: boolean
    experience?: boolean
    avatar?: boolean
    bio?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    name?: boolean
    qualifications?: boolean
    experience?: boolean
    avatar?: boolean
    bio?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    id?: boolean
    userId?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    name?: boolean
    qualifications?: boolean
    experience?: boolean
    avatar?: boolean
    bio?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DoctorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "clinicId" | "specialtyId" | "name" | "qualifications" | "experience" | "avatar" | "bio" | "isAvailable" | "createdAt" | "updatedAt", ExtArgs["result"]["doctor"]>
  export type DoctorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    specialty?: boolean | SpecialtyDefaultArgs<ExtArgs>
  }

  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
      specialty: Prisma.$SpecialtyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      clinicId: string
      specialtyId: string
      name: string
      qualifications: Prisma.JsonValue | null
      experience: number
      avatar: string | null
      bio: string | null
      isAvailable: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors and returns the data updated in the database.
     * @param {DoctorUpdateManyAndReturnArgs} args - Arguments to update many Doctors.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.updateManyAndReturn({
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
    updateManyAndReturn<T extends DoctorUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
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
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    specialty<T extends SpecialtyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpecialtyDefaultArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Doctor model
   */
  interface DoctorFieldRefs {
    readonly id: FieldRef<"Doctor", 'String'>
    readonly userId: FieldRef<"Doctor", 'String'>
    readonly clinicId: FieldRef<"Doctor", 'String'>
    readonly specialtyId: FieldRef<"Doctor", 'String'>
    readonly name: FieldRef<"Doctor", 'String'>
    readonly qualifications: FieldRef<"Doctor", 'Json'>
    readonly experience: FieldRef<"Doctor", 'Int'>
    readonly avatar: FieldRef<"Doctor", 'String'>
    readonly bio: FieldRef<"Doctor", 'String'>
    readonly isAvailable: FieldRef<"Doctor", 'Boolean'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
    readonly updatedAt: FieldRef<"Doctor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
  }

  /**
   * Doctor updateManyAndReturn
   */
  export type DoctorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to delete.
     */
    limit?: number
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
  }


  /**
   * Model HealthPackage
   */

  export type AggregateHealthPackage = {
    _count: HealthPackageCountAggregateOutputType | null
    _avg: HealthPackageAvgAggregateOutputType | null
    _sum: HealthPackageSumAggregateOutputType | null
    _min: HealthPackageMinAggregateOutputType | null
    _max: HealthPackageMaxAggregateOutputType | null
  }

  export type HealthPackageAvgAggregateOutputType = {
    price: Decimal | null
    promotionalPrice: Decimal | null
  }

  export type HealthPackageSumAggregateOutputType = {
    price: Decimal | null
    promotionalPrice: Decimal | null
  }

  export type HealthPackageMinAggregateOutputType = {
    id: string | null
    name: string | null
    shortDescription: string | null
    description: string | null
    price: Decimal | null
    promotionalPrice: Decimal | null
    currency: string | null
    category: string | null
    targetGender: string | null
    targetAgeRange: string | null
    preparationNotes: string | null
    isPopular: boolean | null
    isActive: boolean | null
    imageUrl: string | null
    clinicId: string | null
    specialtyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HealthPackageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    shortDescription: string | null
    description: string | null
    price: Decimal | null
    promotionalPrice: Decimal | null
    currency: string | null
    category: string | null
    targetGender: string | null
    targetAgeRange: string | null
    preparationNotes: string | null
    isPopular: boolean | null
    isActive: boolean | null
    imageUrl: string | null
    clinicId: string | null
    specialtyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HealthPackageCountAggregateOutputType = {
    id: number
    name: number
    shortDescription: number
    description: number
    price: number
    promotionalPrice: number
    currency: number
    category: number
    targetGender: number
    targetAgeRange: number
    preparationNotes: number
    isPopular: number
    isActive: number
    features: number
    imageUrl: number
    clinicId: number
    specialtyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HealthPackageAvgAggregateInputType = {
    price?: true
    promotionalPrice?: true
  }

  export type HealthPackageSumAggregateInputType = {
    price?: true
    promotionalPrice?: true
  }

  export type HealthPackageMinAggregateInputType = {
    id?: true
    name?: true
    shortDescription?: true
    description?: true
    price?: true
    promotionalPrice?: true
    currency?: true
    category?: true
    targetGender?: true
    targetAgeRange?: true
    preparationNotes?: true
    isPopular?: true
    isActive?: true
    imageUrl?: true
    clinicId?: true
    specialtyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HealthPackageMaxAggregateInputType = {
    id?: true
    name?: true
    shortDescription?: true
    description?: true
    price?: true
    promotionalPrice?: true
    currency?: true
    category?: true
    targetGender?: true
    targetAgeRange?: true
    preparationNotes?: true
    isPopular?: true
    isActive?: true
    imageUrl?: true
    clinicId?: true
    specialtyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HealthPackageCountAggregateInputType = {
    id?: true
    name?: true
    shortDescription?: true
    description?: true
    price?: true
    promotionalPrice?: true
    currency?: true
    category?: true
    targetGender?: true
    targetAgeRange?: true
    preparationNotes?: true
    isPopular?: true
    isActive?: true
    features?: true
    imageUrl?: true
    clinicId?: true
    specialtyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HealthPackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthPackage to aggregate.
     */
    where?: HealthPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthPackages to fetch.
     */
    orderBy?: HealthPackageOrderByWithRelationInput | HealthPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HealthPackages
    **/
    _count?: true | HealthPackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HealthPackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HealthPackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthPackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthPackageMaxAggregateInputType
  }

  export type GetHealthPackageAggregateType<T extends HealthPackageAggregateArgs> = {
        [P in keyof T & keyof AggregateHealthPackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealthPackage[P]>
      : GetScalarType<T[P], AggregateHealthPackage[P]>
  }




  export type HealthPackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthPackageWhereInput
    orderBy?: HealthPackageOrderByWithAggregationInput | HealthPackageOrderByWithAggregationInput[]
    by: HealthPackageScalarFieldEnum[] | HealthPackageScalarFieldEnum
    having?: HealthPackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthPackageCountAggregateInputType | true
    _avg?: HealthPackageAvgAggregateInputType
    _sum?: HealthPackageSumAggregateInputType
    _min?: HealthPackageMinAggregateInputType
    _max?: HealthPackageMaxAggregateInputType
  }

  export type HealthPackageGroupByOutputType = {
    id: string
    name: string
    shortDescription: string | null
    description: string
    price: Decimal
    promotionalPrice: Decimal | null
    currency: string
    category: string
    targetGender: string | null
    targetAgeRange: string | null
    preparationNotes: string | null
    isPopular: boolean
    isActive: boolean
    features: string[]
    imageUrl: string | null
    clinicId: string | null
    specialtyId: string | null
    createdAt: Date
    updatedAt: Date
    _count: HealthPackageCountAggregateOutputType | null
    _avg: HealthPackageAvgAggregateOutputType | null
    _sum: HealthPackageSumAggregateOutputType | null
    _min: HealthPackageMinAggregateOutputType | null
    _max: HealthPackageMaxAggregateOutputType | null
  }

  type GetHealthPackageGroupByPayload<T extends HealthPackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthPackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthPackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthPackageGroupByOutputType[P]>
            : GetScalarType<T[P], HealthPackageGroupByOutputType[P]>
        }
      >
    >


  export type HealthPackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortDescription?: boolean
    description?: boolean
    price?: boolean
    promotionalPrice?: boolean
    currency?: boolean
    category?: boolean
    targetGender?: boolean
    targetAgeRange?: boolean
    preparationNotes?: boolean
    isPopular?: boolean
    isActive?: boolean
    features?: boolean
    imageUrl?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | HealthPackage$clinicArgs<ExtArgs>
    specialty?: boolean | HealthPackage$specialtyArgs<ExtArgs>
    availabilities?: boolean | HealthPackage$availabilitiesArgs<ExtArgs>
    _count?: boolean | HealthPackageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthPackage"]>

  export type HealthPackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortDescription?: boolean
    description?: boolean
    price?: boolean
    promotionalPrice?: boolean
    currency?: boolean
    category?: boolean
    targetGender?: boolean
    targetAgeRange?: boolean
    preparationNotes?: boolean
    isPopular?: boolean
    isActive?: boolean
    features?: boolean
    imageUrl?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | HealthPackage$clinicArgs<ExtArgs>
    specialty?: boolean | HealthPackage$specialtyArgs<ExtArgs>
  }, ExtArgs["result"]["healthPackage"]>

  export type HealthPackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortDescription?: boolean
    description?: boolean
    price?: boolean
    promotionalPrice?: boolean
    currency?: boolean
    category?: boolean
    targetGender?: boolean
    targetAgeRange?: boolean
    preparationNotes?: boolean
    isPopular?: boolean
    isActive?: boolean
    features?: boolean
    imageUrl?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | HealthPackage$clinicArgs<ExtArgs>
    specialty?: boolean | HealthPackage$specialtyArgs<ExtArgs>
  }, ExtArgs["result"]["healthPackage"]>

  export type HealthPackageSelectScalar = {
    id?: boolean
    name?: boolean
    shortDescription?: boolean
    description?: boolean
    price?: boolean
    promotionalPrice?: boolean
    currency?: boolean
    category?: boolean
    targetGender?: boolean
    targetAgeRange?: boolean
    preparationNotes?: boolean
    isPopular?: boolean
    isActive?: boolean
    features?: boolean
    imageUrl?: boolean
    clinicId?: boolean
    specialtyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HealthPackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "shortDescription" | "description" | "price" | "promotionalPrice" | "currency" | "category" | "targetGender" | "targetAgeRange" | "preparationNotes" | "isPopular" | "isActive" | "features" | "imageUrl" | "clinicId" | "specialtyId" | "createdAt" | "updatedAt", ExtArgs["result"]["healthPackage"]>
  export type HealthPackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | HealthPackage$clinicArgs<ExtArgs>
    specialty?: boolean | HealthPackage$specialtyArgs<ExtArgs>
    availabilities?: boolean | HealthPackage$availabilitiesArgs<ExtArgs>
    _count?: boolean | HealthPackageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HealthPackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | HealthPackage$clinicArgs<ExtArgs>
    specialty?: boolean | HealthPackage$specialtyArgs<ExtArgs>
  }
  export type HealthPackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | HealthPackage$clinicArgs<ExtArgs>
    specialty?: boolean | HealthPackage$specialtyArgs<ExtArgs>
  }

  export type $HealthPackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HealthPackage"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs> | null
      specialty: Prisma.$SpecialtyPayload<ExtArgs> | null
      availabilities: Prisma.$PackageAvailabilityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      shortDescription: string | null
      description: string
      price: Prisma.Decimal
      promotionalPrice: Prisma.Decimal | null
      currency: string
      category: string
      targetGender: string | null
      targetAgeRange: string | null
      preparationNotes: string | null
      isPopular: boolean
      isActive: boolean
      features: string[]
      imageUrl: string | null
      clinicId: string | null
      specialtyId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["healthPackage"]>
    composites: {}
  }

  type HealthPackageGetPayload<S extends boolean | null | undefined | HealthPackageDefaultArgs> = $Result.GetResult<Prisma.$HealthPackagePayload, S>

  type HealthPackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthPackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthPackageCountAggregateInputType | true
    }

  export interface HealthPackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HealthPackage'], meta: { name: 'HealthPackage' } }
    /**
     * Find zero or one HealthPackage that matches the filter.
     * @param {HealthPackageFindUniqueArgs} args - Arguments to find a HealthPackage
     * @example
     * // Get one HealthPackage
     * const healthPackage = await prisma.healthPackage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthPackageFindUniqueArgs>(args: SelectSubset<T, HealthPackageFindUniqueArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HealthPackage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthPackageFindUniqueOrThrowArgs} args - Arguments to find a HealthPackage
     * @example
     * // Get one HealthPackage
     * const healthPackage = await prisma.healthPackage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthPackageFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthPackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthPackage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageFindFirstArgs} args - Arguments to find a HealthPackage
     * @example
     * // Get one HealthPackage
     * const healthPackage = await prisma.healthPackage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthPackageFindFirstArgs>(args?: SelectSubset<T, HealthPackageFindFirstArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthPackage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageFindFirstOrThrowArgs} args - Arguments to find a HealthPackage
     * @example
     * // Get one HealthPackage
     * const healthPackage = await prisma.healthPackage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthPackageFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthPackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HealthPackages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HealthPackages
     * const healthPackages = await prisma.healthPackage.findMany()
     * 
     * // Get first 10 HealthPackages
     * const healthPackages = await prisma.healthPackage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthPackageWithIdOnly = await prisma.healthPackage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthPackageFindManyArgs>(args?: SelectSubset<T, HealthPackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HealthPackage.
     * @param {HealthPackageCreateArgs} args - Arguments to create a HealthPackage.
     * @example
     * // Create one HealthPackage
     * const HealthPackage = await prisma.healthPackage.create({
     *   data: {
     *     // ... data to create a HealthPackage
     *   }
     * })
     * 
     */
    create<T extends HealthPackageCreateArgs>(args: SelectSubset<T, HealthPackageCreateArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HealthPackages.
     * @param {HealthPackageCreateManyArgs} args - Arguments to create many HealthPackages.
     * @example
     * // Create many HealthPackages
     * const healthPackage = await prisma.healthPackage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthPackageCreateManyArgs>(args?: SelectSubset<T, HealthPackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HealthPackages and returns the data saved in the database.
     * @param {HealthPackageCreateManyAndReturnArgs} args - Arguments to create many HealthPackages.
     * @example
     * // Create many HealthPackages
     * const healthPackage = await prisma.healthPackage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HealthPackages and only return the `id`
     * const healthPackageWithIdOnly = await prisma.healthPackage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthPackageCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthPackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HealthPackage.
     * @param {HealthPackageDeleteArgs} args - Arguments to delete one HealthPackage.
     * @example
     * // Delete one HealthPackage
     * const HealthPackage = await prisma.healthPackage.delete({
     *   where: {
     *     // ... filter to delete one HealthPackage
     *   }
     * })
     * 
     */
    delete<T extends HealthPackageDeleteArgs>(args: SelectSubset<T, HealthPackageDeleteArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HealthPackage.
     * @param {HealthPackageUpdateArgs} args - Arguments to update one HealthPackage.
     * @example
     * // Update one HealthPackage
     * const healthPackage = await prisma.healthPackage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthPackageUpdateArgs>(args: SelectSubset<T, HealthPackageUpdateArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HealthPackages.
     * @param {HealthPackageDeleteManyArgs} args - Arguments to filter HealthPackages to delete.
     * @example
     * // Delete a few HealthPackages
     * const { count } = await prisma.healthPackage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthPackageDeleteManyArgs>(args?: SelectSubset<T, HealthPackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HealthPackages
     * const healthPackage = await prisma.healthPackage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthPackageUpdateManyArgs>(args: SelectSubset<T, HealthPackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthPackages and returns the data updated in the database.
     * @param {HealthPackageUpdateManyAndReturnArgs} args - Arguments to update many HealthPackages.
     * @example
     * // Update many HealthPackages
     * const healthPackage = await prisma.healthPackage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HealthPackages and only return the `id`
     * const healthPackageWithIdOnly = await prisma.healthPackage.updateManyAndReturn({
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
    updateManyAndReturn<T extends HealthPackageUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthPackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HealthPackage.
     * @param {HealthPackageUpsertArgs} args - Arguments to update or create a HealthPackage.
     * @example
     * // Update or create a HealthPackage
     * const healthPackage = await prisma.healthPackage.upsert({
     *   create: {
     *     // ... data to create a HealthPackage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HealthPackage we want to update
     *   }
     * })
     */
    upsert<T extends HealthPackageUpsertArgs>(args: SelectSubset<T, HealthPackageUpsertArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HealthPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageCountArgs} args - Arguments to filter HealthPackages to count.
     * @example
     * // Count the number of HealthPackages
     * const count = await prisma.healthPackage.count({
     *   where: {
     *     // ... the filter for the HealthPackages we want to count
     *   }
     * })
    **/
    count<T extends HealthPackageCountArgs>(
      args?: Subset<T, HealthPackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthPackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HealthPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HealthPackageAggregateArgs>(args: Subset<T, HealthPackageAggregateArgs>): Prisma.PrismaPromise<GetHealthPackageAggregateType<T>>

    /**
     * Group by HealthPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthPackageGroupByArgs} args - Group by arguments.
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
      T extends HealthPackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthPackageGroupByArgs['orderBy'] }
        : { orderBy?: HealthPackageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HealthPackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HealthPackage model
   */
  readonly fields: HealthPackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HealthPackage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthPackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends HealthPackage$clinicArgs<ExtArgs> = {}>(args?: Subset<T, HealthPackage$clinicArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    specialty<T extends HealthPackage$specialtyArgs<ExtArgs> = {}>(args?: Subset<T, HealthPackage$specialtyArgs<ExtArgs>>): Prisma__SpecialtyClient<$Result.GetResult<Prisma.$SpecialtyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    availabilities<T extends HealthPackage$availabilitiesArgs<ExtArgs> = {}>(args?: Subset<T, HealthPackage$availabilitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the HealthPackage model
   */
  interface HealthPackageFieldRefs {
    readonly id: FieldRef<"HealthPackage", 'String'>
    readonly name: FieldRef<"HealthPackage", 'String'>
    readonly shortDescription: FieldRef<"HealthPackage", 'String'>
    readonly description: FieldRef<"HealthPackage", 'String'>
    readonly price: FieldRef<"HealthPackage", 'Decimal'>
    readonly promotionalPrice: FieldRef<"HealthPackage", 'Decimal'>
    readonly currency: FieldRef<"HealthPackage", 'String'>
    readonly category: FieldRef<"HealthPackage", 'String'>
    readonly targetGender: FieldRef<"HealthPackage", 'String'>
    readonly targetAgeRange: FieldRef<"HealthPackage", 'String'>
    readonly preparationNotes: FieldRef<"HealthPackage", 'String'>
    readonly isPopular: FieldRef<"HealthPackage", 'Boolean'>
    readonly isActive: FieldRef<"HealthPackage", 'Boolean'>
    readonly features: FieldRef<"HealthPackage", 'String[]'>
    readonly imageUrl: FieldRef<"HealthPackage", 'String'>
    readonly clinicId: FieldRef<"HealthPackage", 'String'>
    readonly specialtyId: FieldRef<"HealthPackage", 'String'>
    readonly createdAt: FieldRef<"HealthPackage", 'DateTime'>
    readonly updatedAt: FieldRef<"HealthPackage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HealthPackage findUnique
   */
  export type HealthPackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * Filter, which HealthPackage to fetch.
     */
    where: HealthPackageWhereUniqueInput
  }

  /**
   * HealthPackage findUniqueOrThrow
   */
  export type HealthPackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * Filter, which HealthPackage to fetch.
     */
    where: HealthPackageWhereUniqueInput
  }

  /**
   * HealthPackage findFirst
   */
  export type HealthPackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * Filter, which HealthPackage to fetch.
     */
    where?: HealthPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthPackages to fetch.
     */
    orderBy?: HealthPackageOrderByWithRelationInput | HealthPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthPackages.
     */
    cursor?: HealthPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthPackages.
     */
    distinct?: HealthPackageScalarFieldEnum | HealthPackageScalarFieldEnum[]
  }

  /**
   * HealthPackage findFirstOrThrow
   */
  export type HealthPackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * Filter, which HealthPackage to fetch.
     */
    where?: HealthPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthPackages to fetch.
     */
    orderBy?: HealthPackageOrderByWithRelationInput | HealthPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthPackages.
     */
    cursor?: HealthPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthPackages.
     */
    distinct?: HealthPackageScalarFieldEnum | HealthPackageScalarFieldEnum[]
  }

  /**
   * HealthPackage findMany
   */
  export type HealthPackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * Filter, which HealthPackages to fetch.
     */
    where?: HealthPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthPackages to fetch.
     */
    orderBy?: HealthPackageOrderByWithRelationInput | HealthPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HealthPackages.
     */
    cursor?: HealthPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthPackages.
     */
    distinct?: HealthPackageScalarFieldEnum | HealthPackageScalarFieldEnum[]
  }

  /**
   * HealthPackage create
   */
  export type HealthPackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * The data needed to create a HealthPackage.
     */
    data: XOR<HealthPackageCreateInput, HealthPackageUncheckedCreateInput>
  }

  /**
   * HealthPackage createMany
   */
  export type HealthPackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HealthPackages.
     */
    data: HealthPackageCreateManyInput | HealthPackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HealthPackage createManyAndReturn
   */
  export type HealthPackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * The data used to create many HealthPackages.
     */
    data: HealthPackageCreateManyInput | HealthPackageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthPackage update
   */
  export type HealthPackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * The data needed to update a HealthPackage.
     */
    data: XOR<HealthPackageUpdateInput, HealthPackageUncheckedUpdateInput>
    /**
     * Choose, which HealthPackage to update.
     */
    where: HealthPackageWhereUniqueInput
  }

  /**
   * HealthPackage updateMany
   */
  export type HealthPackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HealthPackages.
     */
    data: XOR<HealthPackageUpdateManyMutationInput, HealthPackageUncheckedUpdateManyInput>
    /**
     * Filter which HealthPackages to update
     */
    where?: HealthPackageWhereInput
    /**
     * Limit how many HealthPackages to update.
     */
    limit?: number
  }

  /**
   * HealthPackage updateManyAndReturn
   */
  export type HealthPackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * The data used to update HealthPackages.
     */
    data: XOR<HealthPackageUpdateManyMutationInput, HealthPackageUncheckedUpdateManyInput>
    /**
     * Filter which HealthPackages to update
     */
    where?: HealthPackageWhereInput
    /**
     * Limit how many HealthPackages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthPackage upsert
   */
  export type HealthPackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * The filter to search for the HealthPackage to update in case it exists.
     */
    where: HealthPackageWhereUniqueInput
    /**
     * In case the HealthPackage found by the `where` argument doesn't exist, create a new HealthPackage with this data.
     */
    create: XOR<HealthPackageCreateInput, HealthPackageUncheckedCreateInput>
    /**
     * In case the HealthPackage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthPackageUpdateInput, HealthPackageUncheckedUpdateInput>
  }

  /**
   * HealthPackage delete
   */
  export type HealthPackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
    /**
     * Filter which HealthPackage to delete.
     */
    where: HealthPackageWhereUniqueInput
  }

  /**
   * HealthPackage deleteMany
   */
  export type HealthPackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthPackages to delete
     */
    where?: HealthPackageWhereInput
    /**
     * Limit how many HealthPackages to delete.
     */
    limit?: number
  }

  /**
   * HealthPackage.clinic
   */
  export type HealthPackage$clinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    where?: ClinicWhereInput
  }

  /**
   * HealthPackage.specialty
   */
  export type HealthPackage$specialtyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Specialty
     */
    select?: SpecialtySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Specialty
     */
    omit?: SpecialtyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialtyInclude<ExtArgs> | null
    where?: SpecialtyWhereInput
  }

  /**
   * HealthPackage.availabilities
   */
  export type HealthPackage$availabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    where?: PackageAvailabilityWhereInput
    orderBy?: PackageAvailabilityOrderByWithRelationInput | PackageAvailabilityOrderByWithRelationInput[]
    cursor?: PackageAvailabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageAvailabilityScalarFieldEnum | PackageAvailabilityScalarFieldEnum[]
  }

  /**
   * HealthPackage without action
   */
  export type HealthPackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthPackage
     */
    select?: HealthPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthPackage
     */
    omit?: HealthPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthPackageInclude<ExtArgs> | null
  }


  /**
   * Model PackageAvailability
   */

  export type AggregatePackageAvailability = {
    _count: PackageAvailabilityCountAggregateOutputType | null
    _avg: PackageAvailabilityAvgAggregateOutputType | null
    _sum: PackageAvailabilitySumAggregateOutputType | null
    _min: PackageAvailabilityMinAggregateOutputType | null
    _max: PackageAvailabilityMaxAggregateOutputType | null
  }

  export type PackageAvailabilityAvgAggregateOutputType = {
    dayOfWeek: number | null
    slotDurationMinutes: number | null
    capacity: number | null
  }

  export type PackageAvailabilitySumAggregateOutputType = {
    dayOfWeek: number | null
    slotDurationMinutes: number | null
    capacity: number | null
  }

  export type PackageAvailabilityMinAggregateOutputType = {
    id: string | null
    packageId: string | null
    dayOfWeek: number | null
    isActive: boolean | null
    startTime: string | null
    endTime: string | null
    slotDurationMinutes: number | null
    capacity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PackageAvailabilityMaxAggregateOutputType = {
    id: string | null
    packageId: string | null
    dayOfWeek: number | null
    isActive: boolean | null
    startTime: string | null
    endTime: string | null
    slotDurationMinutes: number | null
    capacity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PackageAvailabilityCountAggregateOutputType = {
    id: number
    packageId: number
    dayOfWeek: number
    isActive: number
    startTime: number
    endTime: number
    slotDurationMinutes: number
    capacity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PackageAvailabilityAvgAggregateInputType = {
    dayOfWeek?: true
    slotDurationMinutes?: true
    capacity?: true
  }

  export type PackageAvailabilitySumAggregateInputType = {
    dayOfWeek?: true
    slotDurationMinutes?: true
    capacity?: true
  }

  export type PackageAvailabilityMinAggregateInputType = {
    id?: true
    packageId?: true
    dayOfWeek?: true
    isActive?: true
    startTime?: true
    endTime?: true
    slotDurationMinutes?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PackageAvailabilityMaxAggregateInputType = {
    id?: true
    packageId?: true
    dayOfWeek?: true
    isActive?: true
    startTime?: true
    endTime?: true
    slotDurationMinutes?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PackageAvailabilityCountAggregateInputType = {
    id?: true
    packageId?: true
    dayOfWeek?: true
    isActive?: true
    startTime?: true
    endTime?: true
    slotDurationMinutes?: true
    capacity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PackageAvailabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAvailability to aggregate.
     */
    where?: PackageAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAvailabilities to fetch.
     */
    orderBy?: PackageAvailabilityOrderByWithRelationInput | PackageAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PackageAvailabilities
    **/
    _count?: true | PackageAvailabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PackageAvailabilityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PackageAvailabilitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageAvailabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageAvailabilityMaxAggregateInputType
  }

  export type GetPackageAvailabilityAggregateType<T extends PackageAvailabilityAggregateArgs> = {
        [P in keyof T & keyof AggregatePackageAvailability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackageAvailability[P]>
      : GetScalarType<T[P], AggregatePackageAvailability[P]>
  }




  export type PackageAvailabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageAvailabilityWhereInput
    orderBy?: PackageAvailabilityOrderByWithAggregationInput | PackageAvailabilityOrderByWithAggregationInput[]
    by: PackageAvailabilityScalarFieldEnum[] | PackageAvailabilityScalarFieldEnum
    having?: PackageAvailabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageAvailabilityCountAggregateInputType | true
    _avg?: PackageAvailabilityAvgAggregateInputType
    _sum?: PackageAvailabilitySumAggregateInputType
    _min?: PackageAvailabilityMinAggregateInputType
    _max?: PackageAvailabilityMaxAggregateInputType
  }

  export type PackageAvailabilityGroupByOutputType = {
    id: string
    packageId: string
    dayOfWeek: number
    isActive: boolean
    startTime: string
    endTime: string
    slotDurationMinutes: number
    capacity: number
    createdAt: Date
    updatedAt: Date
    _count: PackageAvailabilityCountAggregateOutputType | null
    _avg: PackageAvailabilityAvgAggregateOutputType | null
    _sum: PackageAvailabilitySumAggregateOutputType | null
    _min: PackageAvailabilityMinAggregateOutputType | null
    _max: PackageAvailabilityMaxAggregateOutputType | null
  }

  type GetPackageAvailabilityGroupByPayload<T extends PackageAvailabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageAvailabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageAvailabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageAvailabilityGroupByOutputType[P]>
            : GetScalarType<T[P], PackageAvailabilityGroupByOutputType[P]>
        }
      >
    >


  export type PackageAvailabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthPackage?: boolean | HealthPackageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAvailability"]>

  export type PackageAvailabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthPackage?: boolean | HealthPackageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAvailability"]>

  export type PackageAvailabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthPackage?: boolean | HealthPackageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["packageAvailability"]>

  export type PackageAvailabilitySelectScalar = {
    id?: boolean
    packageId?: boolean
    dayOfWeek?: boolean
    isActive?: boolean
    startTime?: boolean
    endTime?: boolean
    slotDurationMinutes?: boolean
    capacity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PackageAvailabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "packageId" | "dayOfWeek" | "isActive" | "startTime" | "endTime" | "slotDurationMinutes" | "capacity" | "createdAt" | "updatedAt", ExtArgs["result"]["packageAvailability"]>
  export type PackageAvailabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthPackage?: boolean | HealthPackageDefaultArgs<ExtArgs>
  }
  export type PackageAvailabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthPackage?: boolean | HealthPackageDefaultArgs<ExtArgs>
  }
  export type PackageAvailabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthPackage?: boolean | HealthPackageDefaultArgs<ExtArgs>
  }

  export type $PackageAvailabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PackageAvailability"
    objects: {
      healthPackage: Prisma.$HealthPackagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      packageId: string
      dayOfWeek: number
      isActive: boolean
      startTime: string
      endTime: string
      slotDurationMinutes: number
      capacity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["packageAvailability"]>
    composites: {}
  }

  type PackageAvailabilityGetPayload<S extends boolean | null | undefined | PackageAvailabilityDefaultArgs> = $Result.GetResult<Prisma.$PackageAvailabilityPayload, S>

  type PackageAvailabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageAvailabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageAvailabilityCountAggregateInputType | true
    }

  export interface PackageAvailabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PackageAvailability'], meta: { name: 'PackageAvailability' } }
    /**
     * Find zero or one PackageAvailability that matches the filter.
     * @param {PackageAvailabilityFindUniqueArgs} args - Arguments to find a PackageAvailability
     * @example
     * // Get one PackageAvailability
     * const packageAvailability = await prisma.packageAvailability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageAvailabilityFindUniqueArgs>(args: SelectSubset<T, PackageAvailabilityFindUniqueArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PackageAvailability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageAvailabilityFindUniqueOrThrowArgs} args - Arguments to find a PackageAvailability
     * @example
     * // Get one PackageAvailability
     * const packageAvailability = await prisma.packageAvailability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageAvailabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageAvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PackageAvailability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityFindFirstArgs} args - Arguments to find a PackageAvailability
     * @example
     * // Get one PackageAvailability
     * const packageAvailability = await prisma.packageAvailability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageAvailabilityFindFirstArgs>(args?: SelectSubset<T, PackageAvailabilityFindFirstArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PackageAvailability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityFindFirstOrThrowArgs} args - Arguments to find a PackageAvailability
     * @example
     * // Get one PackageAvailability
     * const packageAvailability = await prisma.packageAvailability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageAvailabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageAvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PackageAvailabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PackageAvailabilities
     * const packageAvailabilities = await prisma.packageAvailability.findMany()
     * 
     * // Get first 10 PackageAvailabilities
     * const packageAvailabilities = await prisma.packageAvailability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageAvailabilityWithIdOnly = await prisma.packageAvailability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageAvailabilityFindManyArgs>(args?: SelectSubset<T, PackageAvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PackageAvailability.
     * @param {PackageAvailabilityCreateArgs} args - Arguments to create a PackageAvailability.
     * @example
     * // Create one PackageAvailability
     * const PackageAvailability = await prisma.packageAvailability.create({
     *   data: {
     *     // ... data to create a PackageAvailability
     *   }
     * })
     * 
     */
    create<T extends PackageAvailabilityCreateArgs>(args: SelectSubset<T, PackageAvailabilityCreateArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PackageAvailabilities.
     * @param {PackageAvailabilityCreateManyArgs} args - Arguments to create many PackageAvailabilities.
     * @example
     * // Create many PackageAvailabilities
     * const packageAvailability = await prisma.packageAvailability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageAvailabilityCreateManyArgs>(args?: SelectSubset<T, PackageAvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PackageAvailabilities and returns the data saved in the database.
     * @param {PackageAvailabilityCreateManyAndReturnArgs} args - Arguments to create many PackageAvailabilities.
     * @example
     * // Create many PackageAvailabilities
     * const packageAvailability = await prisma.packageAvailability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PackageAvailabilities and only return the `id`
     * const packageAvailabilityWithIdOnly = await prisma.packageAvailability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageAvailabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageAvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PackageAvailability.
     * @param {PackageAvailabilityDeleteArgs} args - Arguments to delete one PackageAvailability.
     * @example
     * // Delete one PackageAvailability
     * const PackageAvailability = await prisma.packageAvailability.delete({
     *   where: {
     *     // ... filter to delete one PackageAvailability
     *   }
     * })
     * 
     */
    delete<T extends PackageAvailabilityDeleteArgs>(args: SelectSubset<T, PackageAvailabilityDeleteArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PackageAvailability.
     * @param {PackageAvailabilityUpdateArgs} args - Arguments to update one PackageAvailability.
     * @example
     * // Update one PackageAvailability
     * const packageAvailability = await prisma.packageAvailability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageAvailabilityUpdateArgs>(args: SelectSubset<T, PackageAvailabilityUpdateArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PackageAvailabilities.
     * @param {PackageAvailabilityDeleteManyArgs} args - Arguments to filter PackageAvailabilities to delete.
     * @example
     * // Delete a few PackageAvailabilities
     * const { count } = await prisma.packageAvailability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageAvailabilityDeleteManyArgs>(args?: SelectSubset<T, PackageAvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PackageAvailabilities
     * const packageAvailability = await prisma.packageAvailability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageAvailabilityUpdateManyArgs>(args: SelectSubset<T, PackageAvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageAvailabilities and returns the data updated in the database.
     * @param {PackageAvailabilityUpdateManyAndReturnArgs} args - Arguments to update many PackageAvailabilities.
     * @example
     * // Update many PackageAvailabilities
     * const packageAvailability = await prisma.packageAvailability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PackageAvailabilities and only return the `id`
     * const packageAvailabilityWithIdOnly = await prisma.packageAvailability.updateManyAndReturn({
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
    updateManyAndReturn<T extends PackageAvailabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageAvailabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PackageAvailability.
     * @param {PackageAvailabilityUpsertArgs} args - Arguments to update or create a PackageAvailability.
     * @example
     * // Update or create a PackageAvailability
     * const packageAvailability = await prisma.packageAvailability.upsert({
     *   create: {
     *     // ... data to create a PackageAvailability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PackageAvailability we want to update
     *   }
     * })
     */
    upsert<T extends PackageAvailabilityUpsertArgs>(args: SelectSubset<T, PackageAvailabilityUpsertArgs<ExtArgs>>): Prisma__PackageAvailabilityClient<$Result.GetResult<Prisma.$PackageAvailabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PackageAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityCountArgs} args - Arguments to filter PackageAvailabilities to count.
     * @example
     * // Count the number of PackageAvailabilities
     * const count = await prisma.packageAvailability.count({
     *   where: {
     *     // ... the filter for the PackageAvailabilities we want to count
     *   }
     * })
    **/
    count<T extends PackageAvailabilityCountArgs>(
      args?: Subset<T, PackageAvailabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageAvailabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PackageAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PackageAvailabilityAggregateArgs>(args: Subset<T, PackageAvailabilityAggregateArgs>): Prisma.PrismaPromise<GetPackageAvailabilityAggregateType<T>>

    /**
     * Group by PackageAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAvailabilityGroupByArgs} args - Group by arguments.
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
      T extends PackageAvailabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageAvailabilityGroupByArgs['orderBy'] }
        : { orderBy?: PackageAvailabilityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PackageAvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PackageAvailability model
   */
  readonly fields: PackageAvailabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PackageAvailability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageAvailabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    healthPackage<T extends HealthPackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HealthPackageDefaultArgs<ExtArgs>>): Prisma__HealthPackageClient<$Result.GetResult<Prisma.$HealthPackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PackageAvailability model
   */
  interface PackageAvailabilityFieldRefs {
    readonly id: FieldRef<"PackageAvailability", 'String'>
    readonly packageId: FieldRef<"PackageAvailability", 'String'>
    readonly dayOfWeek: FieldRef<"PackageAvailability", 'Int'>
    readonly isActive: FieldRef<"PackageAvailability", 'Boolean'>
    readonly startTime: FieldRef<"PackageAvailability", 'String'>
    readonly endTime: FieldRef<"PackageAvailability", 'String'>
    readonly slotDurationMinutes: FieldRef<"PackageAvailability", 'Int'>
    readonly capacity: FieldRef<"PackageAvailability", 'Int'>
    readonly createdAt: FieldRef<"PackageAvailability", 'DateTime'>
    readonly updatedAt: FieldRef<"PackageAvailability", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PackageAvailability findUnique
   */
  export type PackageAvailabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which PackageAvailability to fetch.
     */
    where: PackageAvailabilityWhereUniqueInput
  }

  /**
   * PackageAvailability findUniqueOrThrow
   */
  export type PackageAvailabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which PackageAvailability to fetch.
     */
    where: PackageAvailabilityWhereUniqueInput
  }

  /**
   * PackageAvailability findFirst
   */
  export type PackageAvailabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which PackageAvailability to fetch.
     */
    where?: PackageAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAvailabilities to fetch.
     */
    orderBy?: PackageAvailabilityOrderByWithRelationInput | PackageAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageAvailabilities.
     */
    cursor?: PackageAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAvailabilities.
     */
    distinct?: PackageAvailabilityScalarFieldEnum | PackageAvailabilityScalarFieldEnum[]
  }

  /**
   * PackageAvailability findFirstOrThrow
   */
  export type PackageAvailabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which PackageAvailability to fetch.
     */
    where?: PackageAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAvailabilities to fetch.
     */
    orderBy?: PackageAvailabilityOrderByWithRelationInput | PackageAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageAvailabilities.
     */
    cursor?: PackageAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAvailabilities.
     */
    distinct?: PackageAvailabilityScalarFieldEnum | PackageAvailabilityScalarFieldEnum[]
  }

  /**
   * PackageAvailability findMany
   */
  export type PackageAvailabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which PackageAvailabilities to fetch.
     */
    where?: PackageAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageAvailabilities to fetch.
     */
    orderBy?: PackageAvailabilityOrderByWithRelationInput | PackageAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PackageAvailabilities.
     */
    cursor?: PackageAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageAvailabilities.
     */
    distinct?: PackageAvailabilityScalarFieldEnum | PackageAvailabilityScalarFieldEnum[]
  }

  /**
   * PackageAvailability create
   */
  export type PackageAvailabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a PackageAvailability.
     */
    data: XOR<PackageAvailabilityCreateInput, PackageAvailabilityUncheckedCreateInput>
  }

  /**
   * PackageAvailability createMany
   */
  export type PackageAvailabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PackageAvailabilities.
     */
    data: PackageAvailabilityCreateManyInput | PackageAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PackageAvailability createManyAndReturn
   */
  export type PackageAvailabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to create many PackageAvailabilities.
     */
    data: PackageAvailabilityCreateManyInput | PackageAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PackageAvailability update
   */
  export type PackageAvailabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a PackageAvailability.
     */
    data: XOR<PackageAvailabilityUpdateInput, PackageAvailabilityUncheckedUpdateInput>
    /**
     * Choose, which PackageAvailability to update.
     */
    where: PackageAvailabilityWhereUniqueInput
  }

  /**
   * PackageAvailability updateMany
   */
  export type PackageAvailabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PackageAvailabilities.
     */
    data: XOR<PackageAvailabilityUpdateManyMutationInput, PackageAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which PackageAvailabilities to update
     */
    where?: PackageAvailabilityWhereInput
    /**
     * Limit how many PackageAvailabilities to update.
     */
    limit?: number
  }

  /**
   * PackageAvailability updateManyAndReturn
   */
  export type PackageAvailabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to update PackageAvailabilities.
     */
    data: XOR<PackageAvailabilityUpdateManyMutationInput, PackageAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which PackageAvailabilities to update
     */
    where?: PackageAvailabilityWhereInput
    /**
     * Limit how many PackageAvailabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PackageAvailability upsert
   */
  export type PackageAvailabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the PackageAvailability to update in case it exists.
     */
    where: PackageAvailabilityWhereUniqueInput
    /**
     * In case the PackageAvailability found by the `where` argument doesn't exist, create a new PackageAvailability with this data.
     */
    create: XOR<PackageAvailabilityCreateInput, PackageAvailabilityUncheckedCreateInput>
    /**
     * In case the PackageAvailability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageAvailabilityUpdateInput, PackageAvailabilityUncheckedUpdateInput>
  }

  /**
   * PackageAvailability delete
   */
  export type PackageAvailabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
    /**
     * Filter which PackageAvailability to delete.
     */
    where: PackageAvailabilityWhereUniqueInput
  }

  /**
   * PackageAvailability deleteMany
   */
  export type PackageAvailabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAvailabilities to delete
     */
    where?: PackageAvailabilityWhereInput
    /**
     * Limit how many PackageAvailabilities to delete.
     */
    limit?: number
  }

  /**
   * PackageAvailability without action
   */
  export type PackageAvailabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAvailability
     */
    select?: PackageAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PackageAvailability
     */
    omit?: PackageAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageAvailabilityInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    image: string | null
    category: string | null
    readTime: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    image: string | null
    category: string | null
    readTime: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    image: number
    category: number
    readTime: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    image?: true
    category?: true
    readTime?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    image?: true
    category?: true
    readTime?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    image?: true
    category?: true
    readTime?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    slug: string
    description: string
    image: string | null
    category: string
    readTime: string
    publishedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    image?: boolean
    category?: boolean
    readTime?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    image?: boolean
    category?: boolean
    readTime?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    image?: boolean
    category?: boolean
    readTime?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    image?: boolean
    category?: boolean
    readTime?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "image" | "category" | "readTime" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["article"]>

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      description: string
      image: string | null
      category: string
      readTime: string
      publishedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
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
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
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
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly slug: FieldRef<"Article", 'String'>
    readonly description: FieldRef<"Article", 'String'>
    readonly image: FieldRef<"Article", 'String'>
    readonly category: FieldRef<"Article", 'String'>
    readonly readTime: FieldRef<"Article", 'String'>
    readonly publishedAt: FieldRef<"Article", 'DateTime'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClinicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    address: 'address',
    phone: 'phone',
    email: 'email',
    website: 'website',
    rating: 'rating',
    reviewCount: 'reviewCount',
    image: 'image',
    isOpen: 'isOpen',
    openingHours: 'openingHours',
    latitude: 'latitude',
    longitude: 'longitude',
    bankInfo: 'bankInfo',
    depositAmount: 'depositAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicScalarFieldEnum = (typeof ClinicScalarFieldEnum)[keyof typeof ClinicScalarFieldEnum]


  export const ClinicAdminScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    clinicId: 'clinicId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicAdminScalarFieldEnum = (typeof ClinicAdminScalarFieldEnum)[keyof typeof ClinicAdminScalarFieldEnum]


  export const ClinicWorkingHourScalarFieldEnum: {
    id: 'id',
    clinicId: 'clinicId',
    dayOfWeek: 'dayOfWeek',
    isOpen: 'isOpen',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicWorkingHourScalarFieldEnum = (typeof ClinicWorkingHourScalarFieldEnum)[keyof typeof ClinicWorkingHourScalarFieldEnum]


  export const SpecialtyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SpecialtyScalarFieldEnum = (typeof SpecialtyScalarFieldEnum)[keyof typeof SpecialtyScalarFieldEnum]


  export const ClinicSpecialtyScalarFieldEnum: {
    clinicId: 'clinicId',
    specialtyId: 'specialtyId',
    createdAt: 'createdAt'
  };

  export type ClinicSpecialtyScalarFieldEnum = (typeof ClinicSpecialtyScalarFieldEnum)[keyof typeof ClinicSpecialtyScalarFieldEnum]


  export const ClinicSpecialtyScheduleScalarFieldEnum: {
    id: 'id',
    clinicId: 'clinicId',
    specialtyId: 'specialtyId',
    dayOfWeek: 'dayOfWeek',
    isActive: 'isActive',
    startTime: 'startTime',
    endTime: 'endTime',
    slotDurationMinutes: 'slotDurationMinutes',
    capacity: 'capacity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicSpecialtyScheduleScalarFieldEnum = (typeof ClinicSpecialtyScheduleScalarFieldEnum)[keyof typeof ClinicSpecialtyScheduleScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    clinicId: 'clinicId',
    specialtyId: 'specialtyId',
    name: 'name',
    qualifications: 'qualifications',
    experience: 'experience',
    avatar: 'avatar',
    bio: 'bio',
    isAvailable: 'isAvailable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const HealthPackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    shortDescription: 'shortDescription',
    description: 'description',
    price: 'price',
    promotionalPrice: 'promotionalPrice',
    currency: 'currency',
    category: 'category',
    targetGender: 'targetGender',
    targetAgeRange: 'targetAgeRange',
    preparationNotes: 'preparationNotes',
    isPopular: 'isPopular',
    isActive: 'isActive',
    features: 'features',
    imageUrl: 'imageUrl',
    clinicId: 'clinicId',
    specialtyId: 'specialtyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HealthPackageScalarFieldEnum = (typeof HealthPackageScalarFieldEnum)[keyof typeof HealthPackageScalarFieldEnum]


  export const PackageAvailabilityScalarFieldEnum: {
    id: 'id',
    packageId: 'packageId',
    dayOfWeek: 'dayOfWeek',
    isActive: 'isActive',
    startTime: 'startTime',
    endTime: 'endTime',
    slotDurationMinutes: 'slotDurationMinutes',
    capacity: 'capacity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PackageAvailabilityScalarFieldEnum = (typeof PackageAvailabilityScalarFieldEnum)[keyof typeof PackageAvailabilityScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    image: 'image',
    category: 'category',
    readTime: 'readTime',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ClinicWhereInput = {
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    id?: StringFilter<"Clinic"> | string
    name?: StringFilter<"Clinic"> | string
    description?: StringNullableFilter<"Clinic"> | string | null
    address?: StringFilter<"Clinic"> | string
    phone?: StringNullableFilter<"Clinic"> | string | null
    email?: StringNullableFilter<"Clinic"> | string | null
    website?: StringNullableFilter<"Clinic"> | string | null
    rating?: DecimalFilter<"Clinic"> | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFilter<"Clinic"> | number
    image?: StringNullableFilter<"Clinic"> | string | null
    isOpen?: BoolFilter<"Clinic"> | boolean
    openingHours?: StringNullableFilter<"Clinic"> | string | null
    latitude?: DecimalNullableFilter<"Clinic"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Clinic"> | Decimal | DecimalJsLike | number | string | null
    bankInfo?: StringNullableFilter<"Clinic"> | string | null
    depositAmount?: IntFilter<"Clinic"> | number
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    doctors?: DoctorListRelationFilter
    clinicAdmins?: ClinicAdminListRelationFilter
    healthPackages?: HealthPackageListRelationFilter
    specialties?: ClinicSpecialtyListRelationFilter
    workingHours?: ClinicWorkingHourListRelationFilter
    specialtySchedules?: ClinicSpecialtyScheduleListRelationFilter
  }

  export type ClinicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    image?: SortOrderInput | SortOrder
    isOpen?: SortOrder
    openingHours?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    bankInfo?: SortOrderInput | SortOrder
    depositAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctors?: DoctorOrderByRelationAggregateInput
    clinicAdmins?: ClinicAdminOrderByRelationAggregateInput
    healthPackages?: HealthPackageOrderByRelationAggregateInput
    specialties?: ClinicSpecialtyOrderByRelationAggregateInput
    workingHours?: ClinicWorkingHourOrderByRelationAggregateInput
    specialtySchedules?: ClinicSpecialtyScheduleOrderByRelationAggregateInput
  }

  export type ClinicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    name?: StringFilter<"Clinic"> | string
    description?: StringNullableFilter<"Clinic"> | string | null
    address?: StringFilter<"Clinic"> | string
    phone?: StringNullableFilter<"Clinic"> | string | null
    email?: StringNullableFilter<"Clinic"> | string | null
    website?: StringNullableFilter<"Clinic"> | string | null
    rating?: DecimalFilter<"Clinic"> | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFilter<"Clinic"> | number
    image?: StringNullableFilter<"Clinic"> | string | null
    isOpen?: BoolFilter<"Clinic"> | boolean
    openingHours?: StringNullableFilter<"Clinic"> | string | null
    latitude?: DecimalNullableFilter<"Clinic"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Clinic"> | Decimal | DecimalJsLike | number | string | null
    bankInfo?: StringNullableFilter<"Clinic"> | string | null
    depositAmount?: IntFilter<"Clinic"> | number
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    doctors?: DoctorListRelationFilter
    clinicAdmins?: ClinicAdminListRelationFilter
    healthPackages?: HealthPackageListRelationFilter
    specialties?: ClinicSpecialtyListRelationFilter
    workingHours?: ClinicWorkingHourListRelationFilter
    specialtySchedules?: ClinicSpecialtyScheduleListRelationFilter
  }, "id">

  export type ClinicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    image?: SortOrderInput | SortOrder
    isOpen?: SortOrder
    openingHours?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    bankInfo?: SortOrderInput | SortOrder
    depositAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicCountOrderByAggregateInput
    _avg?: ClinicAvgOrderByAggregateInput
    _max?: ClinicMaxOrderByAggregateInput
    _min?: ClinicMinOrderByAggregateInput
    _sum?: ClinicSumOrderByAggregateInput
  }

  export type ClinicScalarWhereWithAggregatesInput = {
    AND?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    OR?: ClinicScalarWhereWithAggregatesInput[]
    NOT?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clinic"> | string
    name?: StringWithAggregatesFilter<"Clinic"> | string
    description?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    address?: StringWithAggregatesFilter<"Clinic"> | string
    phone?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    email?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    website?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    rating?: DecimalWithAggregatesFilter<"Clinic"> | Decimal | DecimalJsLike | number | string
    reviewCount?: IntWithAggregatesFilter<"Clinic"> | number
    image?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    isOpen?: BoolWithAggregatesFilter<"Clinic"> | boolean
    openingHours?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    latitude?: DecimalNullableWithAggregatesFilter<"Clinic"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableWithAggregatesFilter<"Clinic"> | Decimal | DecimalJsLike | number | string | null
    bankInfo?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    depositAmount?: IntWithAggregatesFilter<"Clinic"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
  }

  export type ClinicAdminWhereInput = {
    AND?: ClinicAdminWhereInput | ClinicAdminWhereInput[]
    OR?: ClinicAdminWhereInput[]
    NOT?: ClinicAdminWhereInput | ClinicAdminWhereInput[]
    id?: StringFilter<"ClinicAdmin"> | string
    userId?: StringFilter<"ClinicAdmin"> | string
    clinicId?: StringFilter<"ClinicAdmin"> | string
    createdAt?: DateTimeFilter<"ClinicAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicAdmin"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }

  export type ClinicAdminOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
  }

  export type ClinicAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ClinicAdminWhereInput | ClinicAdminWhereInput[]
    OR?: ClinicAdminWhereInput[]
    NOT?: ClinicAdminWhereInput | ClinicAdminWhereInput[]
    clinicId?: StringFilter<"ClinicAdmin"> | string
    createdAt?: DateTimeFilter<"ClinicAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicAdmin"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }, "id" | "userId">

  export type ClinicAdminOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicAdminCountOrderByAggregateInput
    _max?: ClinicAdminMaxOrderByAggregateInput
    _min?: ClinicAdminMinOrderByAggregateInput
  }

  export type ClinicAdminScalarWhereWithAggregatesInput = {
    AND?: ClinicAdminScalarWhereWithAggregatesInput | ClinicAdminScalarWhereWithAggregatesInput[]
    OR?: ClinicAdminScalarWhereWithAggregatesInput[]
    NOT?: ClinicAdminScalarWhereWithAggregatesInput | ClinicAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClinicAdmin"> | string
    userId?: StringWithAggregatesFilter<"ClinicAdmin"> | string
    clinicId?: StringWithAggregatesFilter<"ClinicAdmin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ClinicAdmin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClinicAdmin"> | Date | string
  }

  export type ClinicWorkingHourWhereInput = {
    AND?: ClinicWorkingHourWhereInput | ClinicWorkingHourWhereInput[]
    OR?: ClinicWorkingHourWhereInput[]
    NOT?: ClinicWorkingHourWhereInput | ClinicWorkingHourWhereInput[]
    id?: StringFilter<"ClinicWorkingHour"> | string
    clinicId?: StringFilter<"ClinicWorkingHour"> | string
    dayOfWeek?: IntFilter<"ClinicWorkingHour"> | number
    isOpen?: BoolFilter<"ClinicWorkingHour"> | boolean
    startTime?: StringFilter<"ClinicWorkingHour"> | string
    endTime?: StringFilter<"ClinicWorkingHour"> | string
    createdAt?: DateTimeFilter<"ClinicWorkingHour"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicWorkingHour"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }

  export type ClinicWorkingHourOrderByWithRelationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
  }

  export type ClinicWorkingHourWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clinicId_dayOfWeek?: ClinicWorkingHourClinicIdDayOfWeekCompoundUniqueInput
    AND?: ClinicWorkingHourWhereInput | ClinicWorkingHourWhereInput[]
    OR?: ClinicWorkingHourWhereInput[]
    NOT?: ClinicWorkingHourWhereInput | ClinicWorkingHourWhereInput[]
    clinicId?: StringFilter<"ClinicWorkingHour"> | string
    dayOfWeek?: IntFilter<"ClinicWorkingHour"> | number
    isOpen?: BoolFilter<"ClinicWorkingHour"> | boolean
    startTime?: StringFilter<"ClinicWorkingHour"> | string
    endTime?: StringFilter<"ClinicWorkingHour"> | string
    createdAt?: DateTimeFilter<"ClinicWorkingHour"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicWorkingHour"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }, "id" | "clinicId_dayOfWeek">

  export type ClinicWorkingHourOrderByWithAggregationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicWorkingHourCountOrderByAggregateInput
    _avg?: ClinicWorkingHourAvgOrderByAggregateInput
    _max?: ClinicWorkingHourMaxOrderByAggregateInput
    _min?: ClinicWorkingHourMinOrderByAggregateInput
    _sum?: ClinicWorkingHourSumOrderByAggregateInput
  }

  export type ClinicWorkingHourScalarWhereWithAggregatesInput = {
    AND?: ClinicWorkingHourScalarWhereWithAggregatesInput | ClinicWorkingHourScalarWhereWithAggregatesInput[]
    OR?: ClinicWorkingHourScalarWhereWithAggregatesInput[]
    NOT?: ClinicWorkingHourScalarWhereWithAggregatesInput | ClinicWorkingHourScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClinicWorkingHour"> | string
    clinicId?: StringWithAggregatesFilter<"ClinicWorkingHour"> | string
    dayOfWeek?: IntWithAggregatesFilter<"ClinicWorkingHour"> | number
    isOpen?: BoolWithAggregatesFilter<"ClinicWorkingHour"> | boolean
    startTime?: StringWithAggregatesFilter<"ClinicWorkingHour"> | string
    endTime?: StringWithAggregatesFilter<"ClinicWorkingHour"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ClinicWorkingHour"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClinicWorkingHour"> | Date | string
  }

  export type SpecialtyWhereInput = {
    AND?: SpecialtyWhereInput | SpecialtyWhereInput[]
    OR?: SpecialtyWhereInput[]
    NOT?: SpecialtyWhereInput | SpecialtyWhereInput[]
    id?: StringFilter<"Specialty"> | string
    name?: StringFilter<"Specialty"> | string
    createdAt?: DateTimeFilter<"Specialty"> | Date | string
    updatedAt?: DateTimeFilter<"Specialty"> | Date | string
    doctors?: DoctorListRelationFilter
    clinics?: ClinicSpecialtyListRelationFilter
    specialtySchedules?: ClinicSpecialtyScheduleListRelationFilter
    healthPackages?: HealthPackageListRelationFilter
  }

  export type SpecialtyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctors?: DoctorOrderByRelationAggregateInput
    clinics?: ClinicSpecialtyOrderByRelationAggregateInput
    specialtySchedules?: ClinicSpecialtyScheduleOrderByRelationAggregateInput
    healthPackages?: HealthPackageOrderByRelationAggregateInput
  }

  export type SpecialtyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SpecialtyWhereInput | SpecialtyWhereInput[]
    OR?: SpecialtyWhereInput[]
    NOT?: SpecialtyWhereInput | SpecialtyWhereInput[]
    createdAt?: DateTimeFilter<"Specialty"> | Date | string
    updatedAt?: DateTimeFilter<"Specialty"> | Date | string
    doctors?: DoctorListRelationFilter
    clinics?: ClinicSpecialtyListRelationFilter
    specialtySchedules?: ClinicSpecialtyScheduleListRelationFilter
    healthPackages?: HealthPackageListRelationFilter
  }, "id" | "name">

  export type SpecialtyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpecialtyCountOrderByAggregateInput
    _max?: SpecialtyMaxOrderByAggregateInput
    _min?: SpecialtyMinOrderByAggregateInput
  }

  export type SpecialtyScalarWhereWithAggregatesInput = {
    AND?: SpecialtyScalarWhereWithAggregatesInput | SpecialtyScalarWhereWithAggregatesInput[]
    OR?: SpecialtyScalarWhereWithAggregatesInput[]
    NOT?: SpecialtyScalarWhereWithAggregatesInput | SpecialtyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Specialty"> | string
    name?: StringWithAggregatesFilter<"Specialty"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Specialty"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Specialty"> | Date | string
  }

  export type ClinicSpecialtyWhereInput = {
    AND?: ClinicSpecialtyWhereInput | ClinicSpecialtyWhereInput[]
    OR?: ClinicSpecialtyWhereInput[]
    NOT?: ClinicSpecialtyWhereInput | ClinicSpecialtyWhereInput[]
    clinicId?: StringFilter<"ClinicSpecialty"> | string
    specialtyId?: StringFilter<"ClinicSpecialty"> | string
    createdAt?: DateTimeFilter<"ClinicSpecialty"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    specialty?: XOR<SpecialtyScalarRelationFilter, SpecialtyWhereInput>
    schedules?: ClinicSpecialtyScheduleListRelationFilter
  }

  export type ClinicSpecialtyOrderByWithRelationInput = {
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    specialty?: SpecialtyOrderByWithRelationInput
    schedules?: ClinicSpecialtyScheduleOrderByRelationAggregateInput
  }

  export type ClinicSpecialtyWhereUniqueInput = Prisma.AtLeast<{
    clinicId_specialtyId?: ClinicSpecialtyClinicIdSpecialtyIdCompoundUniqueInput
    AND?: ClinicSpecialtyWhereInput | ClinicSpecialtyWhereInput[]
    OR?: ClinicSpecialtyWhereInput[]
    NOT?: ClinicSpecialtyWhereInput | ClinicSpecialtyWhereInput[]
    clinicId?: StringFilter<"ClinicSpecialty"> | string
    specialtyId?: StringFilter<"ClinicSpecialty"> | string
    createdAt?: DateTimeFilter<"ClinicSpecialty"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    specialty?: XOR<SpecialtyScalarRelationFilter, SpecialtyWhereInput>
    schedules?: ClinicSpecialtyScheduleListRelationFilter
  }, "clinicId_specialtyId">

  export type ClinicSpecialtyOrderByWithAggregationInput = {
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
    _count?: ClinicSpecialtyCountOrderByAggregateInput
    _max?: ClinicSpecialtyMaxOrderByAggregateInput
    _min?: ClinicSpecialtyMinOrderByAggregateInput
  }

  export type ClinicSpecialtyScalarWhereWithAggregatesInput = {
    AND?: ClinicSpecialtyScalarWhereWithAggregatesInput | ClinicSpecialtyScalarWhereWithAggregatesInput[]
    OR?: ClinicSpecialtyScalarWhereWithAggregatesInput[]
    NOT?: ClinicSpecialtyScalarWhereWithAggregatesInput | ClinicSpecialtyScalarWhereWithAggregatesInput[]
    clinicId?: StringWithAggregatesFilter<"ClinicSpecialty"> | string
    specialtyId?: StringWithAggregatesFilter<"ClinicSpecialty"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ClinicSpecialty"> | Date | string
  }

  export type ClinicSpecialtyScheduleWhereInput = {
    AND?: ClinicSpecialtyScheduleWhereInput | ClinicSpecialtyScheduleWhereInput[]
    OR?: ClinicSpecialtyScheduleWhereInput[]
    NOT?: ClinicSpecialtyScheduleWhereInput | ClinicSpecialtyScheduleWhereInput[]
    id?: StringFilter<"ClinicSpecialtySchedule"> | string
    clinicId?: StringFilter<"ClinicSpecialtySchedule"> | string
    specialtyId?: StringFilter<"ClinicSpecialtySchedule"> | string
    dayOfWeek?: IntFilter<"ClinicSpecialtySchedule"> | number
    isActive?: BoolFilter<"ClinicSpecialtySchedule"> | boolean
    startTime?: StringFilter<"ClinicSpecialtySchedule"> | string
    endTime?: StringFilter<"ClinicSpecialtySchedule"> | string
    slotDurationMinutes?: IntFilter<"ClinicSpecialtySchedule"> | number
    capacity?: IntFilter<"ClinicSpecialtySchedule"> | number
    createdAt?: DateTimeFilter<"ClinicSpecialtySchedule"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicSpecialtySchedule"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    specialty?: XOR<SpecialtyScalarRelationFilter, SpecialtyWhereInput>
    clinicSpecialty?: XOR<ClinicSpecialtyScalarRelationFilter, ClinicSpecialtyWhereInput>
  }

  export type ClinicSpecialtyScheduleOrderByWithRelationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    specialty?: SpecialtyOrderByWithRelationInput
    clinicSpecialty?: ClinicSpecialtyOrderByWithRelationInput
  }

  export type ClinicSpecialtyScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClinicSpecialtyScheduleWhereInput | ClinicSpecialtyScheduleWhereInput[]
    OR?: ClinicSpecialtyScheduleWhereInput[]
    NOT?: ClinicSpecialtyScheduleWhereInput | ClinicSpecialtyScheduleWhereInput[]
    clinicId?: StringFilter<"ClinicSpecialtySchedule"> | string
    specialtyId?: StringFilter<"ClinicSpecialtySchedule"> | string
    dayOfWeek?: IntFilter<"ClinicSpecialtySchedule"> | number
    isActive?: BoolFilter<"ClinicSpecialtySchedule"> | boolean
    startTime?: StringFilter<"ClinicSpecialtySchedule"> | string
    endTime?: StringFilter<"ClinicSpecialtySchedule"> | string
    slotDurationMinutes?: IntFilter<"ClinicSpecialtySchedule"> | number
    capacity?: IntFilter<"ClinicSpecialtySchedule"> | number
    createdAt?: DateTimeFilter<"ClinicSpecialtySchedule"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicSpecialtySchedule"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    specialty?: XOR<SpecialtyScalarRelationFilter, SpecialtyWhereInput>
    clinicSpecialty?: XOR<ClinicSpecialtyScalarRelationFilter, ClinicSpecialtyWhereInput>
  }, "id">

  export type ClinicSpecialtyScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicSpecialtyScheduleCountOrderByAggregateInput
    _avg?: ClinicSpecialtyScheduleAvgOrderByAggregateInput
    _max?: ClinicSpecialtyScheduleMaxOrderByAggregateInput
    _min?: ClinicSpecialtyScheduleMinOrderByAggregateInput
    _sum?: ClinicSpecialtyScheduleSumOrderByAggregateInput
  }

  export type ClinicSpecialtyScheduleScalarWhereWithAggregatesInput = {
    AND?: ClinicSpecialtyScheduleScalarWhereWithAggregatesInput | ClinicSpecialtyScheduleScalarWhereWithAggregatesInput[]
    OR?: ClinicSpecialtyScheduleScalarWhereWithAggregatesInput[]
    NOT?: ClinicSpecialtyScheduleScalarWhereWithAggregatesInput | ClinicSpecialtyScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClinicSpecialtySchedule"> | string
    clinicId?: StringWithAggregatesFilter<"ClinicSpecialtySchedule"> | string
    specialtyId?: StringWithAggregatesFilter<"ClinicSpecialtySchedule"> | string
    dayOfWeek?: IntWithAggregatesFilter<"ClinicSpecialtySchedule"> | number
    isActive?: BoolWithAggregatesFilter<"ClinicSpecialtySchedule"> | boolean
    startTime?: StringWithAggregatesFilter<"ClinicSpecialtySchedule"> | string
    endTime?: StringWithAggregatesFilter<"ClinicSpecialtySchedule"> | string
    slotDurationMinutes?: IntWithAggregatesFilter<"ClinicSpecialtySchedule"> | number
    capacity?: IntWithAggregatesFilter<"ClinicSpecialtySchedule"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ClinicSpecialtySchedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClinicSpecialtySchedule"> | Date | string
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    id?: StringFilter<"Doctor"> | string
    userId?: StringNullableFilter<"Doctor"> | string | null
    clinicId?: StringFilter<"Doctor"> | string
    specialtyId?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    qualifications?: JsonNullableFilter<"Doctor">
    experience?: IntFilter<"Doctor"> | number
    avatar?: StringNullableFilter<"Doctor"> | string | null
    bio?: StringNullableFilter<"Doctor"> | string | null
    isAvailable?: BoolFilter<"Doctor"> | boolean
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    specialty?: XOR<SpecialtyScalarRelationFilter, SpecialtyWhereInput>
  }

  export type DoctorOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    name?: SortOrder
    qualifications?: SortOrderInput | SortOrder
    experience?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    specialty?: SpecialtyOrderByWithRelationInput
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    clinicId?: StringFilter<"Doctor"> | string
    specialtyId?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    qualifications?: JsonNullableFilter<"Doctor">
    experience?: IntFilter<"Doctor"> | number
    avatar?: StringNullableFilter<"Doctor"> | string | null
    bio?: StringNullableFilter<"Doctor"> | string | null
    isAvailable?: BoolFilter<"Doctor"> | boolean
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    specialty?: XOR<SpecialtyScalarRelationFilter, SpecialtyWhereInput>
  }, "id" | "userId">

  export type DoctorOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    name?: SortOrder
    qualifications?: SortOrderInput | SortOrder
    experience?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _avg?: DoctorAvgOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
    _sum?: DoctorSumOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doctor"> | string
    userId?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    clinicId?: StringWithAggregatesFilter<"Doctor"> | string
    specialtyId?: StringWithAggregatesFilter<"Doctor"> | string
    name?: StringWithAggregatesFilter<"Doctor"> | string
    qualifications?: JsonNullableWithAggregatesFilter<"Doctor">
    experience?: IntWithAggregatesFilter<"Doctor"> | number
    avatar?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    isAvailable?: BoolWithAggregatesFilter<"Doctor"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
  }

  export type HealthPackageWhereInput = {
    AND?: HealthPackageWhereInput | HealthPackageWhereInput[]
    OR?: HealthPackageWhereInput[]
    NOT?: HealthPackageWhereInput | HealthPackageWhereInput[]
    id?: StringFilter<"HealthPackage"> | string
    name?: StringFilter<"HealthPackage"> | string
    shortDescription?: StringNullableFilter<"HealthPackage"> | string | null
    description?: StringFilter<"HealthPackage"> | string
    price?: DecimalFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string
    promotionalPrice?: DecimalNullableFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"HealthPackage"> | string
    category?: StringFilter<"HealthPackage"> | string
    targetGender?: StringNullableFilter<"HealthPackage"> | string | null
    targetAgeRange?: StringNullableFilter<"HealthPackage"> | string | null
    preparationNotes?: StringNullableFilter<"HealthPackage"> | string | null
    isPopular?: BoolFilter<"HealthPackage"> | boolean
    isActive?: BoolFilter<"HealthPackage"> | boolean
    features?: StringNullableListFilter<"HealthPackage">
    imageUrl?: StringNullableFilter<"HealthPackage"> | string | null
    clinicId?: StringNullableFilter<"HealthPackage"> | string | null
    specialtyId?: StringNullableFilter<"HealthPackage"> | string | null
    createdAt?: DateTimeFilter<"HealthPackage"> | Date | string
    updatedAt?: DateTimeFilter<"HealthPackage"> | Date | string
    clinic?: XOR<ClinicNullableScalarRelationFilter, ClinicWhereInput> | null
    specialty?: XOR<SpecialtyNullableScalarRelationFilter, SpecialtyWhereInput> | null
    availabilities?: PackageAvailabilityListRelationFilter
  }

  export type HealthPackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    shortDescription?: SortOrderInput | SortOrder
    description?: SortOrder
    price?: SortOrder
    promotionalPrice?: SortOrderInput | SortOrder
    currency?: SortOrder
    category?: SortOrder
    targetGender?: SortOrderInput | SortOrder
    targetAgeRange?: SortOrderInput | SortOrder
    preparationNotes?: SortOrderInput | SortOrder
    isPopular?: SortOrder
    isActive?: SortOrder
    features?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    clinicId?: SortOrderInput | SortOrder
    specialtyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    specialty?: SpecialtyOrderByWithRelationInput
    availabilities?: PackageAvailabilityOrderByRelationAggregateInput
  }

  export type HealthPackageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HealthPackageWhereInput | HealthPackageWhereInput[]
    OR?: HealthPackageWhereInput[]
    NOT?: HealthPackageWhereInput | HealthPackageWhereInput[]
    name?: StringFilter<"HealthPackage"> | string
    shortDescription?: StringNullableFilter<"HealthPackage"> | string | null
    description?: StringFilter<"HealthPackage"> | string
    price?: DecimalFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string
    promotionalPrice?: DecimalNullableFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"HealthPackage"> | string
    category?: StringFilter<"HealthPackage"> | string
    targetGender?: StringNullableFilter<"HealthPackage"> | string | null
    targetAgeRange?: StringNullableFilter<"HealthPackage"> | string | null
    preparationNotes?: StringNullableFilter<"HealthPackage"> | string | null
    isPopular?: BoolFilter<"HealthPackage"> | boolean
    isActive?: BoolFilter<"HealthPackage"> | boolean
    features?: StringNullableListFilter<"HealthPackage">
    imageUrl?: StringNullableFilter<"HealthPackage"> | string | null
    clinicId?: StringNullableFilter<"HealthPackage"> | string | null
    specialtyId?: StringNullableFilter<"HealthPackage"> | string | null
    createdAt?: DateTimeFilter<"HealthPackage"> | Date | string
    updatedAt?: DateTimeFilter<"HealthPackage"> | Date | string
    clinic?: XOR<ClinicNullableScalarRelationFilter, ClinicWhereInput> | null
    specialty?: XOR<SpecialtyNullableScalarRelationFilter, SpecialtyWhereInput> | null
    availabilities?: PackageAvailabilityListRelationFilter
  }, "id">

  export type HealthPackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    shortDescription?: SortOrderInput | SortOrder
    description?: SortOrder
    price?: SortOrder
    promotionalPrice?: SortOrderInput | SortOrder
    currency?: SortOrder
    category?: SortOrder
    targetGender?: SortOrderInput | SortOrder
    targetAgeRange?: SortOrderInput | SortOrder
    preparationNotes?: SortOrderInput | SortOrder
    isPopular?: SortOrder
    isActive?: SortOrder
    features?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    clinicId?: SortOrderInput | SortOrder
    specialtyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HealthPackageCountOrderByAggregateInput
    _avg?: HealthPackageAvgOrderByAggregateInput
    _max?: HealthPackageMaxOrderByAggregateInput
    _min?: HealthPackageMinOrderByAggregateInput
    _sum?: HealthPackageSumOrderByAggregateInput
  }

  export type HealthPackageScalarWhereWithAggregatesInput = {
    AND?: HealthPackageScalarWhereWithAggregatesInput | HealthPackageScalarWhereWithAggregatesInput[]
    OR?: HealthPackageScalarWhereWithAggregatesInput[]
    NOT?: HealthPackageScalarWhereWithAggregatesInput | HealthPackageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HealthPackage"> | string
    name?: StringWithAggregatesFilter<"HealthPackage"> | string
    shortDescription?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    description?: StringWithAggregatesFilter<"HealthPackage"> | string
    price?: DecimalWithAggregatesFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string
    promotionalPrice?: DecimalNullableWithAggregatesFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringWithAggregatesFilter<"HealthPackage"> | string
    category?: StringWithAggregatesFilter<"HealthPackage"> | string
    targetGender?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    targetAgeRange?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    preparationNotes?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    isPopular?: BoolWithAggregatesFilter<"HealthPackage"> | boolean
    isActive?: BoolWithAggregatesFilter<"HealthPackage"> | boolean
    features?: StringNullableListFilter<"HealthPackage">
    imageUrl?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    clinicId?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    specialtyId?: StringNullableWithAggregatesFilter<"HealthPackage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HealthPackage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HealthPackage"> | Date | string
  }

  export type PackageAvailabilityWhereInput = {
    AND?: PackageAvailabilityWhereInput | PackageAvailabilityWhereInput[]
    OR?: PackageAvailabilityWhereInput[]
    NOT?: PackageAvailabilityWhereInput | PackageAvailabilityWhereInput[]
    id?: StringFilter<"PackageAvailability"> | string
    packageId?: StringFilter<"PackageAvailability"> | string
    dayOfWeek?: IntFilter<"PackageAvailability"> | number
    isActive?: BoolFilter<"PackageAvailability"> | boolean
    startTime?: StringFilter<"PackageAvailability"> | string
    endTime?: StringFilter<"PackageAvailability"> | string
    slotDurationMinutes?: IntFilter<"PackageAvailability"> | number
    capacity?: IntFilter<"PackageAvailability"> | number
    createdAt?: DateTimeFilter<"PackageAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"PackageAvailability"> | Date | string
    healthPackage?: XOR<HealthPackageScalarRelationFilter, HealthPackageWhereInput>
  }

  export type PackageAvailabilityOrderByWithRelationInput = {
    id?: SortOrder
    packageId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    healthPackage?: HealthPackageOrderByWithRelationInput
  }

  export type PackageAvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    packageId_dayOfWeek?: PackageAvailabilityPackageIdDayOfWeekCompoundUniqueInput
    AND?: PackageAvailabilityWhereInput | PackageAvailabilityWhereInput[]
    OR?: PackageAvailabilityWhereInput[]
    NOT?: PackageAvailabilityWhereInput | PackageAvailabilityWhereInput[]
    packageId?: StringFilter<"PackageAvailability"> | string
    dayOfWeek?: IntFilter<"PackageAvailability"> | number
    isActive?: BoolFilter<"PackageAvailability"> | boolean
    startTime?: StringFilter<"PackageAvailability"> | string
    endTime?: StringFilter<"PackageAvailability"> | string
    slotDurationMinutes?: IntFilter<"PackageAvailability"> | number
    capacity?: IntFilter<"PackageAvailability"> | number
    createdAt?: DateTimeFilter<"PackageAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"PackageAvailability"> | Date | string
    healthPackage?: XOR<HealthPackageScalarRelationFilter, HealthPackageWhereInput>
  }, "id" | "packageId_dayOfWeek">

  export type PackageAvailabilityOrderByWithAggregationInput = {
    id?: SortOrder
    packageId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PackageAvailabilityCountOrderByAggregateInput
    _avg?: PackageAvailabilityAvgOrderByAggregateInput
    _max?: PackageAvailabilityMaxOrderByAggregateInput
    _min?: PackageAvailabilityMinOrderByAggregateInput
    _sum?: PackageAvailabilitySumOrderByAggregateInput
  }

  export type PackageAvailabilityScalarWhereWithAggregatesInput = {
    AND?: PackageAvailabilityScalarWhereWithAggregatesInput | PackageAvailabilityScalarWhereWithAggregatesInput[]
    OR?: PackageAvailabilityScalarWhereWithAggregatesInput[]
    NOT?: PackageAvailabilityScalarWhereWithAggregatesInput | PackageAvailabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PackageAvailability"> | string
    packageId?: StringWithAggregatesFilter<"PackageAvailability"> | string
    dayOfWeek?: IntWithAggregatesFilter<"PackageAvailability"> | number
    isActive?: BoolWithAggregatesFilter<"PackageAvailability"> | boolean
    startTime?: StringWithAggregatesFilter<"PackageAvailability"> | string
    endTime?: StringWithAggregatesFilter<"PackageAvailability"> | string
    slotDurationMinutes?: IntWithAggregatesFilter<"PackageAvailability"> | number
    capacity?: IntWithAggregatesFilter<"PackageAvailability"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PackageAvailability"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PackageAvailability"> | Date | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    slug?: StringFilter<"Article"> | string
    description?: StringFilter<"Article"> | string
    image?: StringNullableFilter<"Article"> | string | null
    category?: StringFilter<"Article"> | string
    readTime?: StringFilter<"Article"> | string
    publishedAt?: DateTimeFilter<"Article"> | Date | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    image?: SortOrderInput | SortOrder
    category?: SortOrder
    readTime?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    description?: StringFilter<"Article"> | string
    image?: StringNullableFilter<"Article"> | string | null
    category?: StringFilter<"Article"> | string
    readTime?: StringFilter<"Article"> | string
    publishedAt?: DateTimeFilter<"Article"> | Date | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }, "id" | "slug">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    image?: SortOrderInput | SortOrder
    category?: SortOrder
    readTime?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    slug?: StringWithAggregatesFilter<"Article"> | string
    description?: StringWithAggregatesFilter<"Article"> | string
    image?: StringNullableWithAggregatesFilter<"Article"> | string | null
    category?: StringWithAggregatesFilter<"Article"> | string
    readTime?: StringWithAggregatesFilter<"Article"> | string
    publishedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type ClinicCreateInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminUncheckedCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicAdminCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutClinicAdminsInput
  }

  export type ClinicAdminUncheckedCreateInput = {
    id?: string
    userId: string
    clinicId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutClinicAdminsNestedInput
  }

  export type ClinicAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicAdminCreateManyInput = {
    id?: string
    userId: string
    clinicId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicWorkingHourCreateInput = {
    id?: string
    dayOfWeek: number
    isOpen?: boolean
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutWorkingHoursInput
  }

  export type ClinicWorkingHourUncheckedCreateInput = {
    id?: string
    clinicId: string
    dayOfWeek: number
    isOpen?: boolean
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicWorkingHourUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutWorkingHoursNestedInput
  }

  export type ClinicWorkingHourUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicWorkingHourCreateManyInput = {
    id?: string
    clinicId: string
    dayOfWeek: number
    isOpen?: boolean
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicWorkingHourUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicWorkingHourUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecialtyCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutSpecialtyInput
    clinics?: ClinicSpecialtyCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutSpecialtyInput
    clinics?: ClinicSpecialtyUncheckedCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutSpecialtyNestedInput
    clinics?: ClinicSpecialtyUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutSpecialtyNestedInput
  }

  export type SpecialtyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutSpecialtyNestedInput
    clinics?: ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutSpecialtyNestedInput
  }

  export type SpecialtyCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpecialtyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpecialtyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyCreateInput = {
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutSpecialtiesInput
    specialty: SpecialtyCreateNestedOneWithoutClinicsInput
    schedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicSpecialtyInput
  }

  export type ClinicSpecialtyUncheckedCreateInput = {
    clinicId: string
    specialtyId: string
    createdAt?: Date | string
    schedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicSpecialtyInput
  }

  export type ClinicSpecialtyUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutSpecialtiesNestedInput
    specialty?: SpecialtyUpdateOneRequiredWithoutClinicsNestedInput
    schedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicSpecialtyNestedInput
  }

  export type ClinicSpecialtyUncheckedUpdateInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicSpecialtyNestedInput
  }

  export type ClinicSpecialtyCreateManyInput = {
    clinicId: string
    specialtyId: string
    createdAt?: Date | string
  }

  export type ClinicSpecialtyUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyUncheckedUpdateManyInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleCreateInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutSpecialtySchedulesInput
    specialty: SpecialtyCreateNestedOneWithoutSpecialtySchedulesInput
    clinicSpecialty: ClinicSpecialtyCreateNestedOneWithoutSchedulesInput
  }

  export type ClinicSpecialtyScheduleUncheckedCreateInput = {
    id?: string
    clinicId: string
    specialtyId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutSpecialtySchedulesNestedInput
    specialty?: SpecialtyUpdateOneRequiredWithoutSpecialtySchedulesNestedInput
    clinicSpecialty?: ClinicSpecialtyUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleCreateManyInput = {
    id?: string
    clinicId: string
    specialtyId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateInput = {
    id?: string
    userId?: string | null
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutDoctorsInput
    specialty: SpecialtyCreateNestedOneWithoutDoctorsInput
  }

  export type DoctorUncheckedCreateInput = {
    id?: string
    userId?: string | null
    clinicId: string
    specialtyId: string
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutDoctorsNestedInput
    specialty?: SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput
  }

  export type DoctorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateManyInput = {
    id?: string
    userId?: string | null
    clinicId: string
    specialtyId: string
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthPackageCreateInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic?: ClinicCreateNestedOneWithoutHealthPackagesInput
    specialty?: SpecialtyCreateNestedOneWithoutHealthPackagesInput
    availabilities?: PackageAvailabilityCreateNestedManyWithoutHealthPackageInput
  }

  export type HealthPackageUncheckedCreateInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    clinicId?: string | null
    specialtyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    availabilities?: PackageAvailabilityUncheckedCreateNestedManyWithoutHealthPackageInput
  }

  export type HealthPackageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneWithoutHealthPackagesNestedInput
    specialty?: SpecialtyUpdateOneWithoutHealthPackagesNestedInput
    availabilities?: PackageAvailabilityUpdateManyWithoutHealthPackageNestedInput
  }

  export type HealthPackageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availabilities?: PackageAvailabilityUncheckedUpdateManyWithoutHealthPackageNestedInput
  }

  export type HealthPackageCreateManyInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    clinicId?: string | null
    specialtyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthPackageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthPackageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAvailabilityCreateInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    healthPackage: HealthPackageCreateNestedOneWithoutAvailabilitiesInput
  }

  export type PackageAvailabilityUncheckedCreateInput = {
    id?: string
    packageId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageAvailabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthPackage?: HealthPackageUpdateOneRequiredWithoutAvailabilitiesNestedInput
  }

  export type PackageAvailabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAvailabilityCreateManyInput = {
    id?: string
    packageId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageAvailabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAvailabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    image?: string | null
    category?: string
    readTime?: string
    publishedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    image?: string | null
    category?: string
    readTime?: string
    publishedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    readTime?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    readTime?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    slug: string
    description: string
    image?: string | null
    category?: string
    readTime?: string
    publishedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    readTime?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    readTime?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DoctorListRelationFilter = {
    every?: DoctorWhereInput
    some?: DoctorWhereInput
    none?: DoctorWhereInput
  }

  export type ClinicAdminListRelationFilter = {
    every?: ClinicAdminWhereInput
    some?: ClinicAdminWhereInput
    none?: ClinicAdminWhereInput
  }

  export type HealthPackageListRelationFilter = {
    every?: HealthPackageWhereInput
    some?: HealthPackageWhereInput
    none?: HealthPackageWhereInput
  }

  export type ClinicSpecialtyListRelationFilter = {
    every?: ClinicSpecialtyWhereInput
    some?: ClinicSpecialtyWhereInput
    none?: ClinicSpecialtyWhereInput
  }

  export type ClinicWorkingHourListRelationFilter = {
    every?: ClinicWorkingHourWhereInput
    some?: ClinicWorkingHourWhereInput
    none?: ClinicWorkingHourWhereInput
  }

  export type ClinicSpecialtyScheduleListRelationFilter = {
    every?: ClinicSpecialtyScheduleWhereInput
    some?: ClinicSpecialtyScheduleWhereInput
    none?: ClinicSpecialtyScheduleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DoctorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicAdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HealthPackageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicSpecialtyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicWorkingHourOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicSpecialtyScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    image?: SortOrder
    isOpen?: SortOrder
    openingHours?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    bankInfo?: SortOrder
    depositAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicAvgOrderByAggregateInput = {
    rating?: SortOrder
    reviewCount?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    depositAmount?: SortOrder
  }

  export type ClinicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    image?: SortOrder
    isOpen?: SortOrder
    openingHours?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    bankInfo?: SortOrder
    depositAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    image?: SortOrder
    isOpen?: SortOrder
    openingHours?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    bankInfo?: SortOrder
    depositAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSumOrderByAggregateInput = {
    rating?: SortOrder
    reviewCount?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    depositAmount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ClinicScalarRelationFilter = {
    is?: ClinicWhereInput
    isNot?: ClinicWhereInput
  }

  export type ClinicAdminCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicAdminMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicWorkingHourClinicIdDayOfWeekCompoundUniqueInput = {
    clinicId: string
    dayOfWeek: number
  }

  export type ClinicWorkingHourCountOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicWorkingHourAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type ClinicWorkingHourMaxOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicWorkingHourMinOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    dayOfWeek?: SortOrder
    isOpen?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicWorkingHourSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type SpecialtyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpecialtyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpecialtyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpecialtyScalarRelationFilter = {
    is?: SpecialtyWhereInput
    isNot?: SpecialtyWhereInput
  }

  export type ClinicSpecialtyClinicIdSpecialtyIdCompoundUniqueInput = {
    clinicId: string
    specialtyId: string
  }

  export type ClinicSpecialtyCountOrderByAggregateInput = {
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClinicSpecialtyMaxOrderByAggregateInput = {
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClinicSpecialtyMinOrderByAggregateInput = {
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClinicSpecialtyScalarRelationFilter = {
    is?: ClinicSpecialtyWhereInput
    isNot?: ClinicSpecialtyWhereInput
  }

  export type ClinicSpecialtyScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSpecialtyScheduleAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
  }

  export type ClinicSpecialtyScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSpecialtyScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicSpecialtyScheduleSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DoctorCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    name?: SortOrder
    qualifications?: SortOrder
    experience?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorAvgOrderByAggregateInput = {
    experience?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    name?: SortOrder
    experience?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    name?: SortOrder
    experience?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorSumOrderByAggregateInput = {
    experience?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ClinicNullableScalarRelationFilter = {
    is?: ClinicWhereInput | null
    isNot?: ClinicWhereInput | null
  }

  export type SpecialtyNullableScalarRelationFilter = {
    is?: SpecialtyWhereInput | null
    isNot?: SpecialtyWhereInput | null
  }

  export type PackageAvailabilityListRelationFilter = {
    every?: PackageAvailabilityWhereInput
    some?: PackageAvailabilityWhereInput
    none?: PackageAvailabilityWhereInput
  }

  export type PackageAvailabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HealthPackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    price?: SortOrder
    promotionalPrice?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    targetGender?: SortOrder
    targetAgeRange?: SortOrder
    preparationNotes?: SortOrder
    isPopular?: SortOrder
    isActive?: SortOrder
    features?: SortOrder
    imageUrl?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthPackageAvgOrderByAggregateInput = {
    price?: SortOrder
    promotionalPrice?: SortOrder
  }

  export type HealthPackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    price?: SortOrder
    promotionalPrice?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    targetGender?: SortOrder
    targetAgeRange?: SortOrder
    preparationNotes?: SortOrder
    isPopular?: SortOrder
    isActive?: SortOrder
    imageUrl?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthPackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    price?: SortOrder
    promotionalPrice?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    targetGender?: SortOrder
    targetAgeRange?: SortOrder
    preparationNotes?: SortOrder
    isPopular?: SortOrder
    isActive?: SortOrder
    imageUrl?: SortOrder
    clinicId?: SortOrder
    specialtyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthPackageSumOrderByAggregateInput = {
    price?: SortOrder
    promotionalPrice?: SortOrder
  }

  export type HealthPackageScalarRelationFilter = {
    is?: HealthPackageWhereInput
    isNot?: HealthPackageWhereInput
  }

  export type PackageAvailabilityPackageIdDayOfWeekCompoundUniqueInput = {
    packageId: string
    dayOfWeek: number
  }

  export type PackageAvailabilityCountOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageAvailabilityAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
  }

  export type PackageAvailabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageAvailabilityMinOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    dayOfWeek?: SortOrder
    isActive?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageAvailabilitySumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    slotDurationMinutes?: SortOrder
    capacity?: SortOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    image?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    image?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    image?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorCreateNestedManyWithoutClinicInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
  }

  export type ClinicAdminCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicAdminCreateWithoutClinicInput, ClinicAdminUncheckedCreateWithoutClinicInput> | ClinicAdminCreateWithoutClinicInput[] | ClinicAdminUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicAdminCreateOrConnectWithoutClinicInput | ClinicAdminCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicAdminCreateManyClinicInputEnvelope
    connect?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
  }

  export type HealthPackageCreateNestedManyWithoutClinicInput = {
    create?: XOR<HealthPackageCreateWithoutClinicInput, HealthPackageUncheckedCreateWithoutClinicInput> | HealthPackageCreateWithoutClinicInput[] | HealthPackageUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutClinicInput | HealthPackageCreateOrConnectWithoutClinicInput[]
    createMany?: HealthPackageCreateManyClinicInputEnvelope
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
  }

  export type ClinicSpecialtyCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutClinicInput, ClinicSpecialtyUncheckedCreateWithoutClinicInput> | ClinicSpecialtyCreateWithoutClinicInput[] | ClinicSpecialtyUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutClinicInput | ClinicSpecialtyCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicSpecialtyCreateManyClinicInputEnvelope
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
  }

  export type ClinicWorkingHourCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicWorkingHourCreateWithoutClinicInput, ClinicWorkingHourUncheckedCreateWithoutClinicInput> | ClinicWorkingHourCreateWithoutClinicInput[] | ClinicWorkingHourUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicWorkingHourCreateOrConnectWithoutClinicInput | ClinicWorkingHourCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicWorkingHourCreateManyClinicInputEnvelope
    connect?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
  }

  export type ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput> | ClinicSpecialtyScheduleCreateWithoutClinicInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicInputEnvelope
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
  }

  export type DoctorUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
  }

  export type ClinicAdminUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicAdminCreateWithoutClinicInput, ClinicAdminUncheckedCreateWithoutClinicInput> | ClinicAdminCreateWithoutClinicInput[] | ClinicAdminUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicAdminCreateOrConnectWithoutClinicInput | ClinicAdminCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicAdminCreateManyClinicInputEnvelope
    connect?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
  }

  export type HealthPackageUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<HealthPackageCreateWithoutClinicInput, HealthPackageUncheckedCreateWithoutClinicInput> | HealthPackageCreateWithoutClinicInput[] | HealthPackageUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutClinicInput | HealthPackageCreateOrConnectWithoutClinicInput[]
    createMany?: HealthPackageCreateManyClinicInputEnvelope
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
  }

  export type ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutClinicInput, ClinicSpecialtyUncheckedCreateWithoutClinicInput> | ClinicSpecialtyCreateWithoutClinicInput[] | ClinicSpecialtyUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutClinicInput | ClinicSpecialtyCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicSpecialtyCreateManyClinicInputEnvelope
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
  }

  export type ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicWorkingHourCreateWithoutClinicInput, ClinicWorkingHourUncheckedCreateWithoutClinicInput> | ClinicWorkingHourCreateWithoutClinicInput[] | ClinicWorkingHourUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicWorkingHourCreateOrConnectWithoutClinicInput | ClinicWorkingHourCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicWorkingHourCreateManyClinicInputEnvelope
    connect?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
  }

  export type ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput> | ClinicSpecialtyScheduleCreateWithoutClinicInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicInputEnvelope
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DoctorUpdateManyWithoutClinicNestedInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    upsert?: DoctorUpsertWithWhereUniqueWithoutClinicInput | DoctorUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    set?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    disconnect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    delete?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    update?: DoctorUpdateWithWhereUniqueWithoutClinicInput | DoctorUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: DoctorUpdateManyWithWhereWithoutClinicInput | DoctorUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
  }

  export type ClinicAdminUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicAdminCreateWithoutClinicInput, ClinicAdminUncheckedCreateWithoutClinicInput> | ClinicAdminCreateWithoutClinicInput[] | ClinicAdminUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicAdminCreateOrConnectWithoutClinicInput | ClinicAdminCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicAdminUpsertWithWhereUniqueWithoutClinicInput | ClinicAdminUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicAdminCreateManyClinicInputEnvelope
    set?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    disconnect?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    delete?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    connect?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    update?: ClinicAdminUpdateWithWhereUniqueWithoutClinicInput | ClinicAdminUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicAdminUpdateManyWithWhereWithoutClinicInput | ClinicAdminUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicAdminScalarWhereInput | ClinicAdminScalarWhereInput[]
  }

  export type HealthPackageUpdateManyWithoutClinicNestedInput = {
    create?: XOR<HealthPackageCreateWithoutClinicInput, HealthPackageUncheckedCreateWithoutClinicInput> | HealthPackageCreateWithoutClinicInput[] | HealthPackageUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutClinicInput | HealthPackageCreateOrConnectWithoutClinicInput[]
    upsert?: HealthPackageUpsertWithWhereUniqueWithoutClinicInput | HealthPackageUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: HealthPackageCreateManyClinicInputEnvelope
    set?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    disconnect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    delete?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    update?: HealthPackageUpdateWithWhereUniqueWithoutClinicInput | HealthPackageUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: HealthPackageUpdateManyWithWhereWithoutClinicInput | HealthPackageUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: HealthPackageScalarWhereInput | HealthPackageScalarWhereInput[]
  }

  export type ClinicSpecialtyUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutClinicInput, ClinicSpecialtyUncheckedCreateWithoutClinicInput> | ClinicSpecialtyCreateWithoutClinicInput[] | ClinicSpecialtyUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutClinicInput | ClinicSpecialtyCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicSpecialtyUpsertWithWhereUniqueWithoutClinicInput | ClinicSpecialtyUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicSpecialtyCreateManyClinicInputEnvelope
    set?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    disconnect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    delete?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    update?: ClinicSpecialtyUpdateWithWhereUniqueWithoutClinicInput | ClinicSpecialtyUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicSpecialtyUpdateManyWithWhereWithoutClinicInput | ClinicSpecialtyUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicSpecialtyScalarWhereInput | ClinicSpecialtyScalarWhereInput[]
  }

  export type ClinicWorkingHourUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicWorkingHourCreateWithoutClinicInput, ClinicWorkingHourUncheckedCreateWithoutClinicInput> | ClinicWorkingHourCreateWithoutClinicInput[] | ClinicWorkingHourUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicWorkingHourCreateOrConnectWithoutClinicInput | ClinicWorkingHourCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicWorkingHourUpsertWithWhereUniqueWithoutClinicInput | ClinicWorkingHourUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicWorkingHourCreateManyClinicInputEnvelope
    set?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    disconnect?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    delete?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    connect?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    update?: ClinicWorkingHourUpdateWithWhereUniqueWithoutClinicInput | ClinicWorkingHourUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicWorkingHourUpdateManyWithWhereWithoutClinicInput | ClinicWorkingHourUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicWorkingHourScalarWhereInput | ClinicWorkingHourScalarWhereInput[]
  }

  export type ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput> | ClinicSpecialtyScheduleCreateWithoutClinicInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicInput | ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicInputEnvelope
    set?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    disconnect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    delete?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    update?: ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicInput | ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicInput | ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
  }

  export type DoctorUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    upsert?: DoctorUpsertWithWhereUniqueWithoutClinicInput | DoctorUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    set?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    disconnect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    delete?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    update?: DoctorUpdateWithWhereUniqueWithoutClinicInput | DoctorUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: DoctorUpdateManyWithWhereWithoutClinicInput | DoctorUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
  }

  export type ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicAdminCreateWithoutClinicInput, ClinicAdminUncheckedCreateWithoutClinicInput> | ClinicAdminCreateWithoutClinicInput[] | ClinicAdminUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicAdminCreateOrConnectWithoutClinicInput | ClinicAdminCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicAdminUpsertWithWhereUniqueWithoutClinicInput | ClinicAdminUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicAdminCreateManyClinicInputEnvelope
    set?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    disconnect?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    delete?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    connect?: ClinicAdminWhereUniqueInput | ClinicAdminWhereUniqueInput[]
    update?: ClinicAdminUpdateWithWhereUniqueWithoutClinicInput | ClinicAdminUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicAdminUpdateManyWithWhereWithoutClinicInput | ClinicAdminUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicAdminScalarWhereInput | ClinicAdminScalarWhereInput[]
  }

  export type HealthPackageUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<HealthPackageCreateWithoutClinicInput, HealthPackageUncheckedCreateWithoutClinicInput> | HealthPackageCreateWithoutClinicInput[] | HealthPackageUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutClinicInput | HealthPackageCreateOrConnectWithoutClinicInput[]
    upsert?: HealthPackageUpsertWithWhereUniqueWithoutClinicInput | HealthPackageUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: HealthPackageCreateManyClinicInputEnvelope
    set?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    disconnect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    delete?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    update?: HealthPackageUpdateWithWhereUniqueWithoutClinicInput | HealthPackageUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: HealthPackageUpdateManyWithWhereWithoutClinicInput | HealthPackageUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: HealthPackageScalarWhereInput | HealthPackageScalarWhereInput[]
  }

  export type ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutClinicInput, ClinicSpecialtyUncheckedCreateWithoutClinicInput> | ClinicSpecialtyCreateWithoutClinicInput[] | ClinicSpecialtyUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutClinicInput | ClinicSpecialtyCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicSpecialtyUpsertWithWhereUniqueWithoutClinicInput | ClinicSpecialtyUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicSpecialtyCreateManyClinicInputEnvelope
    set?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    disconnect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    delete?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    update?: ClinicSpecialtyUpdateWithWhereUniqueWithoutClinicInput | ClinicSpecialtyUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicSpecialtyUpdateManyWithWhereWithoutClinicInput | ClinicSpecialtyUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicSpecialtyScalarWhereInput | ClinicSpecialtyScalarWhereInput[]
  }

  export type ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicWorkingHourCreateWithoutClinicInput, ClinicWorkingHourUncheckedCreateWithoutClinicInput> | ClinicWorkingHourCreateWithoutClinicInput[] | ClinicWorkingHourUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicWorkingHourCreateOrConnectWithoutClinicInput | ClinicWorkingHourCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicWorkingHourUpsertWithWhereUniqueWithoutClinicInput | ClinicWorkingHourUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicWorkingHourCreateManyClinicInputEnvelope
    set?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    disconnect?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    delete?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    connect?: ClinicWorkingHourWhereUniqueInput | ClinicWorkingHourWhereUniqueInput[]
    update?: ClinicWorkingHourUpdateWithWhereUniqueWithoutClinicInput | ClinicWorkingHourUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicWorkingHourUpdateManyWithWhereWithoutClinicInput | ClinicWorkingHourUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicWorkingHourScalarWhereInput | ClinicWorkingHourScalarWhereInput[]
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput> | ClinicSpecialtyScheduleCreateWithoutClinicInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicInput | ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicInputEnvelope
    set?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    disconnect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    delete?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    update?: ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicInput | ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicInput | ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
  }

  export type ClinicCreateNestedOneWithoutClinicAdminsInput = {
    create?: XOR<ClinicCreateWithoutClinicAdminsInput, ClinicUncheckedCreateWithoutClinicAdminsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutClinicAdminsInput
    connect?: ClinicWhereUniqueInput
  }

  export type ClinicUpdateOneRequiredWithoutClinicAdminsNestedInput = {
    create?: XOR<ClinicCreateWithoutClinicAdminsInput, ClinicUncheckedCreateWithoutClinicAdminsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutClinicAdminsInput
    upsert?: ClinicUpsertWithoutClinicAdminsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutClinicAdminsInput, ClinicUpdateWithoutClinicAdminsInput>, ClinicUncheckedUpdateWithoutClinicAdminsInput>
  }

  export type ClinicCreateNestedOneWithoutWorkingHoursInput = {
    create?: XOR<ClinicCreateWithoutWorkingHoursInput, ClinicUncheckedCreateWithoutWorkingHoursInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutWorkingHoursInput
    connect?: ClinicWhereUniqueInput
  }

  export type ClinicUpdateOneRequiredWithoutWorkingHoursNestedInput = {
    create?: XOR<ClinicCreateWithoutWorkingHoursInput, ClinicUncheckedCreateWithoutWorkingHoursInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutWorkingHoursInput
    upsert?: ClinicUpsertWithoutWorkingHoursInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutWorkingHoursInput, ClinicUpdateWithoutWorkingHoursInput>, ClinicUncheckedUpdateWithoutWorkingHoursInput>
  }

  export type DoctorCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<DoctorCreateWithoutSpecialtyInput, DoctorUncheckedCreateWithoutSpecialtyInput> | DoctorCreateWithoutSpecialtyInput[] | DoctorUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutSpecialtyInput | DoctorCreateOrConnectWithoutSpecialtyInput[]
    createMany?: DoctorCreateManySpecialtyInputEnvelope
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
  }

  export type ClinicSpecialtyCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutSpecialtyInput, ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyCreateWithoutSpecialtyInput[] | ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyCreateManySpecialtyInputEnvelope
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
  }

  export type ClinicSpecialtyScheduleCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManySpecialtyInputEnvelope
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
  }

  export type HealthPackageCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<HealthPackageCreateWithoutSpecialtyInput, HealthPackageUncheckedCreateWithoutSpecialtyInput> | HealthPackageCreateWithoutSpecialtyInput[] | HealthPackageUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutSpecialtyInput | HealthPackageCreateOrConnectWithoutSpecialtyInput[]
    createMany?: HealthPackageCreateManySpecialtyInputEnvelope
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
  }

  export type DoctorUncheckedCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<DoctorCreateWithoutSpecialtyInput, DoctorUncheckedCreateWithoutSpecialtyInput> | DoctorCreateWithoutSpecialtyInput[] | DoctorUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutSpecialtyInput | DoctorCreateOrConnectWithoutSpecialtyInput[]
    createMany?: DoctorCreateManySpecialtyInputEnvelope
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
  }

  export type ClinicSpecialtyUncheckedCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutSpecialtyInput, ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyCreateWithoutSpecialtyInput[] | ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyCreateManySpecialtyInputEnvelope
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
  }

  export type ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManySpecialtyInputEnvelope
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
  }

  export type HealthPackageUncheckedCreateNestedManyWithoutSpecialtyInput = {
    create?: XOR<HealthPackageCreateWithoutSpecialtyInput, HealthPackageUncheckedCreateWithoutSpecialtyInput> | HealthPackageCreateWithoutSpecialtyInput[] | HealthPackageUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutSpecialtyInput | HealthPackageCreateOrConnectWithoutSpecialtyInput[]
    createMany?: HealthPackageCreateManySpecialtyInputEnvelope
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
  }

  export type DoctorUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<DoctorCreateWithoutSpecialtyInput, DoctorUncheckedCreateWithoutSpecialtyInput> | DoctorCreateWithoutSpecialtyInput[] | DoctorUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutSpecialtyInput | DoctorCreateOrConnectWithoutSpecialtyInput[]
    upsert?: DoctorUpsertWithWhereUniqueWithoutSpecialtyInput | DoctorUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: DoctorCreateManySpecialtyInputEnvelope
    set?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    disconnect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    delete?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    update?: DoctorUpdateWithWhereUniqueWithoutSpecialtyInput | DoctorUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: DoctorUpdateManyWithWhereWithoutSpecialtyInput | DoctorUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
  }

  export type ClinicSpecialtyUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutSpecialtyInput, ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyCreateWithoutSpecialtyInput[] | ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput[]
    upsert?: ClinicSpecialtyUpsertWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyCreateManySpecialtyInputEnvelope
    set?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    disconnect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    delete?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    update?: ClinicSpecialtyUpdateWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: ClinicSpecialtyUpdateManyWithWhereWithoutSpecialtyInput | ClinicSpecialtyUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: ClinicSpecialtyScalarWhereInput | ClinicSpecialtyScalarWhereInput[]
  }

  export type ClinicSpecialtyScheduleUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput[]
    upsert?: ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManySpecialtyInputEnvelope
    set?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    disconnect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    delete?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    update?: ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: ClinicSpecialtyScheduleUpdateManyWithWhereWithoutSpecialtyInput | ClinicSpecialtyScheduleUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
  }

  export type HealthPackageUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<HealthPackageCreateWithoutSpecialtyInput, HealthPackageUncheckedCreateWithoutSpecialtyInput> | HealthPackageCreateWithoutSpecialtyInput[] | HealthPackageUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutSpecialtyInput | HealthPackageCreateOrConnectWithoutSpecialtyInput[]
    upsert?: HealthPackageUpsertWithWhereUniqueWithoutSpecialtyInput | HealthPackageUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: HealthPackageCreateManySpecialtyInputEnvelope
    set?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    disconnect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    delete?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    update?: HealthPackageUpdateWithWhereUniqueWithoutSpecialtyInput | HealthPackageUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: HealthPackageUpdateManyWithWhereWithoutSpecialtyInput | HealthPackageUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: HealthPackageScalarWhereInput | HealthPackageScalarWhereInput[]
  }

  export type DoctorUncheckedUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<DoctorCreateWithoutSpecialtyInput, DoctorUncheckedCreateWithoutSpecialtyInput> | DoctorCreateWithoutSpecialtyInput[] | DoctorUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutSpecialtyInput | DoctorCreateOrConnectWithoutSpecialtyInput[]
    upsert?: DoctorUpsertWithWhereUniqueWithoutSpecialtyInput | DoctorUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: DoctorCreateManySpecialtyInputEnvelope
    set?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    disconnect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    delete?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    update?: DoctorUpdateWithWhereUniqueWithoutSpecialtyInput | DoctorUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: DoctorUpdateManyWithWhereWithoutSpecialtyInput | DoctorUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
  }

  export type ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutSpecialtyInput, ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyCreateWithoutSpecialtyInput[] | ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput[]
    upsert?: ClinicSpecialtyUpsertWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyCreateManySpecialtyInputEnvelope
    set?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    disconnect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    delete?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    connect?: ClinicSpecialtyWhereUniqueInput | ClinicSpecialtyWhereUniqueInput[]
    update?: ClinicSpecialtyUpdateWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: ClinicSpecialtyUpdateManyWithWhereWithoutSpecialtyInput | ClinicSpecialtyUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: ClinicSpecialtyScalarWhereInput | ClinicSpecialtyScalarWhereInput[]
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput[]
    upsert?: ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManySpecialtyInputEnvelope
    set?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    disconnect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    delete?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    update?: ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutSpecialtyInput | ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: ClinicSpecialtyScheduleUpdateManyWithWhereWithoutSpecialtyInput | ClinicSpecialtyScheduleUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
  }

  export type HealthPackageUncheckedUpdateManyWithoutSpecialtyNestedInput = {
    create?: XOR<HealthPackageCreateWithoutSpecialtyInput, HealthPackageUncheckedCreateWithoutSpecialtyInput> | HealthPackageCreateWithoutSpecialtyInput[] | HealthPackageUncheckedCreateWithoutSpecialtyInput[]
    connectOrCreate?: HealthPackageCreateOrConnectWithoutSpecialtyInput | HealthPackageCreateOrConnectWithoutSpecialtyInput[]
    upsert?: HealthPackageUpsertWithWhereUniqueWithoutSpecialtyInput | HealthPackageUpsertWithWhereUniqueWithoutSpecialtyInput[]
    createMany?: HealthPackageCreateManySpecialtyInputEnvelope
    set?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    disconnect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    delete?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    connect?: HealthPackageWhereUniqueInput | HealthPackageWhereUniqueInput[]
    update?: HealthPackageUpdateWithWhereUniqueWithoutSpecialtyInput | HealthPackageUpdateWithWhereUniqueWithoutSpecialtyInput[]
    updateMany?: HealthPackageUpdateManyWithWhereWithoutSpecialtyInput | HealthPackageUpdateManyWithWhereWithoutSpecialtyInput[]
    deleteMany?: HealthPackageScalarWhereInput | HealthPackageScalarWhereInput[]
  }

  export type ClinicCreateNestedOneWithoutSpecialtiesInput = {
    create?: XOR<ClinicCreateWithoutSpecialtiesInput, ClinicUncheckedCreateWithoutSpecialtiesInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutSpecialtiesInput
    connect?: ClinicWhereUniqueInput
  }

  export type SpecialtyCreateNestedOneWithoutClinicsInput = {
    create?: XOR<SpecialtyCreateWithoutClinicsInput, SpecialtyUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutClinicsInput
    connect?: SpecialtyWhereUniqueInput
  }

  export type ClinicSpecialtyScheduleCreateNestedManyWithoutClinicSpecialtyInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicSpecialtyInputEnvelope
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
  }

  export type ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicSpecialtyInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicSpecialtyInputEnvelope
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
  }

  export type ClinicUpdateOneRequiredWithoutSpecialtiesNestedInput = {
    create?: XOR<ClinicCreateWithoutSpecialtiesInput, ClinicUncheckedCreateWithoutSpecialtiesInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutSpecialtiesInput
    upsert?: ClinicUpsertWithoutSpecialtiesInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutSpecialtiesInput, ClinicUpdateWithoutSpecialtiesInput>, ClinicUncheckedUpdateWithoutSpecialtiesInput>
  }

  export type SpecialtyUpdateOneRequiredWithoutClinicsNestedInput = {
    create?: XOR<SpecialtyCreateWithoutClinicsInput, SpecialtyUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutClinicsInput
    upsert?: SpecialtyUpsertWithoutClinicsInput
    connect?: SpecialtyWhereUniqueInput
    update?: XOR<XOR<SpecialtyUpdateToOneWithWhereWithoutClinicsInput, SpecialtyUpdateWithoutClinicsInput>, SpecialtyUncheckedUpdateWithoutClinicsInput>
  }

  export type ClinicSpecialtyScheduleUpdateManyWithoutClinicSpecialtyNestedInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput[]
    upsert?: ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicSpecialtyInputEnvelope
    set?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    disconnect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    delete?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    update?: ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicSpecialtyInput[]
    updateMany?: ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicSpecialtyInput[]
    deleteMany?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicSpecialtyNestedInput = {
    create?: XOR<ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput> | ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput[] | ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput[]
    connectOrCreate?: ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput[]
    upsert?: ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicSpecialtyInput[]
    createMany?: ClinicSpecialtyScheduleCreateManyClinicSpecialtyInputEnvelope
    set?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    disconnect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    delete?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    connect?: ClinicSpecialtyScheduleWhereUniqueInput | ClinicSpecialtyScheduleWhereUniqueInput[]
    update?: ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicSpecialtyInput[]
    updateMany?: ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicSpecialtyInput | ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicSpecialtyInput[]
    deleteMany?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
  }

  export type ClinicCreateNestedOneWithoutSpecialtySchedulesInput = {
    create?: XOR<ClinicCreateWithoutSpecialtySchedulesInput, ClinicUncheckedCreateWithoutSpecialtySchedulesInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutSpecialtySchedulesInput
    connect?: ClinicWhereUniqueInput
  }

  export type SpecialtyCreateNestedOneWithoutSpecialtySchedulesInput = {
    create?: XOR<SpecialtyCreateWithoutSpecialtySchedulesInput, SpecialtyUncheckedCreateWithoutSpecialtySchedulesInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutSpecialtySchedulesInput
    connect?: SpecialtyWhereUniqueInput
  }

  export type ClinicSpecialtyCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutSchedulesInput, ClinicSpecialtyUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutSchedulesInput
    connect?: ClinicSpecialtyWhereUniqueInput
  }

  export type ClinicUpdateOneRequiredWithoutSpecialtySchedulesNestedInput = {
    create?: XOR<ClinicCreateWithoutSpecialtySchedulesInput, ClinicUncheckedCreateWithoutSpecialtySchedulesInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutSpecialtySchedulesInput
    upsert?: ClinicUpsertWithoutSpecialtySchedulesInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutSpecialtySchedulesInput, ClinicUpdateWithoutSpecialtySchedulesInput>, ClinicUncheckedUpdateWithoutSpecialtySchedulesInput>
  }

  export type SpecialtyUpdateOneRequiredWithoutSpecialtySchedulesNestedInput = {
    create?: XOR<SpecialtyCreateWithoutSpecialtySchedulesInput, SpecialtyUncheckedCreateWithoutSpecialtySchedulesInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutSpecialtySchedulesInput
    upsert?: SpecialtyUpsertWithoutSpecialtySchedulesInput
    connect?: SpecialtyWhereUniqueInput
    update?: XOR<XOR<SpecialtyUpdateToOneWithWhereWithoutSpecialtySchedulesInput, SpecialtyUpdateWithoutSpecialtySchedulesInput>, SpecialtyUncheckedUpdateWithoutSpecialtySchedulesInput>
  }

  export type ClinicSpecialtyUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<ClinicSpecialtyCreateWithoutSchedulesInput, ClinicSpecialtyUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ClinicSpecialtyCreateOrConnectWithoutSchedulesInput
    upsert?: ClinicSpecialtyUpsertWithoutSchedulesInput
    connect?: ClinicSpecialtyWhereUniqueInput
    update?: XOR<XOR<ClinicSpecialtyUpdateToOneWithWhereWithoutSchedulesInput, ClinicSpecialtyUpdateWithoutSchedulesInput>, ClinicSpecialtyUncheckedUpdateWithoutSchedulesInput>
  }

  export type ClinicCreateNestedOneWithoutDoctorsInput = {
    create?: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutDoctorsInput
    connect?: ClinicWhereUniqueInput
  }

  export type SpecialtyCreateNestedOneWithoutDoctorsInput = {
    create?: XOR<SpecialtyCreateWithoutDoctorsInput, SpecialtyUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutDoctorsInput
    connect?: SpecialtyWhereUniqueInput
  }

  export type ClinicUpdateOneRequiredWithoutDoctorsNestedInput = {
    create?: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutDoctorsInput
    upsert?: ClinicUpsertWithoutDoctorsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutDoctorsInput, ClinicUpdateWithoutDoctorsInput>, ClinicUncheckedUpdateWithoutDoctorsInput>
  }

  export type SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput = {
    create?: XOR<SpecialtyCreateWithoutDoctorsInput, SpecialtyUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutDoctorsInput
    upsert?: SpecialtyUpsertWithoutDoctorsInput
    connect?: SpecialtyWhereUniqueInput
    update?: XOR<XOR<SpecialtyUpdateToOneWithWhereWithoutDoctorsInput, SpecialtyUpdateWithoutDoctorsInput>, SpecialtyUncheckedUpdateWithoutDoctorsInput>
  }

  export type HealthPackageCreatefeaturesInput = {
    set: string[]
  }

  export type ClinicCreateNestedOneWithoutHealthPackagesInput = {
    create?: XOR<ClinicCreateWithoutHealthPackagesInput, ClinicUncheckedCreateWithoutHealthPackagesInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutHealthPackagesInput
    connect?: ClinicWhereUniqueInput
  }

  export type SpecialtyCreateNestedOneWithoutHealthPackagesInput = {
    create?: XOR<SpecialtyCreateWithoutHealthPackagesInput, SpecialtyUncheckedCreateWithoutHealthPackagesInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutHealthPackagesInput
    connect?: SpecialtyWhereUniqueInput
  }

  export type PackageAvailabilityCreateNestedManyWithoutHealthPackageInput = {
    create?: XOR<PackageAvailabilityCreateWithoutHealthPackageInput, PackageAvailabilityUncheckedCreateWithoutHealthPackageInput> | PackageAvailabilityCreateWithoutHealthPackageInput[] | PackageAvailabilityUncheckedCreateWithoutHealthPackageInput[]
    connectOrCreate?: PackageAvailabilityCreateOrConnectWithoutHealthPackageInput | PackageAvailabilityCreateOrConnectWithoutHealthPackageInput[]
    createMany?: PackageAvailabilityCreateManyHealthPackageInputEnvelope
    connect?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
  }

  export type PackageAvailabilityUncheckedCreateNestedManyWithoutHealthPackageInput = {
    create?: XOR<PackageAvailabilityCreateWithoutHealthPackageInput, PackageAvailabilityUncheckedCreateWithoutHealthPackageInput> | PackageAvailabilityCreateWithoutHealthPackageInput[] | PackageAvailabilityUncheckedCreateWithoutHealthPackageInput[]
    connectOrCreate?: PackageAvailabilityCreateOrConnectWithoutHealthPackageInput | PackageAvailabilityCreateOrConnectWithoutHealthPackageInput[]
    createMany?: PackageAvailabilityCreateManyHealthPackageInputEnvelope
    connect?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
  }

  export type HealthPackageUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ClinicUpdateOneWithoutHealthPackagesNestedInput = {
    create?: XOR<ClinicCreateWithoutHealthPackagesInput, ClinicUncheckedCreateWithoutHealthPackagesInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutHealthPackagesInput
    upsert?: ClinicUpsertWithoutHealthPackagesInput
    disconnect?: ClinicWhereInput | boolean
    delete?: ClinicWhereInput | boolean
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutHealthPackagesInput, ClinicUpdateWithoutHealthPackagesInput>, ClinicUncheckedUpdateWithoutHealthPackagesInput>
  }

  export type SpecialtyUpdateOneWithoutHealthPackagesNestedInput = {
    create?: XOR<SpecialtyCreateWithoutHealthPackagesInput, SpecialtyUncheckedCreateWithoutHealthPackagesInput>
    connectOrCreate?: SpecialtyCreateOrConnectWithoutHealthPackagesInput
    upsert?: SpecialtyUpsertWithoutHealthPackagesInput
    disconnect?: SpecialtyWhereInput | boolean
    delete?: SpecialtyWhereInput | boolean
    connect?: SpecialtyWhereUniqueInput
    update?: XOR<XOR<SpecialtyUpdateToOneWithWhereWithoutHealthPackagesInput, SpecialtyUpdateWithoutHealthPackagesInput>, SpecialtyUncheckedUpdateWithoutHealthPackagesInput>
  }

  export type PackageAvailabilityUpdateManyWithoutHealthPackageNestedInput = {
    create?: XOR<PackageAvailabilityCreateWithoutHealthPackageInput, PackageAvailabilityUncheckedCreateWithoutHealthPackageInput> | PackageAvailabilityCreateWithoutHealthPackageInput[] | PackageAvailabilityUncheckedCreateWithoutHealthPackageInput[]
    connectOrCreate?: PackageAvailabilityCreateOrConnectWithoutHealthPackageInput | PackageAvailabilityCreateOrConnectWithoutHealthPackageInput[]
    upsert?: PackageAvailabilityUpsertWithWhereUniqueWithoutHealthPackageInput | PackageAvailabilityUpsertWithWhereUniqueWithoutHealthPackageInput[]
    createMany?: PackageAvailabilityCreateManyHealthPackageInputEnvelope
    set?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    disconnect?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    delete?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    connect?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    update?: PackageAvailabilityUpdateWithWhereUniqueWithoutHealthPackageInput | PackageAvailabilityUpdateWithWhereUniqueWithoutHealthPackageInput[]
    updateMany?: PackageAvailabilityUpdateManyWithWhereWithoutHealthPackageInput | PackageAvailabilityUpdateManyWithWhereWithoutHealthPackageInput[]
    deleteMany?: PackageAvailabilityScalarWhereInput | PackageAvailabilityScalarWhereInput[]
  }

  export type PackageAvailabilityUncheckedUpdateManyWithoutHealthPackageNestedInput = {
    create?: XOR<PackageAvailabilityCreateWithoutHealthPackageInput, PackageAvailabilityUncheckedCreateWithoutHealthPackageInput> | PackageAvailabilityCreateWithoutHealthPackageInput[] | PackageAvailabilityUncheckedCreateWithoutHealthPackageInput[]
    connectOrCreate?: PackageAvailabilityCreateOrConnectWithoutHealthPackageInput | PackageAvailabilityCreateOrConnectWithoutHealthPackageInput[]
    upsert?: PackageAvailabilityUpsertWithWhereUniqueWithoutHealthPackageInput | PackageAvailabilityUpsertWithWhereUniqueWithoutHealthPackageInput[]
    createMany?: PackageAvailabilityCreateManyHealthPackageInputEnvelope
    set?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    disconnect?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    delete?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    connect?: PackageAvailabilityWhereUniqueInput | PackageAvailabilityWhereUniqueInput[]
    update?: PackageAvailabilityUpdateWithWhereUniqueWithoutHealthPackageInput | PackageAvailabilityUpdateWithWhereUniqueWithoutHealthPackageInput[]
    updateMany?: PackageAvailabilityUpdateManyWithWhereWithoutHealthPackageInput | PackageAvailabilityUpdateManyWithWhereWithoutHealthPackageInput[]
    deleteMany?: PackageAvailabilityScalarWhereInput | PackageAvailabilityScalarWhereInput[]
  }

  export type HealthPackageCreateNestedOneWithoutAvailabilitiesInput = {
    create?: XOR<HealthPackageCreateWithoutAvailabilitiesInput, HealthPackageUncheckedCreateWithoutAvailabilitiesInput>
    connectOrCreate?: HealthPackageCreateOrConnectWithoutAvailabilitiesInput
    connect?: HealthPackageWhereUniqueInput
  }

  export type HealthPackageUpdateOneRequiredWithoutAvailabilitiesNestedInput = {
    create?: XOR<HealthPackageCreateWithoutAvailabilitiesInput, HealthPackageUncheckedCreateWithoutAvailabilitiesInput>
    connectOrCreate?: HealthPackageCreateOrConnectWithoutAvailabilitiesInput
    upsert?: HealthPackageUpsertWithoutAvailabilitiesInput
    connect?: HealthPackageWhereUniqueInput
    update?: XOR<XOR<HealthPackageUpdateToOneWithWhereWithoutAvailabilitiesInput, HealthPackageUpdateWithoutAvailabilitiesInput>, HealthPackageUncheckedUpdateWithoutAvailabilitiesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DoctorCreateWithoutClinicInput = {
    id?: string
    userId?: string | null
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    specialty: SpecialtyCreateNestedOneWithoutDoctorsInput
  }

  export type DoctorUncheckedCreateWithoutClinicInput = {
    id?: string
    userId?: string | null
    specialtyId: string
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorCreateOrConnectWithoutClinicInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput>
  }

  export type DoctorCreateManyClinicInputEnvelope = {
    data: DoctorCreateManyClinicInput | DoctorCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type ClinicAdminCreateWithoutClinicInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicAdminUncheckedCreateWithoutClinicInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicAdminCreateOrConnectWithoutClinicInput = {
    where: ClinicAdminWhereUniqueInput
    create: XOR<ClinicAdminCreateWithoutClinicInput, ClinicAdminUncheckedCreateWithoutClinicInput>
  }

  export type ClinicAdminCreateManyClinicInputEnvelope = {
    data: ClinicAdminCreateManyClinicInput | ClinicAdminCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type HealthPackageCreateWithoutClinicInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    specialty?: SpecialtyCreateNestedOneWithoutHealthPackagesInput
    availabilities?: PackageAvailabilityCreateNestedManyWithoutHealthPackageInput
  }

  export type HealthPackageUncheckedCreateWithoutClinicInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    specialtyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    availabilities?: PackageAvailabilityUncheckedCreateNestedManyWithoutHealthPackageInput
  }

  export type HealthPackageCreateOrConnectWithoutClinicInput = {
    where: HealthPackageWhereUniqueInput
    create: XOR<HealthPackageCreateWithoutClinicInput, HealthPackageUncheckedCreateWithoutClinicInput>
  }

  export type HealthPackageCreateManyClinicInputEnvelope = {
    data: HealthPackageCreateManyClinicInput | HealthPackageCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type ClinicSpecialtyCreateWithoutClinicInput = {
    createdAt?: Date | string
    specialty: SpecialtyCreateNestedOneWithoutClinicsInput
    schedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicSpecialtyInput
  }

  export type ClinicSpecialtyUncheckedCreateWithoutClinicInput = {
    specialtyId: string
    createdAt?: Date | string
    schedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicSpecialtyInput
  }

  export type ClinicSpecialtyCreateOrConnectWithoutClinicInput = {
    where: ClinicSpecialtyWhereUniqueInput
    create: XOR<ClinicSpecialtyCreateWithoutClinicInput, ClinicSpecialtyUncheckedCreateWithoutClinicInput>
  }

  export type ClinicSpecialtyCreateManyClinicInputEnvelope = {
    data: ClinicSpecialtyCreateManyClinicInput | ClinicSpecialtyCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type ClinicWorkingHourCreateWithoutClinicInput = {
    id?: string
    dayOfWeek: number
    isOpen?: boolean
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicWorkingHourUncheckedCreateWithoutClinicInput = {
    id?: string
    dayOfWeek: number
    isOpen?: boolean
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicWorkingHourCreateOrConnectWithoutClinicInput = {
    where: ClinicWorkingHourWhereUniqueInput
    create: XOR<ClinicWorkingHourCreateWithoutClinicInput, ClinicWorkingHourUncheckedCreateWithoutClinicInput>
  }

  export type ClinicWorkingHourCreateManyClinicInputEnvelope = {
    data: ClinicWorkingHourCreateManyClinicInput | ClinicWorkingHourCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type ClinicSpecialtyScheduleCreateWithoutClinicInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    specialty: SpecialtyCreateNestedOneWithoutSpecialtySchedulesInput
    clinicSpecialty: ClinicSpecialtyCreateNestedOneWithoutSchedulesInput
  }

  export type ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput = {
    id?: string
    specialtyId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleCreateOrConnectWithoutClinicInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    create: XOR<ClinicSpecialtyScheduleCreateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput>
  }

  export type ClinicSpecialtyScheduleCreateManyClinicInputEnvelope = {
    data: ClinicSpecialtyScheduleCreateManyClinicInput | ClinicSpecialtyScheduleCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type DoctorUpsertWithWhereUniqueWithoutClinicInput = {
    where: DoctorWhereUniqueInput
    update: XOR<DoctorUpdateWithoutClinicInput, DoctorUncheckedUpdateWithoutClinicInput>
    create: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput>
  }

  export type DoctorUpdateWithWhereUniqueWithoutClinicInput = {
    where: DoctorWhereUniqueInput
    data: XOR<DoctorUpdateWithoutClinicInput, DoctorUncheckedUpdateWithoutClinicInput>
  }

  export type DoctorUpdateManyWithWhereWithoutClinicInput = {
    where: DoctorScalarWhereInput
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyWithoutClinicInput>
  }

  export type DoctorScalarWhereInput = {
    AND?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
    OR?: DoctorScalarWhereInput[]
    NOT?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
    id?: StringFilter<"Doctor"> | string
    userId?: StringNullableFilter<"Doctor"> | string | null
    clinicId?: StringFilter<"Doctor"> | string
    specialtyId?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    qualifications?: JsonNullableFilter<"Doctor">
    experience?: IntFilter<"Doctor"> | number
    avatar?: StringNullableFilter<"Doctor"> | string | null
    bio?: StringNullableFilter<"Doctor"> | string | null
    isAvailable?: BoolFilter<"Doctor"> | boolean
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
  }

  export type ClinicAdminUpsertWithWhereUniqueWithoutClinicInput = {
    where: ClinicAdminWhereUniqueInput
    update: XOR<ClinicAdminUpdateWithoutClinicInput, ClinicAdminUncheckedUpdateWithoutClinicInput>
    create: XOR<ClinicAdminCreateWithoutClinicInput, ClinicAdminUncheckedCreateWithoutClinicInput>
  }

  export type ClinicAdminUpdateWithWhereUniqueWithoutClinicInput = {
    where: ClinicAdminWhereUniqueInput
    data: XOR<ClinicAdminUpdateWithoutClinicInput, ClinicAdminUncheckedUpdateWithoutClinicInput>
  }

  export type ClinicAdminUpdateManyWithWhereWithoutClinicInput = {
    where: ClinicAdminScalarWhereInput
    data: XOR<ClinicAdminUpdateManyMutationInput, ClinicAdminUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicAdminScalarWhereInput = {
    AND?: ClinicAdminScalarWhereInput | ClinicAdminScalarWhereInput[]
    OR?: ClinicAdminScalarWhereInput[]
    NOT?: ClinicAdminScalarWhereInput | ClinicAdminScalarWhereInput[]
    id?: StringFilter<"ClinicAdmin"> | string
    userId?: StringFilter<"ClinicAdmin"> | string
    clinicId?: StringFilter<"ClinicAdmin"> | string
    createdAt?: DateTimeFilter<"ClinicAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicAdmin"> | Date | string
  }

  export type HealthPackageUpsertWithWhereUniqueWithoutClinicInput = {
    where: HealthPackageWhereUniqueInput
    update: XOR<HealthPackageUpdateWithoutClinicInput, HealthPackageUncheckedUpdateWithoutClinicInput>
    create: XOR<HealthPackageCreateWithoutClinicInput, HealthPackageUncheckedCreateWithoutClinicInput>
  }

  export type HealthPackageUpdateWithWhereUniqueWithoutClinicInput = {
    where: HealthPackageWhereUniqueInput
    data: XOR<HealthPackageUpdateWithoutClinicInput, HealthPackageUncheckedUpdateWithoutClinicInput>
  }

  export type HealthPackageUpdateManyWithWhereWithoutClinicInput = {
    where: HealthPackageScalarWhereInput
    data: XOR<HealthPackageUpdateManyMutationInput, HealthPackageUncheckedUpdateManyWithoutClinicInput>
  }

  export type HealthPackageScalarWhereInput = {
    AND?: HealthPackageScalarWhereInput | HealthPackageScalarWhereInput[]
    OR?: HealthPackageScalarWhereInput[]
    NOT?: HealthPackageScalarWhereInput | HealthPackageScalarWhereInput[]
    id?: StringFilter<"HealthPackage"> | string
    name?: StringFilter<"HealthPackage"> | string
    shortDescription?: StringNullableFilter<"HealthPackage"> | string | null
    description?: StringFilter<"HealthPackage"> | string
    price?: DecimalFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string
    promotionalPrice?: DecimalNullableFilter<"HealthPackage"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"HealthPackage"> | string
    category?: StringFilter<"HealthPackage"> | string
    targetGender?: StringNullableFilter<"HealthPackage"> | string | null
    targetAgeRange?: StringNullableFilter<"HealthPackage"> | string | null
    preparationNotes?: StringNullableFilter<"HealthPackage"> | string | null
    isPopular?: BoolFilter<"HealthPackage"> | boolean
    isActive?: BoolFilter<"HealthPackage"> | boolean
    features?: StringNullableListFilter<"HealthPackage">
    imageUrl?: StringNullableFilter<"HealthPackage"> | string | null
    clinicId?: StringNullableFilter<"HealthPackage"> | string | null
    specialtyId?: StringNullableFilter<"HealthPackage"> | string | null
    createdAt?: DateTimeFilter<"HealthPackage"> | Date | string
    updatedAt?: DateTimeFilter<"HealthPackage"> | Date | string
  }

  export type ClinicSpecialtyUpsertWithWhereUniqueWithoutClinicInput = {
    where: ClinicSpecialtyWhereUniqueInput
    update: XOR<ClinicSpecialtyUpdateWithoutClinicInput, ClinicSpecialtyUncheckedUpdateWithoutClinicInput>
    create: XOR<ClinicSpecialtyCreateWithoutClinicInput, ClinicSpecialtyUncheckedCreateWithoutClinicInput>
  }

  export type ClinicSpecialtyUpdateWithWhereUniqueWithoutClinicInput = {
    where: ClinicSpecialtyWhereUniqueInput
    data: XOR<ClinicSpecialtyUpdateWithoutClinicInput, ClinicSpecialtyUncheckedUpdateWithoutClinicInput>
  }

  export type ClinicSpecialtyUpdateManyWithWhereWithoutClinicInput = {
    where: ClinicSpecialtyScalarWhereInput
    data: XOR<ClinicSpecialtyUpdateManyMutationInput, ClinicSpecialtyUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicSpecialtyScalarWhereInput = {
    AND?: ClinicSpecialtyScalarWhereInput | ClinicSpecialtyScalarWhereInput[]
    OR?: ClinicSpecialtyScalarWhereInput[]
    NOT?: ClinicSpecialtyScalarWhereInput | ClinicSpecialtyScalarWhereInput[]
    clinicId?: StringFilter<"ClinicSpecialty"> | string
    specialtyId?: StringFilter<"ClinicSpecialty"> | string
    createdAt?: DateTimeFilter<"ClinicSpecialty"> | Date | string
  }

  export type ClinicWorkingHourUpsertWithWhereUniqueWithoutClinicInput = {
    where: ClinicWorkingHourWhereUniqueInput
    update: XOR<ClinicWorkingHourUpdateWithoutClinicInput, ClinicWorkingHourUncheckedUpdateWithoutClinicInput>
    create: XOR<ClinicWorkingHourCreateWithoutClinicInput, ClinicWorkingHourUncheckedCreateWithoutClinicInput>
  }

  export type ClinicWorkingHourUpdateWithWhereUniqueWithoutClinicInput = {
    where: ClinicWorkingHourWhereUniqueInput
    data: XOR<ClinicWorkingHourUpdateWithoutClinicInput, ClinicWorkingHourUncheckedUpdateWithoutClinicInput>
  }

  export type ClinicWorkingHourUpdateManyWithWhereWithoutClinicInput = {
    where: ClinicWorkingHourScalarWhereInput
    data: XOR<ClinicWorkingHourUpdateManyMutationInput, ClinicWorkingHourUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicWorkingHourScalarWhereInput = {
    AND?: ClinicWorkingHourScalarWhereInput | ClinicWorkingHourScalarWhereInput[]
    OR?: ClinicWorkingHourScalarWhereInput[]
    NOT?: ClinicWorkingHourScalarWhereInput | ClinicWorkingHourScalarWhereInput[]
    id?: StringFilter<"ClinicWorkingHour"> | string
    clinicId?: StringFilter<"ClinicWorkingHour"> | string
    dayOfWeek?: IntFilter<"ClinicWorkingHour"> | number
    isOpen?: BoolFilter<"ClinicWorkingHour"> | boolean
    startTime?: StringFilter<"ClinicWorkingHour"> | string
    endTime?: StringFilter<"ClinicWorkingHour"> | string
    createdAt?: DateTimeFilter<"ClinicWorkingHour"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicWorkingHour"> | Date | string
  }

  export type ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    update: XOR<ClinicSpecialtyScheduleUpdateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedUpdateWithoutClinicInput>
    create: XOR<ClinicSpecialtyScheduleCreateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicInput>
  }

  export type ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    data: XOR<ClinicSpecialtyScheduleUpdateWithoutClinicInput, ClinicSpecialtyScheduleUncheckedUpdateWithoutClinicInput>
  }

  export type ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicInput = {
    where: ClinicSpecialtyScheduleScalarWhereInput
    data: XOR<ClinicSpecialtyScheduleUpdateManyMutationInput, ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicSpecialtyScheduleScalarWhereInput = {
    AND?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
    OR?: ClinicSpecialtyScheduleScalarWhereInput[]
    NOT?: ClinicSpecialtyScheduleScalarWhereInput | ClinicSpecialtyScheduleScalarWhereInput[]
    id?: StringFilter<"ClinicSpecialtySchedule"> | string
    clinicId?: StringFilter<"ClinicSpecialtySchedule"> | string
    specialtyId?: StringFilter<"ClinicSpecialtySchedule"> | string
    dayOfWeek?: IntFilter<"ClinicSpecialtySchedule"> | number
    isActive?: BoolFilter<"ClinicSpecialtySchedule"> | boolean
    startTime?: StringFilter<"ClinicSpecialtySchedule"> | string
    endTime?: StringFilter<"ClinicSpecialtySchedule"> | string
    slotDurationMinutes?: IntFilter<"ClinicSpecialtySchedule"> | number
    capacity?: IntFilter<"ClinicSpecialtySchedule"> | number
    createdAt?: DateTimeFilter<"ClinicSpecialtySchedule"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicSpecialtySchedule"> | Date | string
  }

  export type ClinicCreateWithoutClinicAdminsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutClinicAdminsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutClinicAdminsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutClinicAdminsInput, ClinicUncheckedCreateWithoutClinicAdminsInput>
  }

  export type ClinicUpsertWithoutClinicAdminsInput = {
    update: XOR<ClinicUpdateWithoutClinicAdminsInput, ClinicUncheckedUpdateWithoutClinicAdminsInput>
    create: XOR<ClinicCreateWithoutClinicAdminsInput, ClinicUncheckedCreateWithoutClinicAdminsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutClinicAdminsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutClinicAdminsInput, ClinicUncheckedUpdateWithoutClinicAdminsInput>
  }

  export type ClinicUpdateWithoutClinicAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutClinicAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateWithoutWorkingHoursInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutWorkingHoursInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminUncheckedCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutWorkingHoursInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutWorkingHoursInput, ClinicUncheckedCreateWithoutWorkingHoursInput>
  }

  export type ClinicUpsertWithoutWorkingHoursInput = {
    update: XOR<ClinicUpdateWithoutWorkingHoursInput, ClinicUncheckedUpdateWithoutWorkingHoursInput>
    create: XOR<ClinicCreateWithoutWorkingHoursInput, ClinicUncheckedCreateWithoutWorkingHoursInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutWorkingHoursInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutWorkingHoursInput, ClinicUncheckedUpdateWithoutWorkingHoursInput>
  }

  export type ClinicUpdateWithoutWorkingHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutWorkingHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type DoctorCreateWithoutSpecialtyInput = {
    id?: string
    userId?: string | null
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutDoctorsInput
  }

  export type DoctorUncheckedCreateWithoutSpecialtyInput = {
    id?: string
    userId?: string | null
    clinicId: string
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorCreateOrConnectWithoutSpecialtyInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutSpecialtyInput, DoctorUncheckedCreateWithoutSpecialtyInput>
  }

  export type DoctorCreateManySpecialtyInputEnvelope = {
    data: DoctorCreateManySpecialtyInput | DoctorCreateManySpecialtyInput[]
    skipDuplicates?: boolean
  }

  export type ClinicSpecialtyCreateWithoutSpecialtyInput = {
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutSpecialtiesInput
    schedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicSpecialtyInput
  }

  export type ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput = {
    clinicId: string
    createdAt?: Date | string
    schedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicSpecialtyInput
  }

  export type ClinicSpecialtyCreateOrConnectWithoutSpecialtyInput = {
    where: ClinicSpecialtyWhereUniqueInput
    create: XOR<ClinicSpecialtyCreateWithoutSpecialtyInput, ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyCreateManySpecialtyInputEnvelope = {
    data: ClinicSpecialtyCreateManySpecialtyInput | ClinicSpecialtyCreateManySpecialtyInput[]
    skipDuplicates?: boolean
  }

  export type ClinicSpecialtyScheduleCreateWithoutSpecialtyInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutSpecialtySchedulesInput
    clinicSpecialty: ClinicSpecialtyCreateNestedOneWithoutSchedulesInput
  }

  export type ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput = {
    id?: string
    clinicId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleCreateOrConnectWithoutSpecialtyInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    create: XOR<ClinicSpecialtyScheduleCreateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleCreateManySpecialtyInputEnvelope = {
    data: ClinicSpecialtyScheduleCreateManySpecialtyInput | ClinicSpecialtyScheduleCreateManySpecialtyInput[]
    skipDuplicates?: boolean
  }

  export type HealthPackageCreateWithoutSpecialtyInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic?: ClinicCreateNestedOneWithoutHealthPackagesInput
    availabilities?: PackageAvailabilityCreateNestedManyWithoutHealthPackageInput
  }

  export type HealthPackageUncheckedCreateWithoutSpecialtyInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    clinicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    availabilities?: PackageAvailabilityUncheckedCreateNestedManyWithoutHealthPackageInput
  }

  export type HealthPackageCreateOrConnectWithoutSpecialtyInput = {
    where: HealthPackageWhereUniqueInput
    create: XOR<HealthPackageCreateWithoutSpecialtyInput, HealthPackageUncheckedCreateWithoutSpecialtyInput>
  }

  export type HealthPackageCreateManySpecialtyInputEnvelope = {
    data: HealthPackageCreateManySpecialtyInput | HealthPackageCreateManySpecialtyInput[]
    skipDuplicates?: boolean
  }

  export type DoctorUpsertWithWhereUniqueWithoutSpecialtyInput = {
    where: DoctorWhereUniqueInput
    update: XOR<DoctorUpdateWithoutSpecialtyInput, DoctorUncheckedUpdateWithoutSpecialtyInput>
    create: XOR<DoctorCreateWithoutSpecialtyInput, DoctorUncheckedCreateWithoutSpecialtyInput>
  }

  export type DoctorUpdateWithWhereUniqueWithoutSpecialtyInput = {
    where: DoctorWhereUniqueInput
    data: XOR<DoctorUpdateWithoutSpecialtyInput, DoctorUncheckedUpdateWithoutSpecialtyInput>
  }

  export type DoctorUpdateManyWithWhereWithoutSpecialtyInput = {
    where: DoctorScalarWhereInput
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyUpsertWithWhereUniqueWithoutSpecialtyInput = {
    where: ClinicSpecialtyWhereUniqueInput
    update: XOR<ClinicSpecialtyUpdateWithoutSpecialtyInput, ClinicSpecialtyUncheckedUpdateWithoutSpecialtyInput>
    create: XOR<ClinicSpecialtyCreateWithoutSpecialtyInput, ClinicSpecialtyUncheckedCreateWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyUpdateWithWhereUniqueWithoutSpecialtyInput = {
    where: ClinicSpecialtyWhereUniqueInput
    data: XOR<ClinicSpecialtyUpdateWithoutSpecialtyInput, ClinicSpecialtyUncheckedUpdateWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyUpdateManyWithWhereWithoutSpecialtyInput = {
    where: ClinicSpecialtyScalarWhereInput
    data: XOR<ClinicSpecialtyUpdateManyMutationInput, ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutSpecialtyInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    update: XOR<ClinicSpecialtyScheduleUpdateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedUpdateWithoutSpecialtyInput>
    create: XOR<ClinicSpecialtyScheduleCreateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutSpecialtyInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    data: XOR<ClinicSpecialtyScheduleUpdateWithoutSpecialtyInput, ClinicSpecialtyScheduleUncheckedUpdateWithoutSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleUpdateManyWithWhereWithoutSpecialtyInput = {
    where: ClinicSpecialtyScheduleScalarWhereInput
    data: XOR<ClinicSpecialtyScheduleUpdateManyMutationInput, ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyInput>
  }

  export type HealthPackageUpsertWithWhereUniqueWithoutSpecialtyInput = {
    where: HealthPackageWhereUniqueInput
    update: XOR<HealthPackageUpdateWithoutSpecialtyInput, HealthPackageUncheckedUpdateWithoutSpecialtyInput>
    create: XOR<HealthPackageCreateWithoutSpecialtyInput, HealthPackageUncheckedCreateWithoutSpecialtyInput>
  }

  export type HealthPackageUpdateWithWhereUniqueWithoutSpecialtyInput = {
    where: HealthPackageWhereUniqueInput
    data: XOR<HealthPackageUpdateWithoutSpecialtyInput, HealthPackageUncheckedUpdateWithoutSpecialtyInput>
  }

  export type HealthPackageUpdateManyWithWhereWithoutSpecialtyInput = {
    where: HealthPackageScalarWhereInput
    data: XOR<HealthPackageUpdateManyMutationInput, HealthPackageUncheckedUpdateManyWithoutSpecialtyInput>
  }

  export type ClinicCreateWithoutSpecialtiesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutSpecialtiesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminUncheckedCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutSpecialtiesInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutSpecialtiesInput, ClinicUncheckedCreateWithoutSpecialtiesInput>
  }

  export type SpecialtyCreateWithoutClinicsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyUncheckedCreateWithoutClinicsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyCreateOrConnectWithoutClinicsInput = {
    where: SpecialtyWhereUniqueInput
    create: XOR<SpecialtyCreateWithoutClinicsInput, SpecialtyUncheckedCreateWithoutClinicsInput>
  }

  export type ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutSpecialtySchedulesInput
    specialty: SpecialtyCreateNestedOneWithoutSpecialtySchedulesInput
  }

  export type ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleCreateOrConnectWithoutClinicSpecialtyInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    create: XOR<ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleCreateManyClinicSpecialtyInputEnvelope = {
    data: ClinicSpecialtyScheduleCreateManyClinicSpecialtyInput | ClinicSpecialtyScheduleCreateManyClinicSpecialtyInput[]
    skipDuplicates?: boolean
  }

  export type ClinicUpsertWithoutSpecialtiesInput = {
    update: XOR<ClinicUpdateWithoutSpecialtiesInput, ClinicUncheckedUpdateWithoutSpecialtiesInput>
    create: XOR<ClinicCreateWithoutSpecialtiesInput, ClinicUncheckedCreateWithoutSpecialtiesInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutSpecialtiesInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutSpecialtiesInput, ClinicUncheckedUpdateWithoutSpecialtiesInput>
  }

  export type ClinicUpdateWithoutSpecialtiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutSpecialtiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type SpecialtyUpsertWithoutClinicsInput = {
    update: XOR<SpecialtyUpdateWithoutClinicsInput, SpecialtyUncheckedUpdateWithoutClinicsInput>
    create: XOR<SpecialtyCreateWithoutClinicsInput, SpecialtyUncheckedCreateWithoutClinicsInput>
    where?: SpecialtyWhereInput
  }

  export type SpecialtyUpdateToOneWithWhereWithoutClinicsInput = {
    where?: SpecialtyWhereInput
    data: XOR<SpecialtyUpdateWithoutClinicsInput, SpecialtyUncheckedUpdateWithoutClinicsInput>
  }

  export type SpecialtyUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutSpecialtyNestedInput
  }

  export type SpecialtyUncheckedUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutSpecialtyNestedInput
  }

  export type ClinicSpecialtyScheduleUpsertWithWhereUniqueWithoutClinicSpecialtyInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    update: XOR<ClinicSpecialtyScheduleUpdateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedUpdateWithoutClinicSpecialtyInput>
    create: XOR<ClinicSpecialtyScheduleCreateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedCreateWithoutClinicSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleUpdateWithWhereUniqueWithoutClinicSpecialtyInput = {
    where: ClinicSpecialtyScheduleWhereUniqueInput
    data: XOR<ClinicSpecialtyScheduleUpdateWithoutClinicSpecialtyInput, ClinicSpecialtyScheduleUncheckedUpdateWithoutClinicSpecialtyInput>
  }

  export type ClinicSpecialtyScheduleUpdateManyWithWhereWithoutClinicSpecialtyInput = {
    where: ClinicSpecialtyScheduleScalarWhereInput
    data: XOR<ClinicSpecialtyScheduleUpdateManyMutationInput, ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicSpecialtyInput>
  }

  export type ClinicCreateWithoutSpecialtySchedulesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutSpecialtySchedulesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminUncheckedCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutSpecialtySchedulesInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutSpecialtySchedulesInput, ClinicUncheckedCreateWithoutSpecialtySchedulesInput>
  }

  export type SpecialtyCreateWithoutSpecialtySchedulesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutSpecialtyInput
    clinics?: ClinicSpecialtyCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyUncheckedCreateWithoutSpecialtySchedulesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutSpecialtyInput
    clinics?: ClinicSpecialtyUncheckedCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyCreateOrConnectWithoutSpecialtySchedulesInput = {
    where: SpecialtyWhereUniqueInput
    create: XOR<SpecialtyCreateWithoutSpecialtySchedulesInput, SpecialtyUncheckedCreateWithoutSpecialtySchedulesInput>
  }

  export type ClinicSpecialtyCreateWithoutSchedulesInput = {
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutSpecialtiesInput
    specialty: SpecialtyCreateNestedOneWithoutClinicsInput
  }

  export type ClinicSpecialtyUncheckedCreateWithoutSchedulesInput = {
    clinicId: string
    specialtyId: string
    createdAt?: Date | string
  }

  export type ClinicSpecialtyCreateOrConnectWithoutSchedulesInput = {
    where: ClinicSpecialtyWhereUniqueInput
    create: XOR<ClinicSpecialtyCreateWithoutSchedulesInput, ClinicSpecialtyUncheckedCreateWithoutSchedulesInput>
  }

  export type ClinicUpsertWithoutSpecialtySchedulesInput = {
    update: XOR<ClinicUpdateWithoutSpecialtySchedulesInput, ClinicUncheckedUpdateWithoutSpecialtySchedulesInput>
    create: XOR<ClinicCreateWithoutSpecialtySchedulesInput, ClinicUncheckedCreateWithoutSpecialtySchedulesInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutSpecialtySchedulesInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutSpecialtySchedulesInput, ClinicUncheckedUpdateWithoutSpecialtySchedulesInput>
  }

  export type ClinicUpdateWithoutSpecialtySchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutSpecialtySchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type SpecialtyUpsertWithoutSpecialtySchedulesInput = {
    update: XOR<SpecialtyUpdateWithoutSpecialtySchedulesInput, SpecialtyUncheckedUpdateWithoutSpecialtySchedulesInput>
    create: XOR<SpecialtyCreateWithoutSpecialtySchedulesInput, SpecialtyUncheckedCreateWithoutSpecialtySchedulesInput>
    where?: SpecialtyWhereInput
  }

  export type SpecialtyUpdateToOneWithWhereWithoutSpecialtySchedulesInput = {
    where?: SpecialtyWhereInput
    data: XOR<SpecialtyUpdateWithoutSpecialtySchedulesInput, SpecialtyUncheckedUpdateWithoutSpecialtySchedulesInput>
  }

  export type SpecialtyUpdateWithoutSpecialtySchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutSpecialtyNestedInput
    clinics?: ClinicSpecialtyUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutSpecialtyNestedInput
  }

  export type SpecialtyUncheckedUpdateWithoutSpecialtySchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutSpecialtyNestedInput
    clinics?: ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutSpecialtyNestedInput
  }

  export type ClinicSpecialtyUpsertWithoutSchedulesInput = {
    update: XOR<ClinicSpecialtyUpdateWithoutSchedulesInput, ClinicSpecialtyUncheckedUpdateWithoutSchedulesInput>
    create: XOR<ClinicSpecialtyCreateWithoutSchedulesInput, ClinicSpecialtyUncheckedCreateWithoutSchedulesInput>
    where?: ClinicSpecialtyWhereInput
  }

  export type ClinicSpecialtyUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: ClinicSpecialtyWhereInput
    data: XOR<ClinicSpecialtyUpdateWithoutSchedulesInput, ClinicSpecialtyUncheckedUpdateWithoutSchedulesInput>
  }

  export type ClinicSpecialtyUpdateWithoutSchedulesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutSpecialtiesNestedInput
    specialty?: SpecialtyUpdateOneRequiredWithoutClinicsNestedInput
  }

  export type ClinicSpecialtyUncheckedUpdateWithoutSchedulesInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCreateWithoutDoctorsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    clinicAdmins?: ClinicAdminCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutDoctorsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    clinicAdmins?: ClinicAdminUncheckedCreateNestedManyWithoutClinicInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutDoctorsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
  }

  export type SpecialtyCreateWithoutDoctorsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicSpecialtyCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyUncheckedCreateWithoutDoctorsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicSpecialtyUncheckedCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutSpecialtyInput
    healthPackages?: HealthPackageUncheckedCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyCreateOrConnectWithoutDoctorsInput = {
    where: SpecialtyWhereUniqueInput
    create: XOR<SpecialtyCreateWithoutDoctorsInput, SpecialtyUncheckedCreateWithoutDoctorsInput>
  }

  export type ClinicUpsertWithoutDoctorsInput = {
    update: XOR<ClinicUpdateWithoutDoctorsInput, ClinicUncheckedUpdateWithoutDoctorsInput>
    create: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutDoctorsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutDoctorsInput, ClinicUncheckedUpdateWithoutDoctorsInput>
  }

  export type ClinicUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinicAdmins?: ClinicAdminUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinicAdmins?: ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type SpecialtyUpsertWithoutDoctorsInput = {
    update: XOR<SpecialtyUpdateWithoutDoctorsInput, SpecialtyUncheckedUpdateWithoutDoctorsInput>
    create: XOR<SpecialtyCreateWithoutDoctorsInput, SpecialtyUncheckedCreateWithoutDoctorsInput>
    where?: SpecialtyWhereInput
  }

  export type SpecialtyUpdateToOneWithWhereWithoutDoctorsInput = {
    where?: SpecialtyWhereInput
    data: XOR<SpecialtyUpdateWithoutDoctorsInput, SpecialtyUncheckedUpdateWithoutDoctorsInput>
  }

  export type SpecialtyUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicSpecialtyUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUpdateManyWithoutSpecialtyNestedInput
  }

  export type SpecialtyUncheckedUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyNestedInput
    healthPackages?: HealthPackageUncheckedUpdateManyWithoutSpecialtyNestedInput
  }

  export type ClinicCreateWithoutHealthPackagesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutHealthPackagesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    phone?: string | null
    email?: string | null
    website?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    image?: string | null
    isOpen?: boolean
    openingHours?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    bankInfo?: string | null
    depositAmount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    clinicAdmins?: ClinicAdminUncheckedCreateNestedManyWithoutClinicInput
    specialties?: ClinicSpecialtyUncheckedCreateNestedManyWithoutClinicInput
    workingHours?: ClinicWorkingHourUncheckedCreateNestedManyWithoutClinicInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutHealthPackagesInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutHealthPackagesInput, ClinicUncheckedCreateWithoutHealthPackagesInput>
  }

  export type SpecialtyCreateWithoutHealthPackagesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutSpecialtyInput
    clinics?: ClinicSpecialtyCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyUncheckedCreateWithoutHealthPackagesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutSpecialtyInput
    clinics?: ClinicSpecialtyUncheckedCreateNestedManyWithoutSpecialtyInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedCreateNestedManyWithoutSpecialtyInput
  }

  export type SpecialtyCreateOrConnectWithoutHealthPackagesInput = {
    where: SpecialtyWhereUniqueInput
    create: XOR<SpecialtyCreateWithoutHealthPackagesInput, SpecialtyUncheckedCreateWithoutHealthPackagesInput>
  }

  export type PackageAvailabilityCreateWithoutHealthPackageInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageAvailabilityUncheckedCreateWithoutHealthPackageInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageAvailabilityCreateOrConnectWithoutHealthPackageInput = {
    where: PackageAvailabilityWhereUniqueInput
    create: XOR<PackageAvailabilityCreateWithoutHealthPackageInput, PackageAvailabilityUncheckedCreateWithoutHealthPackageInput>
  }

  export type PackageAvailabilityCreateManyHealthPackageInputEnvelope = {
    data: PackageAvailabilityCreateManyHealthPackageInput | PackageAvailabilityCreateManyHealthPackageInput[]
    skipDuplicates?: boolean
  }

  export type ClinicUpsertWithoutHealthPackagesInput = {
    update: XOR<ClinicUpdateWithoutHealthPackagesInput, ClinicUncheckedUpdateWithoutHealthPackagesInput>
    create: XOR<ClinicCreateWithoutHealthPackagesInput, ClinicUncheckedCreateWithoutHealthPackagesInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutHealthPackagesInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutHealthPackagesInput, ClinicUncheckedUpdateWithoutHealthPackagesInput>
  }

  export type ClinicUpdateWithoutHealthPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutHealthPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    bankInfo?: NullableStringFieldUpdateOperationsInput | string | null
    depositAmount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    clinicAdmins?: ClinicAdminUncheckedUpdateManyWithoutClinicNestedInput
    specialties?: ClinicSpecialtyUncheckedUpdateManyWithoutClinicNestedInput
    workingHours?: ClinicWorkingHourUncheckedUpdateManyWithoutClinicNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type SpecialtyUpsertWithoutHealthPackagesInput = {
    update: XOR<SpecialtyUpdateWithoutHealthPackagesInput, SpecialtyUncheckedUpdateWithoutHealthPackagesInput>
    create: XOR<SpecialtyCreateWithoutHealthPackagesInput, SpecialtyUncheckedCreateWithoutHealthPackagesInput>
    where?: SpecialtyWhereInput
  }

  export type SpecialtyUpdateToOneWithWhereWithoutHealthPackagesInput = {
    where?: SpecialtyWhereInput
    data: XOR<SpecialtyUpdateWithoutHealthPackagesInput, SpecialtyUncheckedUpdateWithoutHealthPackagesInput>
  }

  export type SpecialtyUpdateWithoutHealthPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutSpecialtyNestedInput
    clinics?: ClinicSpecialtyUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUpdateManyWithoutSpecialtyNestedInput
  }

  export type SpecialtyUncheckedUpdateWithoutHealthPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutSpecialtyNestedInput
    clinics?: ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyNestedInput
    specialtySchedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyNestedInput
  }

  export type PackageAvailabilityUpsertWithWhereUniqueWithoutHealthPackageInput = {
    where: PackageAvailabilityWhereUniqueInput
    update: XOR<PackageAvailabilityUpdateWithoutHealthPackageInput, PackageAvailabilityUncheckedUpdateWithoutHealthPackageInput>
    create: XOR<PackageAvailabilityCreateWithoutHealthPackageInput, PackageAvailabilityUncheckedCreateWithoutHealthPackageInput>
  }

  export type PackageAvailabilityUpdateWithWhereUniqueWithoutHealthPackageInput = {
    where: PackageAvailabilityWhereUniqueInput
    data: XOR<PackageAvailabilityUpdateWithoutHealthPackageInput, PackageAvailabilityUncheckedUpdateWithoutHealthPackageInput>
  }

  export type PackageAvailabilityUpdateManyWithWhereWithoutHealthPackageInput = {
    where: PackageAvailabilityScalarWhereInput
    data: XOR<PackageAvailabilityUpdateManyMutationInput, PackageAvailabilityUncheckedUpdateManyWithoutHealthPackageInput>
  }

  export type PackageAvailabilityScalarWhereInput = {
    AND?: PackageAvailabilityScalarWhereInput | PackageAvailabilityScalarWhereInput[]
    OR?: PackageAvailabilityScalarWhereInput[]
    NOT?: PackageAvailabilityScalarWhereInput | PackageAvailabilityScalarWhereInput[]
    id?: StringFilter<"PackageAvailability"> | string
    packageId?: StringFilter<"PackageAvailability"> | string
    dayOfWeek?: IntFilter<"PackageAvailability"> | number
    isActive?: BoolFilter<"PackageAvailability"> | boolean
    startTime?: StringFilter<"PackageAvailability"> | string
    endTime?: StringFilter<"PackageAvailability"> | string
    slotDurationMinutes?: IntFilter<"PackageAvailability"> | number
    capacity?: IntFilter<"PackageAvailability"> | number
    createdAt?: DateTimeFilter<"PackageAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"PackageAvailability"> | Date | string
  }

  export type HealthPackageCreateWithoutAvailabilitiesInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic?: ClinicCreateNestedOneWithoutHealthPackagesInput
    specialty?: SpecialtyCreateNestedOneWithoutHealthPackagesInput
  }

  export type HealthPackageUncheckedCreateWithoutAvailabilitiesInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    clinicId?: string | null
    specialtyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthPackageCreateOrConnectWithoutAvailabilitiesInput = {
    where: HealthPackageWhereUniqueInput
    create: XOR<HealthPackageCreateWithoutAvailabilitiesInput, HealthPackageUncheckedCreateWithoutAvailabilitiesInput>
  }

  export type HealthPackageUpsertWithoutAvailabilitiesInput = {
    update: XOR<HealthPackageUpdateWithoutAvailabilitiesInput, HealthPackageUncheckedUpdateWithoutAvailabilitiesInput>
    create: XOR<HealthPackageCreateWithoutAvailabilitiesInput, HealthPackageUncheckedCreateWithoutAvailabilitiesInput>
    where?: HealthPackageWhereInput
  }

  export type HealthPackageUpdateToOneWithWhereWithoutAvailabilitiesInput = {
    where?: HealthPackageWhereInput
    data: XOR<HealthPackageUpdateWithoutAvailabilitiesInput, HealthPackageUncheckedUpdateWithoutAvailabilitiesInput>
  }

  export type HealthPackageUpdateWithoutAvailabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneWithoutHealthPackagesNestedInput
    specialty?: SpecialtyUpdateOneWithoutHealthPackagesNestedInput
  }

  export type HealthPackageUncheckedUpdateWithoutAvailabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateManyClinicInput = {
    id?: string
    userId?: string | null
    specialtyId: string
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicAdminCreateManyClinicInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthPackageCreateManyClinicInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    specialtyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyCreateManyClinicInput = {
    specialtyId: string
    createdAt?: Date | string
  }

  export type ClinicWorkingHourCreateManyClinicInput = {
    id?: string
    dayOfWeek: number
    isOpen?: boolean
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleCreateManyClinicInput = {
    id?: string
    specialtyId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specialty?: SpecialtyUpdateOneRequiredWithoutDoctorsNestedInput
  }

  export type DoctorUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicAdminUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicAdminUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicAdminUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthPackageUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specialty?: SpecialtyUpdateOneWithoutHealthPackagesNestedInput
    availabilities?: PackageAvailabilityUpdateManyWithoutHealthPackageNestedInput
  }

  export type HealthPackageUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availabilities?: PackageAvailabilityUncheckedUpdateManyWithoutHealthPackageNestedInput
  }

  export type HealthPackageUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    specialtyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyUpdateWithoutClinicInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specialty?: SpecialtyUpdateOneRequiredWithoutClinicsNestedInput
    schedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicSpecialtyNestedInput
  }

  export type ClinicSpecialtyUncheckedUpdateWithoutClinicInput = {
    specialtyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicSpecialtyNestedInput
  }

  export type ClinicSpecialtyUncheckedUpdateManyWithoutClinicInput = {
    specialtyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicWorkingHourUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicWorkingHourUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicWorkingHourUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specialty?: SpecialtyUpdateOneRequiredWithoutSpecialtySchedulesNestedInput
    clinicSpecialty?: ClinicSpecialtyUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialtyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateManySpecialtyInput = {
    id?: string
    userId?: string | null
    clinicId: string
    name: string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: number
    avatar?: string | null
    bio?: string | null
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyCreateManySpecialtyInput = {
    clinicId: string
    createdAt?: Date | string
  }

  export type ClinicSpecialtyScheduleCreateManySpecialtyInput = {
    id?: string
    clinicId: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthPackageCreateManySpecialtyInput = {
    id?: string
    name: string
    shortDescription?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    promotionalPrice?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    category?: string
    targetGender?: string | null
    targetAgeRange?: string | null
    preparationNotes?: string | null
    isPopular?: boolean
    isActive?: boolean
    features?: HealthPackageCreatefeaturesInput | string[]
    imageUrl?: string | null
    clinicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutDoctorsNestedInput
  }

  export type DoctorUncheckedUpdateWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateManyWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualifications?: NullableJsonNullValueInput | InputJsonValue
    experience?: IntFieldUpdateOperationsInput | number
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyUpdateWithoutSpecialtyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutSpecialtiesNestedInput
    schedules?: ClinicSpecialtyScheduleUpdateManyWithoutClinicSpecialtyNestedInput
  }

  export type ClinicSpecialtyUncheckedUpdateWithoutSpecialtyInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicSpecialtyNestedInput
  }

  export type ClinicSpecialtyUncheckedUpdateManyWithoutSpecialtyInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleUpdateWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutSpecialtySchedulesNestedInput
    clinicSpecialty?: ClinicSpecialtyUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthPackageUpdateWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneWithoutHealthPackagesNestedInput
    availabilities?: PackageAvailabilityUpdateManyWithoutHealthPackageNestedInput
  }

  export type HealthPackageUncheckedUpdateWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availabilities?: PackageAvailabilityUncheckedUpdateManyWithoutHealthPackageNestedInput
  }

  export type HealthPackageUncheckedUpdateManyWithoutSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    promotionalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetGender?: NullableStringFieldUpdateOperationsInput | string | null
    targetAgeRange?: NullableStringFieldUpdateOperationsInput | string | null
    preparationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    features?: HealthPackageUpdatefeaturesInput | string[]
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleCreateManyClinicSpecialtyInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicSpecialtyScheduleUpdateWithoutClinicSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutSpecialtySchedulesNestedInput
    specialty?: SpecialtyUpdateOneRequiredWithoutSpecialtySchedulesNestedInput
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateWithoutClinicSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicSpecialtyScheduleUncheckedUpdateManyWithoutClinicSpecialtyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAvailabilityCreateManyHealthPackageInput = {
    id?: string
    dayOfWeek: number
    isActive?: boolean
    startTime: string
    endTime: string
    slotDurationMinutes?: number
    capacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageAvailabilityUpdateWithoutHealthPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAvailabilityUncheckedUpdateWithoutHealthPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageAvailabilityUncheckedUpdateManyWithoutHealthPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    slotDurationMinutes?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
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