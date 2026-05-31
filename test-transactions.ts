import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const txs = await prisma.transaction.findMany({ orderBy: { transactionDate: 'desc' }, take: 10 });
  console.log(txs);
}
main().catch(console.error).finally(() => prisma.$disconnect());
