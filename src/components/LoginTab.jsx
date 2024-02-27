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
import { twMerge } from "tailwind-merge";

const LoginTab = ({ className, ...props }) => {
    return (
        <div className={twMerge("w-[450px]", className)} {...props}>
            <Tabs defaultValue="student">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="student">学生入口</TabsTrigger>
                    <TabsTrigger value="admin">管理员入口</TabsTrigger>
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
                                <Input id="student-id" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stu-passwd">密码</Label>
                                <Input id="stu-passwd" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>登录</Button>
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
                                <Input id="admin-id" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="admin-passwd">密码</Label>
                                <Input id="admin-passwd" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>登录</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LoginTab;
