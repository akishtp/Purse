import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTransactionStore } from "@/providers/transaction-store-provider";
import { TransactionSchema } from "@/types";
import { Dialog } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

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

  const handleDelete = () => {
    deleteTransaction(selectedTransaction.id);
    setEditTransactionModal(false);
  };

  if (isDesktop) {
    return (
      <Dialog
        open={editTransactionModal}
        onOpenChange={setEditTransactionModal}
      >
        <DialogContent className="sm:max-w-[425px]">
          <EditTransactionForm
            className=""
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
          className="px-4"
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
  className,
  setOpen,
  selectedTransaction,
}: {
  className: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedTransaction: z.infer<typeof TransactionSchema>;
}) => {
  return <div>hello</div>;
};
