import Image from "next/image";
import type { FC } from "react";
import classnames from "classnames";
import Link from "next/link";

type Drink = {
  title: string;
  id: string;
  price: string;
  volume?: string | null;
  tag?: string | null;
  category?: string | null;
  type?: string | null;
};

const typeBadgeBackgroundColor: { [index: string]: string } = {
  none: "badge badge-error ",
  Green: "bg-green-400",
  Black: "bg-slate-400",
  Fruit: "bg-red-400",
  Herb: "bg-yellow-400",
};

const typeBadgeStyle = "rounded-md px-1 py-0.5 text-xs text-black";

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
    <div className="flex max-h-52 flex-col gap-2 rounded-lg bg-base-300">
      <figure className="relative h-24 rounded-t-lg">
        <Image
          src="http://placeimg.com/640/360/any"
          alt="image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          priority
        />
        {tag && (
          <div className="absolute top-2 right-2 rounded-md bg-yellow-300 px-1 py-0.5 text-sm text-black">
            {tag}
          </div>
        )}
      </figure>
      <div className="flex flex-col gap-4 divide-y divide-solid divide-slate-400/10 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="card-title truncate">{title}</h2>
            {type && type != "none" && (
              <div
                className={classnames(
                  typeBadgeBackgroundColor[type],
                  typeBadgeStyle
                )}
              >
                {type}
              </div>
            )}
          </div>
          <div className="text-sm font-bold">{price} RSD</div>
        </div>
        <div className="card-actions flex justify-between pt-2">
          <div className="flex gap-2">
            {category && <div className="text-sm uppercase">{category}</div>}
            {volume && volume != "none" && (
              <div className="text-sm font-bold">{volume}</div>
            )}
          </div>
          <div>
            <button className="btn-primary btn-error btn-xs btn">
              <Link href={`/drink/${id}`}>Edit</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
