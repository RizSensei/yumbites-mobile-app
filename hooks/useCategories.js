import { foodCategoriesApi } from '../services/api';
import { useQuery } from '@tanstack/react-query';

const responseData = (response) => response?.data?.data ?? response?.data;

export const foodCategoryQueryKeys = {
    all: ['food-categories'],
    lists: () => [...foodCategoryQueryKeys.all, 'list'],
    list: (params) => [...foodCategoryQueryKeys.lists(), params],
};

export const useFoodCategories = () => {
    return useQuery({
        queryKey: foodCategoryQueryKeys.list({ search: '', status: '' }),
        queryFn: async () => responseData(await foodCategoriesApi.getAll()),
    });
};