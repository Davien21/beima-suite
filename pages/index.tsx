import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Create a documentation for your smart contract."
        />
        <meta
          name="keywords"
          content="Splinter, Documentation, Smart Contract, Postman"
        ></meta>
        <title>Splinter | Document Smart Contract </title>
      </Head>

      <main>
        <section className="container">
          <div className="text-center mt-20">
            <h1 className="text-6xl text-center">Welcome to Splinter </h1>
            <p className="my-4">Postman for the Blockchain</p>
            <Link href={`create`}>
              <a className="rounded bg-red-600 inline-block px-6 text-white py-3 hover:drop-shadow-sm">Click to document Smart Contract </a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
