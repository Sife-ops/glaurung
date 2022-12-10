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
  changePassword: Scalars['Boolean'];
  createProfile: Profile;
  createProfileField: ProfileField;
  createService: Service;
  createServiceField: ServiceField;
  createTag: Tag;
  deleteProfile: Profile;
  deleteProfileField: ProfileField;
  deleteService: Service;
  deleteServiceField: ServiceField;
  deleteTag: Tag;
  import: Scalars['String'];
  search: Array<Service>;
  servicesWithTags: Array<Service>;
  signIn: Scalars['String'];
  signUp: User;
  temp: Scalars['Boolean'];
  updateProfile: Profile;
  updateProfileField: ProfileField;
  updateService: Service;
  updateServiceField: ServiceField;
  updateServiceTags: Service;
  updateTag: Tag;
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  serviceId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationCreateProfileFieldArgs = {
  key: Scalars['String'];
  profileId: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};


export type MutationCreateServiceArgs = {
  title: Scalars['String'];
};


export type MutationCreateServiceFieldArgs = {
  key: Scalars['String'];
  serviceId: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};


export type MutationCreateTagArgs = {
  title: Scalars['String'];
};


export type MutationDeleteProfileArgs = {
  profileId: Scalars['Int'];
};


export type MutationDeleteProfileFieldArgs = {
  profileFieldId: Scalars['Int'];
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['Int'];
};


export type MutationDeleteServiceFieldArgs = {
  serviceFieldId: Scalars['Int'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['Int'];
};


export type MutationImportArgs = {
  json: Scalars['String'];
};


export type MutationSearchArgs = {
  keys?: Array<Scalars['String']>;
  pattern: Scalars['String'];
};


export type MutationServicesWithTagsArgs = {
  mode?: Scalars['String'];
  tags?: Array<Scalars['String']>;
};


export type MutationSignInArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignUpArgs = {
  adminPassword: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationTempArgs = {
  title: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  profileId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateProfileFieldArgs = {
  key: Scalars['String'];
  profileFieldId: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};


export type MutationUpdateServiceArgs = {
  serviceId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateServiceFieldArgs = {
  key: Scalars['String'];
  serviceFieldId: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};


export type MutationUpdateServiceTagsArgs = {
  serviceId: Scalars['Int'];
  tags: Array<Scalars['String']>;
};


export type MutationUpdateTagArgs = {
  tagId: Scalars['Int'];
  title: Scalars['String'];
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
  type: Scalars['String'];
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
  type: Scalars['String'];
  value: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  services: Array<Service>;
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['ID'];
};

export type ServicesWithTagsMutationVariables = Exact<{
  tags: Array<Scalars['String']> | Scalars['String'];
  mode: Scalars['String'];
}>;


export type ServicesWithTagsMutation = { __typename?: 'Mutation', servicesWithTags: Array<{ __typename?: 'Service', id: string, title: string, fields: Array<{ __typename?: 'ServiceField', id: string, key: string, value: string, type: string }>, profiles: Array<{ __typename?: 'Profile', id: string, title: string, fields: Array<{ __typename?: 'ProfileField', id: string, key: string, value: string, type: string }> }>, tags: Array<{ __typename?: 'Tag', id: string, title: string }> }> };

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  adminPassword: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, username: string } };


export const ServicesWithTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"servicesWithTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"servicesWithTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<ServicesWithTagsMutation, ServicesWithTagsMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adminPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"adminPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adminPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;