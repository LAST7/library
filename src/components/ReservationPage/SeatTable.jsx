"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { useSeat } from "@/components/Reservation";

const SeatTable = ({ seatData }) => {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [floor, setFloor] = React.useState(0);
    const [seatOnFloor, setSeatOnFloor] = React.useState([]);

    // extract the value provided by SeatContext
    const setSelectedSeat = useSeat();

    const columns = [
        {
            id: "select",
            header: "选择",
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                        // pass the selected seat data to upper component
                        value
                            ? setSelectedSeat({
                                  seat_number: row.getValue("seat_number"),
                                  floor_level: row.getValue("floor_level"),
                              })
                            : setSelectedSeat({
                                  seat_number: "",
                                  floor_level: 0,
                              });
                    }}
                    aria-label="Select row"
                    {...(row.getValue("available") === 1
                        ? {}
                        : { disabled: true })}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "seat_number",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        座位编号
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="ml-4 capitalize font-bold">
                    {row.getValue("seat_number")}
                </div>
            ),
        },
        {
            accessorKey: "floor_level",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        楼层
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="font-medium ml-4">
                    {row.getValue("floor_level")}
                </div>
            ),
        },
        {
            accessorKey: "available",
            header: "状态",
            cell: ({ row }) => {
                const avail = row.getValue("available");
                return (
                    <div
                        className={cn("font-bold", {
                            "text-sky-500": avail === 1,
                            "text-rose-500": avail === 0,
                        })}
                    >
                        {avail === 1 ? "可用" : "不可用"}
                    </div>
                );
            },
        },
    ];

    const openFloors = [
        ...new Set(
            seatData
                // filter the close floors
                .filter((s) => s.open === 1)
                .map((s) => s.floor_level),
        ),
    ];

    const seatsOnOpenFloor = seatData.filter((s) =>
        openFloors.includes(s.floor_level),
    );

    React.useEffect(() => {
        setSeatOnFloor(
            floor === 0
                ? seatsOnOpenFloor
                : seatsOnOpenFloor.filter((s) => s.floor_level === floor),
        );
    }, [floor, seatData]);

    const table = useReactTable({
        data: seatOnFloor,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        // only one seat could be selected at one time
        enableMultiRowSelection: false,
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="搜索座位编号"
                    value={
                        table.getColumn("seat_number")?.getFilterValue() ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("seat_number")
                            .setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Select
                    defaultValue="0"
                    onValueChange={(floor) => setFloor(Number(floor))}
                >
                    <SelectTrigger className="w-[180px] ml-auto">
                        <SelectValue placeholder="选择楼层" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>楼层</SelectLabel>
                            <SelectItem key="0" value="0">
                                全部楼层
                            </SelectItem>
                            {openFloors.map((f) => (
                                <SelectItem key={f} value={f}>
                                    {f}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    上一页
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    下一页
                </Button>
            </div>
        </div>
    );
};

export default SeatTable;
