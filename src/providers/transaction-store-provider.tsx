"use client";

import {
  type TransactionStore,
  createTransactionStore,
  initTransactionsStore,
} from "@/stores/transaction-store";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";

export type TransactionStoreApi = ReturnType<typeof createTransactionStore>;

export const TransactionStoreContext = createContext<
  TransactionStoreApi | undefined
>(undefined);

export interface TransactionStoreProviderProps {
  children: ReactNode;
}

export const TransactionStoreProvider = ({
  children,
}: TransactionStoreProviderProps) => {
  const storeRef = useRef<TransactionStoreApi>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      const initialState = await initTransactionsStore();
      storeRef.current = createTransactionStore(initialState.transactions);
      setIsInitialized(true);
    };

    if (!storeRef.current) {
      initializeStore();
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="h-dvh flex items-center justify-center">
        Fetching transactions...
      </div>
    );
  }

  return (
    <TransactionStoreContext.Provider value={storeRef.current}>
      {children}
    </TransactionStoreContext.Provider>
  );
};

export const useTransactionStore = <T,>(
  selector: (store: TransactionStore) => T
): T => {
  const transactionStoreContext = useContext(TransactionStoreContext);

  if (!transactionStoreContext) {
    throw new Error(
      `useTransactionStore must be used within TransactionStoreProvider`
    );
  }

  return useStore(transactionStoreContext, selector);
};
