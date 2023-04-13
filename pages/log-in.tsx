import type { NextPage } from "next";
import Link from "next/link";
import Button from "../components/button";
import Input from "../components/input";

const Enter: NextPage = () => {

    return (
        <div className="mt-16 px-4">
            <h3 className="text-3xl font-bold text-center">Sign in Tweeter</h3>
            <div className="mt-12">
                <form className="flex flex-col mt-8 space-y-4">
                    <Input

                        name="nickname"
                        label="Nick Name"
                        type="text"
                        required
                    />
                    <Button text="Get Start" />
                </form>
                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute w-full border-t border-gray-300" />
                        <div className="relative -top-3 text-center ">
                            <span className="bg-white px-2 text-sm text-gray-500">
                                No have account?
                                <Link href="/create-account" className="ml-2 text-blue-500 hover:text-blue-600">Sign up</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Enter;
