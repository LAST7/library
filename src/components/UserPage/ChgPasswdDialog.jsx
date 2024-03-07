import { useState } from "react";

import { LockClosedIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ChgPasswdDialog = ({ buttonVariant }) => {
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
        // TODO: handle password change submit
        // remember to delete local token and log out
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
