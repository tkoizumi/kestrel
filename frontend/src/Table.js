
const Table = (props) => {
    const data = props.data;
    console.log(data)
    return (
        <div class="container mt-4">
            <h5>All Processes </h5>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>CMD</th>
                        <th>PID</th>
                        <th>User Time (s)</th>
                        <th>Nice Time (s)</th>
                        <th>System Time (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.pid}>
                            <td>{row.cmd}</td>
                            <td>{row.pid}</td>
                            <td>{row.user}</td>
                            <td>{row.nice}</td>
                            <td>{row.system}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;