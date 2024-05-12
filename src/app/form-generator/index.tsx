import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { generateForm } from "../actions/generateForm";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { navigate } from "../actions/navigateToForm";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MoveRight, ChevronRight } from "lucide-react";

type Props = {};

export function SubmitButton() {
  // a Hook that gives you status information of the last form submission.
  const { pending } = useFormStatus();
  return (
    <Button
      className="rounded-[50px] whitespace-nowrap px-[30px] py-[12px] outline-none border-none flex justify-center items-center transition-all delay-300 ease-in-out hover:bg-foreground hover:text-background"
      type="submit"
      disabled={pending}
    >
      {pending ? "Generating ..." : "Generate"}
    </Button>
  );
}

const FormGenerator = ({}: Props) => {
  const { data: session } = useSession();
  const initialState: {
    message: string;
    data?: any;
  } = { message: "" };

  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (state?.message === "success") {
      setOpen(false);
      console.log(state.data.formId);
      navigate(state.data.formId);
    }
  }, [state?.message]);

  const onFormCreate = () => {
    if (session?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={onFormCreate}
        className="rounded-[50px] whitespace-nowrap px-[30px] py-[12px] outline-none border-none flex justify-center items-center transition-all delay-300 ease-in-out hover:bg-foreground hover:text-background"
        onMouseEnter={onHover}
        onMouseLeave={onHover}
      >
        Create Form{" "}
        {hover ? (
          <MoveRight size={20} className="ml-2" />
        ) : (
          <ChevronRight size={20} className="ml-2" />
        )}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ✨"
            />
          </div>
          <DialogFooter>
            <SubmitButton />
            <Button variant="link">Create Manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default FormGenerator;
