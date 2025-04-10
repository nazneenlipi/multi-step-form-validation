"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"

export default function PersonalInfo() {
  // Call hook at the top level
  const formMethods = useFormContext()

  // Check if context exists
  if (!formMethods) {
    return (
      <div className="p-4 border border-red-300 rounded bg-red-50 text-red-800">
        Error: PersonalInfo component must be used within a FormProvider
      </div>
    )
  }

  const { control } = formMethods

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="fullName">Full Name</Label>
            <FormControl>
              <Input id="fullName" placeholder="John Doe" {...field} className="mt-1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <FormControl>
              <Input id="email" type="email" placeholder="john.doe@example.com" {...field} className="mt-1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <FormControl>
              <Input id="phoneNumber" placeholder="1234567890" {...field} className="mt-1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
