import Head from "next/head";
import Link from "next/link";
import Button from "./Button";

const AccessDenied = () => {
  return (
    <>
      <Head>
        <title>Access Denied</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <p className="uppercase">Access denied</p>
        <Link href="/">
          <Button size="btn-md" backgroundColor="bg-error">
            Go home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AccessDenied;
