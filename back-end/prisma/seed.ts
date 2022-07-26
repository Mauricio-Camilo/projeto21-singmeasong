import {prisma} from "./../src/database.js";

async function main () {
    
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})