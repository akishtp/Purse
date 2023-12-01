const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "akish",
    password: "password",
    email: "makishtp@gmail.com",
  },
];

const accounts = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    user_id: users[0].id,
    name: "cash",
    balance: 100,
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    user_id: users[0].id,
    name: "SBI",
    balance: 152,
  },
];

const records = [
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    account_id: accounts[0].id,
    amount: 6,
    date: "2023-08-19",
    time: "10:10pm",
    category: "groceries",
    note: "mutta",
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    account_id: accounts[0].id,
    amount: 15,
    date: "2023-08-19",
    time: "10:10pm",
    category: "groceries",
    note: "note 1",
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    account_id: accounts[1].id,
    amount: 23,
    date: "2023-08-19",
    time: "10:10pm",
    category: "transport",
    note: "note 2",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    account_id: accounts[0].id,
    amount: 104,
    date: "2023-08-19",
    time: "10:10pm",
    category: "fuel",
    note: "note 3",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    account_id: accounts[1].id,
    amount: 6,
    date: "2023-08-19",
    time: "10:10pm",
    category: "groceries",
    note: "mutta",
  },
];

module.exports = {
  users,
  accounts,
  records,
};
