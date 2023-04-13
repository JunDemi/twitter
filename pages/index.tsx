import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Item from "../components/item";
import FloatingButton from "../components/floating-button";

export default () => {
  return (
  <>
  <Head>
    <title>Home</title>
  </Head>
  <Layout title="Twitter of JunDemi" hasTabBar>
    <div className="flex flex-col space-y-5 divide-y">
      {[1,1,1,1,1,1].map((i) => (
        <Item
          id={i}
          key={i}
          title="Hello Twitter"
          price={300}
          comments={1}
          hearts={2}
        />
      ))}
      <FloatingButton href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </div>
  </Layout>
  </>
  );
}
