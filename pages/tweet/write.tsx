import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useMutation from "../../lib/client/useMutation";
import { useEffect } from "react";
import { Tweets } from "@prisma/client";

interface UploadTweetForm {
  title: string;
  tweet: string;
}

interface UploadTweetMutation {
  ok: boolean;
  createTweet: Tweets;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadTweetForm>();
  const [uploadTweet, { loading, data }] =
  useMutation<UploadTweetMutation>("/api/tweets");
  const onValid = (data: UploadTweetForm) => {
    if (loading) return;
     uploadTweet(data);
  };
   useEffect(() => {
     if (data?.ok) {
       router.push(`/`);
     }
   }, [data, router]);
  return (
    <Layout canGoBack title="Upload Tweet">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("title", { required: true })}
          required
          label="Title"
          name="title"
          type="text"
        />
        <TextArea
          register={register("tweet", { required: true })}
          name="tweet"
          label="Tweet"
          required
        />
        <Button text={loading ? "Loading" : "Upload Tweet"} />
      </form>
    </Layout>
  );
};

export default Upload;
