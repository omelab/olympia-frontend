import { useGetProfileQuery } from '@/api/auth';

// use profile data hook for reuseable
export function useProfileData() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
    isError: isProfileError,
    refetch: profileRefetch,
    status: profileStatus,
  } = useGetProfileQuery({});

  return {
    profile,
    isProfileLoading,
    isProfileFetching,
    isProfileError,
    profileRefetch,
    profileStatus,
  };
}
