import { useRouter } from "next/router";
import { useMeQuery } from "../features/user/userApi";

const withRedirect = (Component) => {
  const AuthenticatedComponent = () => {
    const { data: user, isLoading } = useMeQuery({
      refetchOnMountOrArgChange: true,
    });
    const router = useRouter();

    if (user && !isLoading) {
      router.push("/");
    }

    if (!user && !isLoading) {
      return <Component />;
    }
  };

  return AuthenticatedComponent;
};

export default withRedirect;
