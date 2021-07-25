export const createInstitutionDocument: string = `
mutation($input: CreateInstitutionInput!) {
    createInstitution(input: $input) {
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
