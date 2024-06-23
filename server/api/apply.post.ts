import { NyifFormValidationSchema } from "~~/schema/NyifFormSchema";

export default defineEventHandler(async (event) => {
  const { success } = await readValidatedBody(
    event,
    NyifFormValidationSchema.safeParse
  );
  if (!success) {
    return {
      status: 400,
      body: "Invalid request body",
    };
  }
  return {
    status: 200,
    body: "Correct",
  };
});
7;
