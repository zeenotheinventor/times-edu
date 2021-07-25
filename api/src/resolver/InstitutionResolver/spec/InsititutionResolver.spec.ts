import { createTestConnection, fireGraphQLCall } from "../../../testUtils";
import { Connection } from "typeorm";
import { CreateInstitutionInput } from "../types";
import {
  createInstitutionDocument,
  deleteInstitutionDocument,
  getInstitutionsDocument,
  updateInstitutionDocument,
} from "./InstitutionDocuments";
import { Institution } from "../../../entity";
import { ExecutionResult } from "graphql";

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

    expect(response.errors).toBeUndefined();
    expect(response.data?.createInstitution).toEqual(
      expect.objectContaining(institution)
    );

    const createdInstitution = await Institution.findOne(institution);
    expect(createdInstitution).toEqual(expect.objectContaining(institution));
  });

  it("retrieves all institutions", async () => {
    await conn.close();

    conn = await createTestConnection();
    await createInstitution();

    const response: ExecutionResult = await fireGraphQLCall(
      getInstitutionsDocument
    );

    const expectedResponse: ExecutionResult = {
      data: {
        institutions: [
          {
            name: "University of Surrey",
            address: "Stag Hill, University Campus, Guildford GU2 7XH",
            country: "The United Kingdom",
            region: "EU",
          },
        ],
      },
    };

    expect(response.errors).toBeUndefined();
    expect(response).toEqual(expectedResponse);
  });

  it("updates an institution", async () => {
    const createInstitutionResponse: ExecutionResult =
      await createInstitution();

    const institution = {
      name: "Batman College of Sneakery",
      address: "Stag Hill, University Campus, Guildford GU2 7XH",
      country: "The United Kingdom",
      region: "EU",
    };

    const expectedResponse: ExecutionResult = {
      data: {
        updateInstitution: institution,
      },
    };

    const id: string = createInstitutionResponse.data?.createInstitution?.id;

    const response: ExecutionResult = await fireGraphQLCall(
      updateInstitutionDocument,
      { id, update: { name: "Batman College of Sneakery" } }
    );

    const updatedInstitution = await Institution.findOne({
      name: "Batman College of Sneakery",
    });

    expect(response.errors).toBeUndefined();
    expect(updatedInstitution).toEqual(expect.objectContaining(institution));
    expect(response).toEqual(expectedResponse);
  });

  it("deletes an institution", async () => {
    const createInstitutionResponse: ExecutionResult =
      await createInstitution();
    await createInstitution();

    const institutionId: string =
      createInstitutionResponse.data?.createInstitution?.id;

    const deleteInstitutionResponse: ExecutionResult = await fireGraphQLCall(
      deleteInstitutionDocument,
      { id: institutionId }
    );

    expect(deleteInstitutionResponse.errors).toBeUndefined();

    const expectedResponse = {
      data: {
        deleteInstitution: true,
      },
    };
    expect(deleteInstitutionResponse).toEqual(expectedResponse);

    const deletedInstitution = await Institution.findOne({ id: institutionId });
    expect(deletedInstitution).not.toBeDefined();
  });
});
