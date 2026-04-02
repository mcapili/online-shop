'use client';
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { forwardRef } from "react";

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
  reloadLabel?: string;
};

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
  reloadLabel
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className={cn('capitalize', className)}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          { reloadLabel || 'Submitting...'}
        </>
      ) : (
        text
      )}
    </Button>
  )
}

type ActionType = "edit" | "delete";

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  actionType: ActionType;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ actionType, className, ...props }, ref) => {
    const { pending } = useFormStatus();

    const renderIcon = () => {
      switch (actionType) {
        case "edit":
          return <FaRegEdit />;
        case "delete":
          return <LuTrash2 />;
        default:
          return null;
      }
    };

    return (
      <Button
        ref={ref}              // ✅ forward ref
        type="submit"
        size="icon"
        variant="link"
        className={`p-2 cursor-pointer ${className ?? ""}`}
        {...props}             // ✅ forward props (onClick, aria-* etc.)
      >
        {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";