"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTransactionStore } from "@/providers/transaction-store-provider";
import { SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddTransactionSchema } from "@/types";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

export default function AddTransaction() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="absolute bottom-4 right-4 rounded-full bg-purple-700 h-12 w-12 text-white text-xl">
            +
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-neutral-100 dark:bg-neutral-900">
          <AddTransactionForm />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <div className="w-1/3 p-2">
      <AddTransactionForm />
    </div>
  );
}

function AddTransactionForm() {
  const [type, setType] = useState("Expense");

  // <------------------------------- Time was a headache -------------------------------->
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [time, setTime] = useState(getCurrentTime);
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTime(event.target.value);
  };
  useEffect(() => {
    setTime(getCurrentTime());
  }, []);

  const { add, transactions } = useTransactionStore((state) => state);
  const { accounts } = useAccountStore((state) => state);

  const form = useForm<z.infer<typeof AddTransactionSchema>>({
    resolver: zodResolver(AddTransactionSchema),
    defaultValues: {
      type: transactions.length > 0 ? transactions[0].type : "Expense",
      amount: 0,
      category: transactions.length > 0 ? transactions[0].category : "Food",
      accountId: accounts.length > 0 ? accounts[0].id.toString() : "",
      dateTime: new Date().toISOString(),
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof AddTransactionSchema>) {
    values.dateTime = `${values.dateTime.split("T")[0]}T${time}`;
    values.type = type;
    add(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-2 lg:p-0"
      >
        <div className="bg-neutral-100 h-14 rounded-xl relative border-2 flex items-center justify-between dark:bg-neutral-900">
          <div
            className={`bg-neutral-200 w-1/2 h-10 rounded-lg top-1.5 absolute z-0 transition-all duration-300 dark:bg-neutral-800`}
            style={{
              transform:
                type === "Expense" ? "translateX(4%)" : "translateX(96%)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          <button
            type="button"
            onClick={() => setType("Expense")}
            className="w-1/2 text-center z-10 h-full"
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("Income")}
            className="w-1/2 text-center z-10 h-full"
          >
            Income
          </button>
        </div>
        <div className="bg-neutral-100 rounded-2xl gap-2 px-4 pb-4 border-2 dark:bg-neutral-900">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-1/3">Category</FormLabel>
                <div className="flex flex-col w-2/3 gap-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Fuel">Fuel</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-1/3">Amount</FormLabel>
                <div className="flex flex-col w-2/3 gap-1">
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-1/3">Account</FormLabel>
                <div className="flex flex-col w-2/3 gap-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem
                          key={account.id}
                          value={account.id.toString()}
                        >
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateTime"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-1/3">Date Time</FormLabel>
                <div className="flex flex-col w-2/3 gap-1">
                  <Popover>
                    <div className="flex gap-1">
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-fit pl-3 flex justify-start font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <input
                        type="time"
                        value={time}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex items-center my-2">
                <FormControl>
                  <Textarea
                    placeholder="note (optional)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
