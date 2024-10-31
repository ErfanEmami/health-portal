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
import { signIn } from "@/server/actions/providers"
import { toast } from "sonner"

const SignInForm = () => {
  const rh_form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const res = await signIn(values)
    if (res.success) {
      // router.push("/dashboard")
      toast.success("Signed In successfully")
    } else {
      toast.error(res.error)
    }
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

