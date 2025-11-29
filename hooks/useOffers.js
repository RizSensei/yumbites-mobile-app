import { offersApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const offerQueryKeys = {
    all: ['offers'],
    lists: () => [...offerQueryKeys.all, 'list'],
    list: (params) => [...offerQueryKeys.lists(), params],
    detail: (id) => [...offerQueryKeys.all, id],
};

export const useOffers = () => {
    return useQuery({   
        queryKey: offerQueryKeys.list({ search: '', status: '' }),
        queryFn: () => offersApi.getAll(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}