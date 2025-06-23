

const AllComments = ({data}) => {
    
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-[#0f172a] text-[#fcd34d]">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr className='text-[#c7ab3e]'>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        data.map((comment, index )=> <tr key={comment._id}>
                            <th>{index+1}</th>
                            <td>{comment.commenter_name}</td>
                            <td>{comment.commenter_email}</td>
                            <td>{comment.text}</td>
                        </tr>)
                       }
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllComments;