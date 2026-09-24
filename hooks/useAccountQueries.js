import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, cartApi, orderHistoryApi, profileApi } from '../services/api';

export const accountQueryKeys = {
  me: ['profile', 'me'],
  favourites: ['profile', 'favourites'],
  orders: ['orders', 'my-orders'],
  cart: ['cart'],
};

const responseData = (response) => response?.data?.data ?? response?.data;

export const useMeQuery = (enabled = true) => useQuery({
  queryKey: accountQueryKeys.me,
  queryFn: async () => responseData(await profileApi.getProfile()),
  enabled,
});

export const useFavouriteDishesQuery = () => useQuery({
  queryKey: accountQueryKeys.favourites,
  queryFn: async () => responseData(await profileApi.getFavouriteDishes()),
});

export const useOrderHistoryQuery = () => useQuery({
  queryKey: accountQueryKeys.orders,
  queryFn: async () => responseData(await orderHistoryApi.getMyOrders()),
});

export const useCartQuery = () => useQuery({
  queryKey: accountQueryKeys.cart,
  queryFn: async () => responseData(await cartApi.get()),
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