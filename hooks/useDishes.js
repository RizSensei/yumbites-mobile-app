import { dishesApi } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { mockDishes } from '../data/mockData';
import { fetchArrayWithMockFallback } from './queryFallback';

export const dishQueryKeys = {
    all: ['dishes'],
    lists: () => [...dishQueryKeys.all, 'list'],
    list: (params) => [...dishQueryKeys.lists(), params],
};


export const useDishes = () => {
    return useQuery({
        queryKey: dishQueryKeys.lists(),
        queryFn: () => fetchArrayWithMockFallback({
            label: 'dishes',
            fetcher: () => dishesApi.getAll(),
            fallback: () => mockDishes.map((dish) => ({ ...dish })),
            keys: ['dishes', 'items'],
        }),
        initialData: () => mockDishes.map((dish) => ({ ...dish })),
        initialDataUpdatedAt: 0,
    });
};
