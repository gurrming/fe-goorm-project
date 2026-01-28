import { ClipLoader } from "react-spinners";

export const Loading_Spinner = () => {
    return (
        <div className="flex flex-col gap-3  items-center justify-center">
            <ClipLoader color="#0C3887" size={25} />
        </div>
    )
}