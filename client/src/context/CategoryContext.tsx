import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

interface CategoryContextType {
    categories: Category[];
    isLoading: boolean;
    getCategoryBySlug: (slug: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    isLoading: true,
    getCategoryBySlug: () => undefined,
});

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
    const { data: categories = [], isLoading } = useQuery<Category[]>({
        queryKey: ['/api/categories'],
    });

    const getCategoryBySlug = (slug: string) => {
        return categories.find((category) => category.slug === slug);
    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                isLoading,
                getCategoryBySlug
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext); 