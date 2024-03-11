import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

import { loginUser } from "@/reducers/userReducer";
import { loginAdmin } from "@/reducers/adminReducer";

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

const LoginTab = ({ className, ...props }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [localUser, setLocalUser] = useLocalStorage("localUser", null);

    // navigate to user page if user already logged in
    useEffect(() => {
        if (localUser) {
            navigate("/");
        }
    }, []);

    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [adminUserName, setAdminUserName] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const emptyInput = () => {
        setStudentId("");
        setPassword("");
        setAdminUserName("");
        setAdminPassword("");
    };

    const validateUserInput = () => {
        if (studentId === "" || password === "") {
            toast.warning("请输入完整的用户信息");
            return false;
        }
        if (password.length < 8) {
            toast.warning("密码长度不能小于 8 位");
            return false;
        }

        return true;
    };

    const validateAdminInput = () => {
        if (adminUserName === "" || adminPassword === "") {
            toast.warning("请输入完整的用户信息");
            return false;
        }
        if (adminPassword.length < 8) {
            toast.warning("密码长度不能小于 8 位");
            return false;
        }

        return true;
    };

    const handleUserLogin = async () => {
        if (!validateUserInput()) {
            return;
        }

        dispatch(loginUser(studentId, password))
            .then((user) => {
                // store the returned info
                setLocalUser(user);
                emptyInput();
                // navigate back to main page
                navigate("/");
                // notification
                toast.info(`用户 ${user.username} 登录成功, 欢迎！`);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                console.error(err);
            });
    };

    const handleAdminLogin = async () => {
        if (!validateAdminInput()) {
            return;
        }

        dispatch(loginAdmin(adminUserName, adminPassword))
            .then((admin) => {
                emptyInput();
                // navigate to admin page
                navigate("/admin");
                // notification
                toast.info(`管理员 ${admin.name} 登录成功, 欢迎！`);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <div className={twMerge("w-[450px]", className)} {...props}>
            <Tabs defaultValue="student">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="student" onClick={emptyInput}>
                        学生入口
                    </TabsTrigger>
                    <TabsTrigger value="admin" onClick={emptyInput}>
                        管理员入口
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="student">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">学生登录</CardTitle>
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
                                <Label htmlFor="stu-passwd">密码</Label>
                                <Input
                                    id="stu-passwd"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-evenly">
                            <Button onClick={handleUserLogin}>登录</Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/register")}
                            >
                                注册
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="admin">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                管理员登录
                            </CardTitle>
                            <CardDescription className="text-0.5xl">
                                欢迎使用图书馆座位预约系统！
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-2">
                                <Label htmlFor="admin-id">管理员账号</Label>
                                <Input
                                    id="admin-id"
                                    value={adminUserName}
                                    onChange={(e) =>
                                        setAdminUserName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="admin-passwd">密码</Label>
                                <Input
                                    id="admin-passwd"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) =>
                                        setAdminPassword(e.target.value)
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-evenly">
                            <Button onClick={handleAdminLogin}>登录</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LoginTab;
