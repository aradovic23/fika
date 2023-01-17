import Image from "next/image";
import type { FC } from "react";
import placeholderImage from "../assets/img/dogg.jpeg";

type Drink = {
  title: string;
  id: string;
  price: string;
  volume?: string | null;
  tag?: string | null;
  category?: string | null;
  type?: string | null;
};

export const DrinkList: FC<Drink> = ({
  title,
  price,
  id,
  volume,
  type,
  category,
  tag,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <Image src={placeholderImage} alt="image" width={500} height={500} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge-secondary badge">NEW</div>
        </h2>
        <p>{price}</p>
        <p>{category}</p>
        <p>{type}</p>
        <p>{tag}</p>
        <p>{volume}</p>
        <div className="card-actions justify-end">
          <div className="badge-outline badge">{id}</div>
        </div>
      </div>
    </div>
  );
};
