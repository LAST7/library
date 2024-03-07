import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="my-5 py-5"
        >
            <ChevronLeftIcon className="h-6 w-6 mr-2" /> 返回主页
        </Button>
    );
};

export default BackButton;
