import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://pitogo.stepzen.net/api/oldfashioned-aardvarkkkk/__graphql",
  headers: {
    Authorization:
      "apikey pitogo::stepzen.net+1000::93434e48a96515db3283230ea6c0d1216b5cd027fe46b87a68bea4455811f03b",
  },

  cache: cache,
});

cache.reset(); // Clearing the cache

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
