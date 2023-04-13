import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";


const Upload: NextPage = () => {
  
  return (
    <Layout canGoBack title="Upload Tweet">
      <form className="p-4 space-y-4">
        <Input

          required
          label="Title"
          name="title"
          type="text"
        />
        <TextArea

          name="tweet"
          label="Tweet"
          required
        />
        <Button text={"Upload Tweet"} />
      </form>
    </Layout>
  );
};

export default Upload;
