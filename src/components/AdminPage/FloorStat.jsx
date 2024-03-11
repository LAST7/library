import FloorTable from "@/components/AdminPage/FloorTable";
import ChangeFloor from "./ChangeFloor";

const FloorStat = () => {
    return (
        <div className="bg-muted/50 border rounded-lg py-12 px-12 flex flex-row gap-16 justify-center">
            <div className="w-[800px] flex flex-col items-center">
                <h2 className="pb-6 text-4xl font-bold">
                    <span className="bg-gradient-to-b from-primary/50 to-primary text-transparent bg-clip-text">
                        楼层状态
                    </span>
                </h2>
                <FloorTable />
            </div>
            <div className="w-[300px] bg-slate-800 rounded-lg px-8 py-8 flex flex-col items-center justify-center">
                <h2 className="pb-6 text-2xl font-bold">
                    <span className="bg-gradient-to-b from-primary/50 to-primary text-transparent bg-clip-text">
                        更改楼层开放状态
                    </span>
                </h2>
                <ChangeFloor />
            </div>
        </div>
    );
};

export default FloorStat;
