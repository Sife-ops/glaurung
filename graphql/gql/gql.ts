/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query tags {\n    tags {\n      title\n    }\n  }\n": types.TagsDocument,
    "\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n": types.SignInDocument,
};

export function graphql(source: "\n  query tags {\n    tags {\n      title\n    }\n  }\n"): (typeof documents)["\n  query tags {\n    tags {\n      title\n    }\n  }\n"];
export function graphql(source: "\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password)\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;