import { getUserForms } from "@/app/actions/getUserForms";
import { getUserSubscription } from "@/app/actions/userSubscription";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import SubscribeBtn from "@/app/stripe-subscription/SubscribeBtn";
import { ClipLoader } from "react-spinners";

type Props = {};
const MAX_FREE_FORMS = 5;

const UpgradePlanBtn = (props: Props) => {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [forms, setForms] = useState<any[] | undefined>([]);
  const [loaded, setLoaded] = useState(false);
  // @ts-ignore
  const userId = session?.user?.id;

  useEffect(() => {
    const handleRequests = async () => {
      if (userId) {
        const sub = await getUserSubscription(userId);
        const fms = await getUserForms(userId);
        setSubscription(sub);
        setForms(fms);
        setLoaded(true);
      }
    };
    handleRequests();
  }, [userId]);

  if (subscription) {
    return (
      <div className="p-4 mb-4 text-left text-sm">
        <p className="mt-2 text-brand">Subscribed to Gold Plan.</p>
      </div>
    );
  }
  const formCount = forms ? forms.length : 0;
  const percentage = formCount ? formCount / MAX_FREE_FORMS : 0;
  if (!userId || !loaded) {
    return (
      <div className="w-full flex mx-2 p-4 justify-start">
        <ClipLoader color="#3B82F6" size={25} aria-label="Please wait..." />
      </div>
    );
  }

  return (
    <div className="p-4 mb-4 text-left text-xs">
      <Progress value={percentage} />
      <p className="mt-2">
        {formCount} out of {MAX_FREE_FORMS} generated.
      </p>
      <div className="my-2">
        <SubscribeBtn price="price_1PEWfoBf1otR0ufwptHXU4BX" userId={userId} />
      </div>
    </div>
  );
};

export default UpgradePlanBtn;
