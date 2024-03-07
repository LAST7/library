const UserStat = () => {
    // TODO: mock data
    const stats = [
        {
            content: "学生姓名",
            description: "姓名",
        },
        {
            content: "1",
            description: "我的预约",
        },
        {
            content: "3",
            description: "已完成预约",
        },
        {
            content: "0",
            description: "违规记录",
        },
    ];

    return (
        <section id="statistics">
            <div className="grid grid-cols-2 gap-8">
                {stats.map(({ content, description }) => (
                    <div
                        key={description}
                        className="space-y-2 py-2 text-center border-4 rounded-lg "
                    >
                        <h2 className="text-3xl font-bold">
                            {content}
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UserStat;
