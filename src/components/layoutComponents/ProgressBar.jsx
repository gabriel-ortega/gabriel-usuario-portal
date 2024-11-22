import { Progress } from "flowbite-react";

export function ProgressBar({progress,label,className}) {
  return (
    <Progress
    className={className}
      progress={progress}
      progressLabelPosition="inside"
      textLabel={label}
      textLabelPosition="outside"
      size="lg"
      labelProgress
      labelText
      color="blue"
    />
  );
}
