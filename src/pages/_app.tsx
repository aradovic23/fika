import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";

import { api } from "../utils/api";

import "../styles/globals.css";
import Navbar from "../components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navbar>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </Navbar>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
