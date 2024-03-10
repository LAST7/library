const UserStat = ({ stats }) => {
    if (!stats || stats.loading) {
        return (
            <section
                id="user-stat"
                className="py-24 h-full justify-center"
            >
                <div className="text-3xl text-center">Loading...</div>
            </section>
        );
    }

    const formatStats = [
        {
            content: stats.studentName,
            description: "姓名",
        },
        {
            content: stats.penaltyCount,
            description: "违规记录",
        },
        {
            content: stats.reservationCount.active,
            description: "我的预约",
        },
        {
            content: stats.reservationCount.outdated,
            description: "已完成预约",
        },
    ];

    return (
        <section id="statistics">
            <div className="grid grid-cols-2 gap-8">
                {formatStats.map(({ content, description }) => (
                    <div
                        key={description}
                        className="space-y-2 py-2 text-center border-4 rounded-lg "
                    >
                        <h2 className="text-3xl font-bold">{content}</h2>
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
