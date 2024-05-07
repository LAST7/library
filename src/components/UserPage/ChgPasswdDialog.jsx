import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { LockClosedIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { clearUser } from "@/reducers/userReducer";
import userService from "@/services/user";

const ChgPasswdDialog = ({ buttonVariant, setLocalUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPasswd, setOldPasswd] = useState("");
    const [newPasswd, setNewPasswd] = useState("");

    const emptyInput = () => {
        setOldPasswd("");
        setNewPasswd("");
    };

    const handleChangeP = () => {
        if ((oldPasswd === "") | (newPasswd === "")) {
            toast.error("密码不能为空");
            return;
        }
        if (oldPasswd.length < 8 || newPasswd.length < 8) {
            toast.warning("密码长度不能小于 8 位");
            return;
        }
        if (oldPasswd === newPasswd) {
            toast.warning("两次输入的密码相同");
            return;
        }

        // handle password change submit
        const credentials = {
            oldPasswd,
            newPasswd,
        };
        userService
            .changePasswd(credentials)
            .then(() => {
                // delete local token and log out
                setLocalUser(null);
                dispatch(clearUser());
                emptyInput();

                toast.info("密码修改成功，请重新登录");

                // BUG: This will trigger an update while the component is being rendering.
                // Maybe it's because of that:
                // this call is inside a callback function of an asynchronous operation,
                // thus causing it being executed during the rendering of other components
                navigate("/login");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={buttonVariant} className="mt-5">
                    <LockClosedIcon className="mr-2" /> 修改密码
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>修改密码</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="old-passwd" className="text-right">
                            旧密码
                        </Label>
                        <Input
                            id="old-passwd"
                            className="col-span-3"
                            type="password"
                            value={oldPasswd}
                            onChange={(e) => setOldPasswd(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-passwd" className="text-right">
                            新密码
                        </Label>
                        <Input
                            id="new-passwd"
                            className="col-span-3"
                            type="password"
                            value={newPasswd}
                            onChange={(e) => setNewPasswd(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleChangeP}
                    >
                        提交
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ChgPasswdDialog;
