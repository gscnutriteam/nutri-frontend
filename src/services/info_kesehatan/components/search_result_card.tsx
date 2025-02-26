import { CardInfoKesehatanProps } from "../types/types";
import { CardInfoKesehatan } from "./card-info-kesehatan";

export const SearchResultsCard = ({data}: {data: CardInfoKesehatanProps[]}) => {
    return(
        <div className="flex w-full flex-col mt-5 gap-3">
        {data.map((data, index) => (
            <CardInfoKesehatan key={index} {...data} />
        ))}
    </div>
    )
}