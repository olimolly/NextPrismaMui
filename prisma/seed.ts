import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const units = [
        {
            name: 'Groupe Solidaire Étudiant',
            slug: 'gse',
            shortDescription: 'Un groupe étudiant engagé dans l’entraide solidaire.',
            theme: {
                color: '#1a73e8',
                logo: '/logos/gse.png',
            },
        },
        {
            name: 'Unit Arma Alpha',
            slug: 'arma-alpha',
            shortDescription: 'Une unité spécialisée dans les simulations tactiques.',
            theme: {
                color: '#ff9800',
                logo: '/logos/alpha.png',
            },
        },
    ];

    for (const unit of units) {
        await prisma.unit.upsert({
            where: { slug: unit.slug },
            update: {},
            create: unit,
        });
    }

    await prisma.user.upsert({
        where: { email: 'test@a4units.org' },
        update: {},
        create: {
            email: 'test@a4units.org',
            password: 'devpass', // ⚠️ À hasher en production
            role: 'USER',
            profile: {
                create: {
                    firstName: 'Jean',
                    lastName: 'Dupont',
                },
            },
        },
    });

    console.log('✅ Seed terminé avec succès.');
}

main()
    .catch((e) => {
        console.error('❌ Erreur dans le seed :', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
