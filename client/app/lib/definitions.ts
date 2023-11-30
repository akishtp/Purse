// Checkout prisma after this ?? https://www.prisma.io/

export type User = {
    id: string;
    name: string;
    password: string;
    email: string;
}

export type accounts = {
    id: string;
    name: string;
    balance: number;
}

export type records = {
    id: string;
    account: string;
    amount: number;
    date: string;
    time: string;
    category: string;
    note: string;
}