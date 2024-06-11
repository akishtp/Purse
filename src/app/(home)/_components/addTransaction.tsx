"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const AddTransaction = () => {
  const [type, setType] = useState("Expense");
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      account: "",
      amount: 0,
      date: new Date(),
      category: "",
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof TransactionSchema>) {
    console.log(values);
  }
  return (
    <div className="w-4/12 p-2 flex flex-col gap-2">
      <div className="bg-neutral-200 w-full rounded-2xl p-2 dark:bg-neutral-900 flex ">
        <div
          onClick={() => setType("Expense")}
          className={`w-1/2 rounded-lg h-10 flex items-center justify-center cursor-pointer ${
            type === "Expense" ? "bg-neutral-100 dark:bg-neutral-800" : ""
          }`}
        >
          Expense
        </div>
        <div
          onClick={() => setType("Income")}
          className={`w-1/2 rounded-lg h-10 flex items-center justify-center cursor-pointer ${
            type === "Income" ? "bg-neutral-100 dark:bg-neutral-800" : ""
          }`}
        >
          Income
        </div>
      </div>
      <div className="bg-neutral-200 w-full rounded-2xl py-2 px-4 dark:bg-neutral-900">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <div className="flex flex-col gap-0.5">
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/3">Category</FormLabel>
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
                        <SelectItem value="Fuel">Fuel</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                  <FormMessage className="text-end" />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <div className="flex flex-col gap-0.5">
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/3">Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-end" />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <div className="flex flex-col gap-0.5">
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/3">Account</FormLabel>
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
                        <SelectItem value="m@example.com">CASH</SelectItem>
                        <SelectItem value="m@google.com">SBI</SelectItem>
                        <SelectItem value="m@support.com">POST</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                  <FormMessage className="text-end" />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-1/3">Date Time</FormLabel>
                  <div className="flex w-full gap-2">
                    <Popover>
                      <PopoverTrigger asChild className="w-2/3">
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add a note"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="my-2">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
