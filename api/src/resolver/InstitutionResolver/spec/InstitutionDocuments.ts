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
