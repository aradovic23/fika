import { Skeleton } from "@chakra-ui/react"

const SkeletonLoader = () => {
    return (
        <>
            {[...Array(6).keys()].map((i) => (
                <Skeleton height="10rem" rounded="lg" key={i} />
            ))}
        </>
    )
}

export default SkeletonLoader
