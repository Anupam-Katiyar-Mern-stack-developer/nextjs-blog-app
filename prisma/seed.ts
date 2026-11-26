import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const db = new PrismaClient({ adapter });

async function main() {
    const categories = [
        { name: "Web Development", slug: "web-dev" },
        { name: "Backend & Databases", slug: "backend-db" },
        { name: "DevOps & Cloud", slug: "devops-cloud" },
        { name: "Career & Interviews", slug: "career" },
    ];

    for (const cat of categories) {
        await db.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    const tags = [
        { name: "Next.js", slug: "nextjs" },
        { name: "Prisma", slug: "prisma" },
        { name: "TypeScript", slug: "typescript" },
        { name: "PostgreSQL", slug: "postgresql" },
        { name: "Tailwind CSS", slug: "tailwind" },
    ];

    for (const tag of tags) {
        await db.tag.upsert({
            where: { slug: tag.slug },
            update: {},
            create: tag,
        });
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });