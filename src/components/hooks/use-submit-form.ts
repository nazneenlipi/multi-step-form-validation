import { useMutation } from "@tanstack/react-query"
import { submitFormData, type FormData } from "@/lib/api"
import { toast } from "sonner"

export function useSubmitForm() {
  return useMutation({
    mutationFn: (data: FormData) => submitFormData(data),
    onSuccess: (data) => {
      toast("Form submitted successfully!",{
        description: `Your user ID is: ${data.id}`,
      })
    },
    onError: (error: Error) => {
      toast("Submission failed",{
        description: error.message,
      })
    },
  })
}
