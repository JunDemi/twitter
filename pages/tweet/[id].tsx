import type { NextPage } from "next";
import Layout from "../../components/layout";
import { Tweet, User } from "@prisma/client";
import useUser from "../../lib/client/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

interface TweettWithUser extends Tweet {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: TweettWithUser;
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { data } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null

  );
  return (
    <>
    <Head>
        <title>{data?.tweet?.userName} | Tweet</title>
    </Head>
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          {data ?
            <>
              <div className="flex cursor-pointer py-3 items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-slate-300" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {data?.tweet?.userName}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-3xl font-bold text-gray-900">
                {data?.tweet?.title}
                </h1>
                <p className=" my-6 text-gray-700">
                {data?.tweet?.text}
                </p>
                <div className="flex items-center justify-between space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg
                      className="h-6 w-6 "
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
            : "Loading..."}

        </div>
      </div>
    </Layout>
    </>
  );
};

export default ItemDetail;
