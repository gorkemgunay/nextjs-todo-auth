import { useRouter } from "next/router";
import { useMeQuery } from "../features/user/userApi";

const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const { data: user, isLoading } = useMeQuery();
    const router = useRouter();

    if (user && !isLoading) {
      return <Component />;
    }

    if (!user && !isLoading) {
      router.push("/auth/login");
    }
  };

  return AuthenticatedComponent;
};

export default withAuth;
