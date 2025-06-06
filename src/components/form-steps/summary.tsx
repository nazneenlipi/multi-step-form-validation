"use client"

import { useFormContext } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function Summary() {
  // Call hook at the top level
  const formMethods = useFormContext()

  // Check if context exists
  if (!formMethods) {
    return (
      <div className="p-4 border border-red-300 rounded bg-red-50 text-red-800">
        Error: Summary component must be used within a FormProvider
      </div>
    )
  }

  const { getValues } = formMethods
  const formData = getValues()

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", value: formData.fullName },
        { label: "Email", value: formData.email },
        { label: "Phone Number", value: formData.phoneNumber },
      ],
    },
    {
      title: "Address Details",
      fields: [
        { label: "Street Address", value: formData.streetAddress },
        { label: "City", value: formData.city },
        { label: "Zip Code", value: formData.zipCode },
      ],
    },
    {
      title: "Account Setup",
      fields: [
        { label: "Username", value: formData.username },
        { label: "Password", value: "••••••" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <CheckCircle2 className="h-12 w-12 text-green-500 mr-3" />
        <h3 className="text-xl font-medium">Please review your information</h3>
      </div>

      {sections.map((section, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="bg-primary/10 px-4 py-2 font-medium">{section.title}</div>
          <CardContent className="p-4">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="py-1">
                  <dt className="text-sm font-medium text-muted-foreground">{field.label}</dt>
                  <dd className="mt-1 text-sm">{field.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
