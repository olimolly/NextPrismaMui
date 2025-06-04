import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import superjson from 'superjson';
import Link from 'next/link';

type Unit = {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    theme: {
        color: string;
        logo: string;
    };
    createdAt: string;
};

type Props = {
    units: any; // JSONValue 
    meta: any;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const units = await prisma.unit.findMany({ orderBy: { name: 'asc' } });

    const { json, meta } = superjson.serialize(units);

    return {
        props: {
            units: json,
            meta,
        },
    };
};



export default function UnitsPage({ units, meta }: { units: any; meta: any }) {
    const deserializedUnits = superjson.deserialize<Unit[]>({ json: units, meta });

    return (
        <main className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Toutes les unités</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {deserializedUnits.map((unit) => (
                    <li key={unit.id} className="border rounded p-4 shadow hover:shadow-lg transition">
                        <Link href={`/units/${unit.slug}`}>
                            <h2 className="text-xl font-semibold text-blue-700">{unit.name}</h2>
                            {unit.shortDescription && (
                                <p className="text-gray-600 mt-1">{unit.shortDescription}</p>
                            )}
                            <div
                                className="mt-2 w-20 h-20 rounded flex items-center justify-center"
                                style={{ backgroundColor: unit.theme?.color }}
                            >
                                <img
                                    src={unit.theme?.logo}
                                    alt={unit.name}
                                    className="max-h-16"
                                />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
