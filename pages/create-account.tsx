import type { NextPage } from "next";
import Link from "next/link";
import Button from "../components/button";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface EnterForm {
  nickname?: string;
}
interface EnterMutationResult {
  ok: boolean;
}

const Enter: NextPage = () => {
  const { register, handleSubmit } = useForm<EnterForm>();
  const [confirmToken, { loading, data }] =
    useMutation<EnterMutationResult>("/api/users/signup");
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    confirmToken(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push("/log-in");
    }
  });
  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Sign Up</h3>
      <div className="mt-12">
        <form
          className="flex flex-col mt-8 space-y-4"
          onSubmit={handleSubmit(onValid)}
        >
          <Input
            register={register("nickname", {
              required: true,
            })}
            name="newnickname"
            label="New Nick Name"
            type="text"
            required
          />
          <Button text={loading ? "Loading" : "Sign Up"} />
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center ">
              <span className="bg-white px-2 text-sm text-gray-500">
                Go Back to
                <Link
                  href="/log-in"
                  className="ml-2 text-blue-500 hover:text-blue-600"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Enter;
