// app/properties/[id]/page.tsx
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Property ${params.id}`,
  };
}

export default function PropertyPage({ params }: Props) {
  return (
    <main>
      <h1>Property Details</h1>
      <p>Property ID: {params.id}</p>
    </main>
  );
}
