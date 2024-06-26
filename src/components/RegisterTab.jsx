import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { registerUser } from "@/reducers/userReducer";

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

    const [localUser, setLocalUser] = useLocalStorage("localUser", null);

    // navigate to user page if user already logged in
    useEffect(() => {
        if (localUser) {
            navigate("/");
        }
    }, []);

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

        return true;
    };

    const handleUserRegister = async () => {
        if (!validateInput()) {
            console.error("illegal input");
            return;
        }

        dispatch(registerUser(studentId, username, password))
            .then((user) => {
                // store the returned info
                setLocalUser(user);
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
                        <CardFooter className="justify-evenly">
                            <Button onClick={handleUserRegister}>注册</Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/login")}
                            >
                                登录
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LoginTab;
