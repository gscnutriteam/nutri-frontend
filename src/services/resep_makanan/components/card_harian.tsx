import { Button } from "@/components/ui/button";
import { MakananHarianPropsWithVariant } from "../types/type";
import { cn } from "@/lib/utils";

export const MakananHarian = ({ data }: { data: MakananHarianPropsWithVariant }) => {
  return (
    <div className="w-full py-2">
      <div className={cn("py-4 shadow-shadow px-3 rounded-lg flex w-full justify-between flex-col aspect-[314/122] border-border border-2", data.variant == "primary" ? "bg-main" : "bg-primaryLight")}>
        <div className="w-full flex flex-col">
          <p className="text-lg font-bold">{data.title}</p>
          <p className="text-textGray">Resep makanan {data.title.toLocaleLowerCase()}</p>
        </div>
        <div className="flex w-full gap-3 justify-between">
          {data.links.map((data, index) => {
            return (
              <Button
                key={index}
                size={"sm"}
                variant={"neutral"}
                className="rounded-full"
              >
                {data.title}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
