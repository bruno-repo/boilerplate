import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

const RegisterPage = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create form schema with Zod
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: t("validation.required") })
        .email({ message: t("validation.email") }),
      username: z
        .string()
        .min(3, { message: t("validation.minLength", { length: 3 }) })
        .max(20, { message: t("validation.maxLength", { length: 20 }) })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: t("validation.alphanumeric"),
        }),
      password: z
        .string()
        .min(8, { message: t("validation.minLength", { length: 8 }) })
        .regex(/[A-Z]/, { message: t("validation.uppercase") })
        .regex(/[a-z]/, { message: t("validation.lowercase") })
        .regex(/[0-9]/, { message: t("validation.number") })
        .regex(/[@$!%*?&]/, { message: t("validation.special") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsMatch"),
      path: ["confirmPassword"],
    });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await register({
        email: values.email,
        username: values.username,
        password: values.password,
      });
    } catch {
      // Error is handled by the API client
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 page-transition">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{t("auth.register.title")}</h1>
        <p className="text-muted-foreground">{t("auth.register.subtitle")}</p>
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.username")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("auth.register.usernameHint")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.password")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  {t("auth.register.passwordRequirements")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.confirmPassword")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...field}
                  />
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
              t("common.register")
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <p>
          {t("auth.register.haveAccount")}{" "}
          <Link to="/login" className="underline hover:text-primary">
            {t("auth.register.login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
