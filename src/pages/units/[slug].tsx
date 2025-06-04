import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import superjson from 'superjson';

type UnitProps = {
    unit: {
        name: string;
        slug: string;
        theme: {
            color: string;
            logo: string;
        };
    };
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;

    const unit = await prisma.unit.findUnique({
        where: { slug },
    });

    if (!unit) {
        return { notFound: true };
    }

    const { json } = superjson.serialize(unit);

    return {
        props: {
            unit: json,
        },
    };
};

export default function UnitPage({ unit }: UnitProps) {
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold text-primary">{unit.name}</h1>
            <p className="mt-2 text-sm text-gray-600">Slug: {unit.slug}</p>
            <div
                className="mt-6 h-32 w-32 rounded bg-gray-200 flex items-center justify-center"
                style={{ backgroundColor: unit.theme.color }}
            >
                <img src={unit.theme.logo} alt={unit.name} className="max-h-24" />
            </div>
        </main>
    );
}
