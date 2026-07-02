import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { StarRating } from "./StarRating";

const RatingInput = ({
  name,
  labelText,
  onRatingChange,
}: {
  name: string;
  labelText?: string;
  onRatingChange: (rating: number) => void;
}) => {
  // const numbers = Array.from({ length: 5 }, (_, i) => {
  //   const value = i + 1;
  //   return value.toString();
  // }).reverse();

  const handleRatingChange = (rating: number) => {
    console.log("User selected rating:", rating);
    // Save rating to backend or state
    onRatingChange(rating);
  };

  return (
    <div className='mb-2 max-w-xs'>
      <Label htmlFor={name} className='capitalize'>
        {labelText || name}
      </Label>
      <StarRating onRatingChange={handleRatingChange} />
    </div>
  );
};

export default RatingInput
