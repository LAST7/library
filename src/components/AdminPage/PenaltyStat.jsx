import AddPenalty from "./AddPenalty";
import AdminPenaltyTable from "./PenaltyTable";

const PenaltyStat = () => {
    return (
        <div className="bg-muted/50 border rounded-lg py-12 px-12 flex flex-row gap-16 justify-center">
            <div className="w-[800px] flex flex-col items-center">
                <h2 className="pb-6 text-4xl font-bold">学生违规</h2>
                <AdminPenaltyTable />
            </div>
            <div className="w-[300px] bg-white rounded-lg px-8 py-8 flex flex-col items-center justify-center">
                <h2 className="pb-6 text-2xl font-bold">添加违规记录</h2>
                <AddPenalty />
            </div>
        </div>
    );
};

export default PenaltyStat;
