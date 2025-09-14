import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CheckCircle2, Clock, Loader2, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
  deactivateAllSessions,
  deactivateSession,
  getUserSessions,
} from "@/api/sessions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Session } from "@/types/sessions";

const SessionsPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Get user sessions
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: getUserSessions,
  });

  // Mutation for deactivating a session
  const deactivateMutation = useMutation({
    mutationFn: deactivateSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success(t("sessions.deactivateSuccess"));
    },
  });

  // Mutation for deactivating all sessions
  const deactivateAllMutation = useMutation({
    mutationFn: deactivateAllSessions,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success(t("sessions.deactivateAllSuccess", { count: data.count }));
    },
  });

  // Handle session deactivation
  const handleDeactivate = (sessionId: string) => {
    deactivateMutation.mutate(sessionId);
  };

  // Handle all sessions deactivation
  const handleDeactivateAll = () => {
    deactivateAllMutation.mutate();
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy HH:mm");
  };

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("sessions.title")}
        </h2>
        <p className="text-muted-foreground">{t("sessions.subtitle")}</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>{t("sessions.activeSessions")}</CardTitle>
              <CardDescription>{t("sessions.description")}</CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={deactivateAllMutation.isPending}
                >
                  {deactivateAllMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  {t("sessions.deactivateAll")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("sessions.confirmDeactivateAll")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("sessions.confirmDeactivateAllDescription")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeactivateAll}>
                    {t("common.continue")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !sessions || sessions.length === 0 ? (
            <div className="flex justify-center py-10 text-muted-foreground">
              {t("sessions.noSessions")}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("sessions.status")}</TableHead>
                    <TableHead>{t("sessions.ipAddress")}</TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t("sessions.userAgent")}
                    </TableHead>
                    <TableHead>{t("sessions.created")}</TableHead>
                    <TableHead>{t("common.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session: Session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {session.isActive ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              <span>{t("sessions.active")}</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{t("sessions.inactive")}</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{session.ipAddress}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                        {session.userAgent}
                      </TableCell>
                      <TableCell>{formatDate(session.createdAt)}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={
                                !session.isActive ||
                                deactivateMutation.isPending
                              }
                            >
                              {deactivateMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
                              )}
                              <span className="sr-only">
                                {t("sessions.deactivate")}
                              </span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {t("sessions.confirmDeactivate")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("sessions.confirmDeactivateDescription")}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t("common.cancel")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeactivate(session.id)}
                              >
                                {t("common.continue")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsPage;
