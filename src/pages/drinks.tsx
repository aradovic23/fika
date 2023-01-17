import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { DrinkList } from "../components/DrinkList";

const Drinks: NextPage = () => {
  const drinks = api.drinks.getDrinks.useQuery();

  return (
    <>
      <Head>
        <title>Drinks</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <section className="container mx-auto py-10">
          <h1>All Drinks</h1>
          <div className="flex gap-4">
            <div className="h-screen w-1/3 bg-red-500">test</div>
            <div className="grid w-2/3 grid-cols-3 gap-5">
              {drinks.data?.map((drink) => (
                <DrinkList key={drink.id} {...drink} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Drinks;
