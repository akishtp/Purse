import prisma from "@/app/lib/prisma";
import { Record } from "./definitions";

export async function fetchRecords() {
  try {
    const records: Record[] = await prisma.records.findMany({
      where: { type: "Expense" },
      include: {
        account: {
          select: { name: true },
        },
      },
    });
    return { records };
  } catch (err) {
    console.log(err);
  }
}
