"use client";
import getUserForm from "@/app/actions/getUserForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wrench } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;
  const { data: session } = useSession();
  const [form, setForm] = useState();
  //@ts-ignore
  const userId = session?.user?.id;
  useEffect(() => {
    const getRequests = async () => {
      const response = await getUserForm(formId);
      console.log(response);
    };
    getRequests();
  }, [userId]);

  return (
    <>
      <header className="border bottom-1 w-full">
        <nav className="border-gray-200 px-4 py-2.5 flex justify-center max-w-[1300px] mx-auto">
          <div className="flex flex-wrap justify-between items-center mr-auto max-w-screen-xl">
            <Wrench
              size={22}
              strokeWidth={1.5}
              className="dark:white light:black"
            />
            <h2 className="text-md font-bold text dark-white ml-2">
              AI Form Builder
            </h2>
          </div>
        </nav>
      </header>
      {!formId && (
        <div className="w-full min-h-[90vh] flex items-center justify-center ">
          <Alert variant="default" className="w-[50%]">
            <AlertTitle>Fail</AlertTitle>
            <AlertDescription>
              Form Not Found.
              <Link href="/dashboard" className="underline">
                Go back to dashboard
              </Link>{" "}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Page;
