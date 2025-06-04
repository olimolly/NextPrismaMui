import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from '@/lib/graphql';

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
