import { Schema, ZodIssueCode, date, z } from "zod";
export const NyifFormValidationSchema = z.object({
  name: z.object({
    first: z.string().min(1, "You must enter a First Name"),
    last: z.string().min(1, "You must enter a Last Name"),
  }),
  dateOfBirth: z.coerce
    .date()
    .min(new Date("1940-12-31"), {
      message: "You are Older than the Age Limit",
    })
    .max(new Date("2005-12-31"), {
      message: "You are too Young to Apply for the loan",
    }),
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed", "Other"]),
  maritalStatusOther: z.string().optional(),
  employmentStatus: z.enum([
    "Employed",
    "Self-Employed",
    "Unemployed",
    "Retired",
    "Other",
  ]),
  employmentStatusOther: z.string().optional(),
  monthlyIncome: z.coerce.number(),
  reasonForLoanApplication: z
    .string()
    .min(180, { message: "Must be 180 Characters Long" }),
  address: z.string().min(5),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^(\+?\d{1,3}[-.\s]?)?(\d{10})$/, {
    message:
      "Invalid phone number format. Ensure it includes 10 digits, optionally prefixed by a country code.",
  }),
  identificationType: z.enum([
    "Driver's License",
    "Passport",
    "National ID",
    "Other",
  ]),
  identificationTypeOther: z.string().optional(),
  identificationNumber: z.coerce.string().min(1),
  identificationImage: z.coerce.string().min(1),
});

const applySuperRefine = (schema: Schema) =>
  schema.superRefine((data, ctx) => {
    if (data.employmentStatus === "Other" && !data.employmentStatusOther) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ["employmentStatusOther"],
        message: "You must specify the employment status",
      });
    }
    if (data.maritalStatus === "Other" && !data.maritalStatusOther) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ["maritalStatusOther"],
        message: "You must specify the marital status",
      });
    }
    if (data.identificationType === "Other" && !data.identificationTypeOther) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ["identificationTypeOther"],
        message: "You must specify the identification type",
      });
    }
  });

export const PersonalInformationSchema = applySuperRefine(
  NyifFormValidationSchema.pick({
    name: true,
  }).strict()
);

export const ContactInformationSchema = applySuperRefine(
  NyifFormValidationSchema.pick({
    address: true,
    emailAddress: true,
    phoneNumber: true,
  }).strict()
);

export const IdentificationSchema = applySuperRefine(
  NyifFormValidationSchema.pick({
    identificationImage: true,
    identificationNumber: true,
    identificationType: true,
    identificationTypeOther: true,
  }).strict()
);
