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

export type Mutation = {
  __typename?: 'Mutation';
  createProfile: Profile;
  createProfileField: Profile;
  createService: Service;
  createServiceField: Service;
  createTag: Tag;
  deleteProfile: Profile;
  deleteProfileField: Profile;
  deleteService: Service;
  deleteServiceField: Service;
  deleteTag: Tag;
  servicesWithTags: Array<Service>;
  signIn: Scalars['String'];
  updateProfile: Profile;
  updateProfileField: Profile;
  updateService: Service;
  updateServiceField: Service;
  updateServiceTags: Service;
  updateTag: Tag;
};


export type MutationCreateProfileArgs = {
  serviceId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationCreateProfileFieldArgs = {
  key: Scalars['String'];
  profileId: Scalars['Int'];
  value: Scalars['String'];
};


export type MutationCreateServiceArgs = {
  title: Scalars['String'];
};


export type MutationCreateServiceFieldArgs = {
  key: Scalars['String'];
  serviceId: Scalars['Int'];
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


export type MutationServicesWithTagsArgs = {
  mode?: Scalars['String'];
  tagIds?: Array<Scalars['Int']>;
};


export type MutationSignInArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  profileId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateProfileFieldArgs = {
  key: Scalars['String'];
  profileFieldId: Scalars['Int'];
  value: Scalars['String'];
};


export type MutationUpdateServiceArgs = {
  serviceId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateServiceFieldArgs = {
  key: Scalars['String'];
  serviceFieldId: Scalars['Int'];
  value: Scalars['String'];
};


export type MutationUpdateServiceTagsArgs = {
  serviceId: Scalars['Int'];
  tagIds: Array<Scalars['Int']>;
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

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', title: string }> };

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };


export const TagsDocument = gql`
    query tags {
  tags {
    title
  }
}
    `;

export function useTagsQuery(options?: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'>) {
  return Urql.useQuery<TagsQuery, TagsQueryVariables>({ query: TagsDocument, ...options });
};
export const SignInDocument = gql`
    mutation signIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};