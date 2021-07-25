export const createInstitutionDocument: string = `
mutation($input: CreateInstitutionInput!) {
    createInstitution(input: $input) {
      id
      name
      address
      country
      region
    }
  }
`;

export const getInstitutionsDocument: string = `
query {
  institutions {
    name
    address
    country
    region
  }
}
`;

export const updateInstitutionDocument: string = `
mutation($update: UpdateInstitutionInput!, $id: String!) {
  updateInstitution(update: $update, id: $id) {
    name
    address
    country
    region
  }
}
`;

export const deleteInstitutionDocument: string = `
mutation($id: String!) {
  deleteInstitution(id: $id)
}
`;
