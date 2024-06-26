import { Button } from "@/components/ui/button";
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useAccountStore } from "@/providers/account-store-provider";
import { useTransactionStore } from "@/providers/transaction-store-provider";
import { TransactionSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categories } from "@/data/categories";

export default function EditTransaction({
  selectedTransaction,
  setEditTransactionModal,
  editTransactionModal,
}: {
  selectedTransaction: z.infer<typeof TransactionSchema>;
  setEditTransactionModal: Dispatch<SetStateAction<boolean>>;
  editTransactionModal: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { delete: deleteTransaction } = useTransactionStore((state) => state);
  const { updateAccount } = useAccountStore((state) => state);

  const handleDelete = () => {
    deleteTransaction({
      id: selectedTransaction.id,
      accountId: selectedTransaction.accountId,
      type: selectedTransaction.type,
      amount: Number(selectedTransaction.amount),
      updateAccount,
    });
    setEditTransactionModal(false);
  };

  if (isDesktop) {
    return (
      <Dialog
        open={editTransactionModal}
        onOpenChange={setEditTransactionModal}
      >
        <DialogContent className="sm:max-w-[36rem]">
          <EditTransactionForm
            setOpen={setEditTransactionModal}
            selectedTransaction={selectedTransaction}
          />
          <DialogFooter>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={editTransactionModal} onOpenChange={setEditTransactionModal}>
      <DrawerContent>
        <EditTransactionForm
          setOpen={setEditTransactionModal}
          selectedTransaction={selectedTransaction}
        />
        <DrawerFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const EditTransactionForm = ({
  setOpen,
  selectedTransaction,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedTransaction: z.infer<typeof TransactionSchema>;
}) => {
  const [type, setType] = useState(selectedTransaction.type);

  // <------------------------------- Time is still a headache -------------------------------->
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

  const { edit } = useTransactionStore((state) => state);
  const { accounts, updateAccount } = useAccountStore((state) => state);

  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: selectedTransaction.type,
      amount: selectedTransaction.amount,
      category: selectedTransaction.category,
      accountId: selectedTransaction.accountId,
      account: selectedTransaction.account,
      dateTime: selectedTransaction.dateTime,
      note: selectedTransaction.note,

      userId: selectedTransaction.userId,
      id: selectedTransaction.id,
    },
  });

  function onSubmit(values: z.infer<typeof TransactionSchema>) {
    values.dateTime = `${values.dateTime.toString().split("T")[0]}T${time}`;

    values.type = type;
    edit({
      values,
      ogAmount: Number(selectedTransaction.amount),
      ogType: selectedTransaction.type,
      updateAccount,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-4 lg:p-0"
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
          <div
            onClick={() => setType("Expense")}
            className="w-1/2 z-10 h-full flex items-center justify-center cursor-pointer"
          >
            Expense
          </div>
          <div
            onClick={() => setType("Income")}
            className="w-1/2 z-10 h-full flex items-center justify-center cursor-pointer"
          >
            Income
          </div>
        </div>
        <div className="rounded-2xl gap-2">
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
                      {categories.map((category) => {
                        return (
                          <SelectItem value={category.name} key={category.name}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
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
                    defaultValue={field.value.toString()}
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
                        onSelect={(date) => {
                          date?.setHours(5);
                          date?.setMinutes(30);
                          field.onChange(date?.toISOString());
                        }}
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
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
};
