import { dishesApi } from '../services/api';
import { useQuery } from '@tanstack/react-query';

const responseData = (response) => response?.data?.data ?? response?.data;

export const dishQueryKeys = {
    all: ['dishes'],
    lists: () => [...dishQueryKeys.all, 'list'],
    list: (params) => [...dishQueryKeys.lists(), params],
};


export const useDishes = () => {
    return useQuery({
        queryKey: dishQueryKeys.lists(),
        queryFn: async () => responseData(await dishesApi.getAll()),
    });
};
