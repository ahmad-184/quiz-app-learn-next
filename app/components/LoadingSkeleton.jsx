import ReactSkeleton from "react-loading-skeleton";

export default function Skeleton() {
  return (
    <ReactSkeleton
      count={1}
      height={45}
      baseColor="#232323"
      highlightColor="#474747"
    />
  );
}
