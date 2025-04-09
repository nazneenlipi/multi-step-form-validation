"use client"

import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useFormContext } from 'react-hook-form'
const { control } = useFormContext()
export const AccountSetup = () => {
  return (
    <div className='space-y-6'>
      <FormField
      control={control}
      name="username"
      render={({ field })=>(
        <FormItem>
            <Label htmlFor='username'>Username</Label>
            <FormControl>
                <Input id='username' placeholder='lipi' {...field} className='mt-1'/>
            </FormControl>
        </FormItem>
      )}
      />
       <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="password">Password</Label>
            <FormControl>
              <Input id="password" type="password" placeholder="••••••" {...field} className="mt-1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <FormControl>
              <Input id="confirmPassword" type="password" placeholder="••••••" {...field} className="mt-1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

