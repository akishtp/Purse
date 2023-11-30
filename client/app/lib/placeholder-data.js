const users = [
    {
        id: 'u1',
        name: 'akish',
        password: 'password',
        email: 'makishtp@gmail.com'
    },
];

const accounts = [
    {
        id: 'a1',
        name: 'cash',
        balance: 100,
    },
    {
        id: 'a2',
        name: 'SBI',
        balance: 152,
    }
];

const records = [
    {
        id: 'r1',
        account: 'a1',
        amount: 6,
        date: '10/10/10',
        time: '10:10pm',
        category: 'groceries',
        note: 'mutta'
    },{
        id: 'r2',
        account: 'a1',
        amount: 15,
        date: '10/10/10',
        time: '10:10pm',
        category: 'groceries',
        note: 'note 1',
    },{
        id: 'r3',
        account: 'a2',
        amount: 23,
        date: '10/10/10',
        time: '10:10pm',
        category: 'transport',
        note: 'note 2',
    },{
        id: 'r4',
        account: 'a1',
        amount: 104,
        date: '10/10/10',
        time: '10:10pm',
        category: 'fuel',
        note: 'note 3',
    },{
        id: 'r5',
        account: 'a2',
        amount: 6,
        date: '10/10/10',
        time: '10:10pm',
        category: 'groceries',
        note: 'mutta',
    },
];

module.exports = {
    users,
    accounts,
    records
};