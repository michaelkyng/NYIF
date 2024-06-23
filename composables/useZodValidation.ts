import {
  PersonalInformationSchema,
  ContactInformationSchema,
  IdentificationSchema,
} from "~/schema/NyifFormSchema";
export default () => {
  const validateStep = (step: string, data: object) => {
    let schema;

    switch (step) {
      case "personal-information":
        schema = PersonalInformationSchema;
        break;
      case "contact-information":
        schema = ContactInformationSchema;
        break;
      case "identification":
        schema = IdentificationSchema;
        break;
      default:
        return false;
    }

    try {
      schema.parse(data);
      return true;
    } catch (error: any) {
      console.error(error.errors);
      return false;
    }
  };
  return {
    validateStep,
  };
};
