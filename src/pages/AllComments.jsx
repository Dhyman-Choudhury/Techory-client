

const AllComments = ({data}) => {
    
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-100 bg-[#0f172a] text-[#fcd34d]">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr className='text-[#c7ab3e] border border-base-100'>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comment</th>
                        </tr >
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        data.map((comment, index )=> <tr className="border-b border-base-100" key={comment._id}>
                            <th>{index+1}</th>
                            <td><img className="w-16 h-16 rounded-full" src={comment?.photo} alt="Commenter Image" /></td>
                            <td>{comment?.commenter_name}</td>
                            <td>{comment?.commenter_email}</td>
                            <td>{comment?.text}</td>
                        </tr>)
                       }
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllComments;