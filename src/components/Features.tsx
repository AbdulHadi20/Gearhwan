import { cn } from "@/lib/utils";
export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Buy A Car",
      icon: <img src="/buycarservice.png" alt="buyacar" />,
      description: "Buy a car with us today. Complete the quiz to find the car that best suits you. "
    },
    {
      title: "Rent A Car",
      icon: <img src="/rentcarservice.png" alt="rentacar" />,
      description: "Rent a car with us today. Easy and simple booking process. Book your car today. ",
    },
    {
      title: "Guides",
      icon: <img src="/guidesservice.png" alt="guides" />,
      description: "Browse through various guides to ensure your ride remains on top everyday.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  icon,
  description,
  index,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature items-center",
        index < 4 && "dark:border-neutral-800"
      )}
    >
      <div className="w-28 h-28 flex items-center justify-center mb-4 rounded-full">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10 text-center">
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-primary">
          {title}
        </span>
      </div>
      <p className="text-sm text-center self-center text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};