import { verifyEmail } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const VerifyEmailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Create form schema with Zod
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("validation.required") })
      .email({ message: t("validation.email") }),
    code: z
      .string()
      .min(6, { message: t("validation.exactLength", { length: 6 }) })
      .max(6, { message: t("validation.exactLength", { length: 6 }) })
      .regex(/^\d+$/, { message: t("validation.numeric") }),
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      code: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await verifyEmail({
        email: values.email,
        code: values.code,
      });
      toast.success(t("auth.verifyEmail.success"));
      navigate("/dashboard");
    } catch {
      // Error is handled by the API client
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 page-transition">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{t("auth.verifyEmail.title")}</h1>
        <p className="text-muted-foreground">
          {t("auth.verifyEmail.subtitle")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.verifyEmail.code")}</FormLabel>
                <FormControl>
                  <Input placeholder="123456" maxLength={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("common.loading")}
              </>
            ) : (
              t("auth.verifyEmail.verify")
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <Link to="/dashboard" className="underline hover:text-primary">
          {t("auth.verifyEmail.skipForNow")}
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
