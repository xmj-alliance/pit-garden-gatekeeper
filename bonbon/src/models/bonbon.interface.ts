export interface IBonbon {
  [key: string]: unknown;
  id: string
  dbname: string
  popular: boolean
  count: number
}

export interface IInputBonbon {
  [key: string]: unknown | undefined;
  id?: string
  dbname?: string
  popular?: boolean
  count?: number
}