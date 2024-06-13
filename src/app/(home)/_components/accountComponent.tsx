"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddAccountSchema } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountStore } from "@/providers/account-store-provider";

export const AccountComponent = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { accounts, get } = useAccountStore((state) => state);

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="grid gap-2 grid-cols-2 pb-3 md:grid-cols-4">
      {accounts.map((account) => {
        return (
          <div
            key={account.id}
            className={`flex justify-between h-10 rounded-lg items-center px-2 ${account.color}`}
          >
            <div>{account.name}</div>
            <div>{account.balance}</div>
          </div>
        );
      })}
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="flex justify-between h-10 rounded-lg items-center px-2 border-2 border-neutral-300 font-medium dark:border-neutral-800"
              onClick={() => setOpen(true)}
            >
              <div>Add Account</div>
              <div>+</div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <AccountForm className=" " setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              className="flex justify-between h-10 rounded-lg items-center px-2 border-2 border-neutral-300 font-medium dark:border-neutral-800"
              onClick={() => setOpen(true)}
            >
              <div>Add Account</div>
              <div>+</div>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <AccountForm className="px-4" setOpen={setOpen} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

function AccountForm({
  className,
  setOpen,
}: {
  className: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { add } = useAccountStore((state) => state);
  const form = useForm<z.infer<typeof AddAccountSchema>>({
    resolver: zodResolver(AddAccountSchema),
    defaultValues: {
      name: "",
      balance: 0,
      color: "bg-[#2481de]",
    },
  });

  async function onSubmit(values: z.infer<typeof AddAccountSchema>) {
    add(values);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-y-2", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={field.value}>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bg-[#2481de]">Blue</SelectItem>
                  <SelectItem value="bg-red-500">Red</SelectItem>
                  <SelectItem value="bg-purple-500">Purple</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="my-2">
          Submit
        </Button>
      </form>
    </Form>
  );
}
