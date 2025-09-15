import { AlertCircle, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getUserSessions } from "@/api/sessions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: getUserSessions,
  });

  const activeSessions =
    sessions?.filter((session) => session.isActive).length || 0;

  return (
    <div className="page-transition space-y-6">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("dashboard.welcome")}
        </h2>
        <p className="text-muted-foreground">
          {t("dashboard.subtitle", { name: user?.username })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("dashboard.stats.account")}
          value={user?.username || "-"}
          description={t("dashboard.stats.accountDescription")}
          icon={<ShieldCheck className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title={t("dashboard.stats.emailStatus")}
          value={
            user?.isEmailVerified
              ? t("common.verified")
              : t("common.notVerified")
          }
          description={t("dashboard.stats.emailDescription")}
          icon={
            user?.isEmailVerified ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )
          }
        />
        <StatsCard
          title={t("dashboard.stats.activeSessions")}
          value={activeSessions.toString()}
          description={t("dashboard.stats.sessionsDescription")}
          icon={<Clock className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title={t("dashboard.stats.accountCreated")}
          value={
            user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "-"
          }
          description={t("dashboard.stats.createdDescription")}
          icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.quickActions.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.quickActions.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t("dashboard.quickActions.profile")}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t("dashboard.quickActions.sessions")}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t("dashboard.quickActions.security")}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.accountOverview.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.accountOverview.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">{t("common.email")}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">
                  {t("common.username")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user?.username}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default DashboardPage;
