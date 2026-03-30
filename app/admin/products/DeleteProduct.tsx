"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { deleteProductAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteProduct({ productId, productName }: { productId: string; productName: string }) {
  const { toast } = useToast();
  const deleteProduct = async (prevState: any, formData: FormData) => {
    try {
      const result = await deleteProductAction({ productId });
      toast({
        title: "Product deleted",
        description: result.message || "The product was removed successfully.",
        variant: "destructive",
      });
      return result;
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
      return { message: 'Failed to delete product.' };
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button">
          <IconButton actionType="delete" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {productName}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <FormContainer action={deleteProduct}>
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </FormContainer>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}