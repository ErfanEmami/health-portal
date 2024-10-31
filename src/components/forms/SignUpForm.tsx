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
import { SignUpSchema } from "@/schema/sign_up"
import { signUp } from "@/server/actions/providers"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const SignUpForm = () => {
  const router = useRouter()

  const rh_form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const res = await signUp(values)
    if (res.success) {
      // router.push("/dashboard")
      toast.success("Account created successfully")
    } else {
      toast.error(res.error)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: ControllerRenderProps["onChange"]) => (
    onChange(e.target.value.trim())
  )

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: ControllerRenderProps["onChange"]) => (
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Name..." 
                  type="text"  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={rh_form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Confirm password..." 
                  type="password"
                  onChange={e => handleConfirmPasswordChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  )

  return (
    <Card className="min-w-[500px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Fill out the following</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {renderForm()}
      </CardContent>
    </Card>
  )
}

export default SignUpForm

