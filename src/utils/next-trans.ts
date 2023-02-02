import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticPropsWithTrans({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
