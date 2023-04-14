import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import FloatingButton from "../components/floating-button";
import Link from "next/link";
import useUser from "../lib/client/useUser";
import useSWR from "swr";
import {Tweets}  from "@prisma/client";

interface TweetWithCount extends Tweets {
  _count: {
    favs: number;
  };
}

interface TweetResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

export default () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<TweetResponse>("/api/tweets");
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout hasTabBar title="Tweeter of JunDemi">
        <div className="divide-y-[1px]">
          {data?.tweets?.map((tweet) => (
            <Link
              key={tweet.id}
              href={`/tweet/${tweet.id}`}
              className="flex cursor-pointer flex-col pt-4 items-start hover:bg-gray-100 transition"
            >
              <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {tweet.userName}
              </span>
              <div className="mt-2 px-4 text-gray-700 flex justify-start items-center space-x-2">
                <span className="text-blue-400 font-medium flex"><svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg></span>
                <span className="font-semibold">{tweet.title}</span>
              </div>
              <div className="my-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                <span className="flex space-x-2 items-center text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <span>{tweet._count.favs}</span>
                </span>
                <span>{String(tweet.createdAt).substring(0, 10)}</span>
              </div>
            </Link>
          ))}
          <FloatingButton href="/tweet/write">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </FloatingButton>
        </div>
      </Layout>
    </>
  );
};
