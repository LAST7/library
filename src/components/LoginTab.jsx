import { useState } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminUserName, setAdminUserName] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const emptyInput = () => {
        setUsername("");
        setPassword("");
        setAdminUserName("");
        setAdminPassword("");
    };

    const handleUserLogin = async () => {
        dispatch(loginUser(username, password))
            .then((user) => {
                // store the returned info
                window.localStorage.setItem("localUser", JSON.stringify(user));
                // TODO: handle token
                emptyInput();
            })
            // TODO: notification
            .catch((err) => console.error(err));
    };

    const handleAdminLogin = async () => {
        dispatch(loginAdmin(adminUserName, adminPassword))
            .then((user) => {
                // store the returned info
                window.localStorage.setItem("localUser", JSON.stringify(user));
                // TODO: handle token
                emptyInput();
            })
            // TODO: notification
            .catch((err) => console.error(err));
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
                                <Label htmlFor="student-id">
                                    用户名（学号）
                                </Label>
                                <Input
                                    id="student-id"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
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
                        <CardFooter>
                            <Button onClick={handleUserLogin}>登录</Button>
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
                        <CardFooter>
                            <Button onClick={handleAdminLogin}>登录</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LoginTab;
