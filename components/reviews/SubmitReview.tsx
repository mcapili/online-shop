'use client';

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";
import { useState } from "react";

function SubmitReview({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0); // Add this state
  const handleRatingChange = (rating: number) => {
    if (isNaN(rating)) {
      console.log("Invalid rating:", rating);
      return;
    }
    // Save rating to backend or state
    setRating(rating);
  };
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const { user } = useUser();
  return (
    <div>
      <Button
        size='lg'
        className='capitalize'
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave review
      </Button>
      {isReviewFormVisible && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='productId' value={productId} />
            <input
              type='hidden'
              name='authorName'
              value={user?.firstName || 'user'}
            />
            <input
              type='hidden'
              name='authorImageUrl'
              value={user?.imageUrl || ''}
            />
            <input
              type='hidden'
              name='rating'
              value={rating}
            />
            <RatingInput
              onRatingChange={handleRatingChange}
              name='rating'
            />
            <TextAreaInput
              name='comment'
              labelText='feedback'
              defaultValue='Outstanding product!!!'
            />
            <SubmitButton className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}


export default SubmitReview
