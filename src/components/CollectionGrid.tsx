import SubCategoryCard from "./SubCategoryCard";

export interface Collection {
  id: string;
  name: string;        // mapped to SubCategoryCard's `modelo`
  serieLabel: string;  // mapped to SubCategoryCard's `serie`
  image: string;
  gallery?: string[];
  previewVideo?: string;
  description?: string[];
}

interface CollectionGridProps {
  collections: Collection[];
}

const CollectionGrid = ({ collections }: CollectionGridProps) => {
  if (collections.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {collections.map((col, index) => (
        <SubCategoryCard
          key={col.id}
          image={col.image}
          previewVideo={col.previewVideo}
          serie={col.serieLabel}
          modelo={col.name}
          delay={index * 150}
          description={col.description}
          gallery={col.gallery}
        />
      ))}
    </div>
  );
};

export default CollectionGrid;
