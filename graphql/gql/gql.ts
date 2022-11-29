/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation createService($title: String!) {\n    createService(title: $title) {\n      id\n    }\n  }\n": types.CreateServiceDocument,
    "\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n": types.SignInDocument,
    "\n  query tags {\n    tags {\n      id\n      title\n    }\n  }\n": types.TagsDocument,
    "\n  mutation updateServiceTags($serviceId: Int!, $tagIds: [Int!]!) {\n    updateServiceTags(serviceId: $serviceId, tagIds: $tagIds) {\n      id\n    }\n  }\n": types.UpdateServiceTagsDocument,
    "\n  mutation allServices {\n    servicesWithTags {\n      id\n      title\n      fields {\n        key\n        value\n      }\n    }\n  }\n": types.AllServicesDocument,
    "\n  mutation servicesWithTags($tagIds: [Int!]!, $mode: String) {\n    servicesWithTags(tagIds: $tagIds, mode: $mode) {\n      id\n      title\n      fields {\n        key\n        value\n      }\n    }\n  }\n": types.ServicesWithTagsDocument,
};

export function graphql(source: "\n  mutation createService($title: String!) {\n    createService(title: $title) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createService($title: String!) {\n    createService(title: $title) {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n"];
export function graphql(source: "\n  query tags {\n    tags {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  query tags {\n    tags {\n      id\n      title\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateServiceTags($serviceId: Int!, $tagIds: [Int!]!) {\n    updateServiceTags(serviceId: $serviceId, tagIds: $tagIds) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateServiceTags($serviceId: Int!, $tagIds: [Int!]!) {\n    updateServiceTags(serviceId: $serviceId, tagIds: $tagIds) {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  mutation allServices {\n    servicesWithTags {\n      id\n      title\n      fields {\n        key\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation allServices {\n    servicesWithTags {\n      id\n      title\n      fields {\n        key\n        value\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation servicesWithTags($tagIds: [Int!]!, $mode: String) {\n    servicesWithTags(tagIds: $tagIds, mode: $mode) {\n      id\n      title\n      fields {\n        key\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation servicesWithTags($tagIds: [Int!]!, $mode: String) {\n    servicesWithTags(tagIds: $tagIds, mode: $mode) {\n      id\n      title\n      fields {\n        key\n        value\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;