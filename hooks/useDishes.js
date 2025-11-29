import { dishesApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const dishQueryKeys = {
    all: ['dishes'],
    lists: () => [...dishQueryKeys.all, 'list'],
    list: (params) => [...dishQueryKeys.lists(), params],
};


export const useDishes = () => {
    return useQuery({
        queryKey: dishQueryKeys.lists(),
        queryFn: () => dishesApi.getAll(),
    });
};
