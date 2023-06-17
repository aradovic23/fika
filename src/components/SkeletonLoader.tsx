import { Skeleton } from "@chakra-ui/react"

interface Props {
    height: string;
}

const SkeletonLoader = ({ height }: Props) => {
    return (
        <>
            {[...Array(6).keys()].map((i) => (
                <Skeleton height={height} rounded="lg" key={i} />
            ))}
        </>
    )
}

export default SkeletonLoader
