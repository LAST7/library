import DatePicker from "@/components/ReservationPage/DatePicker";
import TimeSelector from "@/components/ReservationPage/TimeSelector";

const TimeForm = () => {
    return (
        <div className="w-[600px] h-[250px] bg-white rounded-lg px-12 py-8">
            <h2 className="pb-6 text-3xl font-bold">选择时间段</h2>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <p className="text-lg font-bold flex items-center">
                        日期：
                    </p>
                    <DatePicker />
                </div>
                <div className="flex justify-between">
                    <p className="text-lg font-bold flex items-center">
                        起始时间：
                    </p>
                    <TimeSelector type="start" />
                </div>
                <div className="flex justify-between">
                    <p className="text-lg font-bold flex items-center">
                        结束时间：
                    </p>
                    <TimeSelector type="end" />
                </div>
            </div>
        </div>
    );
};

export default TimeForm;
