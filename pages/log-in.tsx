import type { NextPage } from "next";
import Link from "next/link";
import Button from "../components/button";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

interface EnterForm {
  nickname?: string;
}
interface EnterMutationResult {
  ok: boolean;
}

const Enter: NextPage = () => {
  const { register, handleSubmit } = useForm<EnterForm>();
  const [confirmToken, { loading, data }] =
    useMutation<EnterMutationResult>("/api/users/signin");
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    confirmToken(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  });
  return (
    <>
    <Head>
        <title>Sign in</title>
    </Head>
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Sign in Tweeter</h3>
      <div className="mt-12">
        <form className="flex flex-col mt-8 space-y-4" onSubmit={handleSubmit(onValid)}>
          <Input
            register={register("nickname", {
              required: true,
            })}
            name="nickname"
            label="Nick Name"
            type="text"
            required
          />
          <Button text={loading ? "Loading" : "Get Start"} />
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center ">
              <span className="bg-white px-2 text-sm text-gray-500">
                No have account?
                <Link
                  href="/create-account"
                  className="ml-2 text-blue-500 hover:text-blue-600"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Enter;
