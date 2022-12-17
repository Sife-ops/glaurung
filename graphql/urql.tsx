import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateFieldInput = {
  key: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
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
  field: CreateFieldInput;
  profileId: Scalars['Int'];
};


export type MutationCreateServiceArgs = {
  title: Scalars['String'];
};


export type MutationCreateServiceFieldArgs = {
  field: CreateFieldInput;
  serviceId: Scalars['Int'];
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


export type MutationUpdateProfileArgs = {
  profileId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateProfileFieldArgs = {
  field: UpdateFieldInput;
  profileFieldId: Scalars['Int'];
};


export type MutationUpdateServiceArgs = {
  serviceId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateServiceFieldArgs = {
  field: UpdateFieldInput;
  serviceFieldId: Scalars['Int'];
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

export type UpdateFieldInput = {
  key?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
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


export const ServicesWithTagsDocument = gql`
    mutation servicesWithTags($tags: [String!]!, $mode: String!) {
  servicesWithTags(tags: $tags, mode: $mode) {
    id
    title
    fields {
      id
      key
      value
      type
    }
    profiles {
      id
      title
      fields {
        id
        key
        value
        type
      }
    }
    tags {
      id
      title
    }
  }
}
    `;

export function useServicesWithTagsMutation() {
  return Urql.useMutation<ServicesWithTagsMutation, ServicesWithTagsMutationVariables>(ServicesWithTagsDocument);
};
export const SignInDocument = gql`
    mutation signIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignUpDocument = gql`
    mutation signUp($username: String!, $password: String!, $adminPassword: String!) {
  signUp(username: $username, password: $password, adminPassword: $adminPassword) {
    id
    username
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};