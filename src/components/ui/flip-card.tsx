"use client";
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, type cardVariants } from './card';
import { Button } from './button';

// Create variant styles for the flip card
const flipCardVariants = cva(
  'perspective-1000 w-full h-full',
  {
    variants: {
      size: {
        default: 'max-w-xs',
        sm: 'max-w-48',
        lg: 'max-w-md',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface FlipCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flipCardVariants> {
  frontImage: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  cardVariant?: VariantProps<typeof cardVariants>['variant'];
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ 
    className, 
    size, 
    frontImage, 
    title, 
    description, 
    buttonText = "Resep", 
    onButtonClick, 
    cardVariant = 'default',
    ...props 
  }, ref) => {
    // State to track if the card is flipped
    const [isFlipped, setIsFlipped] = React.useState(false);

    // Function to toggle the flip state
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <div
        ref={ref}
        className={cn(flipCardVariants({ size, className }), "h-80 w-full py-2")}
        {...props}
      >
        <div 
          className={cn(
            "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
            isFlipped ? "rotate-y-180" : ""
          )}
        >
          {/* Front of the card */}
          <div 
            className="absolute w-full h-full backface-hidden cursor-pointer"
            onClick={handleFlip}
            onKeyUp={(e) => {}}
          >
            <Card variant={cardVariant} className="flex flex-col h-full">
              <div className="flex-1 p-4 flex flex-col items-center justify-center">
                <div className="w-32 h-32 overflow-hidden rounded-full mb-4 border-border border-2 ">
                  <img 
                    src={frontImage} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-center">{title}</CardTitle>
              </div>
            </Card>
          </div>

          {/* Back of the card */}
          <div 
            className="absolute w-full h-full backface-hidden rotate-y-180 cursor-pointer"
            onClick={handleFlip}
            onKeyUp={(e) => {}}
          >
            <Card variant={cardVariant} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>{description}</CardDescription>
              </CardContent>
              <CardFooter className="justify-end">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onButtonClick) onButtonClick();
                  }}
                //   className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
                >
                  {buttonText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <title>Icon</title>
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
);

FlipCard.displayName = 'FlipCard';

export { FlipCard };