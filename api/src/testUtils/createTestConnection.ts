import { createConnection, getConnectionOptions } from "typeorm";

export const createTestConnection = async () => {
  const options = await getConnectionOptions("test");
  return createConnection({ ...options, name: "default" });
};
