"use client"

import { ControllerRenderProps, useForm } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SignInSchema } from "@/schema/sign_in"

const SignInForm = () => {
  const rh_form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: ControllerRenderProps["onChange"]) => (
    onChange(e.target.value.trim())
  )

  const renderForm = () => (
    <Form {...rh_form}>
      <form 
        className="flex flex-col gap-2" 
        onSubmit={rh_form.handleSubmit(onSubmit)}
      >
        <FormField
          control={rh_form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Email..." 
                  type="email"  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={rh_form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Password..." 
                  type="password"
                  onChange={e => handlePasswordChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  )

  return (
    <Card className="min-w-[500px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Fill out the following:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {renderForm()}
      </CardContent>
    </Card>
  )
}

export default SignInForm

