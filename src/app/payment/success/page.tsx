import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wrench } from "lucide-react";
import Link from "next/link";

const page = () => {
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
      <div className="w-full min-h-[90vh] flex items-center justify-center ">
        <Alert variant="default" className="w-[50%]">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your account has been updated.{" "}
            <Link href="/dashboard" className="underline">
              Go to the dashboard
            </Link>{" "}
            to create more forms
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default page;
