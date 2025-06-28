import React, { useEffect, useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { useLoaderData } from 'react-router';

// ✅ Utility: Count words in a string
const getWordCount = (text) => text?.trim().split(/\s+/).length || 0;

const FeaturedBlogs = () => {
    const data = useLoaderData();
    const [sorting, setSorting] = useState([]);
    
     useEffect(() => {
        document.title = "Featured Blogs | techory";
      }, []);

    // ✅ Top 10 blogs based on word count
    const topBlogs = useMemo(() => {
        return [...data]
            .filter(blog => blog.longDescription)
            .sort((a, b) => getWordCount(b.longDescription) - getWordCount(a.longDescription))
            .slice(0, 10);
    }, [data]);

    // ✅ Define columns for table
    const columns = [
        {
            header: 'Thumbnail',
            accessorKey: 'photo',
            cell: info => (
                <img
                    src={info.getValue()}
                    alt="Thumbnail"
                    className="w-14 h-14 rounded object-cover border"
                />
            ),
        },
        { header: 'Title', accessorKey: 'title' },
        { header: 'Author', accessorKey: 'name' },
        { header: 'Category', accessorKey: 'category' },
        {
            header: 'Short Description',
            accessorKey: 'shortDescription',
            cell: info => (
                <span className="line-clamp-2">{info.getValue()}</span>
            ),
        },
        {
            header: 'Event Date',
            accessorKey: 'eventDate',
            cell: info => (
                <span>{new Date(info.getValue()).toLocaleDateString()}</span>
            ),
        },
        {
            header: 'Word Count',
            accessorFn: (row) => getWordCount(row.longDescription),
            cell: info => <span>{info.getValue()}</span>,
            sortingFn: 'basic',
        },
    ];

    const table = useReactTable({
        data: topBlogs,
        columns,
        state: { sorting },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
    });

    return (
        <div className="p-6 bg-secondary">
            <h1 className="text-3xl font-bold mb-5 text-base-100"> Featured Blogs (Top 10 by Word Count)</h1>
            <p className="mb-10 text-lg text-base-100">TanStack Table has been used to enable sorting of each column's data in ascending or descending order. You can check it by clicking the arrows shown in each column header.</p>

            {/* ✅ AES & DES Buttons */}
            <div className="flex gap-4 mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">AES</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">DES</button>
            </div>

            {/* ✅ Table */}
            <div className="overflow-x-auto border rounded shadow-sm">
                <table className="min-w-full text-sm bg-[#0f172a] text-[#fcd34d]">
                    <thead className=" text-[#fcd34d]">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-4 py-3 border text-left cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <span className="text-sm">
                                                {{
                                                    asc: '🔼',
                                                    desc: '🔽',
                                                }[header.column.getIsSorted()] ?? '⇅'}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-[#c7ab3e]">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50 hover:text-gray-800 border-t">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-3 border">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeaturedBlogs;
