import UserAvatar from "@/components/UserPage/UserAvatar";
import UserStat from "@/components/UserPage/UserStat";

const UserInfo = ({ username, stats, setLocalUser }) => {
    /**
     * Returns a greeting message based on the current time of the day.
     * @returns {string} The greeting message.
     */
    const getGreeting = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        let greeting;

        if (currentHour < 12) {
            greeting = "早上好";
        } else if (currentHour < 18) {
            greeting = "下午好";
        } else {
            greeting = "晚上好";
        }

        return greeting;
    };

    return (
        <div className="bg-muted/50 border rounded-lg py-12 px-12 flex flex-row gap-8">
            <div className="w-full bg-green-0 flex flex-col gap-6">
                <h2 className="pb-6 text-6xl font-bold">
                    {getGreeting()}，{username}
                </h2>
                <UserStat stats={stats} />
            </div>
            <UserAvatar setLocalUser={setLocalUser} />
        </div>
    );
};

export default UserInfo;
