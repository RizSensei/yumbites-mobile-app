import { foodCategoriesApi } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { mockCategories } from '../data/mockData';
import { fetchArrayWithMockFallback } from './queryFallback';

export const foodCategoryQueryKeys = {
    all: ['food-categories'],
    lists: () => [...foodCategoryQueryKeys.all, 'list'],
    list: (params) => [...foodCategoryQueryKeys.lists(), params],
};

export const useFoodCategories = () => {
    return useQuery({
        queryKey: foodCategoryQueryKeys.list({ search: '', status: '' }),
        queryFn: () => fetchArrayWithMockFallback({
            label: 'food categories',
            fetcher: () => foodCategoriesApi.getAll(),
            fallback: () => mockCategories.map((category) => ({ ...category })),
            keys: ['categories', 'items'],
        }),
        initialData: () => mockCategories.map((category) => ({ ...category })),
        initialDataUpdatedAt: 0,
    });
};