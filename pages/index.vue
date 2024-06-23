<script setup lang="ts">
import { useStepper } from "@vueuse/core";
import { reactive } from "vue";
import { NyifFormValidationSchema } from "~/schema/NyifFormSchema";

const { labelStyle, inputStyle } = useTailwindConfig();
const { validateStep } = useZodValidation();

const form = reactive({
  name: { first: "", last: "" },
  dateOfBirth: "",
  maritalStatus: "",
  maritalStatusOther: "",
  employmentStatus: "",
  employmentStatusOther: "",
  monthlyIncome: "",
  reasonForLoanApplication: "",
  address: "",
  emailAddress: "",
  phoneNumber: "",
  identificationType: "",
  identificationTypeOther: "",
  identificationNumber: "",
  identificationImage: "",
});

const stepper = useStepper({
  "personal-information": {
    title: "Personal information",
    isValid: () =>
      validateStep("personal-information", {
        name: form.name,
        dateOfBirth: form.dateOfBirth,
        maritalStatus: form.maritalStatus,
        maritalStatusOther: form.maritalStatusOther,
        employmentStatus: form.employmentStatus,
        employmentStatusOther: form.employmentStatusOther,
        reasonForLoanApplication: form.reasonForLoanApplication,
      }),
  },
  "contact-information": {
    title: "Contact Information",
    isValid: () =>
      validateStep("contact-information", {
        address: form.address,
        emailAddress: form.emailAddress,
        phoneNumber: form.phoneNumber,
      }),
  },
  identification: {
    title: "Identification",
    isValid: () =>
      validateStep("identification-information", {
        identificationImage: form.identificationImage,
        identificationNumber: form.identificationNumber,
        identificationType: form.identificationType,
        identificationTypeOther: form.identificationTypeOther,
      }),
  },
});

const submit = () => {
  if (stepper.current.value.isValid()) stepper.goToNext();
};

const allStepsBeforeAreValid = (index: number): boolean => {
  for (let i = 0; i < index; i++) {
    if (!stepper.at(i)?.isValid()) {
      return false;
    }
  }
  return true;
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex gap-2 justify-center">
      <div v-for="(step, key, i) in stepper.steps.value" :key="key" class="">
        <button
          :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(key)"
          @click="stepper.goTo(key)"
          v-text="step.title"
        />
      </div>
    </div>

    <div class="w-full flex justify-center p-10">
      <UForm
        @submit.prevent="submit"
        :state="form"
        :schema="NyifFormValidationSchema"
        class="w-full"
      >
        <div id="firstName" class="relative">
          <input
            :class="inputStyle"
            v-model="form.name.first"
            placeholder="First Name"
            name="firstName"
          />
          <label for="firstName" :class="labelStyle">First Name</label>
        </div>
      </UForm>
    </div>
  </div>
</template>
