"use client";
import getUserForm from "@/app/actions/getUserForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wrench } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Form from "../../Form";

const Page = ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;
  const { data: session, status } = useSession();
  const [form, setForm] = useState<FormDocument>();
  //@ts-ignore
  const userId = session?.user?.id;
  useEffect(() => {
    const getRequests = async () => {
      const response = await getUserForm(formId);
      setForm(response);
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
      {status === "loading" && (
        <div className="min-h-screen w-full flex items-center justify-center">
          <ClipLoader color="#3B82F6" size={50} aria-label="Please wait..." />
        </div>
      )}
      {status !== "loading" && (!formId || !form) && (
        <div className="w-full min-h-[90vh] flex items-center justify-center ">
          <Alert variant="default" className="w-[50%]">
            <AlertTitle>Fail</AlertTitle>
            <AlertDescription>
              Form Not Found.
              <Link href="/dashboard" className="underline">
                {" "}
                Go back to dashboard
              </Link>{" "}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {status !== "loading" && userId !== form?.userId && (
        <div className="w-full min-h-[90vh] flex items-center justify-center ">
          <Alert variant="default" className="w-[50%]">
            <AlertTitle>Unauthorized</AlertTitle>
            <AlertDescription>
              You are not authorized to view this page.
              <Link href="/dashboard" className="underline">
                {" "}
                Go back to dashboard
              </Link>{" "}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {status !== "loading" && userId === form?.userId && form && (
        <Form form={form as FormModel} editMode={true} />
      )}
    </>
  );
};

export default Page;
