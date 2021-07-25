import { createTestConnection, fireGraphQLCall } from "../../../testUtils";
import { Connection } from "typeorm";
import { CreateInstitutionInput } from "../types";
import { createInstitutionDocument } from "./InstitutionDocuments";

describe("Institution Resolver", () => {
  let conn: Connection;
  beforeAll(async () => {
    conn = await createTestConnection();
  });

  afterAll(async () => {
    await conn.close();
  });

  const createInstitution = async () => {
    const createInstitutionInput: CreateInstitutionInput = {
      name: "University of Surrey",
      address: "Stag Hill, University Campus, Guildford GU2 7XH",
      country: "The United Kingdom",
      region: "EU",
    };

    return await fireGraphQLCall(createInstitutionDocument, {
      input: createInstitutionInput,
    });
  };

  it("creates an institution", async () => {
    const response = await createInstitution();

    const expectedResponse = {
      data: {
        createInstitution: {
          name: "University of Surrey",
          address: "Stag Hill, University Campus, Guildford GU2 7XH",
          country: "The United Kingdom",
          region: "EU",
        },
      },
    };

    expect(response).toEqual(expectedResponse);
  });

  it("retrieves all institutions", async () => {
    expect(response).toEqual(expectedResponse);
  });

  it("updates an institution", async () => {
    expect(response).toEqual(expectedResponse);
  });

  it("deletes an institution", async () => {
    expect(response).toEqual(expectedResponse);
  });
});
