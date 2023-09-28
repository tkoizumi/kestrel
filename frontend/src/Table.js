

const Table = () => {
    return (
        <div>
            <h5></h5>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Process Name</th>
                        <th>PID</th>
                        <th>CPU %</th>
                        <th>CPU Time</th>
                        <th>Column 5</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Add table rows with data here */}
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 4</td>
                        <td>Data 5</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    )
}

export default Table;