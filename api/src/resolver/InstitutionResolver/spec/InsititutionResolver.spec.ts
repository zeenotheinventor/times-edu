import { createTestConnection, fireGraphQLCall } from "../../../testUtils";
import { Connection } from "typeorm";
import { CreateInstitutionInput } from "../types";
import { createInstitutionDocument } from "./InstitutionDocuments";
import { Institution } from "../../../entity";

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

    const institution = {
      name: "University of Surrey",
      address: "Stag Hill, University Campus, Guildford GU2 7XH",
      country: "The United Kingdom",
      region: "EU",
    };

    const expectedResponse = {
      data: {
        createInstitution: institution,
      },
    };

    expect(response).toEqual(expectedResponse);

    const createdInstitution = await Institution.findOne(institution);
    expect(createdInstitution).toEqual(expect.objectContaining(institution));
  });

  it("retrieves all institutions", async () => {
    await createInstitution();
  });

  it("updates an institution", async () => {
    expect(response).toEqual(expectedResponse);
  });

  it("deletes an institution", async () => {
    expect(response).toEqual(expectedResponse);
  });
});
