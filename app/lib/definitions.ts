export type Record = {
  id: string;
  amount: number;
  type: string;
  datetime: Date;
  category: string;
  note: string | null;
  accountsId: string;
  account: {};
};
