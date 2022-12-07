/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation servicesWithTags($tags: [String!]!, $mode: String!) {\n    servicesWithTags(tags: $tags, mode: $mode) {\n      id\n      title\n      fields {\n        id\n        key\n        value\n      }\n      profiles {\n        id\n        title\n        fields {\n          id\n          key\n          value\n        }\n      }\n      tags {\n        id\n        title\n      }\n    }\n  }\n": types.ServicesWithTagsDocument,
    "\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n": types.SignInDocument,
    "\n  mutation signUp(\n    $username: String!\n    $password: String!\n    $adminPassword: String!\n  ) {\n    signUp(\n      username: $username\n      password: $password\n      adminPassword: $adminPassword\n    ) {\n      id\n      username\n    }\n  }\n": types.SignUpDocument,
};

export function graphql(source: "\n  mutation servicesWithTags($tags: [String!]!, $mode: String!) {\n    servicesWithTags(tags: $tags, mode: $mode) {\n      id\n      title\n      fields {\n        id\n        key\n        value\n      }\n      profiles {\n        id\n        title\n        fields {\n          id\n          key\n          value\n        }\n      }\n      tags {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation servicesWithTags($tags: [String!]!, $mode: String!) {\n    servicesWithTags(tags: $tags, mode: $mode) {\n      id\n      title\n      fields {\n        id\n        key\n        value\n      }\n      profiles {\n        id\n        title\n        fields {\n          id\n          key\n          value\n        }\n      }\n      tags {\n        id\n        title\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n"];
export function graphql(source: "\n  mutation signUp(\n    $username: String!\n    $password: String!\n    $adminPassword: String!\n  ) {\n    signUp(\n      username: $username\n      password: $password\n      adminPassword: $adminPassword\n    ) {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation signUp(\n    $username: String!\n    $password: String!\n    $adminPassword: String!\n  ) {\n    signUp(\n      username: $username\n      password: $password\n      adminPassword: $adminPassword\n    ) {\n      id\n      username\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;