import { Components } from "@/api/schemas/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookInfoCardProps {
  book: Components.Schemas.StoryWithImgResponseDto;
}

const BookInfoCardComponent: React.FC<BookInfoCardProps> = ({ book }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.name}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default BookInfoCardComponent;
