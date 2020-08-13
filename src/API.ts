/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateContactInput = {
  id?: string | null,
  name: string,
  jobTitle: string,
  address: string,
  phoneNumbers: Array< string >,
  email: string,
  pictureUrl?: string | null,
};

export type ModelContactConditionInput = {
  name?: ModelStringInput | null,
  jobTitle?: ModelStringInput | null,
  address?: ModelStringInput | null,
  phoneNumbers?: ModelStringInput | null,
  email?: ModelStringInput | null,
  pictureUrl?: ModelStringInput | null,
  and?: Array< ModelContactConditionInput | null > | null,
  or?: Array< ModelContactConditionInput | null > | null,
  not?: ModelContactConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateContactInput = {
  id: string,
  name?: string | null,
  jobTitle?: string | null,
  address?: string | null,
  phoneNumbers?: Array< string > | null,
  email?: string | null,
  pictureUrl?: string | null,
};

export type DeleteContactInput = {
  id?: string | null,
};

export type ModelContactFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  jobTitle?: ModelStringInput | null,
  address?: ModelStringInput | null,
  phoneNumbers?: ModelStringInput | null,
  email?: ModelStringInput | null,
  pictureUrl?: ModelStringInput | null,
  and?: Array< ModelContactFilterInput | null > | null,
  or?: Array< ModelContactFilterInput | null > | null,
  not?: ModelContactFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateContactMutationVariables = {
  input: CreateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type CreateContactMutation = {
  createContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateContactMutationVariables = {
  input: UpdateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type UpdateContactMutation = {
  updateContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteContactMutationVariables = {
  input: DeleteContactInput,
  condition?: ModelContactConditionInput | null,
};

export type DeleteContactMutation = {
  deleteContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetContactQueryVariables = {
  id: string,
};

export type GetContactQuery = {
  getContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContactsQueryVariables = {
  filter?: ModelContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContactsQuery = {
  listContacts:  {
    __typename: "ModelContactConnection",
    items:  Array< {
      __typename: "Contact",
      id: string,
      name: string,
      jobTitle: string,
      address: string,
      phoneNumbers: Array< string >,
      email: string,
      pictureUrl: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateContactSubscription = {
  onCreateContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContactSubscription = {
  onUpdateContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContactSubscription = {
  onDeleteContact:  {
    __typename: "Contact",
    id: string,
    name: string,
    jobTitle: string,
    address: string,
    phoneNumbers: Array< string >,
    email: string,
    pictureUrl: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
