import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

import Button from "./button";

export default function SubmitButton(props) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      {pending && <Loader className="animate-spin w-4 h-4" />}
      {props.children}
    </Button>
  );
}
