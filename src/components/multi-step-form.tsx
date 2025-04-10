"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/validation-schema";
import PersonalInfo from "./form-steps/personal-info";
import AddressDetails from "./form-steps/address-details";
import AccountSetup from "./form-steps/account-setup";
import Summary from "./form-steps/summary";
import { MoonIcon, SunIcon, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Progress } from "@/components/ui/progress";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { useSubmitForm } from "./hooks/use-submit-form";
import { Toaster } from "./ui/sonner";

type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    reset: resetMutation,
  } = useSubmitForm();

  // Prevent hydration mismatch by only rendering theme toggle after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const totalSteps = 4;
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await methods.trigger(fields as any);

    if (isValid) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const getFieldsForStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return ["fullName", "email", "phoneNumber"];
      case 2:
        return ["streetAddress", "city", "zipCode"];
      case 3:
        return ["username", "password", "confirmPassword"];
      default:
        return [];
    }
  };

  const onSubmit = (data: FormData) => {
    mutate(data);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    methods.reset();
    setStep(1);
    setFormSubmitted(false);
    resetMutation();
  };

  const renderStepContent = () => {
    if (formSubmitted) {
      if (isPending) {
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-medium">
              Submitting your information...
            </h3>
            <p className="text-muted-foreground mt-2">
              Please wait while we process your submission.
            </p>
          </div>
        );
      }

      if (isSuccess) {
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium">Submission Successful!</h3>
            <p className="text-muted-foreground mt-2">
              Thank you for completing the form.
            </p>
            <Button onClick={resetForm} className="mt-6">
              Start Over
            </Button>
          </div>
        );
      }

      if (isError) {
        return (
          <div className="py-6">
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error?.message || "An unexpected error occurred"}
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button
                onClick={() => mutate(methods.getValues())}
                className="mr-2"
              >
                Try Again
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Start Over
              </Button>
            </div>
          </div>
        );
      }
    }

    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <AddressDetails />;
      case 3:
        return <AccountSetup />;
      case 4:
        return <Summary />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    if (formSubmitted) {
      if (isPending) return "Submitting Form";
      if (isSuccess) return "Submission Successful";
      if (isError) return "Submission Failed";
    }

    switch (step) {
      case 1:
        return "Personal Information";
      case 2:
        return "Address Details";
      case 3:
        return "Account Setup";
      case 4:
        return "Review & Submit";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl text-center font-bold pb-10">
        Welcome to the MultiStepForm{" "}
      </h1>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
            <div className="flex justify-end mb-4">
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
            </div>
          </div>

          {!formSubmitted && (
            <>
              <CardDescription>
                Step {step} of {totalSteps}
              </CardDescription>
              <Progress value={progressPercentage} className="h-2 mt-2" />
            </>
          )}
        </CardHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CardContent className="pt-6">{renderStepContent()}</CardContent>

            {!formSubmitted && (
              <CardFooter className="flex justify-between border-t p-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isPending}
                  >
                    Previous
                  </Button>
                )}

                {step < 4 ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </CardFooter>
            )}
          </form>
        </FormProvider>
      </Card>
      <Toaster />
    </div>
  );
}
