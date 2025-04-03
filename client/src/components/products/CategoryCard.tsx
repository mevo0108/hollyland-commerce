import { Link } from "wouter";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="cursor-pointer">
      <Link href={`/products/category/${category.slug}`}>
        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 relative group">
          <img 
            src={category.imageUrl || '/placeholder-category.jpg'} 
            alt={category.name} 
            className="w-full h-full object-center object-cover group-hover:opacity-75 transition duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold">{category.name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
