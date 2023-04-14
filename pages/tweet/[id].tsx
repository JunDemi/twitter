import type { NextPage } from "next";
import Layout from "../../components/layout";
import { Tweet, User } from "@prisma/client";
import useUser from "../../lib/client/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import useMutation from "../../lib/client/useMutation";
import { cls } from "../../lib/client/utils";

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
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    mutate((prev) => prev && ({ ...prev, isLiked: !prev.isLiked }), false);
    //mutate("/api/users/me", (prev:any) => ({ok: !prev.ok}), false);
    toggleFav({});
  };
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
                <div className="flex items-center justify-start">
                  <button onClick={onFavClick}
                    className={cls(
                      "p-3 rounded-md flex items-center justify-center w-1/5 transition",
                      data.isLiked
                        ? "bg-blue-400 hover:bg-blue-500"
                        : "bg-gray-400 hover:bg-gray-500"
                    )}
                  >
                    {data.isLiked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        viewBox="0 0 20 20"
                        fill="white"
                        stroke="white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        viewBox="0 0 20 20"
                        fill="white"
                        stroke="white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
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
