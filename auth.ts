import { useRouter, useRoute, useContext } from "@nuxtjs/composition-api";
const protectedRouter = () => {
  const context = useContext();
  const router = useRouter();
  const route = useRoute();

  const hasToken: string = context.app.$apolloHelpers.getToken("apollo-token");

  if (!hasToken) {
    return router.push("/login");
  } else if (route.value.path == "/login") {
    return router.push("/twitter");
  }
};
export default protectedRouter;
