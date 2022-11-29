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

export type CreateServiceMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', id: string } };

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, title: string }> };

export type UpdateServiceTagsMutationVariables = Exact<{
  serviceId: Scalars['Int'];
  tagIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type UpdateServiceTagsMutation = { __typename?: 'Mutation', updateServiceTags: { __typename?: 'Service', id: string } };

export type AllServicesMutationVariables = Exact<{ [key: string]: never; }>;


export type AllServicesMutation = { __typename?: 'Mutation', servicesWithTags: Array<{ __typename?: 'Service', id: string, title: string, fields: Array<{ __typename?: 'ServiceField', key: string, value: string }> }> };

export type ServicesWithTagsMutationVariables = Exact<{
  tagIds: Array<Scalars['Int']> | Scalars['Int'];
  mode?: InputMaybe<Scalars['String']>;
}>;


export type ServicesWithTagsMutation = { __typename?: 'Mutation', servicesWithTags: Array<{ __typename?: 'Service', id: string, title: string, fields: Array<{ __typename?: 'ServiceField', key: string, value: string }> }> };


export const CreateServiceDocument = gql`
    mutation createService($title: String!) {
  createService(title: $title) {
    id
  }
}
    `;

export function useCreateServiceMutation() {
  return Urql.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument);
};
export const SignInDocument = gql`
    mutation signIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const TagsDocument = gql`
    query tags {
  tags {
    id
    title
  }
}
    `;

export function useTagsQuery(options?: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'>) {
  return Urql.useQuery<TagsQuery, TagsQueryVariables>({ query: TagsDocument, ...options });
};
export const UpdateServiceTagsDocument = gql`
    mutation updateServiceTags($serviceId: Int!, $tagIds: [Int!]!) {
  updateServiceTags(serviceId: $serviceId, tagIds: $tagIds) {
    id
  }
}
    `;

export function useUpdateServiceTagsMutation() {
  return Urql.useMutation<UpdateServiceTagsMutation, UpdateServiceTagsMutationVariables>(UpdateServiceTagsDocument);
};
export const AllServicesDocument = gql`
    mutation allServices {
  servicesWithTags {
    id
    title
    fields {
      key
      value
    }
  }
}
    `;

export function useAllServicesMutation() {
  return Urql.useMutation<AllServicesMutation, AllServicesMutationVariables>(AllServicesDocument);
};
export const ServicesWithTagsDocument = gql`
    mutation servicesWithTags($tagIds: [Int!]!, $mode: String) {
  servicesWithTags(tagIds: $tagIds, mode: $mode) {
    id
    title
    fields {
      key
      value
    }
  }
}
    `;

export function useServicesWithTagsMutation() {
  return Urql.useMutation<ServicesWithTagsMutation, ServicesWithTagsMutationVariables>(ServicesWithTagsDocument);
};