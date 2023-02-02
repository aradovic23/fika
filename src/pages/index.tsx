import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { getStaticPropsWithTrans } from "../utils/next-trans";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Drinks App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Drinks App</h1>
        <Button>
          <Link href="/drinks">See drinks</Link>
        </Button>
        {sessionData && <p>Welcome back {sessionData.user?.name}!</p>}
        <p>{t("welcome")}</p>
      </main>
    </>
  );
};

export default Home;

export { getStaticPropsWithTrans as getStaticProps };
