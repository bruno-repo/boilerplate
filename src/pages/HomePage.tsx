import { ArrowRight, CheckCircle, Lock, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <div className="animated-bg">
        <div className="animated-shape shape-1" />
        <div className="animated-shape shape-2" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="container py-24 md:py-32 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="px-8"
            >
              {t("common.getStarted")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              {t("common.learnMore")}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title={t("home.features.secure.title")}
            description={t("home.features.secure.description")}
          />
          <FeatureCard
            icon={<Lock className="h-10 w-10" />}
            title={t("home.features.tokens.title")}
            description={t("home.features.tokens.description")}
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title={t("home.features.sessions.title")}
            description={t("home.features.sessions.description")}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="99.9%" label="Uptime" />
          <StatCard number="10ms" label="Response Time" />
          <StatCard number="256bit" label="Encryption" />
          <StatCard number="24/7" label="Support" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto glass py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold">Pro Boilerplate</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pro Boilerplate.{" "}
            {t("common.allRightsReserved")}
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass rounded-2xl p-8 hover-card">
    <div className="bg-primary/10 rounded-xl p-3 w-fit mb-6">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
    <div className="mt-6 flex gap-2 text-sm text-primary">
      <CheckCircle className="h-5 w-5" />
      <span>Enterprise Ready</span>
    </div>
  </div>
);

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => (
  <div className="text-center space-y-2">
    <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
      {number}
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default HomePage;
