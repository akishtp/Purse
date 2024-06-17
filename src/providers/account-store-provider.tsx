"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { useStore } from "zustand";

import {
  type AccountStore,
  createAccountStore,
  initAccountsStore,
} from "@/stores/account-store";

export type AccountStoreApi = ReturnType<typeof createAccountStore>;

export const AccountStoreContext = createContext<AccountStoreApi | undefined>(
  undefined
);

export interface AccountStoreProviderProps {
  children: ReactNode;
}

export const AccountStoreProvider = ({
  children,
}: AccountStoreProviderProps) => {
  const storeRef = useRef<AccountStoreApi>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      const initialState = await initAccountsStore();
      storeRef.current = createAccountStore(initialState.accounts);
      setIsInitialized(true);
    };

    if (!storeRef.current) {
      initializeStore();
    }
  }, []);

  if (!isInitialized) {
    return <div>Fetching accounts...</div>;
  }

  if (!storeRef.current) {
    storeRef.current = createAccountStore();
  }

  return (
    <AccountStoreContext.Provider value={storeRef.current}>
      {children}
    </AccountStoreContext.Provider>
  );
};

export const useAccountStore = <T,>(
  selector: (store: AccountStore) => T
): T => {
  const accountStoreContext = useContext(AccountStoreContext);

  if (!accountStoreContext) {
    throw new Error(`useAccountStore must be used within AccountStoreProvider`);
  }

  return useStore(accountStoreContext, selector);
};
