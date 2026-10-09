import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, cartApi, orderHistoryApi, profileApi } from '../services/api';
import {
  createMockCart,
  createMockFavourites,
  createMockOrders,
  mockUser,
} from '../data/mockData';
import {
  fetchArrayWithMockFallback,
  fetchValueWithMockFallback,
} from './queryFallback';

export const accountQueryKeys = {
  me: ['profile', 'me'],
  favourites: ['profile', 'favourites'],
  orders: ['orders', 'my-orders'],
  cart: ['cart'],
};

const responseData = (response) => response?.data?.data ?? response?.data;

export const useMeQuery = (enabled = true) => useQuery({
  queryKey: accountQueryKeys.me,
  queryFn: () => fetchValueWithMockFallback({
    label: 'profile',
    fetcher: () => profileApi.getProfile(),
    fallback: () => ({ ...mockUser }),
  }),
  initialData: () => ({ ...mockUser }),
  initialDataUpdatedAt: 0,
  enabled,
});

export const useFavouriteDishesQuery = () => useQuery({
  queryKey: accountQueryKeys.favourites,
  queryFn: () => fetchArrayWithMockFallback({
    label: 'favourite dishes',
    fetcher: () => profileApi.getFavouriteDishes(),
    fallback: createMockFavourites,
    keys: ['favourites', 'favorites', 'dishes', 'items'],
  }),
  initialData: createMockFavourites,
  initialDataUpdatedAt: 0,
});

export const useOrderHistoryQuery = () => useQuery({
  queryKey: accountQueryKeys.orders,
  queryFn: () => fetchArrayWithMockFallback({
    label: 'order history',
    fetcher: () => orderHistoryApi.getMyOrders(),
    fallback: createMockOrders,
    keys: ['orders', 'items'],
  }),
  initialData: createMockOrders,
  initialDataUpdatedAt: 0,
});

export const useCartQuery = () => useQuery({
  queryKey: accountQueryKeys.cart,
  queryFn: () => fetchArrayWithMockFallback({
    label: 'cart',
    fetcher: () => cartApi.get(),
    fallback: createMockCart,
    keys: ['items', 'cartItems', 'cart'],
  }),
  initialData: createMockCart,
  initialDataUpdatedAt: 0,
});

export const useCartMutation = (mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      const cart = responseData(response);
      if (cart) queryClient.setQueryData(accountQueryKeys.cart, cart);
      else queryClient.invalidateQueries({ queryKey: accountQueryKeys.cart });
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      queryClient.setQueryData(accountQueryKeys.me, responseData(response)?.user);
    },
  });
};

export const useRegisterMutation = () => useMutation({ mutationFn: authApi.register });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => queryClient.clear(),
  });
};

export const useChangePasswordMutation = () => useMutation({
  mutationFn: profileApi.changePassword,
});

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(accountQueryKeys.me, responseData(response));
    },
  });
};