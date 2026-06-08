export interface PackageContract {
  readonly packageName: string;
  readonly stability: "foundation";
}

export interface EmptyRecord {
  readonly _tag: "empty-record";
}
