const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const txs = await prisma.transaction.findMany({ orderBy: { transactionDate: 'desc' }, take: 10 });
  console.log(JSON.stringify(txs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
