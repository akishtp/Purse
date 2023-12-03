import prisma from "@/app/lib/prisma";

export async function fetchRecords() {
  try {
    const records = await prisma.records.findMany({
      where: { type: "Expense" },
      include: {
        account: {
          select: { name: true },
        },
      },
    });
    return { props: records };
  } catch (err) {
    console.log(err);
  }
}
