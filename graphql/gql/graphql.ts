/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  hello: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  fields: Array<ProfileField>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ProfileField = {
  __typename?: 'ProfileField';
  id: Scalars['ID'];
  key: Scalars['String'];
  profileId: Scalars['Int'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  profiles: Array<Profile>;
  services: Array<Service>;
  tags: Array<Tag>;
};

export type Service = {
  __typename?: 'Service';
  fields: Array<ServiceField>;
  id: Scalars['ID'];
  profiles: Array<Profile>;
  tags: Array<Tag>;
  title: Scalars['String'];
  userId: Scalars['Int'];
};

export type ServiceField = {
  __typename?: 'ServiceField';
  id: Scalars['ID'];
  key: Scalars['String'];
  serviceId: Scalars['Int'];
  value: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  services: Array<Service>;
  title: Scalars['String'];
};

export type ServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type ServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', title: string }> };


export const ServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<ServicesQuery, ServicesQueryVariables>;