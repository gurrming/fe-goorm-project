import useUserStore from '../../../store/useUserStore';

export const IsMe = ({ userId }: { userId: number }) => {
  const user = useUserStore((state) => state.user);
  return userId === user?.id;
};
