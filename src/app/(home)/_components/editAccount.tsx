import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useAccountStore } from "@/providers/account-store-provider";
import { AccountSchema, AddAccountSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditAccount({
  selectedAccount,
  setEditAccountModal,
  editAccountModal,
}: {
  selectedAccount: z.infer<typeof AccountSchema>;
  setEditAccountModal: Dispatch<SetStateAction<boolean>>;
  editAccountModal: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { delete: deleteAccount } = useAccountStore((state) => state);

  const handleDelete = () => {
    deleteAccount(selectedAccount.id);
    setEditAccountModal(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={editAccountModal} onOpenChange={setEditAccountModal}>
        <DialogContent className="sm:max-w-[425px]">
          <EditAccountForm
            className=""
            setOpen={setEditAccountModal}
            selectedAccount={selectedAccount}
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
    <Drawer open={editAccountModal} onOpenChange={setEditAccountModal}>
      <DrawerContent>
        <EditAccountForm
          className="px-4"
          setOpen={setEditAccountModal}
          selectedAccount={selectedAccount}
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

function EditAccountForm({
  className,
  setOpen,
  selectedAccount,
}: {
  className: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedAccount: z.infer<typeof AccountSchema>;
}) {
  const { edit } = useAccountStore((state) => state);

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: selectedAccount.name,
      balance: selectedAccount.balance,
      color: selectedAccount.color,
      id: selectedAccount.id,
      userId: selectedAccount.userId,
    },
  });

  function onSubmit(values: z.infer<typeof AccountSchema>) {
    edit({
      values,
      ogBalance: Number(selectedAccount.balance),
      ogName: selectedAccount.name,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
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
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bg-blue-500">Blue</SelectItem>
                  <SelectItem value="bg-red-500">Red</SelectItem>
                  <SelectItem value="bg-purple-500">Purple</SelectItem>
                  <SelectItem value="bg-green-500">Green</SelectItem>
                  <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Edit</Button>
      </form>
    </Form>
  );
}
