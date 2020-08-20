import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getTransactions: Array<Transactions>;
  hello: Scalars['String'];
  test: Scalars['String'];
  getUser: User;
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

/** Transactions Schema */
export type Transactions = {
  __typename?: 'Transactions';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['Float'];
};

/** User Schema */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newTransaction: Scalars['Boolean'];
  newBulkTransactions: Scalars['Boolean'];
  revokeRefreshTokenForUser: Scalars['Boolean'];
  newUser: Scalars['Boolean'];
  login: LoginResponse;
};


export type MutationNewTransactionArgs = {
  value: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationNewBulkTransactionsArgs = {
  bulk: Array<TransactionInputs>;
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['String'];
};


export type MutationNewUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Transactions inputs */
export type TransactionInputs = {
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['Float'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  _id: Scalars['String'];
  token: Scalars['String'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;