import { offersApi } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { mockOffers } from '../data/mockData';
import { fetchArrayWithMockFallback } from './queryFallback';

export const offerQueryKeys = {
    all: ['offers'],
    lists: () => [...offerQueryKeys.all, 'list'],
    list: (params) => [...offerQueryKeys.lists(), params],
    detail: (id) => [...offerQueryKeys.all, id],
};

export const useOffers = () => {
    return useQuery({   
        queryKey: offerQueryKeys.list({ search: '', status: '' }),
        queryFn: () => fetchArrayWithMockFallback({
            label: 'offers',
            fetcher: () => offersApi.getAll(),
            fallback: () => mockOffers.map((offer) => ({ ...offer })),
            keys: ['offers', 'items'],
        }),
        initialData: () => mockOffers.map((offer) => ({ ...offer })),
        initialDataUpdatedAt: 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}