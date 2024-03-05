import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { registerUser } from "@/reducers/userReducer";
import seatService from "@/services/seat";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const LoginTab = ({ className, ...props }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [studentId, setStudentId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const emptyInput = () => {
        setStudentId("");
        setUsername("");
        setPassword("");
        setRepPassword("");
    };

    const validateInput = () => {
        if (studentId === "" || username === "" || password === "") {
            toast.warning("请输入完整的用户信息");
            return false;
        }
        if (password !== repPassword) {
            toast.warning("两次输入的密码不一致");
            return false;
        }
        if (password.length < 8) {
            toast.warning("密码长度不能小于 8 位");
            return false;
        }
    };

    const handleUserRegister = async () => {
        if (!validateInput()) {
            console.error("illegal input");
            return;
        }

        dispatch(registerUser(studentId, username, password))
            .then((user) => {
                // store the returned info
                window.localStorage.setItem("localUser", JSON.stringify(user));
                seatService.setToken(user.token);
                emptyInput();
                // navigate back to main page
                navigate("/");
                toast.info(`${user.username} 已完成注册, 欢迎！`);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <div className={twMerge("w-[450px]", className)} {...props}>
            <Tabs defaultValue="student">
                <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="student" onClick={emptyInput}>
                        用户注册
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="student">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">学生注册</CardTitle>
                            <CardDescription className="text-0.5xl">
                                欢迎使用图书馆座位预约系统！
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-2">
                                <Label htmlFor="student-id">学号</Label>
                                <Input
                                    id="student-id"
                                    value={studentId}
                                    onChange={(e) =>
                                        setStudentId(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">用户名</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stu-passwd">设置密码</Label>
                                <Input
                                    id="stu-passwd"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stu-reppasswd">重复密码</Label>
                                <Input
                                    id="stu-reppasswd"
                                    type="password"
                                    value={repPassword}
                                    onChange={(e) =>
                                        setRepPassword(e.target.value)
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleUserRegister}>注册</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LoginTab;
